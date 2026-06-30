import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

export const registerUser = async (email, password, role) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Send verification email
  await sendEmailVerification(userCredential.user);

  // Save user data in Firestore
  await setDoc(doc(db, "users", userCredential.user.uid), {
    email,
    role,
    createdAt: new Date(),
  });

  // Sign out immediately so they must verify and log in again
  await signOut(auth);

  return userCredential;
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};
