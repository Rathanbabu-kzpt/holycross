// Home page content. Images in /public/images are free stock photos of Indian children (placeholders, chosen with
// no ties/badges/school names and no buildings) —
// swap them for real Holy Cross campus photos (keep the same file names, or update the paths here).

export const slides = [
  {
    image: "/images/hero-1.jpg",
    eyebrow: "Admissions open · 2027–28",
    title: "Where every child",
    highlight: "shines brighter",
    text: "A joyful, values-driven school in Ghanpur (Stn.) where curiosity is celebrated and every child is known by name.",
    cta: { label: "Apply for Admission", href: "/admissions#apply" },
    label: "Admissions",
  },
  {
    image: "/images/hero-2.jpg",
    eyebrow: "Academic excellence",
    title: "Learning that",
    highlight: "lights the way",
    text: "Experienced teachers, smart classrooms and hands-on learning from Nursery to Class X.",
    cta: { label: "Explore Facilities", href: "/facilities" },
    label: "Academics",
  },
  {
    image: "/images/hero-3.jpg",
    eyebrow: "Wisdom is Light",
    title: "Building minds,",
    highlight: "shaping character",
    text: "We nurture discipline, kindness and confidence alongside strong academics.",
    cta: { label: "Discover Our Story", href: "/about" },
    label: "Our Values",
  },
  {
    image: "/images/hero-4.jpg",
    eyebrow: "Beyond the classroom",
    title: "Play, create and",
    highlight: "grow together",
    text: "Sports, arts, clubs and celebrations that help every child find their spark.",
    cta: { label: "See Activities", href: "/activities" },
    label: "Activities",
  },
];

export const galleryStrip = Array.from({ length: 8 }, (_, i) => `/images/gallery-${String(i + 1).padStart(2, "0")}.jpg`);
