"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Stage = "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type Difficulty = "Starter" | "Core" | "Applied" | "Advanced" | "Expert";

export type Resource = {
  label: string;
  href: string;
  category: string;
};

export type RoadmapNode = {
  id: string;
  title: string;
  stage: Stage;
  difficulty: Difficulty;
  duration: string;
  description: string;
  prerequisites: string[];
  topics: string[];
  skillsGained: string[];
  learningOutcomes?: string[];
  resources: Resource[];
  practiceExercises: string[];
  miniProject: string;
  realWorldApplications?: string[];
  quiz?: string;
};

export type StageSummary = {
  stage: Stage;
  duration: string;
  outcome: string;
};

export type ProjectTrack = {
  stage: Stage;
  projects: string[];
};

export type RoadmapPath = {
  title: string;
  focus: string;
  milestones: string[];
};

export type ReadinessMetric = {
  label: string;
  icon: keyof typeof icons;
  topicTitles: string[];
};

export type RoadmapPageShellProps = {
  detailBasePath?: string;
  storageKey: string;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  description: string;
  stats: Array<[string, string, keyof typeof icons]>;
  architectureLabel: string;
  projectIntro: string;
  journeyTitle: string;
  journeyDescription: string;
  resourceTitle: string;
  pathTitle?: string;
  pathDescription?: string;
  certificationTitle?: string;
  certificationDescription?: string;
  gamificationTitle?: string;
  progressSchemaTitle?: string;
  progressTitle: string;
  readinessTitle: string;
  missingTitle: string;
  estimatedTime: string;
  miniProjectLabel: string;
  notesPlaceholder?: string;
  stageSummaries: StageSummary[];
  roadmapNodes: RoadmapNode[];
  projectTracks: ProjectTrack[];
  resourceCategories: string[];
  paths?: RoadmapPath[];
  certifications?: RoadmapPath[];
  gamificationCards?: Array<[string, string]>;
  progressSchema?: Array<[string, string]>;
  architectureCards?: Array<[string, string]>;
  achievementBadges: string[];
  missingTopics: string[];
  readinessMetrics: ReadinessMetric[];
};

const icons = {
  arrow: <path d="m9 18 6-6-6-6" />,
  badge: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2 7.5 14 3 9.6l6.2-.9L12 3Z" />,
  bookmark: <path d="M6 4h12v18l-6-4-6 4V4Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <path d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  code: <path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 4l-4 16" />,
  flame: <path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7 .2 2-.8 3.4-2 4-1-4-4-6-4-9-3 2-5 6-5 10 0 5 4 9 8 9Z" />,
  layers: <path d="m12 2 9 5-9 5-9-5 9-5Zm9 10-9 5-9-5m18 5-9 5-9-5" />,
  lock: <path d="M6 11V8a6 6 0 0 1 12 0v3m-1 0H7a1 1 0 0 0-1 1v8h12v-8a1 1 0 0 0-1-1Z" />,
  note: <path d="M6 3h10l3 3v18H6V3Zm10 0v6h6M9 13h8M9 17h8" />,
  quiz: <path d="M10 9a3 3 0 1 1 4 2.83c-1.1.47-2 1.03-2 2.17m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  search: <path d="m21 21-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />,
  server: <path d="M4 4h16v7H4V4Zm0 11h16v7H4v-7Zm3-7h.01M7 19h.01" />,
  shield: <path d="M12 3 20 6v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />,
  target: <path d="M21 12a9 9 0 1 1-9-9m6 3 3-3m0 0v5m0-5h-5M15 9l-3 3m3 0a3 3 0 1 1-3-3" />,
};

const roadmapLinks = [
  { title: "Frontend Developer Roadmap", href: "/roadmaps/frontend-developer", detail: "UI engineering, React, Next.js, accessibility, performance" },
  { title: "Backend Developer Roadmap", href: "/roadmaps/backend-developer", detail: "APIs, databases, auth, system design, production engineering" },
  { title: "Full Stack Developer Roadmap", href: "/roadmaps/full-stack-developer", detail: "Frontend, backend, databases, DevOps, cloud, product systems" },
  { title: "DevOps Engineer Roadmap", href: "/roadmaps/devops-engineer", detail: "Linux, CI/CD, Docker, Kubernetes, cloud, SRE" },
  { title: "Data Scientist Roadmap", href: "/roadmaps/data-scientist", detail: "Python, statistics, ML, deep learning, MLOps, GenAI" },
  { title: "Mobile Developer Roadmap", href: "/roadmaps/mobile-developer", detail: "Android, iOS, Flutter, React Native, app release systems" },
  { title: "JavaScript Roadmap", href: "/roadmaps/javascript", detail: "Language fundamentals, DOM, async, modules, patterns" },
  { title: "TypeScript Roadmap", href: "/roadmaps/typescript", detail: "Types, interfaces, generics, architecture, tooling" },
  { title: "React Roadmap", href: "/roadmaps/react", detail: "Components, hooks, state, routing, app architecture" },
  { title: "Next.js Roadmap", href: "/roadmaps/nextjs", detail: "App Router, layouts, rendering, APIs, deployment" },
  { title: "Git Roadmap", href: "/roadmaps/git", detail: "Commits, branches, remotes, recovery, collaboration" },
];

