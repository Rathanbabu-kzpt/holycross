import type { Metadata } from "next";
import { Lightbulb, Medal, Palette, PartyPopper } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import FeatureSplit from "@/components/FeatureSplit";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ButterflySwarm } from "@/components/decor/Flying";
import { school } from "@/content/site";

export const metadata: Metadata = {
  title: "Activities",
  description: `Sports, arts, clubs and celebrations at ${school.name}, ${school.place}.`,
};

const activities = [
  {
    id: "sports",
    icon: Medal,
    eyebrow: "Sports & Games",
    title: "Fitness, teamwork and spirit",
    text: "Every child plays. Regular PT and coached games build fitness, teamwork and a healthy competitive spirit.",
    points: ["Athletics", "Kabaddi & kho-kho", "Cricket & football", "Volleyball", "Yoga", "Chess & carrom"],
    image: "/images/act-sports.jpg",
    imageAlt: "Children playing football",
  },
  {
    id: "arts",
    icon: Palette,
    eyebrow: "Arts & Culture",
    title: "Every talent finds a stage",
    text: "Drawing, craft, music, dance and drama help children express themselves and grow in confidence.",
    points: ["Drawing & painting", "Craft work", "Classical & folk dance", "Music & singing", "Drama & skits", "Elocution"],
    image: "/images/act-arts.jpg",
    imageAlt: "Child painting",
  },
  {
    id: "clubs",
    icon: Lightbulb,
    eyebrow: "Clubs & Societies",
    title: "Explore what you love",
    text: "Clubs give students a space to follow their interests, work in teams and learn beyond the textbook.",
    points: ["Science club", "Eco club", "Literary club", "Maths club", "Quiz club", "Reading club"],
    image: "/images/hero-2.jpg",
    imageAlt: "Students working together",
  },
  {
    id: "celebrations",
    icon: PartyPopper,
    eyebrow: "Celebrations",
    title: "Festivals and special days",
    text: "We celebrate our nation, our cultures and our achievements together — as one Holy Cross family.",
    points: ["Annual Day", "Sports Day", "Independence & Republic Day", "Children’s Day", "Teachers’ Day", "Festival celebrations"],
    image: "/images/act-celebrations.jpg",
    imageAlt: "Young dancer in festive costume",
  },
];

const stats = [
  { value: "4", label: "Activity areas" },
  { value: "24", label: "Activities & clubs" },
  { value: "Daily", label: "PT & play time" },
  { value: "Year-round", label: "Celebrations" },
];

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        crumb="Activities"
        title="Beyond the"
        highlight="classroom"
        intro="Every child has a spark. Sports, arts, clubs and celebrations help them find it and let it shine."
        image="/images/act-music.jpg"
        sections={activities.map((a) => ({ label: a.eyebrow, href: `#${a.id}`, icon: a.icon }))}
      />

      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:px-6">
        <Reveal className="grid grid-cols-2 overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_60px_-30px_rgba(11,20,55,0.45)] ring-1 ring-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`p-6 text-center sm:p-8 ${i > 0 ? "border-line lg:border-l" : ""} ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""}`}>
              <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm font-semibold text-muted">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <div className="relative overflow-hidden py-10 lg:py-16">
        <ButterflySwarm id="act-page" count={5} seed={31} />
        {activities.map((a, i) => (
          <FeatureSplit key={a.id} index={i} flip={i % 2 === 1} {...a} />
        ))}
      </div>

      <CtaBand title="Let your child discover their spark" cta={{ label: "Apply for Admission", href: "/admissions#apply" }} />
    </>
  );
}
