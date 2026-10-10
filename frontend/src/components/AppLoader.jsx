import { Spinner } from "@heroui/react";

function AppLoader() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-slate-50 px-6 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(14,116,180,0.12),transparent_58%)] dark:bg-[radial-gradient(ellipse_at_50%_35%,rgba(14,116,180,0.2),transparent_58%)]"
      />

      <section
        aria-label="Loading iChat"
        aria-live="polite"
        className="relative flex flex-col items-center text-center"
        role="status"
      >
        <div className="mb-7 grid size-16 place-items-center rounded-2xl border border-slate-200/80 bg-white/80 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
          <img alt="" className="size-10 rounded-xl" src="/logo.png" />
        </div>

        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-700/80 dark:text-sky-300/80">
          Private session
        </p>
        <h1 className="mt-2 text-2xl font-semibold">iChat</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Preparing your conversations
        </p>

        <div className="mt-7 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
          <Spinner aria-hidden="true" color="accent" size="md" />
          <span>Connecting securely</span>
        </div>
      </section>
    </main>
  );
}

export default AppLoader;
