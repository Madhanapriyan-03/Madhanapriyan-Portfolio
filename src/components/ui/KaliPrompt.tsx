import { cn } from "../../utils/cn";

interface KaliPromptProps {
  user?: string;
  host?: string;
  path?: string;
  command?: string;
  showCursor?: boolean;
  className?: string;
}

export function KaliPrompt({
  user = "madhan",
  host = "kali",
  path = "~",
  command = "",
  showCursor = false,
  className,
}: KaliPromptProps) {
  return (
    <div className={cn("font-mono text-xs sm:text-sm leading-relaxed", className)}>
      <div className="text-text-muted mb-1 hidden sm:block">
        ┌──(<span className="text-primary">{user}</span>
        <span className="text-text-muted">㉿</span>
        <span className="text-accent-blue">{host}</span>)-[
        <span className="text-[#ffb454]">{path}</span>]
      </div>
      <div>
        <span className="text-text-muted">└─$ </span>
        <span className="text-text-primary">{command}</span>
        {showCursor && (
          <span className="inline-block w-[7px] h-[14px] bg-primary ml-0.5 align-middle animate-pulse" />
        )}
      </div>
    </div>
  );
}
