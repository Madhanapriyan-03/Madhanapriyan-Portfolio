import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "green" | "blue" | "none";
}

export function GlassCard({
  children,
  className,
  hover = false,
  glow = "none",
}: GlassCardProps) {
  const glowStyles = {
    green: "hover:shadow-[0_0_40px_-12px_rgba(61,255,154,0.25)]",
    blue: "hover:shadow-[0_0_40px_-12px_rgba(62,198,255,0.2)]",
    none: "",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -5, transition: { duration: 0.25 } } : undefined}
      className={cn(
        "glass-card relative rounded-2xl overflow-hidden transition-[box-shadow,border-color] duration-300",
        hover && "glass-hover hover:border-primary/40",
        hover && glowStyles[glow],
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
