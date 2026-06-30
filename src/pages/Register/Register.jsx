import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { registerUser } from "../../services/auth";
import Button from "../../components/ui/Button";

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password, "client");

      toast.success(
        "Account created successfully. Please check your email and verify your account before logging in."
      );

      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to register.");
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-stone-900/50 backdrop-blur-xl rounded-2xl border border-stone-800 p-8 shadow-2xl shadow-green-900/10">
        <h1 className="text-3xl font-bold text-stone-100 text-center mb-2">
          Create Account
        </h1>
        <p className="text-stone-400 text-center mb-8">
          Join CivicSense AI today
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            {isSubmitting ? "Creating..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-stone-400 mt-6">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-green-500 ml-2 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
