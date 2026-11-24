import { motion } from "framer-motion";
import { Award, ExternalLink, BadgeCheck } from "lucide-react";
import { SiCredly } from "react-icons/si";
import { certificates } from "../../data/certificates";
import { badges } from "../../data/badges";
import { personal } from "../../data/personal";
import { Button } from "../ui/Button";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { cn } from "../../utils/cn";

const statusStyles = {
  completed: "border-primary/30 bg-primary/5",
  "in-progress": "border-accent-blue/30 bg-accent-blue/5",
  planned: "border-border bg-bg-secondary/50",
};

const statusLabels = {
  completed: "Completed",
  "in-progress": "In Progress",
  planned: "Planned",
};

export function CertificatesSection() {
  return (
    <section id="certificates" className="section-py" aria-label="Certificates">
      <div className="section-container">
        <SectionHeader
          label="// certs/"
          title="Certificates"
          description="4 NPTEL certifications (two with Elite results), plus courses from Coursera, Great Learning and Infosys Springboard."
        />

        <div className="flex flex-wrap gap-3 mb-10 -mt-6">
          <Button href={personal.linkedin} external variant="primary">
            <Award className="w-4 h-4" aria-hidden="true" />
            Explore Certificates
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </Button>
          <Button href={personal.credly} external variant="secondary">
            <SiCredly className="w-4 h-4" aria-hidden="true" />
            View Credly Badges
          </Button>
        </div>

        {certificates.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
            >
              <GlassCard
                hover
                glow={cert.status === "completed" ? "green" : "blue"}
                className={cn("p-6 h-full border", statusStyles[cert.status])}
              >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-bg-card border border-border">
                  <Award className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <span className="text-xs font-mono text-text-muted">
                  {statusLabels[cert.status]}
                </span>
              </div>

              <h3 className="font-display font-semibold text-text-primary mb-1 leading-snug">
                {cert.title}
              </h3>
              <p className="text-sm text-text-muted mb-3">{cert.issuer}</p>
              {cert.grade && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold",
                    cert.grade.includes("Gold")
                      ? "border-accent-amber/50 bg-accent-amber/10 text-accent-amber shadow-[0_0_14px_-4px_rgba(255,180,84,0.5)]"
                      : "border-primary/40 bg-primary/10 text-primary",
                  )}
                >
                  <Award className="w-3 h-3" aria-hidden="true" />
                  {cert.grade}
                </span>
              )}
              {cert.date && <p className="font-mono text-xs text-primary">{cert.date}</p>}

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs text-accent-blue hover:underline"
                >
                  Verify
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              )}
              </GlassCard>
            </motion.div>
          ))}
          </div>
        ) : (
          <GlassCard className="p-6 md:p-8 border border-border/60">
            <p className="font-mono text-sm text-primary mb-2">$ ls ./verified-certificates</p>
            <p className="text-sm text-text-muted leading-relaxed">
              Verified certificates will be added here once the credential details and supporting files are available.
            </p>
          </GlassCard>
        )}

        <div className="mt-16">
          <h3 className="font-display text-xl font-semibold text-text-primary flex items-center gap-2.5 mb-6">
            <SiCredly className="w-5 h-5 text-accent-blue" aria-hidden="true" />
            Credly Badges
          </h3>

          {badges.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {badges.map((badge, index) => (
                <motion.a
                  key={badge.id}
                  href={badge.url ?? personal.credly}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07, duration: 0.4 }}
                  className="block"
                >
                  <GlassCard hover glow="blue" className="p-5 h-full border border-border/60 text-center">
                    {badge.image ? (
                      <img src={badge.image} alt={badge.title} loading="lazy" className="w-24 h-24 mx-auto mb-3 object-contain" />
                    ) : (
                      <BadgeCheck className="w-12 h-12 mx-auto mb-3 text-accent-blue" aria-hidden="true" />
                    )}
                    <p className="font-display font-semibold text-text-primary text-sm leading-snug">{badge.title}</p>
                    <p className="font-mono text-[11px] text-text-muted mt-1">{badge.issuer}</p>
                  </GlassCard>
                </motion.a>
              ))}
            </div>
          ) : (
            <GlassCard hover glow="blue" className="p-6 md:p-8 border border-border/60">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
                <div className="flex items-center gap-4">
                  <BadgeCheck className="w-10 h-10 text-accent-blue shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-display font-semibold text-text-primary">Verified digital badges</p>
                    <p className="text-sm text-text-muted">Badges I've earned are issued and verified on Credly.</p>
                  </div>
                </div>
                <Button href={personal.credly} external variant="secondary">
                  Explore Badges
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </Button>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </section>
  );
}
