import { motion } from "framer-motion";
import { personal } from "../../data/personal";
import { SectionHeader } from "../ui/SectionHeader";
import { TerminalWindow } from "../ui/TerminalWindow";

const aboutContent = `# Who I Am

I'm ${personal.name}, an Artificial Intelligence and Data Science undergraduate at Sri Krishna College of Technology, Tamil Nadu, India. I'm passionate about exploring Artificial Intelligence, Machine Learning, and Cybersecurity while building practical projects and improving my technical skills.

# Academic Snapshot

B.Tech in Artificial Intelligence and Data Science | Expected Graduation: ${personal.graduation} | CGPA: ${personal.cgpa}

# What Interests Me

I'm equally interested in Artificial Intelligence and Cybersecurity. Currently, I'm focusing on AI, Machine Learning, and intelligent applications while also exploring network security, ethical hacking, and cybersecurity fundamentals.

# How I Learn

I believe in learning by building. I explore new technologies, work on hands-on projects, experiment with different tools, and continuously strengthen my fundamentals through practical experience.

# My Goal

My goal is to grow as a technology professional with strong foundations in Artificial Intelligence and Cybersecurity, and develop innovative solutions that combine both fields.

I share my projects, experiments, and learning journey through GitHub.`;

export function AboutSection() {
  return (
    <section id="about" className="section-py" aria-labelledby="about-heading">
      <div className="section-container">
        <SectionHeader
          label="// about.md"
          title="About Me"
          description="Understanding the person behind the terminal."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <TerminalWindow title="cat about.md" variant="kali">
            <p className="text-primary mb-4">
              <span className="text-text-muted">$</span> cat about.md
            </p>
            <div className="space-y-6 text-text-muted leading-relaxed">
              {aboutContent.split("\n\n").map((block, i) => {
                if (block.startsWith("# ")) {
                  return (
                    <h3
                      key={i}
                      id={i === 0 ? "about-heading" : undefined}
                      className="text-accent-blue font-semibold text-base"
                    >
                      {block.replace("# ", "")}
                    </h3>
                  );
                }
                return (
                  <p key={i} className="text-sm md:text-base">
                    {block}
                  </p>
                );
              })}
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
}
