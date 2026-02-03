import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration interface
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Get Firebase config from environment variables
const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// Initialize Firebase (singleton pattern)
let app: FirebaseApp;
let db: Firestore;
let storage: FirebaseStorage;

// Check if all required config values are present and not undefined
const isConfigValid = Object.entries(firebaseConfig).every(
  ([, value]) => value !== '' && value !== undefined
);

if (!isConfigValid) {
  const missingVars = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => `NEXT_PUBLIC_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`)
    .join(', ');
  console.warn(`Firebase configuration is incomplete. Missing: ${missingVars}. Using mock data.`);
}

if (isConfigValid) {
  // Initialize Firebase only if config is valid
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  // Initialize Firestore
  db = getFirestore(app);

  // Initialize Storage
  storage = getStorage(app);
} else {
  console.warn('Firebase configuration is incomplete. Using mock data.');
}

export { app, db, storage, isConfigValid };
