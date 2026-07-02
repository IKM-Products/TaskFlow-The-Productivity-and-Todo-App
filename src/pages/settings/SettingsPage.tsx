import { useEffect, useState } from "react";
import { Bell, Settings2, Trash2 } from "lucide-react";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { getTodoStorageKey } from "@/lib/storageKeys";

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

const NOTIFICATION_KEY = "taskflow_notifications";

export default function SettingsPage() {
  const STORAGE_KEY = getTodoStorageKey();
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(NOTIFICATION_KEY);
    setNotifications(saved === "true");
  }, []);

  const toggleNotifications = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }

    if (!notifications) {
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        alert("Notification permission denied.");
        return;
      }

      localStorage.setItem(NOTIFICATION_KEY, "true");
      setNotifications(true);
      alert("Notifications enabled.");
      return;
    }

    localStorage.setItem(NOTIFICATION_KEY, "false");
    setNotifications(false);
    alert("Notifications disabled.");
  };

  const clearTasks = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("notified_todos");
    window.location.reload();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#10153d,#050816_45%,#020617_100%)] px-6 py-10 text-white lg:pl-80">
        <div className="mx-auto max-w-5xl">
          <section className="relative mb-10 overflow-hidden rounded-[3rem] border border-cyan-400/40 bg-[#070b1f] p-8 shadow-2xl shadow-purple-950/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#06b6d455,transparent_20%),radial-gradient(circle_at_70%_35%,#9333ea66,transparent_18%),linear-gradient(135deg,#27115f88,#02061755,#08334488)]" />

            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/20 px-5 py-2 text-sm font-semibold">
                <Settings2 className="h-4 w-4" />
                Settings
              </div>

              <h1 className="text-5xl font-black">
                Customize{" "}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                  TaskFlow
                </span>
              </h1>

              <p className="mt-4 text-slate-300">
                Personalize your productivity workspace.
              </p>
            </div>
          </section>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-cyan-500/30 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10">
                    <Bell className="text-purple-300" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">Notifications</h2>
                    <p className="text-slate-400">
                      Get reminders when your tasks are due soon.
                    </p>
                  </div>
                </div>

                <button
                  onClick={toggleNotifications}
                  className={`relative h-8 w-16 rounded-full transition-all duration-300 ${
                    notifications
                      ? "bg-gradient-to-r from-purple-600 to-cyan-400"
                      : "bg-gray-500"
                  }`}
                >
                  <div
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all duration-300 ${
                      notifications ? "left-9" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <p className="mt-5 text-slate-300">
                {notifications
                  ? "Notifications Enabled"
                  : "Notifications Disabled"}
              </p>
            </div>

            <div className="rounded-[2rem] border border-red-500/30 bg-red-500/10 p-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
                  <Trash2 className="text-red-300" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-red-300">
                    Danger Zone
                  </h2>
                  <p className="text-slate-300">
                    Delete all saved tasks permanently.
                  </p>
                </div>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-6 rounded-2xl border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                  >
                    Clear All Tasks
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="max-w-md overflow-hidden rounded-[2rem] border border-cyan-500/30 bg-[#07111f] p-0 text-white shadow-2xl shadow-cyan-950/50">
                  <div className="rounded-[2rem] bg-[radial-gradient(circle_at_top_right,#06b6d433,transparent_35%),radial-gradient(circle_at_bottom_left,#9333ea33,transparent_35%)] p-7">
                    <AlertDialogHeader>
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
                        <Trash2 className="h-7 w-7" />
                      </div>

                      <AlertDialogTitle className="text-3xl font-black text-white">
                        Delete All Tasks?
                      </AlertDialogTitle>

                      <AlertDialogDescription className="mt-3 text-base leading-7 text-slate-300">
                        Are you sure you want to permanently delete all of your
                        tasks? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="mt-8 flex w-full flex-row justify-end gap-3 border-0 bg-transparent p-0">
                      <AlertDialogCancel className="m-0 h-11 min-w-[110px] rounded-2xl border border-slate-600 bg-slate-800 px-6 font-semibold text-white hover:bg-slate-700 hover:text-white">
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction
                        onClick={clearTasks}
                        className="m-0 h-11 min-w-[110px] rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 px-6 font-semibold text-white hover:from-red-700 hover:to-pink-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}