import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG_pLWqe57w9owKzY9LzsS1wIIyorv4W8",
  authDomain: "civicsense-ai-713b6.firebaseapp.com",
  projectId: "civicsense-ai-713b6",
  storageBucket: "civicsense-ai-713b6.firebasestorage.app",
  messagingSenderId: "717562970364",
  appId: "1:717562970364:web:1fa8c68c3b26e8a829d779",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
