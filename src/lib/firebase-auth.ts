// src/lib/firebase-auth.ts
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithCustomToken,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, FieldValue } from 'firebase/firestore';
import { auth, db } from './firebase-config';

// Define the shape of your user data, which will be stored in Firestore
// This matches the UserProfile interface in auth-context.tsx
export interface UserProfileData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: string | null;
  permissions: string[];
  createdAt?: FieldValue;
  updatedAt?: FieldValue;
}

// Result type for authentication operations
export interface AuthResult {
  success: boolean;
  userProfile?: UserProfileData;
  error?: string;
  firebaseUser?: FirebaseUser; // Include FirebaseUser for specific flows like phone auth confirmation
}

// Predefined roles and permissions mapping by email
// This mapping will be used when creating/updating user profiles in Firestore
const PREDEFINED_USER_ROLES: { [email: string]: { role: string; permissions: string[] } } = {
  "dm@asifabad.nitisetu.com": { role: "district_collector", permissions: ["view_all", "edit_all", "approve_all", "create_all", "delete_all"] },
  "ac@asifabad.nitisetu.com": { role: "additional_collector", permissions: ["view_all", "edit_most", "approve_most", "create_most"] },
  "dwo@asifabad.nitisetu.com": { role: "department_lead", permissions: ["view_department", "edit_department", "create_reports"] },
  "admin@asifabad.nitisetu.com": { role: "admin", permissions: ["view_all", "edit_all", "approve_all", "create_all", "delete_all", "manage_users", "manage_roles"] },
  "employee@asifabad.nitisetu.com": { role: "government_official", permissions: ["view_assigned", "edit_assigned", "upload_reports"] },
  "contractor@asifabad.nitisetu.com": { role: "external_worker", permissions: ["view_limited", "upload_reports"] },
};

// Helper function to get/create user profile in Firestore
// This ensures that when a user logs in (regardless of method), their role and permissions
// are correctly set in Firestore, falling back to predefined roles or defaults.
const getUserProfileFromFirestore = async (firebaseUser: FirebaseUser): Promise<UserProfileData> => {
  // Determine the app ID for the Firestore path
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
  const userDocRef = doc(db, `artifacts/${appId}/users/${firebaseUser.uid}/profile`, 'data');
  const userDocSnap = await getDoc(userDocRef);

  let userRole = 'government_official'; // Default role
  let userPermissions: string[] = ['view_limited']; // Default permissions
  let displayName = firebaseUser.displayName;
  let photoURL = firebaseUser.photoURL;

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data() as UserProfileData;
    userRole = userData.role || userRole;
    userPermissions = userData.permissions || userPermissions;
    displayName = userData.displayName || displayName;
    photoURL = userData.photoURL || photoURL;
  } else {
    // If no profile exists, check if email matches a predefined role
    const predefinedUser = firebaseUser.email ? PREDEFINED_USER_ROLES[firebaseUser.email.toLowerCase()] : undefined;
    if (predefinedUser) {
      userRole = predefinedUser.role;
      userPermissions = predefinedUser.permissions;
      console.log(`Assigning predefined role '${userRole}' to new user ${firebaseUser.email}`);
    } else {
      console.log("No user profile found and no predefined role, creating a default one for:", firebaseUser.uid);
    }

    // Create a new profile with the determined role and permissions
    await setDoc(userDocRef, {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: displayName,
      photoURL: photoURL,
      role: userRole,
      permissions: userPermissions,
      createdAt: serverTimestamp(),
    }, { merge: true }); // Use merge: true to avoid overwriting if a partial doc already exists
  }

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: displayName,
    photoURL: photoURL,
    role: userRole,
    permissions: userPermissions,
  };
};

// --- Authentication Functions ---

// Handles initial authentication (anonymous or custom token)
export const initialFirebaseAuth = async (): Promise<void> => {
  try {
    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
      await signInWithCustomToken(auth, __initial_auth_token);
      console.log('Firebase authenticated with custom token.');
    } else {
      await signInAnonymously(auth);
      console.log('Firebase authenticated anonymously.');
    }
  } catch (error) {
    console.error('Firebase initial authentication failed:', error);
    throw error;
  }
};

// Sign in with Email and Password
export const signInWithEmail = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const userProfile = await getUserProfileFromFirestore(userCredential.user);
    return { success: true, userProfile, firebaseUser: userCredential.user };
  } catch (error: any) {
    console.error('Firebase sign in error (email):', error);
    return { success: false, error: error.message };
  }
};

// Sign up with Email and Password
export const signUpWithEmail = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userProfile = await getUserProfileFromFirestore(userCredential.user); // This will create the profile with roles
    return { success: true, userProfile, firebaseUser: userCredential.user };
  } catch (error: any) {
    console.error('Firebase sign up error (email):', error);
    return { success: false, error: error.message };
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<AuthResult> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const userProfile = await getUserProfileFromFirestore(result.user); // This will create/update the profile
    return { success: true, userProfile, firebaseUser: result.user };
  } catch (error: any) {
    console.error('Firebase sign in error (Google):', error);
    return { success: false, error: error.message };
  }
};

// Send phone verification code
export const sendPhoneVerificationCode = async (phoneNumber: string): Promise<{ confirmationResult: any; recaptchaVerifier: RecaptchaVerifier; }> => {
  const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    'size': 'invisible',
    'callback': (response: any) => {
      console.log("reCAPTCHA solved:", response);
    },
    'expired-callback': () => {
      console.log("reCAPTCHA expired.");
    }
  });
  await recaptchaVerifier.render();
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  // Store confirmationResult globally to be accessed later for verification
  window.confirmationResult = confirmationResult; 
  return { confirmationResult, recaptchaVerifier };
};

// Confirm phone verification code
export const confirmPhoneVerificationCode = async (confirmationResult: any, code: string): Promise<AuthResult> => {
  try {
    const result = await confirmationResult.confirm(code);
    const userProfile = await getUserProfileFromFirestore(result.user); // This will create/update the profile
    return { success: true, userProfile, firebaseUser: result.user };
  } catch (error: any) {
    console.error('Firebase confirm code error:', error);
    return { success: false, error: error.message };
  }
};

// Sign out from Firebase
export const signOutFromFirebase = async (): Promise<void> => {
  await signOut(auth);
};

// Send password reset email
export const sendPasswordReset = async (email: string): Promise<AuthResult> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    console.error('Firebase password reset error:', error);
    return { success: false, error: error.message };
  }
};

// Get current Firebase user (for onAuthStateChanged listener)
export const getCurrentFirebaseUser = (): FirebaseUser | null => {
  return auth.currentUser;
};
