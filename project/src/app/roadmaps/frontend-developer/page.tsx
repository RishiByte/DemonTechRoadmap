import { RoadmapPageShell } from "../../../components/roadmap/RoadmapPageShell";
import { frontendRoadmap } from "../../../data/roadmaps/frontend";

export default function FrontendRoadmapPage() {
  return <RoadmapPageShell {...frontendRoadmap} />;
}
