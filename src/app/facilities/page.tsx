import type { Metadata } from "next";
import { BookOpen, Bus, FlaskConical, HeartPulse, Laptop, Monitor, ShieldCheck, Trophy, Droplets, Camera } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import FeatureSplit from "@/components/FeatureSplit";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { ButterflySwarm } from "@/components/decor/Flying";
import { school } from "@/content/site";

export const metadata: Metadata = {
  title: "Facilities",
  description: `Smart classrooms, library, science and computer labs, sports and safe transport at ${school.name}, ${school.place}.`,
};

const facilities = [
  {
    id: "classrooms",
    icon: Monitor,
    eyebrow: "Smart Classrooms",
    title: "Bright rooms built for learning",
    text: "Spacious, well-lit and airy classrooms where teachers use digital tools to make every lesson clear, visual and engaging.",
    points: ["Digital teaching aids", "Good natural light & ventilation", "Comfortable seating", "Child-friendly displays"],
    image: "/images/fac-classroom.jpg",
    imageAlt: "Student studying in a bright classroom",
  },
  {
    id: "library",
    icon: BookOpen,
    eyebrow: "Library",
    title: "A home for curious readers",
    text: "Story books, reference books and magazines for every age — with regular reading periods to build a lifelong love of books.",
    points: ["Books for every class", "Weekly reading periods", "Reference & general knowledge", "Quiet reading corner"],
    image: "/images/fac-library.jpg",
    imageAlt: "Child reading a book",
  },
  {
    id: "labs",
    icon: FlaskConical,
    eyebrow: "Science Laboratories",
    title: "Learning science by doing",
    text: "Hands-on experiments in physics, chemistry and biology help students understand concepts — not just memorise them.",
    points: ["Physics, chemistry & biology", "Guided practical sessions", "Safety-first lab rules", "Science fair projects"],
    image: "/images/fac-lab.jpg",
    imageAlt: "Laboratory glassware",
  },
  {
    id: "computer-lab",
    icon: Laptop,
    eyebrow: "Computer Lab",
    title: "Digital skills for tomorrow",
    text: "Students learn computer basics, typing, safe internet use and simple coding — skills they’ll use all their lives.",
    points: ["Computer basics & typing", "Introduction to coding", "Safe internet habits", "Supervised practice"],
    image: "/images/fac-computer.jpg",
    imageAlt: "Child learning on a laptop",
  },
  {
    id: "sports",
    icon: Trophy,
    eyebrow: "Sports & Playground",
    title: "Space to run, play and grow",
    text: "Open grounds for daily play, PT, yoga and team games — because healthy bodies help build happy, focused minds.",
    points: ["Open playground", "Daily PT & yoga", "Indoor & outdoor games", "Annual sports meet"],
    image: "/images/fac-sports.jpg",
    imageAlt: "Children playing outdoors",
  },
  {
    id: "transport",
    icon: Bus,
    eyebrow: "Transport",
    title: "Safe rides to and from school",
    text: "School buses cover Ghanpur (Stn.) and nearby villages, with trained drivers and attendants for every route.",
    points: ["Routes to nearby villages", "Trained drivers", "Attendant on every bus", "Punctual pick-up & drop"],
    image: "/images/fac-transport.jpg",
    imageAlt: "Student with school bag",
  },
];

const care = [
  { icon: ShieldCheck, title: "Safe campus", text: "Supervised premises and visitor checks." },
  { icon: HeartPulse, title: "First aid", text: "First-aid support and quick parent contact." },
  { icon: Droplets, title: "Clean water", text: "Safe drinking water and clean washrooms." },
  { icon: Camera, title: "Watchful care", text: "Teachers on duty during breaks and dispersal." },
];

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        crumb="Facilities"
        title="Spaces for"
        highlight="curious minds"
        intro="Everything a child needs to learn, explore, create and play — right here on campus."
        image="/images/fac-classroom.jpg"
        sections={facilities.map((f) => ({ label: f.eyebrow, href: `#${f.id}`, icon: f.icon }))}
      />

      <div className="relative overflow-hidden py-10 lg:py-16">
        <ButterflySwarm id="fac-page" count={5} seed={13} />
        {facilities.map((f, i) => (
          <FeatureSplit key={f.id} index={i} flip={i % 2 === 1} {...f} />
        ))}
      </div>

      <section className="relative bg-navy py-20 text-white lg:py-24">
        <div className="dot-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading light eyebrow="Safety & Care" title={<>Your child is in <span className="text-gradient-light">safe hands</span></>} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {care.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="h-full rounded-[2rem] bg-white/[0.06] p-7 ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-white/10">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold text-navy">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <p className="mt-5 font-display text-xl font-semibold">{c.title}</p>
                  <p className="mt-1.5 text-white/70">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-20 lg:pt-28">
        <CtaBand title="Come and see our campus" text="Book a visit to walk through our classrooms, library and playground with our team." cta={{ label: "Book a visit", href: "/contact" }} />
      </div>
    </>
  );
}
