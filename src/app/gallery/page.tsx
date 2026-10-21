import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, Clapperboard, Flag, GraduationCap, Heart, Images, Music, Play, Sparkles, Star, Trophy } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import PhotoGallery, { type Photo } from "@/components/PhotoGallery";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { ButterflySwarm } from "@/components/decor/Flying";
import { school, socials } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos, videos and events from campus life at ${school.name}, ${school.place}.`,
};

const photos: Photo[] = [
  { src: "/images/hero-2.jpg", alt: "Drawing together in class", category: "Classroom" },
  { src: "/images/welcome-main.jpg", alt: "Lost in a good book", category: "Reading" },
  { src: "/images/act-sports.jpg", alt: "Football at break time", category: "Sports" },
  { src: "/images/act-music.jpg", alt: "Classical dance performance", category: "Arts" },
  { src: "/images/stage-upper.jpg", alt: "Focused at her desk", category: "Classroom" },
  { src: "/images/hero-4.jpg", alt: "Cricket practice", category: "Sports" },
  { src: "/images/gallery-01.jpg", alt: "Reading outdoors", category: "Reading" },
  { src: "/images/act-arts.jpg", alt: "Painting time", category: "Arts" },
  { src: "/images/welcome-small.jpg", alt: "Thumbs up for learning", category: "Classroom" },
  { src: "/images/fac-sports.jpg", alt: "Playing together outdoors", category: "Sports" },
  { src: "/images/gallery-06.jpg", alt: "Story time", category: "Reading" },
  { src: "/images/act-celebrations.jpg", alt: "Festive costume", category: "Arts" },
  { src: "/images/stage-primary.jpg", alt: "Colours and creativity", category: "Arts" },
  { src: "/images/gallery-04.jpg", alt: "Friends forever", category: "Classroom" },
  { src: "/images/stage-high.jpg", alt: "Reading in the sun", category: "Reading" },
];

const videos = [
  { image: "/images/act-music.jpg", title: "Annual Day performances" },
  { image: "/images/hero-4.jpg", title: "Sports Day highlights" },
  { image: "/images/act-celebrations.jpg", title: "Cultural celebrations" },
];

const events = [
  { icon: Flag, when: "26 January", title: "Republic Day", text: "Flag hoisting, march past and patriotic songs." },
  { icon: Trophy, when: "Every year", title: "Annual Sports Meet", text: "Races, relays, games and prize distribution." },
  { icon: Flag, when: "15 August", title: "Independence Day", text: "Celebrating freedom with the whole school." },
  { icon: GraduationCap, when: "5 September", title: "Teachers’ Day", text: "Students honour and thank their teachers." },
  { icon: Heart, when: "14 November", title: "Children’s Day", text: "A fun-filled day planned just for students." },
  { icon: Music, when: "Every year", title: "Annual Day", text: "Dance, drama and music on the big stage." },
  { icon: Star, when: "Every year", title: "Science & Art Exhibition", text: "Projects, models and artwork by our students." },
  { icon: Sparkles, when: "Through the year", title: "Festival Celebrations", text: "Celebrating our many cultures together." },
];

const youtube = socials.find((s) => s.name === "YouTube")?.url;

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumb="Gallery"
        title="Moments that make"
        highlight="memories"
        intro="A glimpse of everyday life at Holy Cross — learning, playing, creating and celebrating together."
        image="/images/gallery-01.jpg"
        sections={[
          { label: "Photo Gallery", href: "#photos", icon: Images },
          { label: "Video Gallery", href: "#videos", icon: Clapperboard },
          { label: "Events", href: "#events", icon: CalendarDays },
        ]}
      />

      {/* PHOTOS */}
      <section id="photos" className="relative scroll-mt-28 overflow-hidden py-20 lg:py-28">
        <ButterflySwarm id="gal-page" count={4} seed={43} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Photo Gallery" title={<>Life on <span className="text-gradient">campus</span></>} intro="Tap any photo to view it full screen." />
          <Reveal className="mt-10">
            <PhotoGallery photos={photos} />
          </Reveal>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" className="relative scroll-mt-28 overflow-hidden bg-navy py-20 text-white lg:py-28">
        <div className="dot-grid absolute inset-0" aria-hidden />
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-royal/40 blur-[120px]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading light eyebrow="Video Gallery" title={<>Watch us <span className="text-gradient-light">in action</span></>} intro="Performances and event highlights — new videos are on the way." />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {videos.map((v, i) => {
              const body = (
                <>
                  <Image src={v.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/10" />
                  <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-crimson text-white shadow-2xl shadow-crimson/40 transition group-hover:scale-110">
                    <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-display text-xl font-semibold">{v.title}</p>
                    {!youtube && <p className="mt-1 text-sm text-gold">Coming soon</p>}
                  </div>
                </>
              );
              const cls = "group relative block aspect-video overflow-hidden rounded-[2rem] ring-1 ring-white/10";
              return (
                <Reveal key={v.title} delay={i * 100}>
                  {youtube ? (
                    <a href={youtube} target="_blank" rel="noopener noreferrer" className={cls}>
                      {body}
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="relative scroll-mt-28 overflow-hidden py-20 lg:py-28">
        <ButterflySwarm id="gal-ev" count={3} seed={61} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Events" title={<>Our school <span className="text-gradient">calendar</span></>} intro="Special days we look forward to every year." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((e, i) => (
              <Reveal key={e.title} delay={i * 60}>
                <div className="group h-full rounded-[2rem] bg-white p-6 ring-1 ring-line transition hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-25px_rgba(11,20,55,0.35)]">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-crimson/10 text-crimson transition group-hover:bg-crimson group-hover:text-white">
                      <e.icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-navy ring-1 ring-line">{e.when}</span>
                  </div>
                  <p className="mt-5 font-display text-xl font-semibold text-navy">{e.title}</p>
                  <p className="mt-1.5 text-muted">{e.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Be part of these memories" />
    </>
  );
}
