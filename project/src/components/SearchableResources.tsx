"use client";

import React, { useMemo, useState } from "react";
import { ResourceCard, Sidebar } from ".";
import resources from "../data/resources";

const ALL_CATEGORIES = "all";

export default function SearchableResources() {
  const [q, setQ] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  const normalized = (value?: string) => (value || "").toLowerCase();

  const categories = useMemo(() => {
    const counts = new Map<string, number>();

    resources.forEach((resource) => {
      (resource.tags ?? ["uncategorized"]).forEach((tag) => {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      });
    });

    return [
      { id: ALL_CATEGORIES, label: "All resources", count: resources.length },
      ...Array.from(counts.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([tag, count]) => ({
          id: tag,
          label: tag.replace(/-/g, " "),
          count,
        })),
    ];
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();

    const matchesCategory = (resourceTags?: string[]) => {
      if (activeCategory === ALL_CATEGORIES) return true;
      return (resourceTags ?? []).some((tag) => tag.toLowerCase() === activeCategory);
    };

    if (term === "") {
      return resources.filter((resource) => matchesCategory(resource.tags));
    }

    return resources.filter((resource) => {
      if (!matchesCategory(resource.tags)) return false;
      if (normalized(resource.title).includes(term)) return true;
      if (normalized(resource.description).includes(term)) return true;
      if (resource.tags && resource.tags.some((tag) => tag.toLowerCase().includes(term))) {
        return true;
      }
      return false;
    });
  }, [activeCategory, q]);

  const hasSearchTerm = q.trim().length > 0;

  return (
    <section className="mt-6 w-full">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">
            Browse resources
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Filter by category or search by keyword to narrow the list.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-950 focus-within:ring-4 focus-within:ring-cyan-300/50 focus-within:border-cyan-400 dark:focus-within:border-cyan-500">
          <label htmlFor="search" className="sr-only">
            Search roadmaps and topics
          </label>
          <input
            id="search"
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Search by keyword"
            className="w-full min-w-0 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 dark:text-white"
          />
          <div className="shrink-0 text-sm font-semibold text-slate-500 dark:text-slate-400">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <Sidebar
          title="Categories"
          description="Choose a topic to focus the learning list."
          items={categories}
          activeId={activeCategory}
          onSelect={setActiveCategory}
        />

        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                description={resource.description}
                href={resource.href}
                tags={resource.tags}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
              {hasSearchTerm
                ? `No results for "${q}" in this category. Try a different keyword or switch categories.`
                : "No resources found in this category. Try a different category or reset your filters."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
