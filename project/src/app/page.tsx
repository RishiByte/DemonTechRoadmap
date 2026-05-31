const roadmapTracks = [
  "Web Development",
  "Python",
  "AI / ML",
  "Open Source",
];

const roadmapSteps = [
  { title: "Foundations", detail: "HTML, CSS, Git" },
  { title: "Build", detail: "Projects and practice" },
  { title: "Grow", detail: "Career-ready skills" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-950">
      <section className="relative isolate flex min-h-screen items-center px-6 py-14 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#111827_0%,#0f172a_46%,#0f766e_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:96px_96px] opacity-30" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl pt-8 text-white lg:pt-0">
            <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100 shadow-sm backdrop-blur">
              Open-source learning paths
            </p>
            <h1 className="text-balance text-5xl font-bold leading-[1.04] tracking-normal sm:text-6xl lg:text-7xl">
              Demon Tech Roadmap
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-100 sm:text-xl">
              Community-driven roadmaps that help beginners learn technology
              with clear steps, curated resources, and project-focused growth.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#roadmaps"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-cyan-400 px-6 py-3 text-base font-bold text-slate-950 shadow-lg shadow-cyan-950/20 transition hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-200/70"
              >
                Explore Roadmaps
              </a>
              <a
                href="https://github.com/Demon-Die/DemonTechRoadmap"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 text-base font-bold text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                Contribute on GitHub
              </a>
            </div>

            <div
              id="roadmaps"
              className="mt-10 flex flex-wrap gap-3 text-sm font-semibold text-slate-100"
            >
              {roadmapTracks.map((track) => (
                <span
                  key={track}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur"
                >
                  {track}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/15 sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
                  Roadmap preview
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-normal text-slate-950">
                  From first lesson to real project
                </h2>
              </div>
              <div className="hidden rounded-md bg-slate-950 px-3 py-2 text-sm font-bold text-white sm:block">
                2026
              </div>
            </div>

            <div className="space-y-4">
              {roadmapSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="grid grid-cols-[3rem_1fr] gap-4 rounded-md border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-950 text-lg font-bold text-cyan-300">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {step.detail}
                    </p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-teal-500"
                        style={{ width: `${(index + 1) * 28}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Curated resources", "Beginner friendly", "Project ideas"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 w-full flex flex-col items-center sm:items-start">
          <a
            href="https://discord.gg/yWtjK2Tb8T"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
          >
            Join our Discord
          </a>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
            Join the community on Discord to discuss roadmaps, ask questions, and
            contribute to projects — we'd love to have you!
          </p>
        </div>
      </main>
    </div>
  );
}
