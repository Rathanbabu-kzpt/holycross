import type { SVGProps } from "react";
import { socials, type SocialName } from "@/content/site";

// Brand marks drawn inline (lucide-react no longer ships brand icons).
const icons: Record<SocialName, (p: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  Facebook: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  ),
  Instagram: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden {...p}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  YouTube: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

const hover: Record<SocialName, string> = {
  Facebook: "hover:bg-[#1877f2]",
  Instagram: "hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af]",
  YouTube: "hover:bg-[#ff0000]",
};

/** Round social buttons. Entries without a URL in `socials` render as plain (non-clickable) icons. */
export default function SocialIcons({
  className = "",
  size = "sm",
  onLight = false,
}: {
  className?: string;
  size?: "sm" | "md";
  /** Use on white backgrounds (navy buttons instead of translucent white). */
  onLight?: boolean;
}) {
  const box = size === "sm" ? "h-7 w-7" : "h-10 w-10";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-[18px] w-[18px]";
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socials.map(({ name, url }) => {
        const Icon = icons[name];
        const base = onLight ? "bg-navy text-white" : "bg-white/10 text-white ring-1 ring-white/15";
        const cls = `grid ${box} place-items-center rounded-full ${base} transition duration-300 hover:-translate-y-0.5 hover:ring-transparent ${hover[name]}`;
        return (
          <li key={name}>
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} (opens in a new tab)`} className={cls}>
                <Icon className={icon} />
              </a>
            ) : (
              <span title={`${name} — coming soon`} className={cls}>
                <Icon className={icon} />
                <span className="sr-only">{name}</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
