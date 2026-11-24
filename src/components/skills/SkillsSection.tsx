import { motion } from "framer-motion";
import { skillCategories } from "../../data/skills";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { cn } from "../../utils/cn";

function SkillCard({
  name,
  icon: Icon,
  index,
}: {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="gradient-border group cursor-default"
    >
      <div className="flex items-center gap-3.5 p-4 rounded-[inherit]">
        <div className="relative p-2.5 rounded-xl bg-bg-primary border border-border group-hover:border-primary/40 transition-all duration-300 group-hover:shadow-[0_0_20px_-4px_rgba(61,255,154,0.3)]">
          <Icon className="w-5 h-5 text-text-muted group-hover:text-primary group-hover:scale-125 group-hover:-rotate-6 transition-all duration-300" />
        </div>
        <div>
          <span className="font-mono text-sm text-text-primary block">{name}</span>
          <span className="font-mono text-[10px] text-text-muted/70">proficient</span>
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section-py bg-bg-secondary/20" aria-label="Skills">
      <div className="section-container">
        <SectionHeader
          label="// skills.json"
          title="Technical Arsenal"
          description="Languages, tools, and platforms I work with."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.08, duration: 0.5 }}
            >
              <GlassCard
                hover
                glow="blue"
                className="p-6 md:p-7 border border-border/60 h-full"
              >
                <div className="flex items-center gap-3.5 mb-7 pb-5 border-b border-border/50">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <category.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-text-primary">
                      {category.title}
                    </h3>
                    <p className="font-mono text-[10px] text-text-muted mt-0.5">
                      {category.skills.length} modules loaded
                    </p>
                  </div>
                </div>

                <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-3")}>
                  {category.skills.map((skill, i) => (
                    <SkillCard
                      key={skill.name}
                      name={skill.name}
                      icon={skill.icon}
                      index={i}
                    />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
