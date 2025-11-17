// src/data/liveClassesData.js

/**
 * 1. ALL LIVE CLASSES
 * This is the master list for your "/liveclasses/all" page.
 * I've added 'subcategory' keys to make it usable by other pages too.
 */
export const allLiveClassesData = [
  {
    id: 101,
    title: "Modern History Masterclass (LIVE)",
    category: "UPSC", // Main category
    subcategory: "gs-prelims", // Subcategory slug
    img: "/images/hero2.jpg",
    tutorName: "Mr. Sharma",
    scheduledAt: "Today at 10:00 AM",
    status: "LIVE",
  },
  {
    id: 102,
    title: "Political Science Deep Dive",
    category: "UPSC",
    subcategory: "gs-mains",
    img: "/images/learning.jpg",
    tutorName: "Ms. Gupta",
    scheduledAt: "Today at 4:00 PM",
    status: "UPCOMING",
  },
  {
    id: 201,
    title: "Advanced Mathematics for CGL",
    category: "SSC", // Main category
    subcategory: "ssc-cgl", // Subcategory slug
    img: "/images/categoryhome.webp",
    tutorName: "Mr. Verma",
    scheduledAt: "Tomorrow, 11:00 AM",
    status: "UPCOMING",
  },
  {
    id: 301,
    title: "AP History & Geography",
    category: "APPSC", // Main category
    subcategory: "group-1", // Subcategory slug
    img: "/images/aboutus/about3.webp",
    tutorName: "Mr. Reddy",
    scheduledAt: "Today at 1:00 PM",
    status: "UPCOMING",
  },
  {
    id: 501,
    title: "Indian Economy for Banking",
    category: "BANKING", // Main category
    subcategory: "ibps-po", // Subcategory slug
    img: "/images/aboutus/aboutus1.webp",
    tutorName: "Ms. Rao",
    scheduledAt: "Today at 2:00 PM",
    status: "UPCOMING",
  },
];

/**
 * 2. LIVE CLASS MAIN CATEGORIES
 * This is for your "LiveClasses.jsx" (main landing page)
 * It provides data for the <CategoryCard> components.
 */
export const liveClassesCategories = [
  {
    slug: "upsc",
    name: "UPSC",
    logo: "/images/upsc.png",
    description: "All live classes for UPSC-CSE, prelims, mains, and optional.",
    buttonLabel: "View Classes",
  },
  {
    slug: "ssc",
    name: "SSC",
    logo: "/images/cgl.png", // Using CGL as a proxy
    description: "Live classes for SSC CGL, CHSL, and other examinations.",
    buttonLabel: "View Classes",
  },
  {
    slug: "appsc",
    name: "APPSC",
    logo: "/images/appsc.png",
    description:
      "Targeted coaching for APPSC Group 1, 2, and other state exams.",
    buttonLabel: "View Classes",
  },
  {
    slug: "banking",
    name: "Banking",
    logo: "/images/ibps.png", // Using IBPS as a proxy
    description:
      "Master quantitative aptitude, reasoning, and English for bank exams.",
    buttonLabel: "View Classes",
  },
];

/**
 * 3. LIVE CLASS SUB-CATEGORIES
 * This is for the "LiveClassesSubcategories.jsx" page we built.
 * It is keyed by the main category slug.
 */
export const liveClassesSubcategories = {
  upsc: {
    title: "UPSC Live Classes",
    description:
      "Intensive live classes for all UPSC Civil Services exam stages.",
    bannerImage: "/images/current-affairs-banner.png",
    subcategories: [
      {
        slug: "gs-prelims",
        name: "GS Prelims",
        logo: "/images/sub/ias.png",
        description: "Comprehensive coverage of all General Studies topics.",
        buttonLabel: "View Classes",
      },
      {
        slug: "gs-mains",
        name: "GS Mains",
        logo: "/images/sub/ifs.png",
        description: "In-depth analysis and answer writing practice.",
        buttonLabel: "View Classes",
      },
    ],
  },
  ssc: {
    title: "SSC Live Classes",
    description: "Live classes for SSC CGL, CHSL, and other exams.",
    bannerImage: "/images/daily-quizzes-banner.png",
    subcategories: [
      {
        slug: "ssc-cgl",
        name: "SSC CGL",
        logo: "/images/cgl.png",
        description:
          "Targeted coaching for all tiers of the SSC CGL examination.",
        buttonLabel: "View Classes",
      },
      {
        slug: "ssc-chsl",
        name: "SSC CHSL",
        logo: "/images/chsl.png",
        description: "Crack the Combined Higher Secondary Level exam.",
        buttonLabel: "View Classes",
      },
    ],
  },
  appsc: {
    title: "APPSC Live Classes",
    description: "State-specific syllabus coverage for all APPSC exams.",
    bannerImage: "/images/current-affairs-banner.png",
    subcategories: [
      {
        slug: "group-1",
        name: "Group 1",
        logo: "/images/appsc.png",
        description: "Complete coaching for Group 1 officer posts.",
        buttonLabel: "View Classes",
      },
    ],
  },
  banking: {
    title: "Banking Live Classes",
    description: "Ace your IBPS, SBI PO, and Clerk examinations.",
    bannerImage: "/images/daily-quizzes-banner.png",
    subcategories: [
      {
        slug: "ibps-po",
        name: "IBPS PO",
        logo: "/images/ibps.png",
        description: "Master the syllabus for the Probationary Officer exam.",
        buttonLabel: "View Classes",
      },
      {
        slug: "sbi-clerk",
        name: "SBI Clerk",
        logo: "/images/sbi.png",
        description: "Specialized coaching for the SBI Junior Associates exam.",
        buttonLabel: "View Classes",
      },
    ],
  },
};
