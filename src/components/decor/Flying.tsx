// Decorative, purely CSS-animated school-theme flyers (birds, butterflies, paper plane, floating icons).
// All are aria-hidden and pointer-events-none; animations stop for prefers-reduced-motion.
import type { CSSProperties } from "react";
import { Apple, BookOpen, GraduationCap, Lightbulb, Pencil, Ruler, Star, type LucideIcon } from "lucide-react";

type Pos = CSSProperties;

const butterflyPalettes = {
  sunset: ["#ffc531", "#ff6a3d"],
  rose: ["#ff7aa2", "#e11d2e"],
  royal: ["#7b5cff", "#2445e6"],
  mint: ["#34d399", "#059669"],
} as const;

export function Butterfly({
  id,
  palette = "sunset",
  size = 44,
  style,
  duration = 14,
  delay = 0,
  path,
}: {
  id: string;
  /** Flight path 0–3; defaults to one derived from the id so fixed butterflies vary too. */
  path?: number;
  palette?: keyof typeof butterflyPalettes;
  size?: number;
  style?: Pos;
  duration?: number;
  delay?: number;
}) {
  const [a, b] = butterflyPalettes[palette];
  const flight = path ?? [...id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % 4;
  return (
    <div
      aria-hidden
      className={`decor-wander decor-path-${flight} pointer-events-none absolute z-10`}
      style={{ ...style, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <svg width={size} height={size * 0.75} viewBox="0 0 64 48" className="drop-shadow-md">
        <defs>
          <linearGradient id={`bf-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={a} />
            <stop offset="100%" stopColor={b} />
          </linearGradient>
        </defs>
        <g className="decor-flap">
          {/* upper wings */}
          <path d="M31 22 C 20 0, 0 2, 5 18 C 8 28, 24 28, 31 22Z" fill={`url(#bf-${id})`} />
          <path d="M33 22 C 44 0, 64 2, 59 18 C 56 28, 40 28, 33 22Z" fill={`url(#bf-${id})`} />
          {/* lower wings */}
          <path d="M31 26 C 22 29, 10 42, 17 46 C 25 48, 29 37, 31 26Z" fill={b} opacity="0.9" />
          <path d="M33 26 C 42 29, 54 42, 47 46 C 39 48, 35 37, 33 26Z" fill={b} opacity="0.9" />
          {/* wing spots */}
          <circle cx="14" cy="14" r="3" fill="#fff" opacity="0.6" />
          <circle cx="50" cy="14" r="3" fill="#fff" opacity="0.6" />
        </g>
        {/* body + antennae */}
        <rect x="30.5" y="14" width="3" height="22" rx="1.5" fill="#0b1437" />
        <path d="M31 15 C 29 9, 26 7, 24 6 M33 15 C 35 9, 38 7, 40 6" stroke="#0b1437" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Bird({ size, style, duration, delay, color }: { size: number; style: Pos; duration: number; delay: number; color: string }) {
  return (
    <div
      className="decor-fly-across absolute left-0"
      style={{ ...style, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <svg width={size} height={size / 2} viewBox="0 0 40 20" style={{ color }}>
        <path
          className="decor-bird-flap"
          d="M1 11 C 8 3, 14 2, 20 9.5 C 26 2, 32 3, 39 11 C 32 7.5, 26 8, 20 13.5 C 14 8, 8 7.5, 1 11 Z"
          fill="currentColor"
          style={{ animationDuration: `${0.5 + (size % 4) * 0.08}s` }}
        />
      </svg>
    </div>
  );
}

/** A loose flock of birds crossing the sky — sized for the hero. */
export function BirdFlock({ className = "" }: { className?: string }) {
  // Three loose groups on different speeds so the sky always has birds in it.
  const birds = [
    { size: 50, top: "0%", duration: 26, delay: -4, color: "rgba(255,255,255,0.75)" },
    { size: 36, top: "16%", duration: 26, delay: -5.2, color: "rgba(255,255,255,0.6)" },
    { size: 42, top: "32%", duration: 26, delay: -3.4, color: "rgba(255,197,49,0.85)" },
    { size: 30, top: "10%", duration: 26, delay: -6.4, color: "rgba(255,255,255,0.55)" },
    { size: 24, top: "26%", duration: 26, delay: -7.1, color: "rgba(255,255,255,0.45)" },
    { size: 32, top: "6%", duration: 34, delay: -20, color: "rgba(255,255,255,0.5)" },
    { size: 26, top: "22%", duration: 34, delay: -21, color: "rgba(255,255,255,0.45)" },
    { size: 38, top: "14%", duration: 34, delay: -18.6, color: "rgba(255,197,49,0.75)" },
    { size: 22, top: "36%", duration: 34, delay: -22.2, color: "rgba(255,255,255,0.4)" },
    { size: 44, top: "48%", duration: 30, delay: -14, color: "rgba(255,255,255,0.65)" },
    { size: 34, top: "60%", duration: 30, delay: -15.3, color: "rgba(255,255,255,0.55)" },
    { size: 28, top: "40%", duration: 30, delay: -16.1, color: "rgba(255,197,49,0.7)" },
    { size: 20, top: "2%", duration: 40, delay: -30, color: "rgba(255,255,255,0.4)" },
    { size: 18, top: "12%", duration: 40, delay: -31, color: "rgba(255,255,255,0.35)" },
  ];
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 overflow-hidden ${className}`}>
      {birds.map((b, i) => (
        <Bird key={i} size={b.size} style={{ top: b.top }} duration={b.duration} delay={b.delay} color={b.color} />
      ))}
    </div>
  );
}

/** A paper plane gliding across its parent, leaving a dashed trail. */
export function PaperPlane({ className = "", duration = 18, delay = 0 }: { className?: string; duration?: number; delay?: number }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 h-24 overflow-hidden ${className}`}>
      <div className="decor-plane absolute left-0 top-6 flex items-center" style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}>
        <svg width="120" height="20" viewBox="0 0 120 20" className="-mr-1">
          <path d="M0 14 C 30 2, 60 22, 118 8" stroke="#2445e6" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="5 6" fill="none" strokeLinecap="round" />
        </svg>
        <svg width="40" height="32" viewBox="0 0 40 32" className="drop-shadow-md">
          <path d="M2 14 L38 2 L22 30 L18 19 Z" fill="#fff" stroke="#2445e6" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M18 19 L38 2" stroke="#2445e6" strokeWidth="1.6" />
          <path d="M18 19 L16 27 L22 30" fill="#e8edff" stroke="#2445e6" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

const iconSet: { icon: LucideIcon; color: string }[] = [
  { icon: Pencil, color: "text-crimson" },
  { icon: BookOpen, color: "text-royal" },
  { icon: Star, color: "text-gold" },
  { icon: GraduationCap, color: "text-navy" },
  { icon: Apple, color: "text-crimson" },
  { icon: Ruler, color: "text-[#f59e0b]" },
  { icon: Lightbulb, color: "text-gold" },
];

/** School items gently floating around the edges of a section. */
export function FloatingSchoolIcons({ positions }: { positions: Pos[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
      {positions.map((pos, i) => {
        const { icon: Icon, color } = iconSet[i % iconSet.length];
        return (
          <span
            key={i}
            className={`decor-bob absolute grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-[0_12px_30px_-12px_rgba(11,20,55,0.35)] ring-1 ring-line ${color}`}
            style={{ ...pos, animationDuration: `${6 + (i % 4)}s`, animationDelay: `${-i * 1.3}s` }}
          >
            <Icon className="h-6 w-6" />
          </span>
        );
      })}
    </div>
  );
}

// Small deterministic PRNG so server and client render identical positions.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const paletteNames = Object.keys(butterflyPalettes) as (keyof typeof butterflyPalettes)[];

/** Scatter `count` butterflies across the parent (which must be positioned). Every other one is hidden on phones. */
export function ButterflySwarm({ id, count, seed = 1 }: { id: string; count: number; seed?: number }) {
  const rand = seeded(seed);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
      {Array.from({ length: count }, (_, i) => {
        // Spread evenly across the width (one column per butterfly, jittered) so no side gets crowded.
        const col = 90 / count;
        const left = 3 + col * i + rand() * col * 0.7;
        const top = 4 + rand() * 82;
        return (
          <div key={i} className={i % 2 ? "hidden md:block" : ""}>
            <Butterfly
              id={`${id}-${i}`}
              palette={paletteNames[Math.floor(rand() * paletteNames.length)]}
              size={Math.round(30 + rand() * 26)}
              style={{ top: `${top}%`, left: `${left}%` }}
              duration={Math.round(11 + rand() * 8)}
              delay={-Math.round(rand() * 12)}
              path={(i + seed) % 4}
            />
          </div>
        );
      })}
    </div>
  );
}
