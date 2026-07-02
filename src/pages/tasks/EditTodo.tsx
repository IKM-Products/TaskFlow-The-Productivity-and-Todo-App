import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, Link } from "react-router";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Flag,
  Save,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { todoSchema, type TodoFormData } from "@/schemas/todoSchema";
import type { Todo } from "@/types/todo";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getTodoStorageKey } from "@/lib/storageKeys";

export default function EditTodo() {
  const STORAGE_KEY = getTodoStorageKey();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    const todos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];

    const todo = todos.find((item) => item.id === id);

    if (!todo) {
      navigate("/dashboard");
      return;
    }

    reset({
      title: todo.title,
      description: todo.description ?? "",
      priority: todo.priority,
      dueDate: todo.dueDate,
      dueTime: todo.dueTime,
    });
  }, [id, navigate, reset, STORAGE_KEY]);

  const onSubmit = (data: TodoFormData) => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    const todos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...data } : todo
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));

    toast.success("Task updated successfully!", {
      description: `"${data.title}" has been updated.`,
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#10153d,#050816_45%,#020617_100%)] px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Button
          variant="outline"
          asChild
          className="mb-6 rounded-2xl border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
        >
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <section className="relative overflow-hidden rounded-[3rem] border border-cyan-400/50 bg-[#070b1f] p-8 shadow-2xl shadow-purple-950/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,#06b6d455,transparent_20%),radial-gradient(circle_at_68%_38%,#9333ea66,transparent_14%),radial-gradient(circle_at_85%_25%,#0ea5e955,transparent_18%),linear-gradient(135deg,#27115f88,#02061755,#08334488)]" />

          <div className="absolute right-0 top-0 h-full w-2/3 opacity-70">
            <div className="absolute right-16 top-20 h-40 w-[520px] rotate-[-8deg] rounded-full border border-purple-500/40 blur-[2px]" />
            <div className="absolute right-12 top-28 h-36 w-[520px] rotate-[8deg] rounded-full border border-cyan-500/30 blur-[2px]" />
          </div>

          <div className="absolute right-80 top-28 h-32 w-32 rounded-full bg-purple-600/70 blur-xl" />
          <div className="absolute bottom-0 right-52 h-52 w-52 rounded-full bg-cyan-500/50 blur-2xl" />

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/25 px-5 py-3 text-sm font-bold text-purple-100">
              <Sparkles className="h-4 w-4" />
              Update Task
            </div>

            <h1 className="text-5xl font-black tracking-tight">
              Edit your{" "}
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                to-do
              </span>
            </h1>

            <p className="mt-4 text-slate-300">
              Update task details and keep your workflow organized.
            </p>
          </div>
        </section>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 rounded-[2.5rem] border border-purple-500/40 bg-slate-900/60 p-8 shadow-xl shadow-black/30 backdrop-blur-xl"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Title
            </label>
            <Input
              {...register("title")}
              placeholder="Enter todo title"
              className="h-12 rounded-2xl border-slate-600 bg-slate-950/70 text-white placeholder:text-slate-500"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-pink-300">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Description
            </label>
            <Textarea
              {...register("description")}
              placeholder="Enter to-do description"
              className="min-h-32 rounded-2xl border-slate-600 bg-slate-950/70 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Flag className="h-4 w-4 text-pink-300" />
                Priority
              </label>
              <select
                {...register("priority")}
                className="h-12 w-full rounded-2xl border border-slate-600 bg-slate-950/70 px-4 text-white outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
                <CalendarDays className="h-4 w-4 text-cyan-300" />
                Due Date
              </label>
              <Input
                type="date"
                {...register("dueDate")}
                className="h-12 rounded-2xl border-slate-600 bg-slate-950/70 text-white"
              />
              {errors.dueDate && (
                <p className="mt-2 text-sm text-pink-300">
                  {errors.dueDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Clock3 className="h-4 w-4 text-purple-300" />
                Due Time
              </label>
              <Input
                type="time"
                {...register("dueTime")}
                className="h-12 rounded-2xl border-slate-600 bg-slate-950/70 text-white"
              />
              {errors.dueTime && (
                <p className="mt-2 text-sm text-pink-300">
                  {errors.dueTime.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="h-14 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-400 text-lg font-bold text-white shadow-xl shadow-cyan-950/50 hover:scale-[1.01] hover:opacity-95"
          >
            <Save className="mr-2 h-5 w-5" />
            Update To-Do
          </Button>
        </form>
      </div>
    </main>
  );
}