import { useEffect, useState } from "react";
import { History, ListTodo, Search } from "lucide-react";

import { getTodoStorageKey } from "@/lib/storageKeys";
import Navbar from "@/components/navbar";
import TodoCard from "@/components/TodoCard";
import type { Todo } from "@/types/todo";

import { Input } from "@/components/ui/input";

export default function AllTasks() {
  const STORAGE_KEY = getTodoStorageKey();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    setTodos(savedTodos ? JSON.parse(savedTodos) : []);
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

  const filteredTodos = todos.filter((todo) => {
    const keyword = search.toLowerCase();

    return (
      todo.title.toLowerCase().includes(keyword) ||
      todo.description?.toLowerCase().includes(keyword)
    );
  });

  const sortedTodos = [...filteredTodos].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#10153d,#050816_45%,#020617_100%)] px-4 py-10 text-white lg:pl-80">
        <div className="mx-auto max-w-7xl">
          <section className="relative mb-8 overflow-hidden rounded-[3rem] border border-cyan-400/50 bg-[#070b1f] p-8 shadow-2xl shadow-purple-950/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,#06b6d455,transparent_20%),radial-gradient(circle_at_68%_38%,#9333ea66,transparent_14%),linear-gradient(135deg,#27115f88,#02061755,#08334488)]" />

            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/25 px-5 py-3 text-sm font-bold text-purple-100">
                <History className="h-4 w-4" />
                Task History
              </div>

              <h1 className="text-5xl font-black">
                All{" "}
                <span className="bg-linear-to-r from-purple-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  Tasks
                </span>
              </h1>

              <p className="mt-4 text-slate-300">
                View your complete task history from newest to oldest.
              </p>
            </div>
          </section>

          <section className="mb-6 rounded-2rem border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/30 backdrop-blur-xl">
            <div className="relative">
              <Search className="absolute left-5 top-4 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search task history..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-14 rounded-1.5rem border-slate-600 bg-slate-950/70 pl-14 text-base text-white placeholder:text-slate-400"
              />
            </div>
          </section>

          {sortedTodos.length === 0 ? (
            <div className="rounded-[2.5rem] border border-dashed border-purple-500/40 bg-slate-900/50 p-14 text-center backdrop-blur-xl">
              <ListTodo className="mx-auto mb-4 h-14 w-14 text-cyan-300" />
              <h2 className="text-2xl font-bold">No task history found</h2>
              <p className="mt-2 text-slate-400">
                Your created tasks will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {sortedTodos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onDelete={deleteTodo}
                  onToggle={toggleComplete}
                  showCheckbox={false}
                  showEdit={false}
                  showStatus={false}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}