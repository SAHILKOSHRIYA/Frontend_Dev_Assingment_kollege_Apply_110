import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  Mail,
  Lock,
  LogIn,
  ShieldCheck,
  CircleUserRound,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate(user.isAdmin ? "/admin/payout" : "/dashboard");
    }
  }, [navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      const isAdmin = user.email.toLowerCase() === "admin@gmail.com";
      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, isAdmin })
      );
      toast.success("Login successful!");
      navigate(isAdmin ? "/admin/payout" : "/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
      toast.error("Login failed. Check credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isAdmin = user.email.toLowerCase() === "admin@gmail.com";
      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, isAdmin })
      );
      toast.success("Google login successful!");
      navigate(isAdmin ? "/admin/payout" : "/dashboard");
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed");
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-slate-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white text-center flex flex-col items-center gap-2">
          <ShieldCheck size={36} />
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
          <p className="text-sm text-indigo-100">
            Secure access to your dashboard
          </p>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8">
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
            >
              <LogIn size={18} /> Login
            </button>
          </form>

          {/* Separator */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-lg shadow-sm hover:shadow-md text-gray-700"
          >
            <CircleUserRound size={20} className="text-red-500" />
            Sign in with Google
          </button>
        </div>

        {/* Footer */}
        <div className="bg-indigo-50 text-center p-4 text-sm text-gray-500">
          <Sparkles size={16} className="inline-block mr-1 text-indigo-400" />
          Built with ❤️ for creators
        </div>
      </div>
    </div>
  );
}