function Icon({ name, className = "" }: { name: keyof typeof icons; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
}

function loadSet(key: string) {
  if (typeof window === "undefined") return new Set<string>();
  const stored = window.localStorage.getItem(key);
  return stored ? new Set(JSON.parse(stored) as string[]) : new Set<string>();
}

function loadNotes(key: string) {
  if (typeof window === "undefined") return {};
  const stored = window.localStorage.getItem(key);
  return stored ? (JSON.parse(stored) as Record<string, string>) : {};
}

function difficultyClass(difficulty: Difficulty) {
  const classes: Record<Difficulty, string> = {
    Starter: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    Core: "border-sky-500/30 bg-sky-500/10 text-sky-300",
    Applied: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    Advanced: "border-red-500/35 bg-red-500/10 text-red-300",
    Expert: "border-red-400/50 bg-red-500/15 text-red-200",
  };
  return classes[difficulty];
}

function stageClass(stage: Stage) {
  const classes: Record<Stage, string> = {
    Beginner: "border-zinc-700 bg-zinc-950 text-zinc-200",
    Intermediate: "border-red-950 bg-red-950/30 text-red-200",
    Advanced: "border-red-800 bg-red-950/50 text-red-100",
    Expert: "border-red-600 bg-red-600/15 text-white",
  };
  return classes[stage];
}

export function RoadmapPageShell(props: RoadmapPageShellProps) {
  const storageKeys = useMemo(
    () => ({
      completed: `${props.storageKey}-completed`,
      bookmarked: `${props.storageKey}-bookmarked`,
      notes: `${props.storageKey}-notes`,
    }),
    [props.storageKey],
  );
  const [expandedNodeId, setExpandedNodeId] = useState(props.roadmapNodes[0]?.id ?? "");
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => loadSet(storageKeys.completed));
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => loadSet(storageKeys.bookmarked));
  const [notes, setNotes] = useState<Record<string, string>>(() => loadNotes(storageKeys.notes));
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<Stage | "All">("All");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "All">("All");
  const [durationFilter, setDurationFilter] = useState("All");
  const [resourceFilter, setResourceFilter] = useState("All");

  useEffect(() => {
    window.localStorage.setItem(storageKeys.completed, JSON.stringify(Array.from(completedIds)));
  }, [completedIds, storageKeys.completed]);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.bookmarked, JSON.stringify(Array.from(bookmarkedIds)));
  }, [bookmarkedIds, storageKeys.bookmarked]);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.notes, JSON.stringify(notes));
  }, [notes, storageKeys.notes]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const completedCount = completedIds.size;
  const progressPercentage = Math.round((completedCount / props.roadmapNodes.length) * 100);
  const nextNode = props.roadmapNodes.find((node) => !completedIds.has(node.id)) ?? props.roadmapNodes[props.roadmapNodes.length - 1];
  const currentLevel = props.stageSummaries.find((stage) => props.roadmapNodes.filter((node) => node.stage === stage.stage).some((node) => !completedIds.has(node.id)))?.stage ?? "Expert";
  const noteCount = Object.values(notes).filter((note) => note.trim()).length;
  const stageProgress = props.stageSummaries.map((summary) => {
    const nodes = props.roadmapNodes.filter((node) => node.stage === summary.stage);
    const completed = nodes.filter((node) => completedIds.has(node.id)).length;
    return { ...summary, completed, total: nodes.length, percentage: Math.round((completed / nodes.length) * 100) };
  });
  const resourcesByCategory = props.resourceCategories.map((category) => ({
    category,
    resources: props.roadmapNodes.flatMap((node) => node.resources.filter((resource) => resource.category === category)).slice(0, 6),
  }));
  const readiness = props.readinessMetrics.map((metric) => {
    const ids = props.roadmapNodes.filter((node) => metric.topicTitles.includes(node.title)).map((node) => node.id);
    const percentage = ids.length ? Math.round((ids.filter((id) => completedIds.has(id)).length / ids.length) * 100) : 0;
    return { ...metric, percentage };
  });
  const durationOptions = Array.from(new Set(props.roadmapNodes.map((node) => node.duration)));
  const getTopicHref = (nodeId: string) => (props.detailBasePath ? `${props.detailBasePath}/${nodeId}` : undefined);
  const filteredNodes = props.roadmapNodes.filter((node) => {
    const query = searchQuery.trim().toLowerCase();
    const searchable = [
      node.title,
      node.description,
      node.stage,
      node.difficulty,
      node.duration,
      node.miniProject,
      ...node.prerequisites,
      ...node.topics,
      ...node.skillsGained,
      ...(node.learningOutcomes ?? []),
      ...node.practiceExercises,
      ...(node.realWorldApplications ?? []),
      ...node.resources.flatMap((resource) => [resource.label, resource.category]),
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!query || searchable.includes(query)) &&
      (stageFilter === "All" || node.stage === stageFilter) &&
      (difficultyFilter === "All" || node.difficulty === difficultyFilter) &&
      (durationFilter === "All" || node.duration === durationFilter) &&
      (resourceFilter === "All" || node.resources.some((resource) => resource.category === resourceFilter))
    );
  });

  const openNode = (nodeId: string) => {
    setExpandedNodeId(nodeId);
    requestAnimationFrame(() => document.getElementById(`roadmap-node-${nodeId}`)?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };

  const toggleSet = (setter: (value: Set<string>) => void, current: Set<string>, id: string) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setter(next);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,#050505_0%,#090909_48%,#050505_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <header className="sticky top-0 z-40 border-b border-zinc-900 bg-[#050505]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-5 px-5 lg:px-6">
          <DemonTechLogo />
          <nav className="ml-auto hidden items-center gap-7 text-sm font-bold text-zinc-400 lg:flex">
            <Link className="text-red-400" href="/docs/all-roadmaps">Roadmaps</Link>
            <Link className="transition hover:text-white" href="/docs/learning-paths">Learning Paths</Link>
            <Link className="transition hover:text-white" href="/docs/project-ideas">Projects</Link>
            <Link className="transition hover:text-white" href="/docs/best-practices">Best Practices</Link>
          </nav>
          <button className="h-10 items-center justify-center rounded-md border border-zinc-800 bg-black px-3 text-sm font-bold text-zinc-500 transition hover:border-red-500/50 hover:text-zinc-200 md:hidden" onClick={() => setCommandOpen(true)} type="button">
            <Icon className="h-4 w-4 text-red-400" name="search" />
            <span className="sr-only">Open command palette</span>
          </button>
          <button className="hidden h-10 min-w-48 items-center justify-between gap-4 rounded-md border border-zinc-800 bg-black px-3 text-sm font-bold text-zinc-500 transition hover:border-red-500/50 hover:text-zinc-200 md:inline-flex" onClick={() => setCommandOpen(true)} type="button">
            <span className="inline-flex items-center gap-2">
              <Icon className="h-4 w-4 text-red-400" name="search" />
              Search
            </span>
            <kbd className="rounded border border-zinc-800 px-1.5 py-0.5 text-[10px] uppercase text-zinc-500">⌘K</kbd>
          </button>
          <a className="hidden rounded-md border border-red-500/40 bg-red-500 px-4 py-2 text-sm font-black text-white transition hover:bg-red-400 md:inline-flex" href="https://discord.gg/yWtjK2Tb8T" rel="noreferrer" target="_blank">
            Join Community
          </a>
        </div>
      </header>
      <CommandPalette
        getTopicHref={getTopicHref}
        open={commandOpen}
        props={props}
        query={searchQuery}
        setOpen={setCommandOpen}
        setQuery={setSearchQuery}
        onOpenNode={openNode}
      />

      <div className="mx-auto grid max-w-[1280px] gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_310px] lg:px-6">
        <section>
          <Breadcrumb current={props.breadcrumb} />
          <Hero props={props} stageProgress={stageProgress} setExpandedNodeId={setExpandedNodeId} />
          <ProjectTrackSection intro={props.projectIntro} projectTracks={props.projectTracks} />
          <RoadmapJourney
            completedIds={completedIds}
            expandedNodeId={expandedNodeId}
            notes={notes}
            bookmarkedIds={bookmarkedIds}
            setCompletedIds={setCompletedIds}
            setExpandedNodeId={setExpandedNodeId}
            setNotes={setNotes}
            title={props.journeyTitle}
            description={props.journeyDescription}
            difficultyFilter={difficultyFilter}
            durationFilter={durationFilter}
            durationOptions={durationOptions}
            miniProjectLabel={props.miniProjectLabel}
            nodes={filteredNodes}
            notesPlaceholder={props.notesPlaceholder}
            resourceCategories={props.resourceCategories}
            resourceFilter={resourceFilter}
            searchQuery={searchQuery}
            setDifficultyFilter={setDifficultyFilter}
            setDurationFilter={setDurationFilter}
            getTopicHref={getTopicHref}
            toggleSet={toggleSet}
            setBookmarkedIds={setBookmarkedIds}
            setResourceFilter={setResourceFilter}
            setSearchQuery={setSearchQuery}
            setStageFilter={setStageFilter}
            stageFilter={stageFilter}
            totalNodeCount={props.roadmapNodes.length}
          />
          <ResourceMatrix title={props.resourceTitle} resourcesByCategory={resourcesByCategory} />
          {props.paths?.length ? <CareerPathPanel title={props.pathTitle ?? "Career Paths"} description={props.pathDescription ?? ""} paths={props.paths} /> : null}
          {props.certifications?.length ? <CertificationPanel title={props.certificationTitle ?? "Certification Paths"} description={props.certificationDescription ?? ""} certifications={props.certifications} /> : null}
          {props.gamificationCards?.length ? <LearningTools title={props.gamificationTitle ?? "Learning Features"} cards={props.gamificationCards} /> : null}
          {props.progressSchema?.length ? <ProgressSchema title={props.progressSchemaTitle ?? "Progress Data Model"} rows={props.progressSchema} /> : null}
          {props.architectureCards?.length ? <ArchitectureCards cards={props.architectureCards} /> : null}
        </section>

        <ProgressDashboard
          badges={props.achievementBadges}
          completedCount={completedCount}
          currentLevel={currentLevel}
          estimatedTime={props.estimatedTime}
          missingTitle={props.missingTitle}
          missingTopics={props.missingTopics}
          nextNode={nextNode}
          noteCount={noteCount}
          progressPercentage={progressPercentage}
          readiness={readiness}
          setExpandedNodeId={setExpandedNodeId}
          stageProgress={stageProgress}
          totalNodes={props.roadmapNodes.length}
          bookmarkedCount={bookmarkedIds.size}
          progressTitle={props.progressTitle}
          readinessTitle={props.readinessTitle}
        />
      </div>
    </main>
  );
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
        <span className="mt-1 block text-[11px] font-bold uppercase text-zinc-500">Roadmap</span>
      </span>
    </Link>
  );
}

