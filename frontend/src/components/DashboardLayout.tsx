import { ReactNode } from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '@/components/BrandLogo';

type DashboardLayoutProps = {
  title: string;
  subtitle: string;
  role: 'admin' | 'user';
  children: ReactNode;
};

export function DashboardLayout({ title, subtitle, role, children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <BrandLogo />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600 capitalize">{user?.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">
            {role === 'user' ? 'Job Listings' : 'Job Management'}
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-500 text-sm">{subtitle}</p>
        </div>
        {children}
      </main>
    </div>
  );
}
