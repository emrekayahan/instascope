import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Firestore Lite: sadece REST API kullanır, WebSocket/gRPC Listen stream açmaz
// realtimeUpdatesMode: DISABLED olan veritabanlarında server-side için gerekli
import { getFirestore as getFirestoreLite } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'mock-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'mock-auth-domain',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'instascope-aba22',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mock-storage-bucket',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'mock-sender-id',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'mock-app-id',
};

// Initialize Firebase for SSR compatibility
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Tam Firestore (client-side real-time listener'lar için)
const db = getFirestore(app, 'instascope');

// Firestore Lite (server-side / SSR için — REST API, Listen stream yok)
const dbLite = getFirestoreLite(app, 'instascope');

export { auth, googleProvider, db, dbLite };
