import posterFoundation from "@/assets/poster-foundation.jpg";
import posterPremium from "@/assets/poster-premium.jpg";
import posterNeet from "@/assets/poster-neet.jpg";
import posterJee from "@/assets/poster-jee.jpg";

export type Tier = "standard" | "premium";

export type Batch = {
  id: string;
  slug: string;
  classId: string;
  classLabel: string;
  title: string;
  tier: Tier;
  track?: "NEET" | "JEE";
  price: number;
  strikePrice?: number;
  tagline: string;
  poster: string;
  subjects: string[];
  highlights: string[];
  mentor: string;
  hours: number;
  tests: number;
};

export type ClassCourse = {
  id: string;
  label: string;
  short: string;
  blurb: string;
  batches: Batch[];
};

const b = (batch: Batch) => batch;

export const classes: ClassCourse[] = [
  {
    id: "class-9",
    label: "Class 9",
    short: "IX",
    blurb: "Build the base. Concept-first Science, Maths, SST and English for CBSE and state boards.",
    batches: [
      b({
        id: "c9-standard",
        slug: "c9-standard",
        classId: "class-9",
        classLabel: "Class 9",
        title: "Foundation 9 — Standard",
        tier: "standard",
        price: 0,
        strikePrice: 3499,
        tagline: "Free recorded lectures, notes and weekly quizzes.",
        poster: posterFoundation,
        subjects: ["Science", "Maths", "SST", "English"],
        highlights: ["180+ recorded lectures", "Chapter notes (PDF)", "Weekly quizzes", "Community doubt board"],
        mentor: "Ankit Raghav",
        hours: 180,
        tests: 12,
      }),
      b({
        id: "c9-premium",
        slug: "c9-premium",
        classId: "class-9",
        classLabel: "Class 9",
        title: "Foundation 9 — Premium",
        tier: "premium",
        price: 1999,
        strikePrice: 3999,
        tagline: "Live classes, mentor doubt-solving and a full test series.",
        poster: posterPremium,
        subjects: ["Science", "Maths", "SST", "English"],
        highlights: ["220+ live classes", "1:1 mentor calls", "24 chapter tests", "Printed-style DPP sheets"],
        mentor: "Ankit Raghav",
        hours: 220,
        tests: 24,
      }),
    ],
  },
  {
    id: "class-10",
    label: "Class 10",
    short: "X",
    blurb: "Board-year rigour with steady revision cycles and full-syllabus mock papers.",
    batches: [
      b({
        id: "c10-standard",
        slug: "c10-standard",
        classId: "class-10",
        classLabel: "Class 10",
        title: "Board Ready 10 — Standard",
        tier: "standard",
        price: 0,
        strikePrice: 4499,
        tagline: "Free recorded lectures with board-pattern practice sets.",
        poster: posterFoundation,
        subjects: ["Science", "Maths", "SST", "English"],
        highlights: ["200+ recorded lectures", "Board pattern worksheets", "Weekly quizzes", "Community doubt board"],
        mentor: "Sneha Iyer",
        hours: 200,
        tests: 14,
      }),
      b({
        id: "c10-premium",
        slug: "c10-premium",
        classId: "class-10",
        classLabel: "Class 10",
        title: "Board Ready 10 — Premium",
        tier: "premium",
        price: 2499,
        strikePrice: 4999,
        tagline: "Live classes, sample-paper marathons and mentor tracking.",
        poster: posterPremium,
        subjects: ["Science", "Maths", "SST", "English"],
        highlights: ["260+ live classes", "20 full sample papers", "Answer-sheet evaluation", "Mentor progress reviews"],
        mentor: "Sneha Iyer",
        hours: 260,
        tests: 30,
      }),
    ],
  },
  {
    id: "class-11",
    label: "Class 11",
    short: "XI",
    blurb: "Where boards meet entrance prep. Deep PCM/PCB with early JEE and NEET exposure.",
    batches: [
      b({
        id: "c11-standard",
        slug: "c11-standard",
        classId: "class-11",
        classLabel: "Class 11",
        title: "Ascend 11 — Standard",
        tier: "standard",
        price: 0,
        strikePrice: 5999,
        tagline: "Free recorded PCM and PCB lectures with NCERT drills.",
        poster: posterFoundation,
        subjects: ["Physics", "Chemistry", "Maths", "Biology"],
        highlights: ["240+ recorded lectures", "NCERT line-by-line drills", "Weekly quizzes", "Formula sheets"],
        mentor: "Dr. Varun Malhotra",
        hours: 240,
        tests: 16,
      }),
      b({
        id: "c11-premium",
        slug: "c11-premium",
        classId: "class-11",
        classLabel: "Class 11",
        title: "Ascend 11 — Premium",
        tier: "premium",
        price: 3999,
        strikePrice: 7999,
        tagline: "Live classes, advanced problem labs and entrance-level tests.",
        poster: posterPremium,
        subjects: ["Physics", "Chemistry", "Maths", "Biology"],
        highlights: ["300+ live classes", "Advanced problem labs", "36 chapter tests", "Mentor doubt calls"],
        mentor: "Dr. Varun Malhotra",
        hours: 300,
        tests: 36,
      }),
    ],
  },
  {
    id: "class-12",
    label: "Class 12",
    short: "XII",
    blurb: "Three tracks: board-focused Standard, plus dedicated premium NEET and JEE batches.",
    batches: [
      b({
        id: "c12-standard",
        slug: "c12-standard",
        classId: "class-12",
        classLabel: "Class 12",
        title: "Complete 12 — Standard",
        tier: "standard",
        price: 0,
        strikePrice: 6499,
        tagline: "Free recorded lectures, notes and weekly quizzes.",
        poster: posterFoundation,
        subjects: ["Physics", "Chemistry", "Maths", "Biology"],
        highlights: ["260+ recorded lectures", "Board revision capsules", "Weekly quizzes", "Community doubt board"],
        mentor: "Rahul Deshmukh",
        hours: 260,
        tests: 18,
      }),
      b({
        id: "c12-neet",
        slug: "c12-neet",
        classId: "class-12",
        classLabel: "Class 12",
        title: "NEET 2027 — Med Track",
        tier: "premium",
        track: "NEET",
        price: 12999,
        strikePrice: 19999,
        tagline: "Biology-first coaching with full-length NEET mocks and rank analysis.",
        poster: posterNeet,
        subjects: ["Biology", "Physics", "Chemistry"],
        highlights: ["360+ live classes", "40 full-length NEET mocks", "All-India rank analysis", "Mentor calls every week"],
        mentor: "Dr. Meera Kulkarni",
        hours: 360,
        tests: 40,
      }),
      b({
        id: "c12-jee",
        slug: "c12-jee",
        classId: "class-12",
        classLabel: "Class 12",
        title: "JEE 2027 — Engg Track",
        tier: "premium",
        track: "JEE",
        price: 12999,
        strikePrice: 19999,
        tagline: "Maths-heavy problem labs with Advanced-level mocks and rank analysis.",
        poster: posterJee,
        subjects: ["Maths", "Physics", "Chemistry"],
        highlights: ["360+ live classes", "40 Mains + Advanced mocks", "All-India rank analysis", "Mentor calls every week"],
        mentor: "Prof. Kabir Nanda",
        hours: 360,
        tests: 40,
      }),
    ],
  },
];

