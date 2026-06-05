import { RoadmapPageShell } from "../../../components/roadmap/RoadmapPageShell";
import { backendRoadmap } from "../../../data/roadmaps/backend";

export default function BackendRoadmapPage() {
  return <RoadmapPageShell {...backendRoadmap} />;
}
