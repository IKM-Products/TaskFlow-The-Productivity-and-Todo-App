import { Bell, Moon, Trash2 } from "lucide-react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "advanced_todos";

export default function SettingsPage() {
  const clearTasks = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#10153d,#050816_45%,#020617_100%)] px-4 py-10 text-white lg:pl-80">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-2 text-5xl font-black">Settings</h1>
          <p className="mb-8 text-slate-400">
            Customize your TaskFlow experience.
          </p>

          <div className="space-y-5">
            <SettingCard
              icon={<Moon />}
              title="Theme"
              description="Dark glass theme is currently enabled."
            />

            <SettingCard
              icon={<Bell />}
              title="Notifications"
              description="Notification feature can be added later."
            />

            <div className="rounded-2rem border border-red-500/40 bg-red-500/10 p-6 shadow-xl backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <Trash2 className="h-6 w-6 text-red-300" />
                <h2 className="text-2xl font-bold text-red-300">
                  Danger Zone
                </h2>
              </div>

              <p className="mb-5 text-slate-300">
                This will permanently delete all saved tasks from localStorage.
              </p>

              <Button
                variant="outline"
                onClick={clearTasks}
                className="rounded-2xl border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20"
              >
                Clear All Tasks
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function SettingCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2rem border border-cyan-500/30 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
          {icon}
        </div>

        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <p className="text-slate-400">{description}</p>
    </div>
  );
}