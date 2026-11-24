import { cn } from "../../utils/cn";

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "kali";
}

export function TerminalWindow({
  title = "terminal",
  children,
  className,
  variant = "default",
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border overflow-hidden shadow-2xl shadow-black/50 transition-[border-color,box-shadow] duration-300 hover:border-primary/35 hover:shadow-[0_0_40px_-14px_rgba(61,255,154,0.35)]",
        variant === "kali"
          ? "crt border-border/80 bg-[#060d0a] ring-1 ring-white/[0.03]"
          : "border-border bg-bg-secondary",
        className,
      )}
      role="region"
      aria-label={`${title} terminal window`}
    >
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-3 border-b",
          variant === "kali"
            ? "border-border/60 bg-[#0a130f]/90"
            : "border-border bg-bg-card/80",
        )}
      >
        <div className="flex gap-2" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-danger/90 shadow-[0_0_6px_rgba(255,95,86,0.4)]" />
          <span className="w-3 h-3 rounded-full bg-[#ffb454]/90 shadow-[0_0_6px_rgba(255,180,84,0.3)]" />
          <span className="w-3 h-3 rounded-full bg-primary/90 shadow-[0_0_6px_rgba(61,255,154,0.4)]" />
        </div>
        <span className="font-mono text-[11px] text-text-muted ml-3 tracking-wide">
          {title}
        </span>
        {variant === "kali" && (
          <span className="ml-auto font-mono text-[10px] text-primary/60 hidden sm:inline">
            zsh • 80×24
          </span>
        )}
      </div>
      <div className="p-5 md:p-7 lg:p-8 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
