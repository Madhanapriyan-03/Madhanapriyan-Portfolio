import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-14 md:mb-20", className)}
    >
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
        <span className="text-primary/50">&gt;</span>
        {label}
        <span className="inline-block w-[6px] h-3 bg-primary animate-blink" aria-hidden="true" />
      </p>
      <h2 className="glitch-hover w-fit font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-[1.1]">
        {title}
      </h2>
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="block origin-left h-px w-32 mt-5 bg-gradient-to-r from-primary via-accent-blue to-transparent shadow-[0_0_8px_rgba(61,255,154,0.6)]"
      />
      {description && (
        <p className="mt-5 text-text-muted max-w-2xl text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
