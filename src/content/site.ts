import {
  BookOpen,
  Bus,
  CalendarDays,
  Clapperboard,
  ClipboardList,
  FlaskConical,
  House,
  Images,
  IndianRupee,
  Laptop,
  Lightbulb,
  Medal,
  MessageSquareQuote,
  Monitor,
  Palette,
  PartyPopper,
  PenLine,
  Phone,
  School,
  Target,
  Trophy,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

// Central school details. Editing these updates the header, footer, home and contact pages.
// NOTE: office hours are placeholders — replace with the school's real timings.

export const school = {
  name: "Holy Cross High School",
  shortName: "Holy Cross",
  place: "Ghanpur (Stn.)",
  motto: "Wisdom is Light",
  tagline: "Nurturing minds, building character, lighting the way forward.",
  address: {
    line1: "Holy Cross High School",
    line2: "Ghanpur (Stn.), Jangaon District",
    line3: "Telangana, India",
  },
  // The first number is the primary one, used for "Call now" buttons.
  phones: [
    { label: "+91 91003 72324", href: "tel:+919100372324" },
    { label: "+91 94940 37347", href: "tel:+919494037347" },
  ],
  phone: "+91 91003 72324",
  phoneHref: "tel:+919100372324",
  email: "hchsgnp@gmail.com",
  hours: [
    { days: "Monday – Friday", time: "8:30 AM – 4:30 PM" },
    { days: "Saturday", time: "8:30 AM – 1:00 PM" },
  ],
  mapQuery: "Station Ghanpur, Jangaon, Telangana",
  admissionYear: "2027–28",
};

export type SocialName = "Facebook" | "Instagram" | "YouTube";

// TODO: paste the school's real page URLs here — an empty url shows the icon without a link.
export const socials: { name: SocialName; url: string }[] = [
  { name: "Facebook", url: "" },
  { name: "Instagram", url: "" },
  { name: "YouTube", url: "" },
];

// Sub-items link to a section (anchor) on their parent page.
export type NavChild = { label: string; href: string; description?: string; icon: LucideIcon };

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Mega-menu intro text shown beside the links. */
  intro?: string;
  /** Mega-menu feature card (photo + call to action). */
  feature?: { image: string; title: string; text: string; cta: { label: string; href: string } };
  children?: NavChild[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/", icon: House },
  {
    label: "About Us",
    href: "/about",
    icon: School,
    intro: "Discover the story, values and people behind Holy Cross High School.",
    feature: {
      image: "/images/welcome-main.jpg",
      title: "Wisdom is Light",
      text: "Our motto guides everything we do.",
      cta: { label: "Read our story", href: "/about" },
    },
    children: [
      { label: "Our School", href: "/about#our-school", description: "Our story, heritage and values", icon: School },
      { label: "Vision & Mission", href: "/about#vision-mission", description: "What we stand for", icon: Target },
      { label: "Principal's Message", href: "/about#principal", description: "A word from our principal", icon: MessageSquareQuote },
      { label: "Management", href: "/about#management", description: "The people who guide us", icon: Users },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    icon: ClipboardList,
    intro: "Everything parents need to know to join the Holy Cross family.",
    feature: {
      image: "/images/hero-1.jpg",
      title: `Admissions open ${school.admissionYear}`,
      text: "Seats are limited — apply early.",
      cta: { label: "Apply now", href: "/admissions#apply" },
    },
    children: [
      { label: "Admission Process", href: "/admissions#process", description: "Step-by-step guide to joining", icon: ClipboardList },
      { label: "Eligibility & Age Criteria", href: "/admissions#eligibility", description: "Class-wise requirements", icon: UserCheck },
      { label: "Fee Structure", href: "/admissions#fees", description: "Transparent, affordable fees", icon: IndianRupee },
      { label: "Apply Online", href: "/admissions#apply", description: "Start your application", icon: PenLine },
    ],
  },
  {
    label: "Facilities",
    href: "/facilities",
    icon: Monitor,
    intro: "Bright, safe spaces where children learn, explore and play.",
    feature: {
      image: "/images/fac-classroom.jpg",
      title: "Learning spaces",
      text: "Smart classrooms, labs and more.",
      cta: { label: "Explore facilities", href: "/facilities" },
    },
    children: [
      { label: "Smart Classrooms", href: "/facilities#classrooms", description: "Bright, digital-ready rooms", icon: Monitor },
      { label: "Library", href: "/facilities#library", description: "A home for curious readers", icon: BookOpen },
      { label: "Science Laboratories", href: "/facilities#labs", description: "Learning by doing", icon: FlaskConical },
      { label: "Computer Lab", href: "/facilities#computer-lab", description: "Digital skills for tomorrow", icon: Laptop },
      { label: "Sports & Playground", href: "/facilities#sports", description: "Space to play and grow", icon: Trophy },
      { label: "Transport", href: "/facilities#transport", description: "Safe rides to and from school", icon: Bus },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
    icon: Images,
    intro: "Moments of joy, learning and celebration from our campus.",
    feature: {
      image: "/images/gallery-01.jpg",
      title: "Life at Holy Cross",
      text: "See our students in action.",
      cta: { label: "Open gallery", href: "/gallery" },
    },
    children: [
      { label: "Photo Gallery", href: "/gallery#photos", description: "Moments from campus life", icon: Images },
      { label: "Video Gallery", href: "/gallery#videos", description: "Performances and events", icon: Clapperboard },
      { label: "Events", href: "/gallery#events", description: "Annual day, sports meet & more", icon: CalendarDays },
    ],
  },
  {
    label: "Activities",
    href: "/activities",
    icon: Palette,
    intro: "Sports, arts and clubs that help every child find their spark.",
    feature: {
      image: "/images/act-music.jpg",
      title: "Beyond the classroom",
      text: "Dance, music, sport and more.",
      cta: { label: "See activities", href: "/activities" },
    },
    children: [
      { label: "Sports & Games", href: "/activities#sports", description: "Fitness, teamwork, spirit", icon: Medal },
      { label: "Arts & Culture", href: "/activities#arts", description: "Music, dance, drama, art", icon: Palette },
      { label: "Clubs & Societies", href: "/activities#clubs", description: "Science, eco, literary clubs", icon: Lightbulb },
      { label: "Celebrations", href: "/activities#celebrations", description: "Festivals and special days", icon: PartyPopper },
    ],
  },
  { label: "Contact Us", href: "/contact", icon: Phone },
];