function Breadcrumb({ current }: { current: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
      <Link className="hover:text-red-400" href="/">Home</Link>
      <Icon className="h-3.5 w-3.5" name="arrow" />
      <Link className="hover:text-red-400" href="/docs/all-roadmaps">Roadmaps</Link>
      <Icon className="h-3.5 w-3.5" name="arrow" />
      <span className="font-bold text-zinc-300">{current}</span>
    </div>
  );
}

function Hero({ props, stageProgress, setExpandedNodeId }: { props: RoadmapPageShellProps; stageProgress: Array<StageSummary & { completed: number; total: number; percentage: number }>; setExpandedNodeId: (id: string) => void }) {
  return (
    <section className="mt-6 overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
      <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:p-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-black text-red-300">
            <Icon className="h-4 w-4" name="server" />
            {props.eyebrow}
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">{props.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">{props.description}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {props.stats.map(([value, label, icon]) => (
              <div className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={label}>
                <Icon className="h-5 w-5 text-red-400" name={icon} />
                <p className="mt-3 text-2xl font-black text-white">{value}</p>
                <p className="mt-1 text-sm text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md border border-zinc-800 bg-[#050505] p-5">
          <p className="text-sm font-black text-white">{props.architectureLabel}</p>
          <div className="mt-5 space-y-4">
            {stageProgress.map((stage) => (
              <button className="w-full text-left" key={stage.stage} onClick={() => setExpandedNodeId(props.roadmapNodes.find((node) => node.stage === stage.stage)?.id ?? props.roadmapNodes[0].id)} type="button">
                <span className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-bold text-zinc-200">{stage.stage}</span>
                  <span className="text-zinc-500">{stage.completed}/{stage.total}</span>
                </span>
                <span className="mt-2 block h-2 overflow-hidden rounded-full bg-zinc-900">
                  <span className="block h-full rounded-full bg-red-500" style={{ width: `${stage.percentage}%` }} />
                </span>
                <span className="mt-2 block text-xs leading-5 text-zinc-500">{stage.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectTrackSection({ intro, projectTracks }: { intro: string; projectTracks: ProjectTrack[] }) {
  return (
    <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
      <h2 className="text-2xl font-black text-white">Project-Based Learning Track</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">{intro}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {projectTracks.map((track) => (
          <section className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={track.stage}>
            <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-bold ${stageClass(track.stage)}`}>{track.stage}</span>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              {track.projects.map((project) => (
                <li className="flex gap-3" key={project}>
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="code" />
                  {project}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}

function RoadmapJourney(props: {
  bookmarkedIds: Set<string>;
  completedIds: Set<string>;
  description: string;
  difficultyFilter: Difficulty | "All";
  durationFilter: string;
  durationOptions: string[];
  expandedNodeId: string;
  getTopicHref?: (nodeId: string) => string | undefined;
  miniProjectLabel: string;
  nodes: RoadmapNode[];
  notes: Record<string, string>;
  notesPlaceholder?: string;
  resourceCategories: string[];
  resourceFilter: string;
  searchQuery: string;
  setBookmarkedIds: (value: Set<string>) => void;
  setCompletedIds: (value: Set<string>) => void;
  setDifficultyFilter: (value: Difficulty | "All") => void;
  setDurationFilter: (value: string) => void;
  setExpandedNodeId: (value: string | ((current: string) => string)) => void;
  setNotes: (value: Record<string, string> | ((current: Record<string, string>) => Record<string, string>)) => void;
  setResourceFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
  setStageFilter: (value: Stage | "All") => void;
  stageFilter: Stage | "All";
  title: string;
  toggleSet: (setter: (value: Set<string>) => void, current: Set<string>, id: string) => void;
  totalNodeCount: number;
}) {
  const hasActiveFilters = Boolean(props.searchQuery.trim()) || props.stageFilter !== "All" || props.difficultyFilter !== "All" || props.durationFilter !== "All" || props.resourceFilter !== "All";

  return (
    <section className="mt-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">{props.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{props.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {hasActiveFilters ? (
            <button
              className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-200 transition hover:border-red-500/60"
              onClick={() => {
                props.setSearchQuery("");
                props.setStageFilter("All");
                props.setDifficultyFilter("All");
                props.setDurationFilter("All");
                props.setResourceFilter("All");
              }}
              type="button"
            >
              Clear Filters
            </button>
          ) : null}
          <button className="rounded-md border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/60 hover:text-white" onClick={() => props.setCompletedIds(new Set())} type="button">
            Reset Progress
          </button>
        </div>
      </div>
      <RoadmapFilters
        difficultyFilter={props.difficultyFilter}
        durationFilter={props.durationFilter}
        durationOptions={props.durationOptions}
        matchingCount={props.nodes.length}
        resourceCategories={props.resourceCategories}
        resourceFilter={props.resourceFilter}
        searchQuery={props.searchQuery}
        setDifficultyFilter={props.setDifficultyFilter}
        setDurationFilter={props.setDurationFilter}
        setResourceFilter={props.setResourceFilter}
        setSearchQuery={props.setSearchQuery}
        setStageFilter={props.setStageFilter}
        stageFilter={props.stageFilter}
        totalCount={props.totalNodeCount}
      />
      <div className="relative mt-6 space-y-5">
        <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-zinc-800 sm:block" />
        {props.nodes.length ? (
          props.nodes.map((node, index) => {
            const isNext = index === props.nodes.findIndex(n => !props.completedIds.has(n.id));
            return (
              <RoadmapNodeCard
                bookmarked={props.bookmarkedIds.has(node.id)}
                completed={props.completedIds.has(node.id)}
                expanded={props.expandedNodeId === node.id}
                isNext={isNext}
                index={index}
                key={node.id}
              miniProjectLabel={props.miniProjectLabel}
              node={node}
              note={props.notes[node.id] ?? ""}
              notesPlaceholder={props.notesPlaceholder}
                miniProjectLabel={props.miniProjectLabel}
                node={node}
                note={props.notes[node.id] ?? ""}
                notesPlaceholder={props.notesPlaceholder}
                onExpand={() => props.setExpandedNodeId((current) => (current === node.id ? "" : node.id))}
                onNoteChange={(value) => props.setNotes((current) => ({ ...current, [node.id]: value }))}
                onToggleBookmark={() => props.toggleSet(props.setBookmarkedIds, props.bookmarkedIds, node.id)}
                onToggleComplete={() => props.toggleSet(props.setCompletedIds, props.completedIds, node.id)}
                topicHref={props.getTopicHref?.(node.id)}
              />
            );
          })
        ) : (
          <div className="rounded-md border border-zinc-800 bg-zinc-950 p-6 text-center">
            <Icon className="mx-auto h-8 w-8 text-red-400" name="search" />
            <p className="mt-3 text-lg font-black text-white">No matching roadmap nodes</p>
            <p className="mt-2 text-sm text-zinc-500">Try a broader search term or clear one of the filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function RoadmapFilters({
  difficultyFilter,
  durationFilter,
  durationOptions,
  matchingCount,
  resourceCategories,
  resourceFilter,
  searchQuery,
  setDifficultyFilter,
  setDurationFilter,
  setResourceFilter,
  setSearchQuery,
  setStageFilter,
  stageFilter,
  totalCount,
}: {
  difficultyFilter: Difficulty | "All";
  durationFilter: string;
  durationOptions: string[];
  matchingCount: number;
  resourceCategories: string[];
  resourceFilter: string;
  searchQuery: string;
  setDifficultyFilter: (value: Difficulty | "All") => void;
  setDurationFilter: (value: string) => void;
  setResourceFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
  setStageFilter: (value: Stage | "All") => void;
  stageFilter: Stage | "All";
  totalCount: number;
}) {
  return (
    <section className="mt-5 rounded-md border border-zinc-800 bg-zinc-950/90 p-4">
      <div className="grid gap-3 xl:grid-cols-[minmax(220px,1.5fr)_repeat(4,minmax(130px,1fr))_auto]">
        <label className="relative">
          <span className="sr-only">Search roadmap topics, resources, duration, and difficulty</span>
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-400" name="search" />
          <input
            className="h-10 w-full rounded-md border border-zinc-800 bg-black pl-9 pr-3 text-sm font-bold text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-red-500/70"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search topics, resources, difficulty..."
            type="search"
            value={searchQuery}
          />
        </label>
        <FilterSelect label="Stage" onChange={(value) => setStageFilter(value as Stage | "All")} options={["All", "Beginner", "Intermediate", "Advanced", "Expert"]} value={stageFilter} />
        <FilterSelect label="Difficulty" onChange={(value) => setDifficultyFilter(value as Difficulty | "All")} options={["All", "Starter", "Core", "Applied", "Advanced", "Expert"]} value={difficultyFilter} />
        <FilterSelect label="Duration" onChange={setDurationFilter} options={["All", ...durationOptions]} value={durationFilter} />
        <FilterSelect label="Resources" onChange={setResourceFilter} options={["All", ...resourceCategories]} value={resourceFilter} />
        <div className="flex h-10 items-center justify-center rounded-md border border-zinc-800 bg-black px-3 text-xs font-black text-zinc-400">
          {matchingCount}/{totalCount}
        </div>
      </div>
    </section>
  );
}

function FilterSelect({ label, onChange, options, value }: { label: string; onChange: (value: string) => void; options: string[]; value: string }) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select className="h-10 w-full rounded-md border border-zinc-800 bg-black px-3 text-sm font-bold text-zinc-300 outline-none transition focus:border-red-500/70" onChange={(event) => onChange(event.target.value)} value={value}>
        {options.map((option) => (
          <option key={option} value={option}>
            {label}: {option}
          </option>
        ))}
      </select>
    </label>
  );
}

type CommandResult = {
  id: string;
  title: string;
  detail: string;
  group: "Roadmaps" | "Topics" | "Resources" | "Difficulty" | "Duration" | "Career Paths";
  href?: string;
  nodeId?: string;
};

function CommandPalette({
  getTopicHref,
  open,
  props,
  query,
  setOpen,
  setQuery,
  onOpenNode,
}: {
  getTopicHref?: (nodeId: string) => string | undefined;
  open: boolean;
  props: RoadmapPageShellProps;
  query: string;
  setOpen: (value: boolean) => void;
  setQuery: (value: string) => void;
  onOpenNode: (nodeId: string) => void;
}) {
  const router = useRouter();
  const [paletteQuery, setPaletteQuery] = useState(query);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  if (!open) return null;

  const careerResults = [...(props.paths ?? []), ...(props.certifications ?? [])].map((path) => ({
    id: `path-${path.title}`,
    title: path.title,
    detail: path.focus,
    group: "Career Paths" as const,
  }));
  const commandResults: CommandResult[] = [
    ...roadmapLinks.map((roadmap) => ({ id: `roadmap-${roadmap.href}`, title: roadmap.title, detail: roadmap.detail, group: "Roadmaps" as const, href: roadmap.href })),
    ...props.roadmapNodes.map((node) => ({
      id: `topic-${node.id}`,
      title: node.title,
      detail: `${node.stage} • ${node.difficulty} • ${node.duration}`,
      group: "Topics" as const,
      href: getTopicHref?.(node.id),
      nodeId: node.id,
    })),
    ...props.roadmapNodes.flatMap((node) =>
      node.resources.map((resource) => ({
        id: `resource-${node.id}-${resource.href}-${resource.label}`,
        title: resource.label,
        detail: `${resource.category} • ${node.title}`,
        group: "Resources" as const,
        href: resource.href,
      })),
    ),
    ...props.roadmapNodes.map((node) => ({
      id: `difficulty-${node.id}`,
      title: node.difficulty,
      detail: `${node.title} • ${node.stage}`,
      group: "Difficulty" as const,
      nodeId: node.id,
    })),
    ...props.roadmapNodes.map((node) => ({
      id: `duration-${node.id}`,
      title: node.duration,
      detail: `${node.title} • ${node.stage}`,
      group: "Duration" as const,
      nodeId: node.id,
    })),
    ...careerResults,
  ];
  const normalizedQuery = paletteQuery.trim().toLowerCase();
  const matchingResults = commandResults.filter((result) => !normalizedQuery || `${result.title} ${result.detail} ${result.group}`.toLowerCase().includes(normalizedQuery));
  const groupedResults = ["Roadmaps", "Topics", "Resources", "Difficulty", "Duration", "Career Paths"].map((group) => ({
    group,
    results: matchingResults.filter((result) => result.group === group).slice(0, 8),
  }));
  const visibleResults = groupedResults.flatMap(({ results }) => results);

  const runResult = (result: CommandResult) => {
    if (result.nodeId && !result.href) {
      setQuery(result.title);
      onOpenNode(result.nodeId);
      setOpen(false);
      return;
    }

    if (result.href) {
      if (result.href.startsWith("/")) {
        router.push(result.href);
      } else {
        window.open(result.href, "_blank", "noopener,noreferrer");
      }
      setOpen(false);
      return;
    }

    setQuery(result.title);
    setOpen(false);
  };

  return (
    <div aria-modal="true" className="fixed inset-0 z-50 bg-black/75 px-4 py-10 backdrop-blur-sm" role="dialog">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-md border border-red-500/30 bg-[#050505] shadow-2xl shadow-red-950/30">
        <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
          <Icon className="h-5 w-5 text-red-400" name="search" />
          <input
            autoFocus
            className="h-11 min-w-0 flex-1 bg-transparent text-base font-bold text-white outline-none placeholder:text-zinc-600"
            onChange={(event) => setPaletteQuery(event.target.value)}
            placeholder="Search roadmaps, topics, resources, difficulty, duration..."
            type="search"
            value={paletteQuery}
          />
          <button className="rounded-md border border-zinc-800 px-3 py-2 text-xs font-black uppercase text-zinc-500 transition hover:border-red-500/50 hover:text-zinc-200" onClick={() => setOpen(false)} type="button">
            Esc
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-3">
          {visibleResults.length ? (
            groupedResults.map(({ group, results }) =>
              results.length ? (
                <section className="py-2" key={group}>
                  <h2 className="px-2 text-xs font-black uppercase tracking-widest text-zinc-600">{group}</h2>
                  <div className="mt-2 space-y-1">
                    {results.map((result) => (
                      <button className="grid w-full gap-1 rounded-md border border-transparent px-3 py-3 text-left transition hover:border-red-500/40 hover:bg-red-500/10" key={result.id} onClick={() => runResult(result)} type="button">
                        <span className="flex items-center justify-between gap-3">
                          <span className="font-black text-zinc-100">{result.title}</span>
                          <span className="rounded border border-zinc-800 px-2 py-1 text-[10px] font-black uppercase text-zinc-500">{result.group}</span>
                        </span>
                        <span className="line-clamp-2 text-sm leading-6 text-zinc-500">{result.detail}</span>
                      </button>
                    ))}
                  </div>
                </section>
              ) : null,
            )
          ) : (
            <section className="px-4 py-12 text-center">
              <Icon className="mx-auto h-8 w-8 text-red-400" name="search" />
              <p className="mt-3 text-lg font-black text-white">No command results</p>
              <p className="mt-2 text-sm text-zinc-500">Try searching a roadmap, topic, resource, difficulty, duration, or career path.</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export function RoadmapNodeCard({
  bookmarked,
  completed,
  expanded,
  isNext,
  index,
  miniProjectLabel,
  node,
  note,
  notesPlaceholder,
  onExpand,
  onNoteChange,
  onToggleBookmark,
  onToggleComplete,
  topicHref,
}: {
  bookmarked: boolean;
  completed: boolean;
  expanded: boolean;
  isNext: boolean;
  index: number;
  miniProjectLabel: string;
  node: RoadmapNode;
  note: string;
  notesPlaceholder?: string;
  onExpand: () => void;
  onNoteChange: (value: string) => void;
  onToggleBookmark: () => void;
  onToggleComplete: () => void;
  topicHref?: string;
}) {
  const detailsId = `${node.id}-details`;

  return (
    <article className="relative scroll-mt-24" id={`roadmap-node-${node.id}`}>
      <span className={`absolute left-0 top-7 z-10 grid h-12 w-12 place-items-center rounded-md border text-sm font-black ${completed ? "border-red-500 bg-red-500 text-white" : isNext ? "border-red-500/50 bg-[#050505] text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.25)]" : "border-zinc-800 bg-[#050505] text-zinc-300"}`}>
        {completed ? <Icon className="h-5 w-5" name="check" /> : String(index + 1).padStart(2, "0")}
      </span>
      <div className={`ml-7 rounded-md border bg-zinc-950/80 transition ${expanded ? "border-red-500/70" : isNext ? "border-red-500/40 hover:border-red-500/70 shadow-[0_0_20px_rgba(239,68,68,0.05)]" : "border-zinc-800 hover:border-red-500/40"}`}>
        <button aria-controls={detailsId} aria-expanded={expanded} aria-label={`${expanded ? "Collapse" : "Expand"} ${node.title}`} className="grid w-full gap-5 p-5 pl-10 text-left md:grid-cols-[minmax(0,1fr)_auto]" onClick={onExpand} type="button">
          <span>
            <span className="flex flex-wrap items-center gap-2">
              <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${stageClass(node.stage)}`}>{node.stage}</span>
              <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${difficultyClass(node.difficulty)}`}>{node.difficulty}</span>
              <span className="inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-black px-2.5 py-1 text-xs font-bold text-zinc-400">
                <Icon className="h-3.5 w-3.5 text-red-400" name="clock" />
                {node.duration}
              </span>
            </span>
            <span className="mt-3 block text-lg font-black text-white">{node.title}</span>
            <span className="mt-2 block max-w-3xl text-sm leading-6 text-zinc-400">{node.description}</span>
          </span>
          <span className="flex items-center gap-3 md:justify-end">
            <span className={completed ? "text-sm font-bold text-red-300" : isNext ? "text-sm font-black text-red-400" : "text-sm font-bold text-zinc-500"}>{completed ? "Complete" : isNext ? "Up Next" : "In progress"}</span>
            <Icon className={`h-5 w-5 text-zinc-500 transition ${expanded ? "rotate-90 text-red-400" : ""}`} name="arrow" />
          </span>
        </button>
        {expanded ? (
          <div className="border-t border-zinc-800 px-5 pb-5 pl-10" id={detailsId}>
            <div className="grid gap-5 pt-5 xl:grid-cols-[minmax(0,1fr)_270px]">
              <NodeMainContent node={node} note={note} notesPlaceholder={notesPlaceholder} onNoteChange={onNoteChange} />
              <NodeAside bookmarked={bookmarked} completed={completed} miniProjectLabel={miniProjectLabel} node={node} onToggleBookmark={onToggleBookmark} onToggleComplete={onToggleComplete} topicHref={topicHref} />
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function NodeMainContent({ node, note, notesPlaceholder, onNoteChange }: { node: RoadmapNode; note: string; notesPlaceholder?: string; onNoteChange: (value: string) => void }) {
  return (
    <div className="space-y-6">
      <TopicList title="Core Topics" items={node.topics} />
      <CheckList title="Skills Gained" items={node.skillsGained} icon="check" />
      {node.learningOutcomes?.length ? <CheckList title="Learning Outcomes" items={node.learningOutcomes} icon="badge" /> : null}
      <CheckList title="Practice Exercises" items={node.practiceExercises} icon="target" />
      <section className="rounded-md border border-zinc-800 bg-[#050505] p-4">
        <label className="flex items-center gap-2 text-sm font-black text-white" htmlFor={`${node.id}-notes`}>
          <Icon className="h-4 w-4 text-red-400" name="note" />
          Notes
        </label>
        <textarea
          className="mt-3 min-h-28 w-full resize-y rounded-md border border-zinc-800 bg-black p-3 text-sm leading-6 text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-red-500/70"
          id={`${node.id}-notes`}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder={notesPlaceholder ?? "Write implementation notes, links, or questions for this topic."}
          value={note}
        />
      </section>
    </div>
  );
}

function NodeAside({ bookmarked, completed, miniProjectLabel, node, onToggleBookmark, onToggleComplete, topicHref }: { bookmarked: boolean; completed: boolean; miniProjectLabel: string; node: RoadmapNode; onToggleBookmark: () => void; onToggleComplete: () => void; topicHref?: string }) {
  return (
    <aside className="space-y-5">
      {topicHref ? (
        <Link className="flex h-10 items-center justify-center gap-2 rounded-md border border-red-500/40 bg-red-500 px-3 text-sm font-black text-white transition hover:bg-red-400" href={topicHref}>
          Open topic page
          <Icon className="h-4 w-4" name="arrow" />
        </Link>
      ) : null}
      <section className="border-l border-red-500/40 pl-4">
        <h3 className="text-sm font-black text-white">Prerequisites</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {node.prerequisites.map((prerequisite) => (
            <span className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-black px-3 py-2 text-xs font-bold text-zinc-300" key={prerequisite}>
              <Icon className="h-3.5 w-3.5 text-red-400" name="lock" />
              {prerequisite}
            </span>
          ))}
        </div>
      </section>
      <SideText title={miniProjectLabel} text={node.miniProject} />
      {node.realWorldApplications?.length ? (
        <section className="border-l border-zinc-800 pl-4">
          <h3 className="text-sm font-black text-white">Real-World Applications</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {node.realWorldApplications.map((application) => (
              <li className="flex gap-2" key={application}>
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="server" />
                {application}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {node.quiz ? (
        <section className="rounded-md border border-red-500/20 bg-red-500/10 p-4">
          <h3 className="flex items-center gap-2 text-sm font-black text-white">
            <Icon className="h-4 w-4 text-red-300" name="quiz" />
            Quiz Prompt
          </h3>
          <p className="mt-2 text-sm leading-6 text-red-100">{node.quiz}</p>
        </section>
      ) : null}
      <ResourceLinks resources={node.resources} />
      <div className="flex flex-wrap gap-2">
        <button aria-pressed={completed} className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-bold transition ${completed ? "border-red-500 bg-red-500 text-white" : "border-zinc-800 bg-black text-zinc-300 hover:border-red-500/70"}`} onClick={onToggleComplete} type="button">
          <Icon className="h-4 w-4" name="check" />
          {completed ? "Completed" : "Mark complete"}
        </button>
        <button aria-pressed={bookmarked} className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-bold transition ${bookmarked ? "border-red-500/70 bg-red-500/15 text-red-200" : "border-zinc-800 bg-black text-zinc-300 hover:border-red-500/70"}`} onClick={onToggleBookmark} type="button">
          <Icon className="h-4 w-4" name="bookmark" />
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
    </aside>
  );
}

function TopicList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="text-sm font-black text-white">{title}</h3>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <span className="rounded-md border border-zinc-800 bg-[#050505] px-3 py-2 text-sm text-zinc-300" key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function CheckList({ title, items, icon }: { title: string; items: string[]; icon: keyof typeof icons }) {
  return (
    <section>
      <h3 className="text-sm font-black text-white">{title}</h3>
      <ul className="mt-3 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <li className="flex gap-3 text-sm leading-6 text-zinc-300" key={item}>
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name={icon} />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function SideText({ title, text }: { title: string; text: string }) {
  return (
    <section className="border-l border-zinc-800 pl-4">
      <h3 className="text-sm font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{text}</p>
    </section>
  );
}

function ResourceLinks({ resources }: { resources: Resource[] }) {
  return (
    <section>
      <h3 className="text-sm font-black text-white">Resources</h3>
      <div className="mt-3 space-y-2">
        {resources.map((resource) => (
          <a className="flex items-center justify-between rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/60 hover:text-white" href={resource.href} key={`${resource.href}-${resource.label}`} rel={resource.href.startsWith("http") ? "noreferrer" : undefined} target={resource.href.startsWith("http") ? "_blank" : undefined}>
            <span>{resource.label}</span>
            <Icon className="h-4 w-4 text-red-400" name="arrow" />
          </a>
        ))}
      </div>
    </section>
  );
}

export function ResourceMatrix({ title, resourcesByCategory }: { title: string; resourcesByCategory: Array<{ category: string; resources: Resource[] }> }) {
  return (
    <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
      <h2 className="text-2xl font-black text-white">{title}</h2>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {resourcesByCategory.map(({ category, resources }) => (
          <section className="border-t border-zinc-800 pt-4" key={category}>
            <h3 className="text-sm font-black text-white">{category}</h3>
            <div className="mt-3 space-y-2">
              {resources.map((resource) => (
                <a className="flex items-center justify-between rounded-md border border-zinc-800 bg-[#050505] px-3 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/60 hover:text-white" href={resource.href} key={`${category}-${resource.label}`} rel={resource.href.startsWith("http") ? "noreferrer" : undefined} target={resource.href.startsWith("http") ? "_blank" : undefined}>
                  {resource.label}
                  <Icon className="h-4 w-4 text-red-400" name="arrow" />
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export function CareerPathPanel({ title, description, paths }: { title: string; description: string; paths: RoadmapPath[] }) {
  return (
    <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
      <h2 className="text-2xl font-black text-white">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">{description}</p>
      <PathGrid paths={paths} />
    </section>
  );
}

export function CertificationPanel({ title, description, certifications }: { title: string; description: string; certifications: RoadmapPath[] }) {
  return (
    <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
      <h2 className="text-2xl font-black text-white">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">{description}</p>
      <PathGrid paths={certifications} columns="xl:grid-cols-4" />
    </section>
  );
}

function PathGrid({ paths, columns = "xl:grid-cols-3" }: { paths: RoadmapPath[]; columns?: string }) {
  return (
    <div className={`mt-6 grid gap-4 md:grid-cols-2 ${columns}`}>
      {paths.map((path) => (
        <section className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={path.title}>
          <h3 className="text-sm font-black text-white">{path.title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{path.focus}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {path.milestones.map((milestone) => (
              <span className="rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-200" key={milestone}>{milestone}</span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function LearningTools({ title, cards }: { title: string; cards: Array<[string, string]> }) {
  return (
    <section className="mt-6 grid gap-5 xl:grid-cols-[1fr_1fr]">
      <section className="rounded-md border border-zinc-800 bg-zinc-950 p-5">
        <h2 className="text-2xl font-black text-white">{title}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {cards.map(([cardTitle, detail]) => (
            <article className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={cardTitle}>
              <h3 className="text-sm font-black text-white">{cardTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{detail}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function ProgressSchema({ title, rows }: { title: string; rows: Array<[string, string]> }) {
  return (
    <section className="-mt-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
      <div />
      <section className="rounded-md border border-zinc-800 bg-zinc-950 p-5">
        <h2 className="text-2xl font-black text-white">{title}</h2>
        <div className="mt-6 space-y-3">
          {rows.map(([table, columns]) => (
            <article className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={table}>
              <h3 className="font-mono text-sm font-black text-red-300">{table}</h3>
              <p className="mt-2 font-mono text-xs leading-6 text-zinc-400">{columns}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function ArchitectureCards({ cards }: { cards: Array<[string, string]> }) {
  return (
    <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
      <h2 className="text-2xl font-black text-white">Scalable Page Architecture</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {cards.map(([title, detail]) => (
          <section className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={title}>
            <h3 className="text-sm font-black text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{detail}</p>
          </section>
        ))}
      </div>
    </section>
  );
}

export function ProgressDashboard({
  badges,
  bookmarkedCount,
  completedCount,
  currentLevel,
  estimatedTime,
  missingTitle,
  missingTopics,
  nextNode,
  noteCount,
  progressPercentage,
  progressTitle,
  readiness,
  readinessTitle,
  setExpandedNodeId,
  stageProgress,
  totalNodes,
}: {
  badges: string[];
  bookmarkedCount: number;
  completedCount: number;
  currentLevel: Stage;
  estimatedTime: string;
  missingTitle: string;
  missingTopics: string[];
  nextNode: RoadmapNode;
  noteCount: number;
  progressPercentage: number;
  progressTitle: string;
  readiness: Array<ReadinessMetric & { percentage: number }>;
  readinessTitle: string;
  setExpandedNodeId: (id: string) => void;
  stageProgress: Array<StageSummary & { completed: number; total: number; percentage: number }>;
  totalNodes: number;
}) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
      <SidebarPanel title="Roadmap Progress">
        <div className="mt-5 flex items-center gap-5">
          <ProgressRing percentage={progressPercentage} />
          <div>
            <p className="text-3xl font-black text-white">{completedCount}/{totalNodes}</p>
            <p className="mt-1 text-sm text-zinc-500">topics completed</p>
            <p className="mt-4 text-sm font-bold text-red-300">{progressPercentage}% complete</p>
          </div>
        </div>
      </SidebarPanel>
      <SidebarPanel title="Learning Streak">
        <div className="mt-4 flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-md border border-red-500/30 bg-red-500/10 text-red-300">
            <Icon className="h-6 w-6" name="flame" />
          </span>
          <div>
            <p className="text-2xl font-black text-white">5 days</p>
            <p className="text-sm text-zinc-500">current streak</p>
          </div>
        </div>
      </SidebarPanel>
      <SidebarPanel title="Recommended Next Step">
        <div className="mt-4">
          <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-bold ${difficultyClass(nextNode.difficulty)}`}>{nextNode.difficulty}</span>
          <h3 className="mt-3 text-lg font-black text-white">{nextNode.title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{nextNode.description}</p>
          <button className="mt-4 inline-flex items-center gap-2 rounded-md border border-red-500/40 bg-red-500 px-4 py-2 text-sm font-black text-white transition hover:bg-red-400" onClick={() => setExpandedNodeId(nextNode.id)} type="button">
            Open topic
            <Icon className="h-4 w-4" name="arrow" />
          </button>
        </div>
      </SidebarPanel>
      <SidebarPanel title={progressTitle}>
        <div className="mt-4 space-y-4">
          {stageProgress.map((stage) => (
            <div key={stage.stage}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-zinc-300">{stage.stage}</span>
                <span className="text-zinc-500">{stage.percentage}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-900">
                <div className="h-full rounded-full bg-red-500" style={{ width: `${stage.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </SidebarPanel>
      <SidebarPanel title={readinessTitle}>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {readiness.map((metric) => (
            <div className="rounded-md border border-zinc-800 bg-[#050505] p-3" key={metric.label}>
              <Icon className="h-4 w-4 text-red-400" name={metric.icon} />
              <p className="mt-2 text-lg font-black text-white">{metric.percentage}%</p>
              <p className="mt-1 text-xs text-zinc-500">{metric.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-zinc-500">
          <span>{currentLevel} phase active</span>
          <span>{estimatedTime} estimated</span>
          <span>{bookmarkedCount} bookmarks</span>
          <span>{noteCount} notes saved</span>
          <span>{completedCount} topics completed</span>
        </div>
      </SidebarPanel>
      <SidebarPanel title="Achievement Badges">
        <div className="mt-4 grid gap-3">
          {badges.map((badge, index) => (
            <div className={`flex items-center gap-3 rounded-md border p-3 ${completedCount > index * 6 ? "border-red-500/40 bg-red-500/10 text-red-100" : "border-zinc-800 bg-[#050505] text-zinc-500"}`} key={badge}>
              <Icon className="h-5 w-5" name="badge" />
              <span className="text-sm font-bold">{badge}</span>
            </div>
          ))}
        </div>
      </SidebarPanel>
      <SidebarPanel title={missingTitle}>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
          {missingTopics.map((topic) => (
            <li className="flex gap-3" key={topic}>
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="check" />
              {topic}
            </li>
          ))}
        </ul>
      </SidebarPanel>
    </aside>
  );
}

function ProgressRing({ percentage }: { percentage: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <div className="relative grid h-28 w-28 place-items-center">
      <svg aria-hidden="true" className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
        <circle className="stroke-zinc-900" cx="50" cy="50" fill="none" r={radius} strokeWidth="8" />
        <circle className="stroke-red-500" cx="50" cy="50" fill="none" r={radius} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" strokeWidth="8" />
      </svg>
      <span className="absolute text-2xl font-black text-white">{percentage}%</span>
    </div>
  );
}

function SidebarPanel({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="rounded-md border border-zinc-800 bg-zinc-950/90 p-5">
      <h2 className="text-sm font-black text-white">{title}</h2>
      {children}
    </section>
  );
}
