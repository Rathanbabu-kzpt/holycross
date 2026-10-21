import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { school } from "@/content/site";

/** Red call-to-action band used at the bottom of inner pages. */
export default function CtaBand({
  title = "Begin your child’s journey with us",
  text = "Seats are limited in every class. Talk to our office or visit the campus — we’ll guide you through every step.",
  image = "/images/admissions-bg.jpg",
  cta = { label: "Apply for Admission", href: "/admissions#apply" },
}: {
  title?: string;
  text?: string;
  image?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:pb-28">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] text-white shadow-2xl">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-crimson via-crimson/90 to-navy/80" />
        <div className="dot-grid absolute inset-0" aria-hidden />
        <div className="relative flex flex-col items-start justify-between gap-8 px-6 py-14 sm:px-12 lg:flex-row lg:items-center lg:px-16 lg:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold">
              <span className="h-px w-6 bg-current" /> Admissions {school.admissionYear}
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">{title}</h2>
            <p className="mt-4 text-lg text-white/85">{text}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href={cta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-7 pr-2 font-bold text-crimson shadow-xl transition hover:bg-gold hover:text-navy"
            >
              {cta.label}
              <span className="grid h-10 w-10 place-items-center rounded-full bg-crimson text-white transition group-hover:rotate-[-45deg]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <a
              href={school.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-bold backdrop-blur-md transition hover:bg-white/20"
            >
              <Phone className="h-4 w-4" /> {school.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
