// src/data/ebooks.js
// Central data for E-Books flow: categories -> subcategories -> books

const EBOOKS_DATA = {
  // --- CATEGORIES (Updated with descriptions) ---
  categories: [
    {
      key: "upsc",
      title: "UPSC",
      logo: "/images/upsc.png",
      hero: "/images/upsc.png",
      description: "E-books for the UPSC Civil Services Examination.",
    },
    {
      key: "cgl",
      title: "SSC CGL",
      logo: "/images/cgl.png",
      hero: "/images/cgl.png",
      description: "Resources for the SSC Combined Graduate Level exam.",
    },
    {
      key: "chsl",
      title: "SSC CHSL",
      logo: "/images/chsl.png",
      hero: "/images/chsl.png",
      description:
        "Study materials for the Combined Higher Secondary Level exam.",
    },
    {
      key: "appsc",
      title: "APPSC",
      logo: "/images/appsc.png",
      hero: "/images/appsc.png",
      description:
        "E-books for Andhra Pradesh Public Service Commission exams.",
    },
    {
      key: "tspsc",
      title: "TSPSC",
      logo: "/images/tspsc.png",
      hero: "/images/tspsc.png",
      description:
        "E-books for Telangana State Public Service Commission exams.",
    },
    {
      key: "appolice",
      title: "AP POLICE SI",
      logo: "/images/appolice.png",
      hero: "/images/appolice.png",
      description: "Materials for the Andhra Pradesh Police SI recruitment.",
    },
    {
      key: "tspolice",
      title: "TS POLICE SI",
      logo: "/images/tspolice.png",
      hero: "/images/tspolice.png",
      description: "Materials for the Telangana State Police SI recruitment.",
    },
    {
      key: "sbi",
      title: "State Bank of India PO",
      logo: "/images/sbi.png",
      hero: "/images/sbi.png",
      description: "Prepare for the SBI Probationary Officer exam.",
    },
    {
      key: "ibps",
      title: "IBPS",
      logo: "/images/ibps.png",
      hero: "/images/ibps.png",
      description: "E-books for all IBPS banking examinations.",
    },
    {
      key: "railways",
      title: "Railways",
      logo: "/images/railway.png",
      hero: "/images/railway.png",
      description: "Study materials for Railway Recruitment Board (RRB) exams.",
    },
    {
      key: "others",
      title: "OTHERS…",
      logo: "/images/brainbuzz.png",
      hero: "/images/brainbuzz.png",
      description: "Magazines, general knowledge, and other useful e-books.",
    },
  ],

  // --- SUBCATEGORIES (Updated with descriptions) ---
  subcategories: {
    upsc: [
      {
        id: "foundation",
        title: "Foundation",
        logo: "/images/sub/ias.png",
        description: "Build a strong base with our GS foundation e-books.",
        path: "/ebooks/upsc/foundation",
        books: [
          {
            id: "ias-gs-foundation-1",
            title: "IAS GS Foundation Basics",
            thumb: "/images/default-book.png",
            pdfUrl: "/pdfs/upsc-prelims-2024-paper1.pdf",
            validity: "d",
            medium: "Eng",
            tag: "E-Book",
          },
          {
            id: "ias-gs-foundation-2",
            title: "IAS GS Foundation Basics - Vol II",
            thumb: "/images/default-book.png",
            pdfUrl: "/pdfs/upsc-prelims-2024-paper1.pdf",
            validity: "NA",
            medium: "Eng",
            tag: "E-Book",
          },
        ],
      },
      {
        id: "prelims",
        title: "Prelims",
        logo: "/images/sub/ifs.png",
        description: "Targeted materials for the UPSC Prelims.",
        path: "/ebooks/upsc/prelims",
        books: [
          {
            id: "upsc-prelims-2023-key",
            title: "UPSC Prelims 2023 - Official Key",
            thumb: "/images/upsc.png",
            pdfUrl: "/pdfs/upsc-prelims-2024-paper1.pdf",
            validity: "NA",
            medium: "Eng",
            tag: "E-Book",
          },
        ],
      },
      {
        id: "mains",
        title: "Mains",
        logo: "/images/sub/gpsc.png",
        description: "Solved papers and notes for the UPSC Mains.",
        path: "/ebooks/upsc/mains",
        books: [
          {
            id: "upsc-mains-2023-essay",
            title: "UPSC Mains 2023 – Essay Paper (Solved)",
            thumb: "/images/upsc.png",
            pdfUrl: "/pdfs/upsc-prelims-2024-paper1.pdf",
            validity: "NA",
            medium: "Eng",
            tag: "E-Book",
          },
        ],
      },
    ],
    cgl: [
      {
        id: "tier1",
        title: "Tier I",
        logo: "/images/cgl.png",
        description: "Solved papers and practice sets for CGL Tier I.",
        path: "/ebooks/cgl/tier1",
        books: [
          {
            id: "cgl-tier1-2023",
            title: "SSC CGL Tier I 2023 - Solved",
            thumb: "/images/cgl.png",
            pdfUrl: "/pdfs/cgltier1.pdf",
            validity: "NA",
            medium: "Eng",
            tag: "E-Book",
          },
        ],
      },
    ],
    chsl: [
      {
        id: "tier1",
        title: "Tier I",
        logo: "/images/chsl.png",
        description: "Practice e-books for CHSL Tier I.",
        path: "/ebooks/chsl/tier1",
        books: [],
      },
    ],
    appsc: [
      {
        id: "group1",
        title: "Group I",
        logo: "/images/appsc.png",
        description: "Comprehensive e-books for APPSC Group 1.",
        path: "/ebooks/appsc/group1",
        books: [],
      },
      {
        id: "group2",
        title: "Group II",
        logo: "/images/appsc.png",
        description: "Study materials for APPSC Group 2.",
        path: "/ebooks/appsc/group2",
        books: [],
      },
    ],
    tspsc: [
      {
        id: "group1",
        title: "Group I",
        logo: "/images/tspsc.png",
        description: "Study materials for TSPSC Group 1.",
        path: "/ebooks/tspsc/group1",
        books: [],
      },
    ],
    appolice: [
      {
        id: "si",
        title: "AP Police SI",
        logo: "/images/appolice.png",
        description: "AP Police SI prelims and mains e-books.",
        path: "/ebooks/appolice/si",
        books: [],
      },
    ],
    tspolice: [
      {
        id: "si",
        title: "TS Police SI",
        logo: "/images/tspolice.png",
        description: "TS Police SI prelims and mains e-books.",
        path: "/ebooks/tspolice/si",
        books: [],
      },
    ],
    sbi: [
      {
        id: "po",
        title: "SBI PO",
        logo: "/images/sbi.png",
        description: "E-books for SBI Probationary Officer exam.",
        path: "/ebooks/sbi/po",
        books: [],
      },
    ],
    ibps: [
      {
        id: "po",
        title: "IBPS PO",
        logo: "/images/ibps.png",
        description: "E-books for IBPS Probationary Officer exam.",
        path: "/ebooks/ibps/po",
        books: [],
      },
    ],
    railways: [
      {
        id: "rrb",
        title: "RRB NTPC",
        logo: "/images/railway.png",
        description: "Practice sets and e-books for RRB exams.",
        path: "/ebooks/railways/rrb",
        books: [],
      },
    ],
    others: [
      {
        id: "magazine",
        title: "Magazine",
        logo: "/images/brainbuzz.png",
        description: "Monthly current affairs magazines and compilations.",
        path: "/ebooks/others/magazine",
        books: [],
      },
    ],
  },
};

export default EBOOKS_DATA;
