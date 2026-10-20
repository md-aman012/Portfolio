import { projects } from "@/data/projects";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <section id="work" className="section-padding section-border">
      <div className="container-main">
        <Reveal>
          <Eyebrow number="02" label="SELECTED WORK" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-section max-w-2xl">
            Ideas are a start. <em className="accent-italic">This is the work.</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.09} className="h-full">
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
