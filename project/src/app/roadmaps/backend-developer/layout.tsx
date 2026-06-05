import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createRoadmapMetadata, RoadmapJsonLd } from "../../../lib/roadmapSeo";

export const metadata: Metadata = createRoadmapMetadata("backend-developer");

export default function RoadmapLayout({ children }: { children: ReactNode }) {
  return <RoadmapJsonLd slug="backend-developer">{children}</RoadmapJsonLd>;
}
