import { ReactNode, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { FileText, Layout, LogOut, Home, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import aswaqLogo from "@/assets/aswaq-logo.png";

const navItems = [
  { label: "Blog Articles", path: "/admin", icon: FileText },
  { label: "Page Content", path: "/admin/pages", icon: Layout },
  { label: "Users", path: "/admin/users", icon: Users },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen flex bg-secondary">
      {/* Sidebar */}
      <aside className="w-60 bg-card border-r border-border flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <img src={aswaqLogo} alt="ASWAQ" className="h-8" />
          <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-foreground hover:bg-muted transition-colors">
            <Home size={16} /> View Site
          </a>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8 max-w-5xl">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
