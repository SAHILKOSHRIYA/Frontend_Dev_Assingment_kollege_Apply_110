import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import {
  Users,
  Newspaper,
  LogOut,
  ShieldCheck,
  FileText,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";

import useTheme from "../hooks/useTheme";

const AdminPanel = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    if (!user?.isAdmin) navigate("/");
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    { to: "/admin/payout", label: "Payout Calc", icon: <FileText size={18} /> },
    { to: "/admin/users", label: "Manage Users", icon: <Users size={18} /> },
    { to: "/admin/news", label: "Manage News", icon: <Newspaper size={18} /> },
  ];

  const SidebarContent = () => (
    <div className="space-y-10 flex-grow mt-10">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
        <ShieldCheck size={24} /> Admin Panel
      </h2>
      <section
        className="flex items-center gap-4 md:flex-col md:items-center md:text-center p-4 rounded-xl border-l-4 border-indigo-500 shadow"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        <img
          src="/img.jpg"
          alt="User Avatar"
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow"
        />
        <div className="flex-1 md:flex-none">
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--text-main)" }}
          >
            {user?.name || "Admin"}
          </h3>
          <p
            className="text-sm break-all"
            style={{ color: "var(--text-subtle)" }}
          >
            {user?.email || "johndoe@example.com"}
          </p>
          <span className="mt-1 inline-block text-xs px-2 py-1 bg-white border border-indigo-200 text-indigo-600 rounded-full dark:bg-gray-800 dark:border-gray-600 dark:text-indigo-300">
            Role: {user?.role || "Admin"}
          </span>
        </div>
      </section>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all font-medium ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-white"
                  : "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-3">
  <button
    onClick={toggle}
    className="w-full bg-indigo-100 dark:bg-gray-700 hover:bg-indigo-200 dark:hover:bg-gray-600 py-2 rounded-xl text-indigo-600 dark:text-white font-semibold shadow-md transition-all"
  >
    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
  </button>

  <button
    onClick={handleLogout}
    className="flex items-center justify-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all w-full"
  >
    <LogOut size={18} />
    Logout
  </button>
</div>

    </div>
  );

  return (
    <div
      className="flex flex-col md:flex-row h-screen overflow-hidden relative"
      style={{ backgroundColor: "var(--bg-main)", color: "var(--text-main)" }}
    >
      <div
        className="md:hidden flex items-center justify-between p-4 shadow z-50"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        <h1 className="text-xl font-bold text-indigo-600">🛡️ Admin Panel</h1>
        <button
          className="text-gray-800 dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-color)",
        }}
        className={`fixed md:static top-0 left-0 h-full w-64 border-r shadow-lg z-40 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 p-6 flex flex-col`}
      >
        <SidebarContent />
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
