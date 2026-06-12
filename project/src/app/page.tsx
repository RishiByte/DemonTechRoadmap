import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import HomeHeader, { Logo } from "@/src/components/HomeHeader";
import ContributorLeaderboard from "@/src/components/ContributorLeaderboard";
import SocialProof from "@/src/components/SocialProof";
import Testimonials from "@/src/components/Testimonials";
import RoadmapQuiz from "@/src/components/RoadmapQuiz";
import NewsletterForm from "@/src/components/NewsletterForm";
import ScrollReveal from "@/src/components/ScrollReveal";

const audiences = [
  {
    title: "Choose a path",
    text: "Start with the track that matches your goal, then follow the next topic without guessing.",
  },
  {
    title: "Build projects",
    text: "Turn each major concept into portfolio proof with project prompts and practical checkpoints.",
  },
  {
    title: "Grow with feedback",
    text: "Use notes, bookmarks, progress tracking, and community support to keep momentum visible.",
  },
];

const roadmaps = [
  { title: "Frontend", href: "/roadmaps/frontend-developer", steps: ["HTML", "CSS", "JavaScript", "React", "Next.js"] },
  { title: "Backend", href: "/roadmaps/backend-developer", steps: ["Internet", "APIs", "Databases", "Auth", "Deploy"] },
  { title: "DevOps", href: "/roadmaps/devops-engineer", steps: ["Linux", "CI/CD", "Docker", "Kubernetes", "Cloud"] },
];

const icons: Record<string, ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  lock: <path d="M7 11V8a5 5 0 0 1 10 0v3m-12 0h14v10H5V11Zm7 5v2" />,
  mail: <path d="M4 6h16v12H4V6Zm0 0 8 7 8-7" />,
  route: <path d="M5 7h6a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h10M5 7l3-3M5 7l3 3m11 9-3-3m3 3-3 3" />,
};

function Icon({ className = "", name }: { className?: string; name: keyof typeof icons }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {icons[name]}
    </svg>
  );
}

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[#050505] text-zinc-100">
      <HomeHeader />

      <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden">
        <Image
          alt="Roadmap journey background"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-20"
          fill
          priority
          src="/roadmap-journey-bg.png"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.95)_42%,rgba(5,5,5,0.85)_100%)]" />
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 lg:grid-cols-[1fr_460px] lg:px-8 lg:py-20">
          <div className="flex max-w-3xl flex-col justify-center">
            <p className="mb-5 inline-flex w-fit rounded-md border border-red-500/35 bg-red-500/10 px-3 py-1 text-sm font-black text-red-300">
              Stop tutorial hopping. Learn with a roadmap.
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              DemonTech Roadmap
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Structured roadmaps, curated resources, progress tracking, and project prompts for beginners who want to stop collecting tabs and start building real skills.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-red-500 px-5 text-sm font-black text-white transition hover:bg-red-400" href="/docs/all-roadmaps">
                Browse Roadmaps
                <Icon className="h-4 w-4" name="arrow" />
              </Link>
              <Link className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-zinc-700 bg-black/35 px-5 text-sm font-black text-white transition hover:border-zinc-500" href="/dashboard">
                Track Progress
                <Icon className="h-4 w-4" name="lock" />
              </Link>
            </div>
            
            {/* Social Proof (Live stars) */}
            <div className="mt-10">
              <SocialProof />
            </div>
          </div>

          <div className="self-end rounded-lg border border-zinc-800 bg-black/70 p-5 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-cyan-300" name="route" />
              <h2 className="text-base font-black text-white">Visual roadmap flow</h2>
            </div>
            <div className="mt-5 space-y-5">
              {roadmaps.map((roadmap) => (
                <Link className="block rounded-md border border-zinc-800 bg-zinc-950/80 p-4 transition hover:border-red-500/60" href={roadmap.href} key={roadmap.title}>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-black text-white">{roadmap.title}</h3>
                    <Icon className="h-4 w-4 text-red-400" name="arrow" />
                  </div>
                  <div className="mt-5 flex items-center justify-between relative">
                    <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-zinc-800" />
                    {roadmap.steps.map((step, index) => (
                      <div className="relative z-10 grid h-8 px-2 place-items-center rounded-md border-2 border-zinc-700 bg-black text-center text-[10px] font-bold text-zinc-300 shadow-sm" key={step}>
                        {step}
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <ScrollReveal>
        <section className="border-y border-zinc-900 bg-zinc-950 px-5 py-14 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black text-red-400">Who is this for?</p>
                <h2 className="mt-3 text-3xl font-black text-white">A practical path for self-taught builders</h2>
              </div>
              <Link className="inline-flex h-11 w-fit items-center gap-2 rounded-md border border-zinc-700 px-4 text-sm font-black text-zinc-100 transition hover:border-red-500" href="/docs/common-questions">
                Read FAQ
                <Icon className="h-4 w-4" name="arrow" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {audiences.map((item, index) => (
                <article className="rounded-lg border border-zinc-800 bg-[#090909] p-6" key={item.title}>
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-red-500 text-sm font-black text-white">{index + 1}</span>
                  <h3 className="mt-5 text-lg font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
      
      <ScrollReveal>
        <section className="px-5 py-16 lg:px-8 bg-[#050505]">
          <div className="mx-auto max-w-[1280px]">
            <RoadmapQuiz />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal>
        <section className="px-5 py-16 lg:px-8">
          <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-[#090909] p-6">
              <Icon className="h-8 w-8 text-emerald-300" name="check" />
              <h2 className="mt-5 text-2xl font-black text-white">Your progress has a home</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                The dashboard brings completed topics, bookmarks, notes, streaks, and next steps into one place so learners can continue from where they left off.
              </p>
              <Link className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-white px-4 text-sm font-black text-black transition hover:bg-zinc-200" href="/dashboard">
                Open Dashboard
                <Icon className="h-4 w-4" name="arrow" />
              </Link>
            </div>

            <NewsletterForm />
          </div>
        </section>
      </ScrollReveal>

      {/* Community Leaderboard */}
      <ScrollReveal>
        <ContributorLeaderboard />
      </ScrollReveal>

      <footer className="border-t border-zinc-900 bg-black px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-500">
              Open-source learning roadmaps for developers who want structure, projects, and community.
            </p>
          </div>
          <nav className="grid gap-3 text-sm font-bold text-zinc-400 sm:grid-cols-2 md:grid-cols-3">
            <Link className="hover:text-white" href="/docs/about-demontech">About</Link>
            <Link className="hover:text-white" href="https://github.com/Demon-Die/DemonTechRoadmap">GitHub</Link>
            <Link className="hover:text-white" href="https://github.com/orgs/Demon-Die/projects/1">Public Roadmap</Link>
            <Link className="hover:text-white" href="https://discord.gg/yWtjK2Tb8T">Discord</Link>
            <Link className="hover:text-white" href="/docs/common-questions">Contact</Link>
            <Link className="hover:text-white" href="/privacy">Privacy Policy</Link>
            <Link className="hover:text-white" href="/terms">Terms</Link>
            <Link className="hover:text-white" href="/docs/changelog">Changelog</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
