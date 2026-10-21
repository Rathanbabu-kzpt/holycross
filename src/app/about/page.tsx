import type { Metadata } from "next";
import Image from "next/image";
import {
  Anchor,
  BookOpenCheck,
  Briefcase,
  CheckCircle2,
  Eye,
  Flame,
  HandHeart,
  Heart,
  Leaf,
  MessageSquareQuote,
  Quote,
  Rocket,
  School,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  UserCog,
  Users,
} from "lucide-react";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { ButterflySwarm } from "@/components/decor/Flying";
import { school } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${school.name}, ${school.place} — our story, vision, mission, principal's message and management.`,
};

const highlights = [
  { label: "Nursery to Class X", icon: School },
  { label: "English medium", icon: BookOpenCheck },
  { label: "Co-educational", icon: Users },
  { label: "Values-based learning", icon: Heart },
];

const crest = [
  { icon: Flame, title: "The Torch", text: "Knowledge that lights the way — for the student and for everyone around them." },
  { icon: Leaf, title: "The Palm", text: "Perseverance and victory earned through honest, steady effort." },
  { icon: Anchor, title: "The Anchor & Cross", text: "Faith and hope that keep us steady through every season of life." },
];

const values = [
  { icon: Star, title: "Excellence", text: "We encourage every child to give their best in studies and in life." },
  { icon: ShieldCheck, title: "Discipline", text: "Gentle, consistent guidance that builds self-control and responsibility." },
  { icon: HandHeart, title: "Kindness", text: "Care for classmates, teachers, family and the community." },
  { icon: Users, title: "Respect", text: "Valuing every person, every culture and every opinion." },
  { icon: Sparkles, title: "Curiosity", text: "Asking questions, exploring ideas and enjoying discovery." },
  { icon: Heart, title: "Integrity", text: "Being honest and doing what is right, even when no one is watching." },
];

