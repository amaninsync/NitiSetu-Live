
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  UserCredential
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase-config';
import { User } from '@/types';
import { mockUsers } from './mock-data';

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

// Initialize Firebase users in Firestore
export const initializeFirebaseUsers = async (): Promise<void> => {
  console.log('Initializing Firebase users...');
  
  for (const user of mockUsers) {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        user.email, 
        'nitisetu123' // Default password for all users
      );
      
      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        departmentId: user.departmentId,
        departmentIds: user.departmentIds,
        mandalId: user.mandalId,
        avatar: user.avatar,
        active: user.active,
        lastLogin: user.lastLogin,
        permissions: user.permissions
      });
      
      console.log(`Created user: ${user.email}`);
    } catch (error: any) {
      // User might already exist, that's okay
      if (error.code !== 'auth/email-already-in-use') {
        console.error(`Error creating user ${user.email}:`, error);
      }
    }
  }
};

// Sign in with Firebase
export const signInWithFirebase = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser: FirebaseUser = userCredential.user;
    
    // Get additional user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        departmentId: userData.departmentId,
        departmentIds: userData.departmentIds,
        mandalId: userData.mandalId,
        avatar: userData.avatar,
        active: userData.active,
        lastLogin: new Date().toISOString(),
        permissions: userData.permissions
      };
      
      // Update last login
      await setDoc(doc(db, 'users', firebaseUser.uid), { ...userData, lastLogin: user.lastLogin }, { merge: true });
      
      return { success: true, user };
    } else {
      return { success: false, error: 'User data not found' };
    }
  } catch (error: any) {
    console.error('Firebase sign in error:', error);
    return { success: false, error: error.message };
  }
};

// Sign out from Firebase
export const signOutFromFirebase = async (): Promise<void> => {
  await signOut(auth);
};

// Get current Firebase user
export const getCurrentFirebaseUser = (): FirebaseUser | null => {
  return auth.currentUser;
};
