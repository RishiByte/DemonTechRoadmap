"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

type RoadmapMeta = {
  title: string;
  href: string;
  storageKey: string;
  totalNodes: number;
  estimatedHours: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: string;
  nextTopics: string[];
  badges: string[];
};

type RoadmapProgress = RoadmapMeta & {
  activeNotes: number;
  bookmarked: number;
  completed: number;
  percentage: number;
};

const roadmapData: RoadmapMeta[] = [
  {
    title: "Frontend Developer Roadmap",
    href: "/roadmaps/frontend-developer",
    storageKey: "demontech-frontend-roadmap",
    totalNodes: 24,
    estimatedHours: 156,
    level: "Beginner",
    category: "Frontend",
    nextTopics: ["Internet & Browser Fundamentals", "HTML5", "CSS3", "Responsive Design", "React.js"],
    badges: ["Web Foundations", "CSS Architect", "React Engineer"],
  },
  {
    title: "Backend Developer Roadmap",
    href: "/roadmaps/backend-developer",
    storageKey: "demontech-backend-roadmap",
    totalNodes: 24,
    estimatedHours: 182,
    level: "Intermediate",
    category: "Backend",
    nextTopics: ["Internet Fundamentals", "Programming Fundamentals", "Databases", "API Development", "System Design"],
    badges: ["API Architect", "Database Designer", "Security Defender"],
  },
  {
    title: "Full Stack Developer Roadmap",
    href: "/roadmaps/full-stack-developer",
    storageKey: "demontech-full-stack-roadmap",
    totalNodes: 33,
    estimatedHours: 286,
    level: "Advanced",
    category: "Full Stack",
    nextTopics: ["Internet Fundamentals", "Frontend Fundamentals", "Backend Fundamentals", "Authentication", "Production Engineering"],
    badges: ["Product Builder", "API Architect", "Cloud Operator"],
  },
  {
    title: "DevOps Engineer Roadmap",
    href: "/roadmaps/devops-engineer",
    storageKey: "demontech-devops-roadmap",
    totalNodes: 29,
    estimatedHours: 304,
    level: "Advanced",
    category: "DevOps",
    nextTopics: ["Linux Fundamentals", "Networking", "CI/CD", "Docker", "Kubernetes"],
    badges: ["Linux Operator", "Pipeline Builder", "Kubernetes Pilot"],
  },
  {
    title: "Data Scientist Roadmap",
    href: "/roadmaps/data-scientist",
    storageKey: "demontech-data-scientist-roadmap",
    totalNodes: 32,
    estimatedHours: 312,
    level: "Intermediate",
    category: "Data",
    nextTopics: ["Data Science Fundamentals", "Python for Data Science", "Statistics Fundamentals", "Machine Learning Fundamentals", "MLOps"],
    badges: ["Data Analyst", "ML Builder", "Research Replicator"],
  },
  {
    title: "Mobile Developer Roadmap",
    href: "/roadmaps/mobile-developer",
    storageKey: "demontech-mobile-roadmap",
    totalNodes: 33,
    estimatedHours: 322,
    level: "Intermediate",
    category: "Mobile",
    nextTopics: ["Mobile Development Fundamentals", "Programming Fundamentals", "Mobile Programming Languages", "Flutter", "App Store Deployment"],
    badges: ["Android Builder", "iOS Crafter", "Release Lead"],
  },
];

const icons: Record<string, ReactNode> = {
  arrow: <path d="m9 18 6-6-6-6" />,
  badge: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2 7.5 14 3 9.6l6.2-.9L12 3Z" />,
  bookmark: <path d="M6 4h12v18l-6-4-6 4V4Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <path d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  flame: <path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7 .2 2-.8 3.4-2 4-1-4-4-6-4-9-3 2-5 6-5 10 0 5 4 9 8 9Z" />,
  layers: <path d="m12 2 9 5-9 5-9-5 9-5Zm9 10-9 5-9-5m18 5-9 5-9-5" />,
  note: <path d="M6 3h10l3 3v18H6V3Zm10 0v6h6M9 13h8M9 17h8" />,
  rocket: <path d="M14 4c3.5.4 5.6 2.5 6 6l-4 4-5-5 4-5Zm-7 8-3 3 5 5 3-3m-5-5 5 5m-7 1-2 2m9-17 5 5" />,
  target: <path d="M21 12a9 9 0 1 1-9-9m6 3 3-3m0 0v5m0-5h-5M15 9l-3 3m3 0a3 3 0 1 1-3-3" />,
};

function Icon({ className = "", name }: { className?: string; name: keyof typeof icons }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
}

