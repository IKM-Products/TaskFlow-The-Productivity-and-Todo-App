import { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "@/components/navbar";
import {
  CheckCircle2,
  Clock,
  Flag,
  ListTodo,
  Plus,
  Search,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

import { getTodoStorageKey } from "@/lib/storageKeys";
import TodoCard from "@/components/TodoCard";
import type { Todo } from "@/types/todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NOTIFIED_KEY = "notified_todos";

export default function TodoList() {
  const STORAGE_KEY = getTodoStorageKey();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    setTodos(savedTodos ? JSON.parse(savedTodos) : []);
  }, []);

  useEffect(() => {
    const checkNotifications = () => {
      if (!("Notification" in window)) return;
      if (Notification.permission !== "granted") return;

      const savedTodos = localStorage.getItem(STORAGE_KEY);
      const currentTodos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];

      const notifiedTodos: string[] = JSON.parse(
        localStorage.getItem(NOTIFIED_KEY) || "[]"
      );

      const now = new Date();

      currentTodos.forEach((todo) => {
        if (!todo.dueDate || !todo.dueTime || todo.completed) return;

        const todoDateTime = new Date(`${todo.dueDate}T${todo.dueTime}`);
        const difference = todoDateTime.getTime() - now.getTime();

        const shouldNotify =
          difference > 0 &&
          difference <= 60 * 1000 &&
          !notifiedTodos.includes(todo.id);

        if (shouldNotify) {
          new Notification("TaskFlow Reminder", {
            body: `"${todo.title}" is due soon.`,
          });

          localStorage.setItem(
            NOTIFIED_KEY,
            JSON.stringify([...notifiedTodos, todo.id])
          );
        }
      });
    };

    checkNotifications();

    const interval = setInterval(checkNotifications, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  const saveTodos = (updatedTodos: Todo[]) => {
    setTodos(updatedTodos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id: string) => {
    saveTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    saveTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;
  const highPriorityCount = todos.filter(
    (todo) => todo.priority === "high"
  ).length;

  const filteredTodos = todos.filter((todo) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      todo.title.toLowerCase().includes(keyword) ||
      todo.description?.toLowerCase().includes(keyword);

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#10153d,#050816_45%,#020617_100%)] px-4 py-10 text-white lg:pl-80">
        <div className="mx-auto max-w-7xl">
          <section className="relative mb-8 overflow-hidden rounded-[3rem] border border-cyan-400/50 bg-[#070b1f] p-10 shadow-2xl shadow-purple-950/50">
            <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_75%_70%,#06b6d455,transparent_20%),radial-gradient(circle_at_68%_38%,#9333ea66,transparent_14%),radial-gradient(circle_at_85%_25%,#0ea5e955,transparent_18%),linear-gradient(135deg,#27115f88,#02061755,#08334488)]" />

            <div className="absolute right-0 top-0 h-full w-2/3 opacity-70">
              <div className="absolute right-16 top-20 h-40 w-130 rotate-[-8deg] rounded-[999px] border border-purple-500/40 blur-[2px]" />
              <div className="absolute right-12 top-28 h-36 w-130 rotate-[8deg] rounded-[999px] border border-cyan-500/30 blur-[2px]" />
              <div className="absolute right-28 top-36 h-28 w-115 rotate-15 rounded-[999px] border border-purple-500/25 blur-[2px]" />
            </div>

            <div className="absolute right-80 top-28 h-32 w-32 rounded-[2.5rem] bg-purple-600/70 blur-xl" />
            <div className="absolute bottom-0 right-52 h-52 w-52 rounded-[3rem] bg-cyan-500/50 blur-2xl" />
            <div className="absolute right-20 top-10 h-72 w-72 rounded-[3rem] bg-cyan-500/20 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-start">
              <div>
                <div className="mb-8 inline-flex items-center gap-2 rounded-4xl border border-purple-400/40 bg-purple-500/25 px-5 py-3 text-sm font-bold text-purple-100 shadow-lg shadow-purple-950/40">
                  <Sparkles className="h-4 w-4" />
                  TaskFlow Dashboard
                </div>

                <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
                  Manage your tasks{" "}
                  <span className="bg-linear-to-r from-purple-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                    beautifully
                  </span>
                </h1>

                <p className="mt-6 text-lg text-slate-300">
                  Plan your day, track progress, and complete your goals faster.
                </p>
              </div>

              <Button
                asChild
                className="h-16 rounded-4xl bg-linear-to-r from-purple-600 to-cyan-400 px-10 text-lg font-bold text-white shadow-xl shadow-cyan-950/50 hover:scale-105 hover:opacity-95"
              >
                <Link to="/add">
                  <Plus className="mr-3 h-6 w-6" />
                  Add To-Do
                </Link>
              </Button>
            </div>
          </section>

          <section className="mb-8 grid gap-5 md:grid-cols-4">
            <StatCard
              icon={<ListTodo className="h-8 w-8" />}
              value={todos.length}
              label="Total Tasks"
              color="purple"
            />

            <StatCard
              icon={<Clock className="h-8 w-8" />}
              value={activeCount}
              label="Active Tasks"
              color="cyan"
            />

            <StatCard
              icon={<CheckCircle2 className="h-8 w-8" />}
              value={completedCount}
              label="Completed Tasks"
              color="emerald"
            />

            <StatCard
              icon={<Flag className="h-8 w-8" />}
              value={highPriorityCount}
              label="High Priority"
              color="pink"
            />
          </section>

          <section className="mb-6 rounded-[2.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/30 backdrop-blur-xl">
            <div className="grid gap-4 md:grid-cols-[1fr_280px]">
              <div className="relative">
                <Search className="absolute left-5 top-4 h-6 w-6 text-slate-400" />
                <Input
                  placeholder="Search your tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-14 rounded-4xl border-slate-600 bg-slate-950/60 pl-14 text-base text-white placeholder:text-slate-400"
                />
              </div>

              <div className="relative">
                <SlidersHorizontal className="absolute left-5 top-4 h-5 w-5 text-slate-400" />
                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value as "all" | "active" | "completed")
                  }
                  className="h-14 w-full rounded-4xl border border-slate-600 bg-slate-950/60 pl-14 pr-4 text-base font-semibold text-white outline-none"
                >
                  <option value="all">All To-Dos</option>
                  <option value="active">Active To-Dos</option>
                  <option value="completed">Completed To-Dos</option>
                </select>
              </div>
            </div>
          </section>

          {filteredTodos.length === 0 ? (
            <div className="rounded-[2.5rem] border border-dashed border-purple-500/40 bg-slate-900/50 p-14 text-center backdrop-blur-xl">
              <ListTodo className="mx-auto mb-4 h-14 w-14 text-cyan-300" />
              <h2 className="text-2xl font-bold">No to-dos found</h2>
              <p className="mt-2 text-slate-400">Create your first task now.</p>
            </div>
          ) : (
            <div className="grid gap-5">
              {filteredTodos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onDelete={deleteTodo}
                  onToggle={toggleComplete}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
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
      className={`rounded-[2.5rem] border bg-slate-900/60 p-7 shadow-xl backdrop-blur-xl ${colors[color]}`}
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-current/10">
        {icon}
      </div>

      <p className="text-4xl font-black text-white">{value}</p>
      <p className="mt-1 text-base text-slate-300">{label}</p>
    </div>
  );
}