import type { Metadata } from "next";
import type { ReactNode } from "react";

type RoadmapSeo = {
  audience: string;
  description: string;
  duration: string;
  keywords: string[];
  slug: string;
  title: string;
  topics: string[];
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://demon-tech-roadmap.vercel.app";
const ogImage = "/roadmap-journey-bg.png";

export const roadmapSeo: Record<string, RoadmapSeo> = {
  "backend-developer": {
    audience: "Backend developers and server-side engineers",
    description: "Learn backend development with a professional path through web fundamentals, APIs, databases, authentication, system design, cloud, DevOps, security, and production engineering.",
    duration: "46-68 weeks",
    keywords: ["backend developer roadmap", "API development", "databases", "system design", "backend engineering"],
    slug: "backend-developer",
    title: "Backend Developer Roadmap",
    topics: ["Internet Fundamentals", "Databases", "API Development", "Authentication", "System Design", "Cloud Platforms"],
  },
  css: {
    audience: "Frontend developers learning CSS",
    description: "Master CSS from selectors and layout fundamentals to responsive design, animations, architecture, and production styling workflows.",
    duration: "8-12 weeks",
    keywords: ["CSS roadmap", "CSS3", "responsive design", "CSS Grid", "frontend styling"],
    slug: "css",
    title: "CSS Roadmap",
    topics: ["CSS Basics", "Selectors", "Box Model", "Flexbox", "CSS Grid", "Responsive Design"],
  },
  "data-scientist": {
    audience: "Data scientists, analysts, and machine learning learners",
    description: "Follow a project-based data science roadmap covering Python, statistics, analytics, machine learning, deep learning, MLOps, big data, GenAI, and research.",
    duration: "82-112 weeks",
    keywords: ["data scientist roadmap", "machine learning", "Python data science", "MLOps", "GenAI"],
    slug: "data-scientist",
    title: "Data Scientist Roadmap",
    topics: ["Python", "Statistics", "Machine Learning", "Deep Learning", "MLOps", "Generative AI"],
  },
  "devops-engineer": {
    audience: "DevOps engineers, SREs, and platform engineers",
    description: "Build DevOps skill through Linux, networking, CI/CD, Docker, Kubernetes, cloud platforms, observability, DevSecOps, SRE, and platform engineering.",
    duration: "78-108 weeks",
    keywords: ["DevOps roadmap", "Kubernetes", "Docker", "CI/CD", "SRE", "platform engineering"],
    slug: "devops-engineer",
    title: "DevOps Engineer Roadmap",
    topics: ["Linux", "Networking", "CI/CD", "Docker", "Kubernetes", "Cloud", "SRE"],
  },
  "frontend-developer": {
    audience: "Frontend developers and web UI engineers",
    description: "A professional frontend developer roadmap covering browser fundamentals, HTML, CSS, JavaScript, TypeScript, React, Next.js, testing, accessibility, performance, and deployment.",
    duration: "40-52 weeks",
    keywords: ["frontend developer roadmap", "React roadmap", "Next.js roadmap", "JavaScript", "web development"],
    slug: "frontend-developer",
    title: "Frontend Developer Roadmap",
    topics: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Accessibility"],
  },
  "full-stack-developer": {
    audience: "Full stack developers and product engineers",
    description: "Learn full stack development across frontend, backend, databases, authentication, DevOps, cloud, system design, production engineering, and technical leadership.",
    duration: "76-102 weeks",
    keywords: ["full stack developer roadmap", "frontend backend roadmap", "Next.js", "databases", "DevOps"],
    slug: "full-stack-developer",
    title: "Full Stack Developer Roadmap",
    topics: ["Frontend", "Backend", "Databases", "Authentication", "DevOps", "System Design"],
  },
  git: {
    audience: "Developers learning version control",
    description: "Learn Git from daily commands and commits to branching, remotes, pull requests, rebasing, recovery, tags, and collaboration workflows.",
    duration: "2-4 weeks",
    keywords: ["Git roadmap", "version control", "GitHub", "branching", "pull requests"],
    slug: "git",
    title: "Git Roadmap",
    topics: ["Git Basics", "Commits", "Branches", "Remotes", "Pull Requests", "Recovery"],
  },
  html5: {
    audience: "Beginners learning web development",
    description: "Learn HTML5 structure, semantic elements, forms, media, accessibility, SEO fundamentals, and production-ready document patterns.",
    duration: "3-5 weeks",
    keywords: ["HTML5 roadmap", "semantic HTML", "web accessibility", "HTML forms", "web development"],
    slug: "html5",
    title: "HTML5 Roadmap",
    topics: ["HTML Syntax", "Semantic HTML", "Forms", "Media", "Accessibility", "SEO"],
  },
  javascript: {
    audience: "JavaScript learners and web developers",
    description: "Master JavaScript from fundamentals through arrays, objects, DOM, async programming, modules, APIs, tooling, patterns, and advanced language concepts.",
    duration: "10-16 weeks",
    keywords: ["JavaScript roadmap", "learn JavaScript", "DOM", "async JavaScript", "ECMAScript"],
    slug: "javascript",
    title: "JavaScript Roadmap",
    topics: ["Variables", "Functions", "Objects", "DOM", "Async JavaScript", "Modules"],
  },
  "mobile-developer": {
    audience: "Mobile app developers and cross-platform engineers",
    description: "A production mobile developer roadmap covering Android, iOS, Flutter, React Native, architecture, backend integration, security, performance, testing, and app releases.",
    duration: "88-120 weeks",
    keywords: ["mobile developer roadmap", "Android", "iOS", "Flutter", "React Native", "app development"],
    slug: "mobile-developer",
    title: "Mobile Developer Roadmap",
    topics: ["Android", "iOS", "Flutter", "React Native", "Mobile Architecture", "App Store Deployment"],
  },
  nextjs: {
    audience: "React and Next.js developers",
    description: "Learn Next.js with App Router, layouts, server components, routing, data fetching, rendering, API routes, authentication, optimization, and deployment.",
    duration: "6-10 weeks",
    keywords: ["Next.js roadmap", "App Router", "React Server Components", "Next.js deployment"],
    slug: "nextjs",
    title: "Next.js Roadmap",
    topics: ["App Router", "Layouts", "Server Components", "Data Fetching", "API Routes", "Deployment"],
  },
  python: {
    audience: "Python beginners and software developers",
    description: "Learn Python from syntax and data structures to functions, OOP, modules, async, packaging, testing, PEP 8, and production workflows.",
    duration: "8-14 weeks",
    keywords: ["Python roadmap", "learn Python", "Python OOP", "async Python", "Python testing"],
    slug: "python",
    title: "Python Roadmap",
    topics: ["Python Syntax", "Data Structures", "Functions", "OOP", "Async", "Testing"],
  },
  react: {
    audience: "Frontend developers learning React",
    description: "Learn React through components, JSX, props, state, hooks, effects, forms, routing, performance, testing, and application architecture.",
    duration: "8-12 weeks",
    keywords: ["React roadmap", "React hooks", "frontend development", "React components", "React testing"],
    slug: "react",
    title: "React Roadmap",
    topics: ["Components", "JSX", "Props", "State", "Hooks", "Routing", "Testing"],
  },
  sass: {
    audience: "Frontend developers improving CSS architecture",
    description: "Learn Sass and SCSS with variables, nesting, mixins, functions, modules, partials, architecture, and maintainable stylesheet systems.",
    duration: "2-4 weeks",
    keywords: ["Sass roadmap", "SCSS", "CSS architecture", "mixins", "frontend styling"],
    slug: "sass",
    title: "Sass Roadmap",
    topics: ["Variables", "Nesting", "Mixins", "Functions", "Modules", "Architecture"],
  },
  tailwind: {
    audience: "Frontend developers building with Tailwind CSS",
    description: "Learn Tailwind CSS utility-first workflows, responsive design, theming, component composition, variants, customization, and production practices.",
    duration: "3-6 weeks",
    keywords: ["Tailwind roadmap", "Tailwind CSS", "utility-first CSS", "responsive design"],
    slug: "tailwind",
    title: "Tailwind CSS Roadmap",
    topics: ["Utilities", "Responsive Design", "Theme", "Variants", "Components", "Customization"],
  },
  typescript: {
    audience: "JavaScript developers learning TypeScript",
    description: "Learn TypeScript from types and interfaces to generics, narrowing, utility types, configuration, React integration, and scalable application architecture.",
    duration: "6-10 weeks",
    keywords: ["TypeScript roadmap", "learn TypeScript", "generics", "interfaces", "typed JavaScript"],
    slug: "typescript",
    title: "TypeScript Roadmap",
    topics: ["Types", "Interfaces", "Generics", "Narrowing", "Utility Types", "React TypeScript"],
  },
};

export function createRoadmapMetadata(slug: string): Metadata {
  const roadmap = roadmapSeo[slug];
  const url = `/roadmaps/${slug}`;

  return {
    title: roadmap.title,
    description: roadmap.description,
    keywords: roadmap.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${roadmap.title} | Demon Tech Roadmap`,
      description: roadmap.description,
      images: [
        {
          alt: `${roadmap.title} preview`,
          height: 630,
          url: ogImage,
          width: 1200,
        },
      ],
      siteName: "Demon Tech Roadmap",
      type: "article",
      url,
    },
    metadataBase: new URL(siteUrl),
    twitter: {
      card: "summary_large_image",
      title: `${roadmap.title} | Demon Tech Roadmap`,
      description: roadmap.description,
      images: [ogImage],
    },
  };
}

export function RoadmapJsonLd({ children, slug }: { children: ReactNode; slug: string }) {
  const roadmap = roadmapSeo[slug];
  const url = `${siteUrl}/roadmaps/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    audience: {
      "@type": "Audience",
      audienceType: roadmap.audience,
    },
    courseCode: `demontech-${slug}`,
    description: roadmap.description,
    educationalLevel: roadmap.audience,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: roadmap.duration,
      url,
    },
    image: `${siteUrl}${ogImage}`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    name: roadmap.title,
    provider: {
      "@type": "Organization",
      name: "Demon Tech Roadmap",
      url: siteUrl,
    },
    teaches: roadmap.topics,
    url,
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      {children}
    </>
  );
}
