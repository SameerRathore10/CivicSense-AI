import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

export const registerUser = async (email, password, role) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await setDoc(doc(db, "users", userCredential.user.uid), {
    email,
    role,
    createdAt: new Date(),
  });

  return userCredential;
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};