function readStringArray(key: string) {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(key);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

function readNotes(key: string) {
  if (typeof window === "undefined") return {};
  const stored = window.localStorage.getItem(key);
  if (!stored) return {};

  try {
    return JSON.parse(stored) as Record<string, string>;
  } catch {
    return {};
  }
}

function loadProgress() {
  return roadmapData.map((roadmap) => {
    const completed = readStringArray(`${roadmap.storageKey}-completed`).length;
    const bookmarked = readStringArray(`${roadmap.storageKey}-bookmarked`).length;
    const activeNotes = Object.values(readNotes(`${roadmap.storageKey}-notes`)).filter((note) => note.trim()).length;

    return {
      ...roadmap,
      activeNotes,
      bookmarked,
      completed,
      percentage: Math.round((completed / roadmap.totalNodes) * 100),
    };
  });
}

function DemonTechLogo() {
  return (
    <Link className="flex min-w-fit items-center gap-3" href="/">
      <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-md border border-red-500/30 bg-black">
        <Image alt="DemonTech logo" className="h-full w-full object-cover" height={48} src="/demontech-logo.png" width={48} />
      </span>
      <span>
        <span className="block text-lg font-black leading-6 text-white">
          Demon<span className="text-red-500">Tech</span>
        </span>
        <span className="mt-1 block text-[11px] font-bold uppercase text-zinc-500">Dashboard</span>
      </span>
    </Link>
  );
}

export default function DashboardPage() {
  const [roadmaps] = useState<RoadmapProgress[]>(() => loadProgress());
  const dashboard = useMemo(() => {
    const totalCompleted = roadmaps.reduce((sum, roadmap) => sum + roadmap.completed, 0);
    const totalNotes = roadmaps.reduce((sum, roadmap) => sum + roadmap.activeNotes, 0);
    const totalBookmarks = roadmaps.reduce((sum, roadmap) => sum + roadmap.bookmarked, 0);
    const activeRoadmap = roadmaps.find((roadmap) => roadmap.completed > 0 && roadmap.percentage < 100) ?? roadmaps.find((roadmap) => roadmap.percentage < 100) ?? roadmaps[0];
    const nextIndex = Math.min(activeRoadmap.completed, activeRoadmap.nextTopics.length - 1);
    const learningHours = Math.round(roadmaps.reduce((sum, roadmap) => sum + (roadmap.completed / roadmap.totalNodes) * roadmap.estimatedHours, 0));
    const weeklyStreak = totalCompleted > 0 ? Math.min(7, Math.max(1, Math.ceil(totalCompleted / 4))) : 0;
    const badges = [
      { label: "First Topic", unlocked: totalCompleted >= 1 },
      { label: "Ten Topic Run", unlocked: totalCompleted >= 10 },
      { label: "Note Taker", unlocked: totalNotes >= 3 },
      { label: "Roadmap Focus", unlocked: activeRoadmap.percentage >= 25 },
      { label: "Halfway Hunter", unlocked: activeRoadmap.percentage >= 50 },
      { label: "Completion Lead", unlocked: roadmaps.some((roadmap) => roadmap.percentage === 100) },
    ];

    return {
      activeRoadmap,
      badges,
      learningHours,
      nextTopic: activeRoadmap.nextTopics[nextIndex] ?? activeRoadmap.nextTopics[0],
      totalBookmarks,
      totalCompleted,
      totalNotes,
      weeklyStreak,
    };
  }, [roadmaps]);

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,#050505_0%,#090909_48%,#050505_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <header className="sticky top-0 z-40 border-b border-zinc-900 bg-[#050505]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-5 px-5 lg:px-6">
          <DemonTechLogo />
          <nav className="ml-auto hidden items-center gap-7 text-sm font-bold text-zinc-400 lg:flex">
            <Link className="text-red-400" href="/dashboard">Dashboard</Link>
            <Link className="transition hover:text-white" href="/docs/all-roadmaps">Roadmaps</Link>
            <Link className="transition hover:text-white" href="/docs/learning-paths">Learning Paths</Link>
            <Link className="transition hover:text-white" href="/docs/project-ideas">Projects</Link>
          </nav>
          <Link className="hidden rounded-md border border-red-500/40 bg-red-500 px-4 py-2 text-sm font-black text-white transition hover:bg-red-400 md:inline-flex" href={dashboard.activeRoadmap.href}>
            Continue
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-6">
        <section>
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
            <Link className="hover:text-red-400" href="/">Home</Link>
            <Icon className="h-3.5 w-3.5" name="arrow" />
            <span className="font-bold text-zinc-300">Dashboard</span>
          </div>

          <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5 lg:p-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-red-300">
                  <Icon className="h-4 w-4" name="rocket" />
                  Learning Command Center
                </div>
                <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white lg:text-5xl">User Dashboard</h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">
                  Track your active roadmap, completed topics, notes, streak, achievements, and estimated learning hours from one focused workspace.
                </p>
              </div>
              <div className="rounded-md border border-red-500/25 bg-red-500/10 p-5">
                <p className="text-sm font-black uppercase tracking-[0.12em] text-red-300">Current Roadmap</p>
                <h2 className="mt-3 text-2xl font-black text-white">{dashboard.activeRoadmap.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{dashboard.activeRoadmap.category} / {dashboard.activeRoadmap.level}</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-black">
                  <div className="h-full rounded-full bg-red-500" style={{ width: `${dashboard.activeRoadmap.percentage}%` }} />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-bold text-red-200">{dashboard.activeRoadmap.percentage}% complete</span>
                  <span className="text-zinc-500">{dashboard.activeRoadmap.completed}/{dashboard.activeRoadmap.totalNodes}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon="check" label="Completed topics" value={String(dashboard.totalCompleted)} />
            <StatCard icon="note" label="Active notes" value={String(dashboard.totalNotes)} />
            <StatCard icon="flame" label="Weekly streak" value={`${dashboard.weeklyStreak} days`} />
            <StatCard icon="clock" label="Learning hours" value={`${dashboard.learningHours}h`} />
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-md border border-zinc-800 bg-zinc-950 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Roadmap Progress</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">Progress is pulled from saved completions in each roadmap.</p>
                </div>
                <Link className="rounded-md border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/60 hover:text-white" href="/docs/all-roadmaps">
                  Browse roadmaps
                </Link>
              </div>
              <div className="mt-5 grid gap-3">
                {roadmaps.map((roadmap) => (
                  <Link className="rounded-md border border-zinc-800 bg-[#050505] p-4 transition hover:border-red-500/50" href={roadmap.href} key={roadmap.storageKey}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-black text-white">{roadmap.title}</h3>
                        <p className="mt-1 text-xs font-bold text-zinc-500">{roadmap.completed}/{roadmap.totalNodes} topics / {roadmap.activeNotes} notes / {roadmap.bookmarked} bookmarks</p>
                      </div>
                      <span className="rounded border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-black text-red-200">{roadmap.percentage}%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-900">
                      <div className="h-full rounded-full bg-red-500" style={{ width: `${roadmap.percentage}%` }} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-md border border-zinc-800 bg-zinc-950 p-5">
              <h2 className="text-2xl font-black text-white">Achievement Badges</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">Badges unlock as you complete topics, write notes, and build momentum.</p>
              <div className="mt-5 grid gap-3">
                {dashboard.badges.map((badge) => (
                  <div className={`flex items-center gap-3 rounded-md border p-3 ${badge.unlocked ? "border-red-500/40 bg-red-500/10 text-red-100" : "border-zinc-800 bg-[#050505] text-zinc-500"}`} key={badge.label}>
                    <Icon className="h-5 w-5" name="badge" />
                    <span className="text-sm font-bold">{badge.label}</span>
                    <span className="ml-auto text-xs font-black uppercase">{badge.unlocked ? "Unlocked" : "Locked"}</span>
                  </div>
                ))}
              </div>
            </section>
          </section>
        </section>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <SidebarPanel title="Recommended Next Topic">
            <span className="inline-flex rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-black text-red-200">{dashboard.activeRoadmap.category}</span>
            <h2 className="mt-3 text-xl font-black text-white">{dashboard.nextTopic}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Continue this topic inside your current roadmap to keep your streak alive.</p>
            <Link className="mt-4 inline-flex items-center gap-2 rounded-md border border-red-500/40 bg-red-500 px-4 py-2 text-sm font-black text-white transition hover:bg-red-400" href={dashboard.activeRoadmap.href}>
              Open roadmap
              <Icon className="h-4 w-4" name="arrow" />
            </Link>
          </SidebarPanel>

          <SidebarPanel title="Learning Estimate">
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Metric label="completed" value={`${dashboard.learningHours}h`} />
              <Metric label="remaining" value={`${Math.max(0, dashboard.activeRoadmap.estimatedHours - dashboard.learningHours)}h`} />
              <Metric label="bookmarks" value={String(dashboard.totalBookmarks)} />
              <Metric label="focus" value={dashboard.activeRoadmap.level} />
            </div>
          </SidebarPanel>

          <SidebarPanel title="Active Notes">
            <p className="mt-4 text-3xl font-black text-white">{dashboard.totalNotes}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-500">Saved notes across all active roadmap nodes.</p>
          </SidebarPanel>
        </aside>
      </div>
    </main>
  );
}

function StatCard({ icon, label, value }: { icon: keyof typeof icons; label: string; value: string }) {
  return (
    <article className="rounded-md border border-zinc-800 bg-zinc-950 p-5">
      <Icon className="h-5 w-5 text-red-400" name={icon} />
      <p className="mt-4 text-3xl font-black text-white">{value}</p>
      <p className="mt-1 text-sm text-zinc-500">{label}</p>
    </article>
  );
}

function SidebarPanel({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="rounded-md border border-zinc-800 bg-zinc-950/90 p-5">
      <h2 className="text-sm font-black uppercase tracking-[0.12em] text-zinc-400">{title}</h2>
      {children}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-zinc-800 bg-[#050505] p-3">
      <p className="text-lg font-black text-white">{value}</p>
      <p className="mt-1 text-xs text-zinc-500">{label}</p>
    </div>
  );
}
