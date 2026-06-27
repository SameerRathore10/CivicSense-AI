import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(email, password, role);

      alert("✅ Account created successfully! Please login.");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      {" "}
      <form
        onSubmit={handleRegister}
        className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md"
      >
        {" "}
        <h1 className="text-3xl font-bold text-white mb-6">Create Account </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4 outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4 outline-none"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-6 outline-none"
        >
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
