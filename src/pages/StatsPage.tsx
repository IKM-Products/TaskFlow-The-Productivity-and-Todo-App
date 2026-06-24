import {
  BarChart3,
  CheckCircle2,
  Clock,
  Flag,
  ListTodo,
} from "lucide-react";
import Navbar from "@/components/navbar";
import type { Todo } from "@/types/todo";

const STORAGE_KEY = "advanced_todos";

export default function StatsPage() {
  const todos: Todo[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  const completed = todos.filter((todo) => todo.completed).length;
  const active = todos.length - completed;
  const highPriority = todos.filter((todo) => todo.priority === "high").length;

  const completionRate =
    todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#10153d,#050816_45%,#020617_100%)] px-4 py-10 text-white lg:pl-80">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-2 text-5xl font-black">Stats</h1>
          <p className="mb-8 text-slate-400">
            Track your productivity progress.
          </p>

          <div className="grid gap-5 md:grid-cols-4">
            <StatCard icon={<ListTodo />} label="Total Tasks" value={todos.length} />
            <StatCard icon={<Clock />} label="Active Tasks" value={active} />
            <StatCard icon={<CheckCircle2 />} label="Completed" value={completed} />
            <StatCard icon={<Flag />} label="High Priority" value={highPriority} />
          </div>

          <div className="mt-8 rounded-[2.5rem] border border-cyan-400/40 bg-slate-900/60 p-8 shadow-xl backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <BarChart3 className="h-7 w-7 text-cyan-300" />
              <h2 className="text-2xl font-bold">Completion Rate</h2>
            </div>

            <div className="h-5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-400"
                style={{ width: `${completionRate}%` }}
              />
            </div>

            <p className="mt-4 text-3xl font-black">{completionRate}%</p>
          </div>
        </div>
      </main>
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[2rem] border border-purple-500/40 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
        {icon}
      </div>

      <p className="text-4xl font-black">{value}</p>
      <p className="mt-1 text-slate-400">{label}</p>
    </div>
  );
}