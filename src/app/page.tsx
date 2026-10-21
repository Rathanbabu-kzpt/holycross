import Image from "next/image";
import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  Atom,
  BookOpen,
  Bus,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Flame,
  HeartHandshake,
  Leaf,
  Monitor,
  Music,
  Palette,
  PartyPopper,
  Phone,
  School,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { BirdFlock, Butterfly, ButterflySwarm, FloatingSchoolIcons, PaperPlane } from "@/components/decor/Flying";
import { galleryStrip } from "@/content/home";
import { school } from "@/content/site";

const ribbon = [
  `Admissions open ${school.admissionYear}`,
  "Nursery to Class X",
  "Smart classrooms",
  "Caring teachers",
  "Sports & arts",
  "Safe transport",
  "Wisdom is Light",
];

const features = [
  { icon: Users, title: "Caring Teachers", text: "Dedicated educators who know every child by name and nurture their potential.", color: "from-crimson to-[#ff6a3d]" },
  { icon: Monitor, title: "Smart Learning", text: "Digital classrooms and hands-on labs that make concepts come alive.", color: "from-royal to-[#7b5cff]" },
  { icon: HeartHandshake, title: "Values First", text: "Discipline, kindness and integrity woven into everyday school life.", color: "from-[#f59e0b] to-gold" },
  { icon: ShieldCheck, title: "Safe Campus", text: "A secure, supervised environment where children feel at home.", color: "from-[#059669] to-[#34d399]" },
];

const crest = [
  { icon: Flame, title: "The Torch", text: "Knowledge that lights the way." },
  { icon: Leaf, title: "The Palm", text: "Victory through honest effort." },
  { icon: Anchor, title: "Anchor & Cross", text: "Faith and hope that keep us steady." },
];

const stages = [
  { label: "Pre-Primary", classes: "Nursery · LKG · UKG", text: "Play-based learning that builds curiosity and confidence.", image: "/images/stage-preprimary.jpg" },
  { label: "Primary", classes: "Classes I – V", text: "Strong foundations in language, numeracy and discovery.", image: "/images/stage-primary.jpg" },
  { label: "Upper Primary", classes: "Classes VI – VII", text: "Deeper thinking with projects, labs and teamwork.", image: "/images/stage-upper.jpg" },
  { label: "High School", classes: "Classes VIII – X", text: "Focused preparation for board exams and beyond.", image: "/images/stage-high.jpg" },
];

const facilities = [
  { icon: Monitor, title: "Smart Classrooms", href: "/facilities#classrooms", text: "Bright rooms built for interactive digital lessons.", image: "/images/fac-classroom.jpg", cls: "md:col-span-2 md:row-span-2" },
  { icon: BookOpen, title: "Library", href: "/facilities#library", text: "Stories, references and quiet reading corners.", image: "/images/fac-library.jpg", cls: "md:col-span-2" },
  { icon: Atom, title: "Science Labs", href: "/facilities#labs", text: "Physics, chemistry and biology — learnt by doing.", image: "/images/fac-lab.jpg", cls: "" },
  { icon: Monitor, title: "Computer Lab", href: "/facilities#computer-lab", text: "Digital literacy from an early age.", image: "/images/fac-computer.jpg", cls: "" },
  { icon: Trophy, title: "Sports & Playground", href: "/facilities#sports", text: "Open grounds for games and fitness.", image: "/images/fac-sports.jpg", cls: "md:col-span-2" },
  { icon: Bus, title: "Transport", href: "/facilities#transport", text: "Safe, punctual buses for nearby villages and town.", image: "/images/fac-transport.jpg", cls: "md:col-span-2" },
];

const activities = [
  { icon: Trophy, title: "Sports & Games", href: "/activities#sports", text: "Athletics, kabaddi, kho-kho, cricket and yoga.", image: "/images/act-sports.jpg" },
  { icon: Palette, title: "Arts & Culture", href: "/activities#arts", text: "Drawing, craft, dance and drama.", image: "/images/act-arts.jpg" },
  { icon: Music, title: "Music & Stage", href: "/activities#arts", text: "Songs, performances and confident speaking.", image: "/images/act-music.jpg" },
  { icon: PartyPopper, title: "Celebrations", href: "/activities#celebrations", text: "Annual Day, festivals and national days.", image: "/images/act-celebrations.jpg" },
];

