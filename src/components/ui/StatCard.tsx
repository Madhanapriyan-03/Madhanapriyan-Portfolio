import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { GlassCard } from "./GlassCard";

export function StatCard({
  label,
  children,
  delay = 0,
  className,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={className}
    >
      <GlassCard hover glow="green" className="h-full overflow-hidden border border-border/60">
        <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
          <span className="font-mono text-[11px] text-text-muted">{label}</span>
        </div>
        <div className="p-1">{children}</div>
      </GlassCard>
    </motion.div>
  );
}
