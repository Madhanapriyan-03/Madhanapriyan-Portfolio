import { motion } from "framer-motion";
import { Building2, Laptop, MapPin, CalendarDays, Users, Mic2, ExternalLink } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { experience } from "../../data/experience";
import { events } from "../../data/events";
import { personal } from "../../data/personal";
import { Button } from "../ui/Button";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { cn } from "../../utils/cn";

export function ExperienceSection() {
  const online = experience.filter((e) => e.mode === "online").length;
  const onsite = experience.length - online;

  const stats = [
    { label: "Internships", value: experience.length },
    { label: "Online", value: online },
    { label: "On-site", value: onsite },
    { label: "Events", value: events.length },
  ];

  return (
    <section id="experience" className="section-py" aria-label="Experience">
      <div className="section-container">
        <SectionHeader
          label="// experience/"
          title="Experience"
          description="Internships I've completed and the community events I've attended."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-12 max-w-2xl">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="glass-card glass-hover relative rounded-xl px-4 py-4 text-center"
            >
              <p className="font-display text-3xl font-bold text-primary tabular-nums">{stat.value}</p>
              <p className="font-mono text-[11px] text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-primary via-accent-blue/60 to-border shadow-[0_0_8px_rgba(61,255,154,0.35)]"
            aria-hidden="true"
          />

          <ol className="space-y-8">
            {experience.map((item, index) => {
              const Icon = item.mode === "online" ? Laptop : Building2;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative pl-14 md:pl-16"
                >
                  <div
                    className={cn(
                      "absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-bg-primary",
                      item.mode === "online"
                        ? "border-accent-blue/60 text-accent-blue shadow-[0_0_16px_-2px_rgba(62,198,255,0.5)]"
                        : "border-primary/60 text-primary shadow-[0_0_16px_-2px_rgba(61,255,154,0.5)]",
                    )}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>

                  <GlassCard
                    hover
                    glow={item.mode === "online" ? "blue" : "green"}
                    className="p-6 border border-border/60"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-text-primary">
                          {item.company}
                        </h3>
                        <p className="text-sm text-text-muted">{item.role}</p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full border px-3 py-0.5 font-mono text-[11px]",
                          item.mode === "online"
                            ? "border-accent-blue/40 bg-accent-blue/10 text-accent-blue"
                            : "border-primary/40 bg-primary/10 text-primary",
                        )}
                      >
                        {item.mode === "online" ? "Online" : "On-site"}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-text-muted">
                      {item.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                          {item.location}
                        </span>
                      )}
                      {item.period && (
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                          {item.period}
                        </span>
                      )}
                    </div>

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="mt-4 space-y-1.5 text-sm text-text-muted">
                        {item.highlights.map((line) => (
                          <li key={line} className="flex gap-2">
                            <span className="text-primary">&gt;</span>
                            {line}
                          </li>
                        ))}
                      </ul>
                    )}
                  </GlassCard>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-r-xl border-l-2 border-primary bg-primary/[0.04] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <p className="font-mono text-sm text-text-muted leading-relaxed">
            <span className="text-primary">&gt;</span> Certificates for these internships are on my LinkedIn.
            <span className="text-text-primary"> Explore LinkedIn for certificates.</span>
          </p>
          <Button href={personal.linkedin} external variant="secondary" className="shrink-0">
            <FaLinkedin className="w-4 h-4" aria-hidden="true" />
            Explore LinkedIn
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </Button>
        </motion.blockquote>

        <div className="mt-16">
          <h3 className="font-display text-xl font-semibold text-text-primary flex items-center gap-2.5 mb-6">
            <Users className="w-5 h-5 text-accent-blue" aria-hidden="true" />
            Events &amp; Meetups Attended
          </h3>

          <div className="grid md:grid-cols-3 gap-5">
            {events.map((event, index) => {
              const Icon = event.type === "Summit" ? Mic2 : Users;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <GlassCard hover glow="blue" className="h-full p-6 border border-border/60">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2.5 rounded-lg bg-bg-card border border-border">
                        <Icon className="w-5 h-5 text-accent-blue" aria-hidden="true" />
                      </div>
                      <span className="rounded-full border border-accent-blue/40 bg-accent-blue/10 px-3 py-0.5 font-mono text-[11px] text-accent-blue">
                        {event.type}
                      </span>
                    </div>
                    <h4 className="font-display font-semibold text-text-primary leading-snug mb-3">
                      {event.title}
                    </h4>
                    <div className="space-y-1 font-mono text-xs text-text-muted">
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                        {event.venue}
                      </p>
                      {event.date && (
                        <p className="flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                          {event.date}
                        </p>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
