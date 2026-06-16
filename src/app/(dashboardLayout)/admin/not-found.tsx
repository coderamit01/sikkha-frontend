import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-6">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none animate-pulse delay-75" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

      <div className="relative z-10 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-indigo-400 tracking-wider uppercase mb-8 shadow-xl backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          Error Code: 404
        </div>

        <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          Lost in Space
        </h1>

        <p className="mt-6 text-lg text-slate-400 max-w-md mx-auto leading-relaxed">
          The page you are looking for has drifted out into the void. Let's get
          you back to familiar coordinates.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_30px_rgba(99,102,241,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out text-center"
          >
            Return to Mission Control
          </Link>

          <Link
            href="/support"
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-300 bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-md hover:bg-slate-800/80 hover:text-white transition-all duration-200 text-center"
          >
            Report an Issue
          </Link>
        </div>
      </div>
    </main>
  );
}
