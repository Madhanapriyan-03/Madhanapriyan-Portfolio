import { motion } from "framer-motion";
import { Mail, Download, MapPin, Terminal, Clock } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personal } from "../../data/personal";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/Button";
import { GlassCard } from "../ui/GlassCard";
import { TerminalWindow } from "../ui/TerminalWindow";
import { KaliPrompt } from "../ui/KaliPrompt";

const contactLinks = [
  {
    label: "Email",
    value: personal.email,
    href: personal.emailComposeUrl,
    external: true,
    icon: Mail,
    hint: "opens Gmail compose",
  },
  {
    label: "GitHub",
    value: `@${personal.githubUsername}`,
    href: personal.github,
    icon: FaGithub,
    external: true,
    hint: "open source",
  },
  {
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: personal.linkedin,
    icon: FaLinkedin,
    external: true,
    hint: "professional",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-py" aria-label="Contact">
      <div className="section-container">
        <SectionHeader
          label="// contact.sh"
          title="Establish Connection"
          description="Open to internships, collaboration, and cybersecurity or software development opportunities."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block"
          >
            <TerminalWindow title="contact.sh" variant="kali">
              <div className="space-y-4 text-xs sm:text-sm">
                <KaliPrompt command="chmod +x contact.sh && ./contact.sh" />
                <p className="text-text-muted pl-0 sm:pl-4">
                  Initializing secure channel...
                </p>
                <KaliPrompt command={`printf '%s\n' '${personal.email}'`} />
                <p className="text-primary pl-0 sm:pl-4">CONTACT_CHANNEL_READY</p>
                <KaliPrompt command="echo $STATUS" />
                <p className="text-accent-blue pl-0 sm:pl-4">AVAILABLE_FOR_OPPORTUNITIES</p>
                <div className="pt-4 border-t border-border/40 flex items-center gap-2 text-text-muted">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Use the contact links below to get in touch.</span>
                </div>
              </div>
            </TerminalWindow>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard glow="green" className="p-8 md:p-10 border border-border/60 shadow-2xl shadow-black/30">
              <div className="flex items-center gap-4 mb-8 pb-7 border-b border-border/50">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <Terminal className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display font-semibold text-text-primary text-xl tracking-tight">
                    {personal.name}
                  </p>
                  <p className="text-sm text-primary font-mono mt-0.5">{personal.role}</p>
                  <p className="flex items-center gap-1.5 text-sm text-text-muted mt-1.5">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {personal.location}
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-8" role="list">
                {contactLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-bg-primary/40 hover:border-primary/35 hover:bg-bg-primary/70 transition-all duration-300 group"
                    >
                      <div className="p-2.5 rounded-xl bg-bg-secondary border border-border group-hover:border-primary/30 group-hover:shadow-[0_0_16px_-4px_rgba(61,255,154,0.25)] transition-all">
                        <link.icon className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-mono text-text-muted">{link.label}</p>
                          <span className="text-[10px] font-mono text-primary/50">{link.hint}</span>
                        </div>
                        <p className="text-sm text-text-primary group-hover:text-primary transition-colors truncate">
                          {link.value}
                        </p>
                      </div>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {personal.resumeUrl && (
                <Button href={personal.resumeUrl} variant="primary" className="w-full">
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download Resume
                </Button>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
