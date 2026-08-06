import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Loader2 } from "lucide-react";

function AdminLogin() {
  const { login, loginError, loginLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-card-bg/30 border border-border/10 rounded-md p-8 w-full max-w-sm shadow-2xl"
      >
        <h1 className="font-body text-xl font-semibold text-stone-900 mb-6">
          Admin Login
        </h1>

        <label className="block text-sm font-medium text-stone-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-stone-500 rounded-md px-3 py-2 mb-4 text-stone-900"
          required
        />

        <label className="block text-sm font-medium text-stone-700 mb-1">
          Password
        </label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-stone-500 rounded-md px-3 py-2 pr-10 text-stone-900"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-800 cursor-pointer"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {loginError && (
          <p className="text-red-600 text-sm mb-4">{loginError}</p>
        )}

        <button
          type="submit"
          disabled={loginLoading}
          className="w-full bg-btn-primary text-white py-2.5 rounded-md font-medium cursor-pointer hover:bg-[#B99680] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          {loginLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Logging in...
            </>
          ) : (
            "Log In"
          )}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
