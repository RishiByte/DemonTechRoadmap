import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createRoadmapMetadata, RoadmapJsonLd } from "../../../lib/roadmapSeo";

export const metadata: Metadata = createRoadmapMetadata("css");

export default function RoadmapLayout({ children }: { children: ReactNode }) {
  return <RoadmapJsonLd slug="css">{children}</RoadmapJsonLd>;
}