export const allBatches: Batch[] = classes.flatMap((c) => c.batches);

export const getClass = (id: string) => classes.find((c) => c.id === id);
export const getBatch = (id: string) => allBatches.find((batch) => batch.id === id);

export type ProCourse = {
  id: string;
  title: string;
  blurb: string;
  price: number;
  weeks: number;
  level: string;
};

export const proCourses: ProCourse[] = [
  {
    id: "pro-data",
    title: "Data Analytics for Managers",
    blurb: "SQL, dashboards and decision storytelling in short evening modules.",
    price: 8999,
    weeks: 10,
    level: "Beginner to intermediate",
  },
  {
    id: "pro-fullstack",
    title: "Full-Stack Engineering Sprint",
    blurb: "Ship a production web app while holding down a day job.",
    price: 14999,
    weeks: 16,
    level: "Intermediate",
  },
  {
    id: "pro-leadership",
    title: "People & Product Leadership",
    blurb: "Run reviews, roadmaps and hard conversations with confidence.",
    price: 10999,
    weeks: 8,
    level: "Team leads and above",
  },
];

export const mentors = [
  { name: "Dr. Meera Kulkarni", subject: "NEET Biology", years: 12, initials: "MK", tint: "bg-mint/30" },
  { name: "Prof. Kabir Nanda", subject: "JEE Mathematics", years: 15, initials: "KN", tint: "bg-sun/40" },
  { name: "Dr. Varun Malhotra", subject: "Physics, Class 11–12", years: 11, initials: "VM", tint: "bg-sky/25" },
  { name: "Sneha Iyer", subject: "Class 10 Science & SST", years: 9, initials: "SI", tint: "bg-brand/20" },
  { name: "Ankit Raghav", subject: "Class 9 Foundation", years: 7, initials: "AR", tint: "bg-blush" },
  { name: "Nidhi Bansal", subject: "Professional Upskilling", years: 10, initials: "NB", tint: "bg-accent-violet/20" },
];

export const cities = [
  "New Delhi",
  "Mumbai",
  "Bengaluru",
  "Kolkata",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Online only",
];

export const languages = ["English", "हिन्दी (Hindi)", "Hinglish", "मराठी (Marathi)", "தமிழ் (Tamil)"];

export const formatINR = (value: number) =>
  value === 0 ? "₹0" : `₹${value.toLocaleString("en-IN")}`;