// Roles only — names to be added by the school.
const management = [
  { icon: Briefcase, role: "Correspondent", text: "Oversees the school’s administration, growth and long-term direction." },
  { icon: UserCog, role: "Principal", text: "Leads academics, teachers and the day-to-day life of the school." },
  { icon: BookOpenCheck, role: "Academic Coordinators", text: "Plan the curriculum, assessments and classroom support for each stage." },
  { icon: Users, role: "Teaching Staff", text: "Dedicated teachers who know, guide and encourage every child." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About Us"
        title="Our story,"
        highlight="our values"
        intro={`${school.name}, ${school.place} — a place where learning is joyful, discipline is gentle and every child is valued.`}
        image="/images/welcome-main.jpg"
        sections={[
          { label: "Our School", href: "#our-school", icon: School },
          { label: "Vision & Mission", href: "#vision-mission", icon: Target },
          { label: "Principal's Message", href: "#principal", icon: MessageSquareQuote },
          { label: "Management", href: "#management", icon: Users },
        ]}
      />

      {/* OUR SCHOOL */}
      <section id="our-school" className="relative scroll-mt-28 overflow-hidden py-20 lg:py-28">
        <ButterflySwarm id="about-s" count={3} seed={5} />
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal className="relative mx-auto w-full max-w-xl pb-10 pr-6 sm:pr-16">
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-gold/30 blur-2xl" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl">
              <Image src="/images/hero-2.jpg" alt="Students drawing together in class" fill sizes="(min-width:1024px) 520px, 90vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-2 right-0 aspect-square w-1/2 overflow-hidden rounded-[2rem] border-8 border-cream shadow-2xl">
              <Image src="/images/stage-upper.jpg" alt="Student reading at her desk" fill sizes="260px" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our School"
              title={<>A caring school in <span className="text-gradient">Ghanpur (Stn.)</span></>}
              intro={`${school.name} serves families in and around ${school.place}, Jangaon District. Guided by our motto “${school.motto}”, we combine sound academics with character formation — so our students leave not only well-taught, but well-prepared for life.`}
            />
            <Reveal delay={150} className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 font-semibold text-navy ring-1 ring-line">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-crimson/10 text-crimson">
                    <h.icon className="h-5 w-5" />
                  </span>
                  {h.label}
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Crest */}
        <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-navy p-8 text-white sm:p-12">
            <div className="dot-grid absolute inset-0" aria-hidden />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-royal/50 blur-3xl" aria-hidden />
            <div className="relative grid items-center gap-10 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <Image src="/brand/logo-512.png" alt={`${school.name} crest`} width={180} height={180} className="h-40 w-40 animate-float drop-shadow-2xl" />
                <p className="eyebrow mt-6 text-gold">Our Crest</p>
                <p className="mt-2 font-display text-3xl font-bold">Every symbol tells our story</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
                {crest.map((c) => (
                  <div key={c.title} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-navy">
                      <c.icon className="h-6 w-6" />
                    </span>
                    <p className="mt-5 font-display text-xl font-semibold">{c.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section id="vision-mission" className="relative scroll-mt-28 bg-white py-20 lg:py-28">
        <div className="dot-grid-dark absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Vision & Mission"
            title={<>What we <span className="text-gradient">stand for</span></>}
            intro="Our vision and mission shape every lesson, every activity and every interaction at Holy Cross."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-royal to-navy p-8 text-white sm:p-10">
                <Eye className="absolute -bottom-6 -right-6 h-40 w-40 text-white/10" aria-hidden />
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                  <Eye className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-bold">Our Vision</h3>
                <p className="mt-4 text-lg leading-relaxed text-white/85">
                  To be a light in the community — nurturing young people who are wise, compassionate and confident,
                  and who use their knowledge to serve others.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-crimson to-crimson-dark p-8 text-white sm:p-10">
                <Rocket className="absolute -bottom-6 -right-6 h-40 w-40 text-white/10" aria-hidden />
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                  <Target className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-bold">Our Mission</h3>
                <ul className="mt-4 space-y-2.5 text-lg text-white/90">
                  {[
                    "Provide quality, child-centred education from Nursery to Class X",
                    "Build strong moral values and good habits",
                    "Develop every talent through sports, arts and clubs",
                    "Partner closely with parents in each child’s growth",
                  ].map((m) => (
                    <li key={m} className="flex gap-2.5">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" /> {m}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-16 text-center">
            <p className="eyebrow justify-center text-crimson">
              <span className="h-px w-6 bg-current" /> Core values <span className="h-px w-6 bg-current" />
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="group flex h-full gap-4 rounded-3xl bg-cream p-6 ring-1 ring-line transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_25px_50px_-25px_rgba(11,20,55,0.35)]">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy text-gold transition group-hover:bg-crimson group-hover:text-white">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold text-navy">{v.title}</p>
                    <p className="mt-1 text-muted">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPAL */}
      <section id="principal" className="relative scroll-mt-28 overflow-hidden py-20 lg:py-28">
        <ButterflySwarm id="principal-s" count={3} seed={17} />
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-[0_40px_80px_-40px_rgba(11,20,55,0.45)] ring-1 ring-line sm:p-14">
              <Quote className="absolute right-8 top-8 h-24 w-24 text-crimson/10" aria-hidden />
              <p className="eyebrow text-crimson">
                <span className="h-px w-6 bg-current" /> Principal&apos;s Message
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">
                Dear parents and <span className="text-gradient">students</span>,
              </h2>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
                <p>
                  Welcome to {school.name}. Every child who walks through our gates is precious to us, and it is our
                  privilege to walk with them through some of the most important years of their lives.
                </p>
                <p>
                  Our motto, <em className="font-semibold text-navy">“{school.motto}”</em>, reminds us that true
                  education is more than marks. We want our students to be curious, kind and confident — to think
                  clearly, act honestly and care for the people around them.
                </p>
                <p>
                  We see parents as our partners. Together, let us give our children a strong foundation and the
                  courage to shine. I warmly invite you to visit our campus and meet our teachers.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-4 border-t border-line pt-8">
                <Image src="/brand/logo-512.png" alt="" width={64} height={64} className="h-16 w-16" />
                <div>
                  <p className="font-display text-xl font-semibold text-navy">The Principal</p>
                  <p className="text-muted">{school.name}, {school.place}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MANAGEMENT */}
      <section id="management" className="relative scroll-mt-28 overflow-hidden bg-navy py-20 text-white lg:py-28">
        <div className="dot-grid absolute inset-0" aria-hidden />
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-royal/40 blur-[120px]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            light
            eyebrow="Management"
            title={<>The people who <span className="text-gradient-light">guide us</span></>}
            intro="A dedicated team working together so every child learns in a safe, happy and well-run school."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {management.map((m, i) => (
              <Reveal key={m.role} delay={i * 90}>
                <div className="group h-full rounded-[2rem] bg-white/[0.06] p-7 ring-1 ring-white/10 transition hover:-translate-y-1.5 hover:bg-white/10 hover:ring-gold/40">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-crimson to-[#ff6a3d] shadow-lg shadow-crimson/30 transition group-hover:rotate-[-6deg]">
                    <m.icon className="h-7 w-7" />
                  </span>
                  <p className="mt-6 font-display text-2xl font-semibold">{m.role}</p>
                  <p className="mt-2 text-white/70">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-20 lg:pt-28">
        <CtaBand />
      </div>
    </>
  );
}
