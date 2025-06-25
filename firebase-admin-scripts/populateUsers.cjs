// populateUsers.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Path to your downloaded JSON key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

// Define the users to populate with their corresponding roles and permissions
// This uses a default password for initial creation. Users can reset it later.
// Ensure these emails match the ones in your PREDEFINED_USER_ROLES map in auth-context.tsx
const usersToPopulate = [
  {
    email: "dm@asifabad.nitisetu.com",
    password: "nsasifabad@2025", // IMPORTANT: Use a strong, temporary password here.
    displayName: "Sri Venkatesh Dhotre",
    role: "district_collector",
    permissions: ["view_all", "edit_all", "approve_all", "create_all", "delete_all"]
  },
  {
    email: "ac@asifabad.nitisetu.com",
    password: "nsasifabad@2025",
    displayName: "Sri Deepak Tewari",
    role: "additional_collector",
    permissions: ["view_all", "edit_most", "approve_most", "create_most"]
  },
  {
    email: "dwo@asifabad.nitisetu.com",
    password: "nsasifabad@2025",
    displayName: "Dr Adepu Bhasker",
    role: "department_lead",
    permissions: ["view_department", "edit_department", "create_reports"]
  },
  {
    email: "admin@asifabad.nitisetu.com",
    password: "nsasifabad@2025",
    displayName: "Admin User",
    role: "admin",
    permissions: ["view_all", "edit_all", "approve_all", "create_all", "delete_all", "manage_users", "manage_roles"]
  },
  {
    email: "employee@asifabad.nitisetu.com",
    password: "nsasifabad@2025",
    displayName: "Sanjay Verma",
    role: "government_official",
    permissions: ["view_assigned", "edit_assigned", "upload_reports"]
  },
  {
    email: "contractor@asifabad.nitisetu.com",
    password: "nsasifabad@2025",
    displayName: "Rahul Mishra",
    role: "external_worker",
    permissions: ["view_limited", "upload_reports"]
  }
];

// This should match the __app_id used in your frontend's AuthProvider
const appId = "default-app-id"; 

async function populateFirebaseUsers() {
  console.log("Starting user population...");
  for (const userData of usersToPopulate) {
    try {
      let userRecord;
      try {
        // Try to get user by email first to avoid creating duplicates if script is run multiple times
        userRecord = await auth.getUserByEmail(userData.email);
        console.log(`User ${userData.email} already exists. Updating profile.`);
      } catch (error) {
        // If user does not exist, create them
        if (error.code === 'auth/user-not-found') {
          userRecord = await auth.createUser({
            email: userData.email,
            password: userData.password,
            displayName: userData.displayName,
            emailVerified: true // Set to true if you want them pre-verified
          });
          console.log(`Successfully created user: <span class="math-inline">\{userRecord\.uid\} \(</span>{userData.email})`);
        } else {
          throw error; // Re-throw other errors
        }
      }

      // Store/update user profile (role and permissions) in Firestore
      // Path: artifacts/{appId}/users/{userRecord.uid}/profile/data
      const userDocRef = db.doc(`artifacts/<span class="math-inline">\{appId\}/users/</span>{userRecord.uid}/profile/data`);
      await userDocRef.set({
        uid: userRecord.uid,
        email: userData.email,
        displayName: userData.displayName,
        role: userData.role,
        permissions: userData.permissions,
        createdAt: admin.firestore.FieldValue.serverTimestamp(), // Set or update timestamp
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true }); // Use merge: true to avoid overwriting existing fields

      console.log(`Successfully set/updated Firestore profile for: ${userRecord.uid}`);

    } catch (error) {
      console.error(`Error populating/updating user ${userData.email}:`, error.message);
    }
  }
  console.log("User population process completed.");
}

populateFirebaseUsers().catch(console.error);