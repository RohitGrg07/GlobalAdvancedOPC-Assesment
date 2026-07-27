import { useState, FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { KeyRound, ArrowRight, UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { UserRole } from "@/types/auth";
import { BrandLogo } from "@/components/BrandLogo";
import { PasswordInput } from "@/components/PasswordInput";

const DEMO_ADMIN = { username: "admin", password: "password" };
const DEMO_USER = { username: "demo", password: "demo123" };

export function LandingPage() {
  const { user, login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState<UserRole>("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isLoading && user) {
    return (
      <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />
    );
  }

  const fillAdmin = () => {
    setLoginType("admin");
    setUsername(DEMO_ADMIN.username);
    setPassword(DEMO_ADMIN.password);
  };

  const fillDemoUser = () => {
    setLoginType("user");
    setUsername(DEMO_USER.username);
    setPassword(DEMO_USER.password);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(username, password, loginType);
      navigate(loginType === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      toast({
        title: "Authentication failed",
        description: err instanceof Error ? err.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="relative lg:w-1/2 min-h-[40vh] lg:min-h-screen bg-neutral-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between h-full p-8 lg:p-12">
          <BrandLogo
            size="sm"
            className="[&_span]:text-white [&_span]:text-base"
          />

          <div className="py-12 lg:py-0">
            <p className="font-mono text-xs text-neutral-400 mb-4 tracking-wider"></p>
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-6">
              Find your
              <br />
              <span className="text-orange-500">dream job.</span>
            </h1>
            <p className="text-neutral-300 text-sm lg:text-base max-w-md leading-relaxed">
              Browse curated listings, apply with confidence, and manage
              opportunities — powered by a modern job command center built for
              professionals and admins alike.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 min-h-screen bg-[#F9F9F7] flex flex-col justify-center px-8 lg:px-16 py-12">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8 lg:hidden">
            <BrandLogo />
          </div>

          <p className="font-mono text-xs text-neutral-400 mb-2 tracking-wider"></p>
          <h2 className="font-serif text-4xl text-black mb-2">Sign in</h2>
          <p className="text-neutral-500 text-sm mb-8"></p>

          <div className="flex gap-1 mb-8 p-1 bg-neutral-200/60 rounded-sm">
            <button
              type="button"
              onClick={() => setLoginType("user")}
              className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                loginType === "user"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setLoginType("admin")}
              className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                loginType === "admin"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Admin
            </button>
          </div>

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
                placeholder={loginType === "admin" ? "admin" : "demo"}
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
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white font-mono text-xs uppercase tracking-widest py-4 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? "ENTERING..." : "ENTER SYSTEM"}
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {loginType === "admin" && (
            <>
              <button
                type="button"
                onClick={fillAdmin}
                className="mt-6 w-full border border-dashed border-neutral-300 bg-neutral-50 hover:bg-neutral-100 transition-colors p-4 text-left group"
              >
                <div className="flex items-start gap-3">
                  <KeyRound className="w-4 h-4 text-neutral-400 mt-0.5 group-hover:text-orange-500 transition-colors" />
                  <div>
                    <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                      // ADMIN ACCESS PORTAL
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Click to auto-fill admin credentials
                    </p>
                  </div>
                </div>
              </button>

              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-sm">
                <p className="font-mono text-[10px] text-amber-700 uppercase tracking-wider mb-2">
                  // Demo Admin Credentials
                </p>
                <p className="text-sm text-amber-900">
                  Username:{" "}
                  <span className="font-semibold">{DEMO_ADMIN.username}</span>
                </p>
                <p className="text-sm text-amber-900">
                  Password:{" "}
                  <span className="font-semibold">{DEMO_ADMIN.password}</span>
                </p>
              </div>
            </>
          )}

          {loginType === "user" && (
            <>
              <button
                type="button"
                onClick={fillDemoUser}
                className="mt-6 w-full border border-dashed border-neutral-300 bg-neutral-50 hover:bg-neutral-100 transition-colors p-4 text-left group"
              >
                <div className="flex items-start gap-3">
                  <UserRound className="w-4 h-4 text-neutral-400 mt-0.5 group-hover:text-orange-500 transition-colors" />
                  <div>
                    <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                      // DEMO USER PORTAL
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Click to auto-fill demo user credentials
                    </p>
                  </div>
                </div>
              </button>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-sm">
                <p className="font-mono text-[10px] text-blue-700 uppercase tracking-wider mb-2">
                  // Demo User Credentials
                </p>
                <p className="text-sm text-blue-900">
                  Username:{" "}
                  <span className="font-semibold">{DEMO_USER.username}</span>
                </p>
                <p className="text-sm text-blue-900">
                  Password:{" "}
                  <span className="font-semibold">{DEMO_USER.password}</span>
                </p>
              </div>

              <p className="mt-6 text-sm text-neutral-500">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-black font-medium underline underline-offset-4 hover:text-orange-600 transition-colors"
                >
                  Create account
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
