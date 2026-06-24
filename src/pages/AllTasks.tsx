import Navbar from "@/components/navbar";

export default function AllTasks() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#10153d,#050816_45%,#020617_100%)] px-4 py-10 text-white lg:pl-80">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-5xl font-black">All Tasks</h1>

          <p className="text-slate-400">
            View and manage all your tasks here.
          </p>
        </div>
      </main>
    </>
  );
}