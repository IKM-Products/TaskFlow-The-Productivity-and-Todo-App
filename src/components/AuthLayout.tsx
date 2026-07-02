import { CheckCircle2 } from "lucide-react";

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#10153d,#050816_45%,#020617_100%)] px-4 py-10 text-white">
      <div className="mx-auto grid min-h-[90vh] max-w-6xl items-center gap-10 lg:grid-cols-2">
        <section className="relative hidden overflow-hidden rounded-[3rem] border border-cyan-400/50 bg-[#070b1f] p-10 shadow-2xl shadow-purple-950/50 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,#06b6d455,transparent_20%),radial-gradient(circle_at_68%_38%,#9333ea66,transparent_14%),linear-gradient(135deg,#27115f88,#02061755,#08334488)]" />

          <div className="relative">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-cyan-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <h1 className="text-3xl font-black">TaskFlow</h1>
            </div>

            <h2 className="text-5xl font-black leading-tight">
              Organize your tasks{" "}
              <span className="bg-linear-to-r from-purple-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                beautifully
              </span>
            </h2>

            <p className="mt-5 text-lg text-slate-300">
              Manage your productivity with dashboard, tasks, calendar, stats,
              and settings.
            </p>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-purple-500/40 bg-slate-900/60 p-8 shadow-xl shadow-black/30 backdrop-blur-xl">
          <div className="mb-8">
            <h1 className="text-4xl font-black">{title}</h1>
            <p className="mt-2 text-slate-400">{subtitle}</p>
          </div>

          {children}
        </section>
      </div>
    </main>
  );
}