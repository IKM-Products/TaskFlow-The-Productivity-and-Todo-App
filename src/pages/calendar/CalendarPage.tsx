import { useState } from "react";
import Navbar from "@/components/navbar";
import { getTodoStorageKey } from "@/lib/storageKeys";
import { Calendar as BigCalendar, momentLocalizer, type View } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/calendar.css";

import type { Todo } from "@/types/todo";
import { Calendar as CalendarIcon, CalendarDays } from "lucide-react";

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const STORAGE_KEY = getTodoStorageKey();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("month");

  const todos: Todo[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  const events = todos.map((todo) => ({
    title: todo.title,
    start: new Date(`${todo.dueDate}T${todo.dueTime || "00:00"}`),
    end: new Date(`${todo.dueDate}T${todo.dueTime || "00:00"}`),
    allDay: false,
  }));

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#10153d,#050816_45%,#020617_100%)] px-4 py-10 text-white lg:pl-80">
        <div className="mx-auto max-w-7xl">
          <section className="relative mb-8 overflow-hidden rounded-[3rem] border border-cyan-400/50 bg-[#070b1f] p-8 shadow-2xl shadow-purple-950/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,#06b6d455,transparent_20%),radial-gradient(circle_at_68%_38%,#9333ea66,transparent_14%),linear-gradient(135deg,#27115f88,#02061755,#08334488)]" />

            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/25 px-5 py-3 text-sm font-bold text-purple-100">
                <CalendarIcon className="h-4 w-4" />
                Calendar View
              </div>

              <h1 className="text-5xl font-black">
                Task{" "}
                <span className="bg-linear-to-r from-purple-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  Calendar
                </span>
              </h1>

              <p className="mt-4 text-slate-300">
                Organize your schedule visually using monthly, weekly, and daily views.
              </p>
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-cyan-400/40 bg-slate-900/60 p-8 shadow-xl backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <CalendarDays className="h-7 w-7 text-cyan-300" />
              <h2 className="text-2xl font-bold">Monthly Schedule</h2>
            </div>

            <div className="overflow-hidden rounded-4xl border border-white/10 bg-slate-950/70 p-4">
              <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={["month", "week", "day", "agenda"]}
                date={date}
                view={view}
                onNavigate={(newDate) => setDate(newDate)}
                onView={(newView) => setView(newView)}
                popup
                selectable
                style={{ height: 720 }}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}