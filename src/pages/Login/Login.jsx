import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";

import { db, auth } from "../../firebase/firebase";
import { loginUser } from "../../services/auth";
import Button from "../../components/ui/Button";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);

      const user = auth.currentUser;
      await user.reload();

      if (!user.emailVerified) {
        toast.error(
          "Please verify your email before logging in. Check your inbox."
        );
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        toast.error("User profile not found.");
        return;
      }

      const role = userDoc.data().role;

      toast.success("Login successful!");

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Failed to login. Please check your credentials."
      );
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-stone-900/50 backdrop-blur-xl rounded-2xl border border-stone-800 p-8 shadow-2xl shadow-green-900/10">
        <h1 className="text-3xl font-bold text-stone-100 text-center">
          Welcome Back 👋
        </h1>

        <p className="text-stone-400 text-center mt-2">
          Login to continue using CivicSense AI
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full bg-stone-950/50 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full bg-stone-950/50 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-stone-400 mt-6">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-green-500 ml-2 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
