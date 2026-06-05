import { RoadmapPageShell } from "../../../components/roadmap/RoadmapPageShell";
import { devopsRoadmap } from "../../../data/roadmaps/devops";

export default function DevopsRoadmapPage() {
  return <RoadmapPageShell {...devopsRoadmap} />;
}
