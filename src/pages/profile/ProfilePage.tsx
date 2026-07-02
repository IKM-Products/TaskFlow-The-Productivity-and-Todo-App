import { Link } from "react-router";
import Navbar from "@/components/navbar";
import {
  Mail,
  Calendar,
  CheckCircle2,
  ListTodo,
  Pencil,
} from "lucide-react";

import { getTodoStorageKey } from "@/lib/storageKeys";
import { Button } from "@/components/ui/button";
import type { Todo } from "@/types/todo";

const CURRENT_USER_KEY = "taskflow_current_user";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "{}");

  const STORAGE_KEY = getTodoStorageKey();
  const todos: Todo[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  const name = user.name || "User";
  const email = user.email || "user@example.com";
  const avatar = user.avatar || "";
  const initial = name.charAt(0).toUpperCase();

  const completedTasks = todos.filter((todo) => todo.completed).length;

  const joinedDate = user.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#10153d,#050816_45%,#020617_100%)] px-4 py-10 text-white lg:pl-80">
        <div className="mx-auto max-w-6xl">
          <section className="relative mb-8 overflow-hidden rounded-[3rem] border border-cyan-400/50 bg-[#070b1f] p-10 shadow-2xl shadow-purple-950/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,#06b6d455,transparent_20%),radial-gradient(circle_at_68%_38%,#9333ea66,transparent_14%),linear-gradient(135deg,#27115f88,#02061755,#08334488)]" />

            <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center">
              <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-[2.5rem] bg-linear-to-br from-purple-600 to-cyan-400 text-6xl font-black shadow-xl">
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

              <div>
                <h1 className="text-5xl font-black">{name}</h1>
                <p className="mt-3 text-slate-300">TaskFlow User</p>

                <Button
                  asChild
                  className="mt-6 rounded-4xl bg-linear-to-r from-purple-600 to-cyan-400"
                >
                  <Link to="/profile/edit">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <InfoCard icon={<Mail />} title="Email" value={email} />
            <InfoCard icon={<Calendar />} title="Joined" value={joinedDate} />
            <InfoCard
              icon={<ListTodo />}
              title="Total Tasks"
              value={`${todos.length}`}
            />
            <InfoCard
              icon={<CheckCircle2 />}
              title="Completed Tasks"
              value={`${completedTasks}`}
            />
          </div>
        </div>
      </main>
    </>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-4xl border border-cyan-500/30 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300">
        {icon}
      </div>

      <p className="text-slate-400">{title}</p>
      <h2 className="mt-2 text-2xl font-bold">{value}</h2>
    </div>
  );
}