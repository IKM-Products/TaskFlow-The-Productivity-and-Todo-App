import { Link, useLocation, useNavigate } from "react-router";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Home,
  ListTodo,
  LogOut,
  Settings,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CURRENT_USER_KEY = "taskflow_current_user";
const AUTH_KEY = "taskflow_auth";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "{}");

  const name = user.name || "User";
  const email = user.email || "user@example.com";
  const avatar = user.avatar || "";
  const initial = name.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    navigate("/login", { replace: true });
  };

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-800 bg-slate-950/80 p-6 text-white backdrop-blur-xl lg:flex lg:flex-col">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-cyan-400 shadow-lg shadow-purple-900/40">
          <CheckCircle2 className="h-7 w-7" />
        </div>

        <div>
          <h1 className="text-2xl font-black">TaskFlow</h1>
          <p className="text-xs text-slate-400">Productivity Dashboard</p>
        </div>
      </div>

      <nav className="space-y-3">
        <NavItem to="/dashboard" icon={<Home />} label="Dashboard" />
        <NavItem to="/tasks" icon={<ListTodo />} label="All Tasks" />
        <NavItem to="/calendar" icon={<CalendarDays />} label="Calendar" />
        <NavItem to="/stats" icon={<BarChart3 />} label="Stats" />
        <NavItem to="/settings" icon={<Settings />} label="Settings" />
      </nav>

      <div className="mt-auto space-y-4">
        <Link
          to="/profile"
          className="block rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/40 hover:bg-slate-900"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-purple-600 to-cyan-400 text-lg font-bold text-white">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                initial
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold">{name}</p>
              <p className="truncate text-xs text-slate-400">{email}</p>
            </div>
          </div>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 font-semibold text-red-300 transition-all duration-300 hover:bg-red-500/20 hover:text-white">
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent className="max-w-md overflow-hidden rounded-4xl border border-cyan-500/30 bg-[#07111f] p-0 text-white shadow-2xl shadow-cyan-950/50">
            <div className="rounded-4xl bg-[radial-gradient(circle_at_top_right,#06b6d433,transparent_35%),radial-gradient(circle_at_bottom_left,#9333ea33,transparent_35%)] p-7">
              <AlertDialogHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
                  <LogOut className="h-7 w-7" />
                </div>

                <AlertDialogTitle className="text-3xl font-black text-white">
                  Logout?
                </AlertDialogTitle>

                <AlertDialogDescription className="mt-3 text-base leading-7 text-slate-300">
                  Are you sure you want to logout from your TaskFlow account?
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="mt-8 flex w-full flex-row justify-end gap-3 border-0 bg-transparent p-0">
                <AlertDialogCancel className="m-0 h-11 min-w-27.5 rounded-2xl border border-slate-600 bg-slate-800 px-6 font-semibold text-white hover:bg-slate-700 hover:text-white">
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleLogout}
                  className="m-0 h-11 min-w-27.5 rounded-2xl bg-linear-to-r from-red-600 to-pink-600 px-6 font-semibold text-white hover:from-red-700 hover:to-pink-700"
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
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