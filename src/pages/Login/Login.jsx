import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";

import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);

      const user = auth.currentUser;

      await user.reload();

      if (!user.emailVerified) {
        alert(
          "❌ Please verify your email before logging in. Check your inbox.",
        );
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        alert("User profile not found.");
        return;
      }

      const role = userDoc.data().role;

      alert("✅ Login successful!");

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center">
          Welcome Back 👋
        </h1>

        <p className="text-slate-400 text-center mt-2">
          Login to continue using CivicSense AI
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded-xl py-3 text-white font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-400 ml-2 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
