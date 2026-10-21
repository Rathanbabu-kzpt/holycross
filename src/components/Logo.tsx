import Image from "next/image";
import Link from "next/link";
import { school } from "@/content/site";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${school.name} home`}>
      <Image
        src="/brand/logo-512.png"
        alt=""
        width={80}
        height={80}
        priority
        className="h-14 w-14 shrink-0 drop-shadow-lg transition-transform duration-500 group-hover:rotate-[10deg] sm:h-[4.5rem] sm:w-[4.5rem]"
      />
      <span className="leading-tight">
        <span
          className={`block whitespace-nowrap font-display text-lg font-bold tracking-tight transition-colors sm:text-[1.35rem] ${
            light ? "text-white" : "text-navy"
          }`}
        >
          {school.name}
        </span>
        <span
          className={`block whitespace-nowrap text-xs font-semibold tracking-wide sm:text-[13px] transition-colors ${
            light ? "text-gold" : "text-crimson"
          }`}
        >
          {school.place} · {school.motto}
        </span>
      </span>
    </Link>
  );
}
