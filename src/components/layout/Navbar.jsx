import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase/firebase";
import { logoutUser } from "../../services/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();

      alert("✅ Logged out successfully");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleScrollTo = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-stone-950/80 backdrop-blur-md border-b border-green-900/50 z-[9999]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <button
          onClick={() => {
            if (window.location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              navigate("/");
            }
          }}
          className="text-2xl font-bold text-stone-100 cursor-pointer"
        >
          CivicSense <span className="text-green-500">AI</span>
        </button>

        <ul className="hidden md:flex items-center gap-8 text-stone-300">
          <li>
            <button
              onClick={() => {
                if (window.location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  navigate("/");
                }
              }}
              className="hover:text-green-400 transition cursor-pointer"
            >
              Home
            </button>
          </li>

          <li>
            <button
              onClick={() => handleScrollTo("features")}
              className="hover:text-green-400 transition cursor-pointer"
            >
              Features
            </button>
          </li>

          <li>
            <button
              onClick={() => handleScrollTo("how-it-works")}
              className="hover:text-green-400 transition cursor-pointer"
            >
              How it Works
            </button>
          </li>

          {user && (
            <li>
              <Link
                to="/my-reports"
                className="hover:text-green-400 transition cursor-pointer"
              >
                My Reports
              </Link>
            </li>
          )}
        </ul>

        {!user ? (
          <Link to="/login">
            <button className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg text-white font-semibold transition cursor-pointer">
              Login
            </button>
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
