import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "../../data/projects";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/Button";

export function ProjectsSection() {
  return (
    <section id="projects" className="section-py" aria-label="Projects">
      <div className="section-container">
        <SectionHeader
          label="// projects/"
          title="Repositories"
          description="Security-focused projects documented on GitHub — built to learn, not to impress."
        />

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: index * 0.07,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="repo-card group flex flex-col p-5 md:p-6 h-full"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <FaGithub
                    className="w-4 h-4 text-text-muted shrink-0 group-hover:text-text-primary transition-colors"
                    aria-hidden="true"
                  />
                  <h3 className="font-mono text-sm text-accent-blue group-hover:text-primary transition-colors truncate">
                    {project.repoName}
                  </h3>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-text-muted border border-border rounded-full px-2 py-0.5">
                  {project.visibility ?? "Public"}
                </span>
              </div>

              {project.featured && (
                <span className="inline-flex items-center gap-1 w-fit font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 rounded-md px-2 py-0.5 mb-3">
                  <Star className="w-2.5 h-2.5" aria-hidden="true" />
                  pinned
                </span>
              )}

              <p className="text-text-muted text-sm leading-relaxed flex-1 mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono text-text-muted bg-bg-primary/80 border border-border/60 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                <span className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: project.languageColor }}
                    aria-hidden="true"
                  />
                  {project.language}
                </span>

                <div className="flex gap-2">
                  <Button
                    href={project.githubUrl}
                    variant="ghost"
                    external
                    className="text-xs py-1.5 px-3"
                  >
                    <FaGithub className="w-3 h-3" aria-hidden="true" />
                    Code
                  </Button>
                  {project.liveUrl && (
                    <Button
                      href={project.liveUrl}
                      variant="ghost"
                      external
                      className="text-xs py-1.5 px-3"
                    >
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      Demo
                    </Button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
