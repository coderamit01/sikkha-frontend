"use client"
import Link from "next/link"

const NotFound = () => {
  return (
    <div className='min-h-screen'>
      <div className="flex min-h-screen items-center justify-center  px-6 text-white">
        <div className="max-w-md text-center">
          <div className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm tracking-widest text-brand">
            404 ERROR
          </div>

          <h1 className="mb-4 text-6xl font-black tracking-tight md:text-7xl text-slate-900">
            Lost?
          </h1>

          <p className="mb-8 text-sm leading-7 text-gray-600 md:text-base">
            The page you’re looking for doesn’t exist or may have been moved.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-brand-dark"
            >
              Back Home
            </Link>

            <button
              onClick={() => history.back()}
              className="rounded-xl border border-brand bg-[#24a19e4d] text-slate-900 hover:text-white px-6 py-3 text-sm font-semibold transition hover:bg-brand"
            >
              Go Back
            </button>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        </div>
      </div>
    </div>
  )
}

export default NotFound