const steps = [
  { icon: Phone, title: "Enquire", text: "Call us or send an enquiry online." },
  { icon: School, title: "Visit Campus", text: "Meet our teachers and tour the school." },
  { icon: ClipboardList, title: "Apply", text: "Submit the form with documents." },
  { icon: CalendarCheck, title: "Join Us", text: "Welcome to the Holy Cross family!" },
];

export default function Home() {
  const half = Math.ceil(galleryStrip.length / 2);
  const rowA = galleryStrip.slice(0, half);
  const rowB = galleryStrip.slice(half);

  return (
    <>
      <HeroSlider />

      {/* RIBBONS */}
      <div className="relative z-10 -mt-px overflow-hidden py-12">
        <div className="-mx-8 -rotate-2">
          <div className="bg-crimson py-4 shadow-xl">
            <div className="flex w-max animate-marquee gap-10 whitespace-nowrap pr-10">
              {[...ribbon, ...ribbon].map((t, i) => (
                <span key={i} className="flex items-center gap-10 font-display text-xl font-semibold uppercase tracking-wide text-white sm:text-2xl">
                  {t}
                  <span className="text-gold">✦</span>
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gold py-3 shadow-lg">
            <div className="flex w-max animate-marquee-rev gap-10 whitespace-nowrap pr-10">
              {[...ribbon, ...ribbon].reverse().map((t, i) => (
                <span key={i} className="flex items-center gap-10 font-display text-lg font-semibold uppercase tracking-wide text-navy">
                  {t}
                  <span className="text-crimson">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WELCOME */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <Butterfly id="welcome-1" palette="sunset" size={62} style={{ top: "6%", left: "44%" }} duration={15} />
        <Butterfly id="welcome-2" palette="rose" size={48} style={{ bottom: "10%", left: "3%" }} duration={12} delay={-5} />
        <Butterfly id="welcome-3" palette="royal" size={40} style={{ top: "4%", right: "8%" }} duration={17} delay={-9} />
        <ButterflySwarm id="welcome-s" count={4} seed={11} />
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal className="relative mx-auto w-full max-w-xl pb-10 pr-6 sm:pr-16">
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-gold/30 blur-2xl" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl">
              <Image src="/images/welcome-main.jpg" alt="Young girl reading a book" fill sizes="(min-width:1024px) 520px, 90vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-2 right-0 aspect-square w-1/2 overflow-hidden rounded-[2rem] border-8 border-cream shadow-2xl">
              <Image src="/images/welcome-small.jpg" alt="Happy student giving a thumbs up in class" fill sizes="260px" className="object-cover" />
            </div>
            {/* Rotating motto badge */}
            <div className="absolute -left-4 bottom-24 grid h-36 w-36 place-items-center rounded-full bg-navy shadow-2xl sm:-left-10">
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
                <defs>
                  <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text className="fill-gold text-[17px] font-bold uppercase tracking-[0.3em]">
                  <textPath href="#badge-circle">Wisdom is Light • Ghanpur (Stn.) • </textPath>
                </text>
              </svg>
              <Image src="/brand/logo-512.png" alt="" width={80} height={80} className="h-16 w-16" />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Welcome to Holy Cross"
              title={
                <>
                  Educating hearts and minds in <span className="text-gradient">Ghanpur (Stn.)</span>
                </>
              }
              intro={`${school.name} is a place where learning is joyful, discipline is gentle and every child is valued. Rooted in our motto “${school.motto}”, we combine sound academics with character formation.`}
            />
            <Reveal delay={150} className="mt-8 grid gap-3 sm:grid-cols-3">
              {crest.map((c) => (
                <div key={c.title} className="rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-gold">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 font-display font-semibold text-navy">{c.title}</p>
                  <p className="text-sm text-muted">{c.text}</p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={250} className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {["Child-centred teaching", "Regular parent–teacher connect", "Moral & value education", "Focus on spoken English"].map((t) => (
                <p key={t} className="flex items-center gap-2.5 font-semibold text-navy">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-crimson" /> {t}
                </p>
              ))}
            </Reveal>
            <Reveal delay={350}>
              <Link
                href="/about"
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-navy py-2 pl-7 pr-2 font-bold text-white transition hover:bg-royal"
              >
                Discover our story
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-navy transition group-hover:rotate-[-45deg]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:pb-28">
        <Butterfly id="why-1" palette="mint" size={44} style={{ bottom: "6%", right: "3%" }} duration={14} delay={-2} />
        <ButterflySwarm id="why-s" count={3} seed={23} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className="group relative h-full overflow-hidden rounded-[2rem] bg-white p-8 ring-1 ring-line transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-25px_rgba(11,20,55,0.4)] hover:ring-transparent">
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition duration-500 group-hover:opacity-100 ${f.color}`} />
                <div className="relative">
                  <span className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition duration-500 group-hover:bg-none group-hover:bg-white/20 ${f.color}`}>
                    <f.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-7 font-display text-2xl font-semibold text-navy transition group-hover:text-white">{f.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted transition group-hover:text-white/85">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ACADEMICS */}
      <section className="relative bg-white py-20 lg:py-28">
        <div className="dot-grid-dark absolute inset-0" aria-hidden />
        <PaperPlane className="top-2" />
        <ButterflySwarm id="acad-s" count={4} seed={37} />
        <FloatingSchoolIcons
          positions={[
            { top: "9%", left: "7%" },
            { top: "13%", right: "8%" },
            { top: "26%", left: "16%" },
            { top: "24%", right: "18%" },
          ]}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Academics"
            title={<>A learning journey for <span className="text-gradient">every stage</span></>}
            intro="From the first day of Nursery to the final board exam, our programmes grow with your child."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="group relative h-[26rem] overflow-hidden rounded-[2rem] shadow-lg">
                  <Image src={s.image} alt={`${s.label} students`} fill sizes="(min-width:1024px) 300px, (min-width:640px) 45vw, 90vw" className="object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent transition duration-500 group-hover:via-navy/60" />
                  <span className="absolute left-6 top-6 rounded-full bg-white/15 px-3 py-1 font-display text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur-md">
                    0{i + 1}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-sm font-semibold text-gold">{s.classes}</p>
                    <h3 className="mt-1 font-display text-3xl font-semibold">{s.label}</h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                      {s.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Butterfly id="fac-1" palette="sunset" size={52} style={{ top: "4%", right: "30%" }} duration={15} delay={-6} />
        <Butterfly id="fac-2" palette="rose" size={42} style={{ top: "12%", left: "48%" }} duration={13} delay={-1} />
        <ButterflySwarm id="fac-s" count={4} seed={41} />
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Facilities"
            title={<>Spaces designed for <span className="text-gradient">curious minds</span></>}
            intro="Everything a child needs to learn, explore, create and play — right here on campus."
          />
          <Reveal>
            <Link href="/facilities" className="inline-flex items-center gap-2 rounded-full border-2 border-navy px-6 py-3 font-bold text-navy transition hover:bg-navy hover:text-white">
              All facilities <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[15rem] gap-5 md:grid-cols-4">
          {facilities.map((f, i) => (
            <Reveal key={f.title} delay={i * 70} className={f.cls}>
              <Link href={f.href} className="group relative block h-full overflow-hidden rounded-[2rem] shadow-md">
                <Image src={f.image} alt={f.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-6 text-white">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur-md">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{f.title}</h3>
                    <p className="text-sm text-white/75">{f.text}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY MARQUEE */}
      <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-28">
        <BirdFlock className="top-6 h-40" />
        <Butterfly id="gal-1" palette="sunset" size={50} style={{ bottom: "8%", left: "8%" }} duration={16} delay={-4} />
        <Butterfly id="gal-2" palette="rose" size={40} style={{ top: "14%", right: "34%" }} duration={12} delay={-7} />
        <ButterflySwarm id="gal-s" count={3} seed={53} />
        <div className="dot-grid absolute inset-0" aria-hidden />
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-royal/40 blur-[120px]" aria-hidden />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-crimson/30 blur-[120px]" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-end">
          <SectionHeading
            light
            align="left"
            eyebrow="Life at Holy Cross"
            title={<>Moments that make <span className="text-gradient-light">memories</span></>}
          />
          <Reveal>
            <Link href="/gallery" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-navy transition hover:bg-white">
              View Gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="relative mt-14 space-y-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          {[rowA, rowB].map((row, r) => (
            <div key={r} className={`flex w-max gap-5 hover:[animation-play-state:paused] ${r === 0 ? "animate-marquee" : "animate-marquee-rev"}`}>
              {[...row, ...row, ...row, ...row].map((src, i) => (
                <div
                  key={i}
                  className={`relative h-52 shrink-0 overflow-hidden rounded-3xl sm:h-64 ${i % 3 === 0 ? "w-80 sm:w-[26rem]" : "w-60 sm:w-72"}`}
                >
                  <Image src={src} alt="" fill sizes="420px" className="object-cover transition duration-500 hover:scale-110" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Butterfly id="act-1" palette="royal" size={56} style={{ top: "5%", left: "12%" }} duration={13} delay={-3} />
        <Butterfly id="act-2" palette="mint" size={50} style={{ top: "9%", right: "16%" }} duration={16} delay={-8} />
        <Butterfly id="act-3" palette="sunset" size={42} style={{ bottom: "6%", left: "40%" }} duration={14} delay={-11} />
        <ButterflySwarm id="act-s" count={4} seed={67} />
        <SectionHeading
          eyebrow="Beyond the Classroom"
          title={<>Activities that build <span className="text-gradient">confidence</span></>}
          intro="Every child has a spark. Sports, arts and clubs help them find it and let it shine."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((a, i) => (
            <Reveal key={a.title} delay={i * 100} className={i % 2 === 1 ? "lg:mt-12" : ""}>
              <Link href={a.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-lg">
                  <Image src={a.image} alt={a.title} fill sizes="(min-width:1024px) 300px, 45vw" className="object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-crimson/90 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  <span className="absolute left-5 top-5 grid h-14 w-14 place-items-center rounded-2xl bg-white text-crimson shadow-lg transition duration-500 group-hover:rotate-[-8deg]">
                    <a.icon className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-3 px-1">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-navy">{a.title}</h3>
                    <p className="mt-1 text-muted">{a.text}</p>
                  </div>
                  <ArrowRight className="mt-1 h-6 w-6 shrink-0 -rotate-45 text-muted transition group-hover:rotate-0 group-hover:text-crimson" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ADMISSIONS */}
      <section className="relative px-4 pb-20 sm:px-6 lg:pb-28">
        <Butterfly id="adm-1" palette="royal" size={48} style={{ top: "-4%", right: "10%" }} duration={15} delay={-3} />
        <ButterflySwarm id="adm-s" count={3} seed={79} />
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] text-white shadow-2xl">
          <Image src="/images/admissions-bg.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-crimson via-crimson/90 to-navy/80" />
          <div className="dot-grid absolute inset-0" aria-hidden />
          <div className="relative grid gap-14 px-6 py-14 sm:px-12 lg:grid-cols-5 lg:px-16 lg:py-20">
            <div className="lg:col-span-2">
              <SectionHeading
                light
                align="left"
                eyebrow={`Admissions ${school.admissionYear}`}
                title="Begin your child’s journey with us"
                intro="Seats are limited in every class. Reach out early and our team will guide you through each step."
              />
              <Reveal delay={200} className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/admissions#apply"
                  className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-7 pr-2 font-bold text-crimson shadow-xl transition hover:bg-gold hover:text-navy"
                >
                  Apply Now
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-crimson text-white transition group-hover:rotate-[-45deg]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <a href={school.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-bold backdrop-blur-md transition hover:bg-white/20">
                  <Phone className="h-4 w-4" /> {school.phone}
                </a>
              </Reveal>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 100}>
                  <div className="h-full rounded-3xl bg-white/10 p-6 ring-1 ring-white/20 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15">
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-crimson shadow-lg">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <span className="font-display text-5xl font-bold text-white/20">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                    <p className="mt-1 text-white/80">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
