import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createRoadmapMetadata, RoadmapJsonLd } from "../../../lib/roadmapSeo";

export const metadata: Metadata = createRoadmapMetadata("full-stack-developer");

export default function RoadmapLayout({ children }: { children: ReactNode }) {
  return <RoadmapJsonLd slug="full-stack-developer">{children}</RoadmapJsonLd>;
}
