import { CalendarDays, Clock3 } from "lucide-react";
import Navbar from "@/components/navbar";
import type { Todo } from "@/types/todo";

const STORAGE_KEY = "advanced_todos";

export default function CalendarPage() {
  const todos: Todo[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  const sortedTodos = [...todos].sort((a, b) =>
    `${a.dueDate} ${a.dueTime}`.localeCompare(`${b.dueDate} ${b.dueTime}`)
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#10153d,#050816_45%,#020617_100%)] px-4 py-10 text-white lg:pl-80">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-2 text-5xl font-black">Calendar</h1>
          <p className="mb-8 text-slate-400">View tasks by date and time.</p>

          <div className="rounded-[2.5rem] border border-cyan-400/40 bg-slate-900/60 p-8 shadow-xl backdrop-blur-xl">
            {sortedTodos.length === 0 ? (
              <p className="text-slate-400">No scheduled tasks yet.</p>
            ) : (
              <div className="grid gap-4">
                {sortedTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="rounded-3xl border border-white/10 bg-slate-950/70 p-5"
                  >
                    <h2 className="text-2xl font-bold">{todo.title}</h2>
                    <p className="mt-2 text-slate-400">{todo.description}</p>

                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                      <span className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-300">
                        <CalendarDays className="h-4 w-4" />
                        {todo.dueDate}
                      </span>

                      <span className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-purple-300">
                        <Clock3 className="h-4 w-4" />
                        {todo.dueTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}