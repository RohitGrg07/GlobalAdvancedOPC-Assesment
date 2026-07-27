import { useState, FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { BrandLogo } from "@/components/BrandLogo";
import { PasswordInput } from "@/components/PasswordInput";

export function RegisterPage() {
  const { user, register, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isLoading && user) {
    return (
      <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Validation error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Validation error",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      await register(username, password);
      toast({
        title: "Account created",
        description: "Welcome to Global Advance OPC Job Board.",
      });
      navigate("/dashboard");
    } catch (err) {
      toast({
        title: "Registration failed",
        description:
          err instanceof Error ? err.message : "Could not create account",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="relative lg:w-1/2 min-h-[30vh] lg:min-h-screen bg-neutral-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
        <div className="relative z-10 flex flex-col justify-between h-full p-8 lg:p-12">
          <BrandLogo
            size="sm"
            className="[&_span]:text-white [&_span]:text-base"
          />
          <div>
            <p className="font-mono text-xs text-neutral-400 mb-4 tracking-wider">
              // USER ONBOARDING
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl text-white leading-tight">
              Join the
              <br />
              <span className="text-orange-500">workforce.</span>
            </h1>
          </div>
          <div />
        </div>
      </div>

      <div className="lg:w-1/2 min-h-screen bg-[#F9F9F7] flex flex-col justify-center px-8 lg:px-16 py-12">
        <div className="max-w-md w-full mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1 font-mono text-xs text-neutral-400 hover:text-black mb-8 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to sign in
          </Link>

          <p className="font-mono text-xs text-neutral-400 mb-2 tracking-wider">
            // CREATE ACCOUNT
          </p>
          <h2 className="font-serif text-4xl text-black mb-2">Register</h2>
          <p className="text-neutral-500 text-sm mb-8">
            Create a user account to browse and explore job listings.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-100 border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                placeholder="choose a username"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="min. 6 characters"
                required
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-2">
                Confirm Password
              </label>
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="repeat password"
                required
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white font-mono text-xs uppercase tracking-widest py-4 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? "CREATING..." : "CREATE ACCOUNT"}
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="mt-8 font-mono text-[10px] text-neutral-400">
            // Admin accounts cannot be created here.
          </p>
        </div>
      </div>
    </div>
  );
}
