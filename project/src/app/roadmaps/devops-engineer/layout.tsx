import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createRoadmapMetadata, RoadmapJsonLd } from "../../../lib/roadmapSeo";

export const metadata: Metadata = createRoadmapMetadata("devops-engineer");

export default function RoadmapLayout({ children }: { children: ReactNode }) {
  return <RoadmapJsonLd slug="devops-engineer">{children}</RoadmapJsonLd>;
}
