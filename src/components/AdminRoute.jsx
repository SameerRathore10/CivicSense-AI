import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (
          userDoc.exists() &&
          userDoc.data().role === "admin"
        ) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;