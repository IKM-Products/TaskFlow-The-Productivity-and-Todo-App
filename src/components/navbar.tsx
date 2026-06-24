
import { Link, useLocation } from "react-router";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Home,
  ListTodo,
  Moon,
  Settings,
  Sun,
} from "lucide-react";

export default function Navbar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-800 bg-slate-950/80 p-6 text-white backdrop-blur-xl lg:block">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-cyan-400 shadow-lg shadow-purple-900/40">
          <CheckCircle2 className="h-7 w-7" />
        </div>

        <div>
          <h1 className="text-2xl font-black">TaskFlow</h1>
          <p className="text-xs text-slate-400">
            Productivity Dashboard
          </p>
        </div>
      </div>

      <nav className="space-y-3">
        <NavItem to="/" icon={<Home />} label="Dashboard" />
        <NavItem to="/tasks" icon={<ListTodo />} label="All Tasks" />
        <NavItem to="/calendar" icon={<CalendarDays />} label="Calendar" />
        <NavItem to="/stats" icon={<BarChart3 />} label="Stats" />
        <NavItem to="/settings" icon={<Settings />} label="Settings" />
      </nav>

      <div className="absolute bottom-28 left-6 right-6 border-t border-slate-800 pt-8">
        <div className="flex items-center justify-center gap-5">
          <Sun className="h-5 w-5 text-slate-400" />

          <div className="h-7 w-14 rounded-full bg-linear-to-r from-purple-600 to-cyan-400 p-1">
            <div className="ml-auto h-5 w-5 rounded-full bg-white" />
          </div>

          <Moon className="h-5 w-5 text-slate-400" />
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-purple-600 to-cyan-400 font-bold text-white">
            A
          </div>

          <div>
            <p className="font-semibold">Admin</p>
            <p className="text-xs text-slate-400">
              admin@example.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  const location = useLocation();

  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-4 rounded-2xl px-4 py-3 font-medium transition-all duration-300 ${
        active
          ? "border border-cyan-500/20 bg-linear-to-r from-purple-600/30 to-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-950/20"
          : "text-slate-400 hover:bg-slate-900 hover:text-white"
      }`}
    >
      <span className="h-5 w-5">{icon}</span>
      {label}
    </Link>
  );
}

