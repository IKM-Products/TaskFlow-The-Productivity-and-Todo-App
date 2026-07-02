import {
  Activity,
  BarChart3,
  CheckCircle2,
  Clock,
  Flag,
  ListTodo,
  TrendingUp,
} from "lucide-react";

import { getTodoStorageKey } from "@/lib/storageKeys";
import Navbar from "@/components/navbar";
import type { Todo } from "@/types/todo";



export default function StatsPage() {
  const STORAGE_KEY = getTodoStorageKey();
  const todos: Todo[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  const completed = todos.filter((todo) => todo.completed).length;
  const active = todos.length - completed;
  const highPriority = todos.filter((todo) => todo.priority === "high").length;
  const mediumPriority = todos.filter((todo) => todo.priority === "medium").length;
  const lowPriority = todos.filter((todo) => todo.priority === "low").length;

  const completionRate =
    todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#10153d,#050816_45%,#020617_100%)] px-4 py-10 text-white lg:pl-80">
        <div className="mx-auto max-w-7xl">
          <section className="relative mb-8 overflow-hidden rounded-[3rem] border border-cyan-400/50 bg-[#070b1f] p-8 shadow-2xl shadow-purple-950/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,#06b6d455,transparent_20%),radial-gradient(circle_at_68%_38%,#9333ea66,transparent_14%),linear-gradient(135deg,#27115f88,#02061755,#08334488)]" />

            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/25 px-5 py-3 text-sm font-bold text-purple-100">
                <BarChart3 className="h-4 w-4" />
                Productivity Analytics
              </div>

              <h1 className="text-5xl font-black">
                Productivity{" "}
                <span className="bg-linear-to-r from-purple-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  Statistics
                </span>
              </h1>

              <p className="mt-4 text-slate-300">
                Track your progress and monitor your daily productivity.
              </p>
            </div>
          </section>

          <section className="mb-8 grid gap-5 md:grid-cols-4">
            <StatCard icon={<ListTodo />} label="Total Tasks" value={todos.length} color="purple" />
            <StatCard icon={<Clock />} label="Active Tasks" value={active} color="cyan" />
            <StatCard icon={<CheckCircle2 />} label="Completed" value={completed} color="emerald" />
            <StatCard icon={<Flag />} label="High Priority" value={highPriority} color="pink" />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2.5rem] border border-cyan-400/40 bg-slate-900/60 p-8 shadow-xl backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-3">
                <TrendingUp className="h-7 w-7 text-cyan-300" />
                <h2 className="text-2xl font-bold">Completion Progress</h2>
              </div>

              <div className="mb-4 flex items-end justify-between">
                <p className="text-5xl font-black">{completionRate}%</p>
                <p className="text-slate-400">Completed</p>
              </div>

              <div className="h-5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-linear-to-r from-purple-600 to-cyan-400"
                  style={{ width: `${completionRate}%` }}
                />
              </div>

              <p className="mt-5 text-slate-400">
                {completed} of {todos.length} tasks completed.
              </p>
            </div>

            <div className="rounded-[2.5rem] border border-purple-500/40 bg-slate-900/60 p-8 shadow-xl backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-3">
                <Activity className="h-7 w-7 text-purple-300" />
                <h2 className="text-2xl font-bold">Priority Distribution</h2>
              </div>

              <PriorityRow label="Low Priority" value={lowPriority} color="emerald" />
              <PriorityRow label="Medium Priority" value={mediumPriority} color="amber" />
              <PriorityRow label="High Priority" value={highPriority} color="pink" />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "purple" | "cyan" | "emerald" | "pink";
}) {
  const colors = {
    purple: "border-purple-500/50 text-purple-300 shadow-purple-950/40",
    cyan: "border-cyan-500/50 text-cyan-300 shadow-cyan-950/40",
    emerald: "border-emerald-500/50 text-emerald-300 shadow-emerald-950/40",
    pink: "border-pink-500/50 text-pink-300 shadow-pink-950/40",
  };

  return (
    <div
      className={`rounded-4xl border bg-slate-900/60 p-7 shadow-xl backdrop-blur-xl ${colors[color]}`}
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-current/10">
        {icon}
      </div>

      <p className="text-4xl font-black text-white">{value}</p>
      <p className="mt-1 text-base text-slate-300">{label}</p>
    </div>
  );
}

function PriorityRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "emerald" | "amber" | "pink";
}) {
  const colors = {
    emerald: "bg-emerald-500 text-emerald-300",
    amber: "bg-amber-500 text-amber-300",
    pink: "bg-pink-500 text-pink-300",
  };

  return (
    <div className="mb-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`h-3 w-3 rounded-full ${colors[color].split(" ")[0]}`} />
          <p className="font-semibold">{label}</p>
        </div>

        <p className={colors[color].split(" ")[1]}>{value} Tasks</p>
      </div>
    </div>
  );
}