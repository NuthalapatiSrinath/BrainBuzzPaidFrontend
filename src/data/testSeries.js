// This file holds all data for the Test Series pages

// --- 1. Data for the Main Page Grid (variant="mainpage") ---
// This data is used by TestSeriesPage.jsx
export const TEST_SERIES_CATEGORIES = [
  {
    id: "upsc-2025",
    categoryKey: "upsc", // Used for navigation
    mainTitle: "UPSC Test Series - I 2025",
    courseType: "Test Series",
    logo: "/images/upsc.png",
    topColor: "#d4efff", // Light blue
    validity: "1 year",
    showValidityDropdown: true,
    mediumIconText: "Hin",
    testCount: "200 Test Series",
    price: "10,000",
    originalPrice: "12000",
    discount: "10% off",
  },
  {
    id: "cgl-2025",
    categoryKey: "cgl",
    mainTitle: "CGL Test Series - I 2025",
    courseType: "Test Series",
    logo: "/images/cgl.png",
    topColor: "#fcdbe4", // Light pink
    validity: "1 year",
    showValidityDropdown: true,
    mediumIconText: "Hin",
    testCount: "200 Test Series",
    price: "10,000",
    originalPrice: "12000",
    discount: "10% off",
  },
  {
    id: "appsc-2025",
    categoryKey: "appsc",
    mainTitle: "APPSC Test Series - I 2025",
    courseType: "Test Series",
    logo: "/images/appsc.png",
    topColor: "#d4f6e5", // Light green
    validity: "1 year",
    showValidityDropdown: true,
    mediumIconText: "Hin",
    testCount: "200 Test Series",
    price: "10,000",
    originalPrice: "12000",
    discount: "10% off",
  },
  {
    id: "appolice-2025",
    categoryKey: "appolice",
    mainTitle: "AP Police SI Test Series - I 2025",
    courseType: "Test Series",
    logo: "/images/appolice.png",
    topColor: "#fcf2da", // Light yellow
    validity: "1 year",
    showValidityDropdown: true,
    mediumIconText: "Hin",
    testCount: "200 Test Series",
    price: "10,000",
    originalPrice: "12000",
    discount: "10% off",
  },
];

// --- 2. Data for the List Page Grid (variant="store") ---
// This data is used by TestSeriesListPage.jsx (the page from your screenshot)
const upscTests = [
  {
    id: "upsc-gs-b54",
    title: "GS Foundation",
    subtitle: "प्रीलिम्स + मेन्स (नोएडा क्लासरूम से लाइव)",
    batchStartDate: "3 अक्टूबर",
    isLive: true,
    medium: "हिंदी",
    showAiBadge: true,
    showLiveCircle: true,
    mainTitle: "IAS GS Foundation Live/Online (English) : B54",
    courseType: "Test Series",
    testCount: "200 Tests",
    mediumIconText: "Hin",
    // ✅ ADDING QUESTIONS FOR THIS TEST
    questions: [
      {
        section: "Section 1",
        questions: [
          {
            id: "q1",
            text: "Which Article of the Indian Constitution empowers the Parliament to amend the Constitution?",
            options: ["article 23", "article 24", "article 25", "article 26"],
            correctAnswer: "article 26", // Example
          },
          {
            id: "q2",
            text: "The Taj Mahal, one of the Seven Wonders of the World, is a symbol of love built by Mughal Emperor Shah Jahan... can you explain in which Indian city it is located and why it holds such great historical importance?",
            options: ["A) Agra", "B) Delhi", "C) Jaipur", "D) Lucknow"],
            correctAnswer: "A) Agra",
          },
          {
            id: "q3",
            text: "Which united nations was established after the devastation of World War II to maintain peace and international cooperation – in which year was the UN officially founded?",
            options: ["A) 1942", "B) 1945", "C) 1948", "D) 1950"],
            correctAnswer: "B) 1945", // Placeholder
          },
          {
            id: "q4",
            text: "Who knows as the 'Iron Man of India' 'this leader played a pivotal role in the unification of India after independence - who is he?",
            options: [
              "A) Jawaharlal Nehru",
              "B) Sardar Vallabhbhai Patel",
              "C) Mahatma Gandhi",
              "D) Subhas Chandra Bose",
            ],
            correctAnswer: "B) Sardar Vallabhbhai Patel", // Placeholder
          },
          // ... add 21 more questions for section 1 to make 25
          {
            id: "q5",
            text: "Sample Question 5",
            options: ["A", "B", "C", "D"],
            correctAnswer: "A",
          },
          {
            id: "q6",
            text: "Sample Question 6",
            options: ["A", "B", "C", "D"],
            correctAnswer: "B",
          },
          {
            id: "q7",
            text: "Sample Question 7",
            options: ["A", "B", "C", "D"],
            correctAnswer: "C",
          },
          {
            id: "q8",
            text: "Sample Question 8",
            options: ["A", "B", "C", "D"],
            correctAnswer: "D",
          },
          {
            id: "q9",
            text: "Sample Question 9",
            options: ["A", "B", "C", "D"],
            correctAnswer: "A",
          },
          {
            id: "q10",
            text: "Sample Question 10",
            options: ["A", "B", "C", "D"],
            correctAnswer: "B",
          },
          {
            id: "q11",
            text: "Sample Question 11",
            options: ["A", "B", "C", "D"],
            correctAnswer: "C",
          },
          {
            id: "q12",
            text: "Sample Question 12",
            options: ["A", "B", "C", "D"],
            correctAnswer: "D",
          },
          {
            id: "q13",
            text: "Sample Question 13",
            options: ["A", "B", "C", "D"],
            correctAnswer: "A",
          },
          {
            id: "q14",
            text: "Sample Question 14",
            options: ["A", "B", "C", "D"],
            correctAnswer: "B",
          },
          {
            id: "q15",
            text: "Sample Question 15",
            options: ["A", "B", "C", "D"],
            correctAnswer: "C",
          },
          {
            id: "q16",
            text: "Sample Question 16",
            options: ["A", "B", "C", "D"],
            correctAnswer: "D",
          },
          {
            id: "q17",
            text: "Sample Question 17",
            options: ["A", "B", "C", "D"],
            correctAnswer: "A",
          },
          {
            id: "q18",
            text: "Sample Question 18",
            options: ["A", "B", "C", "D"],
            correctAnswer: "B",
          },
          {
            id: "q19",
            text: "Sample Question 19",
            options: ["A", "B", "C", "D"],
            correctAnswer: "C",
          },
          {
            id: "q20",
            text: "Sample Question 20",
            options: ["A", "B", "C", "D"],
            correctAnswer: "D",
          },
          {
            id: "q21",
            text: "Sample Question 21",
            options: ["A", "B", "C", "D"],
            correctAnswer: "A",
          },
          {
            id: "q22",
            text: "Sample Question 22",
            options: ["A", "B", "C", "D"],
            correctAnswer: "B",
          },
          {
            id: "q23",
            text: "Sample Question 23",
            options: ["A", "B", "C", "D"],
            correctAnswer: "C",
          },
          {
            id: "q24",
            text: "Sample Question 24",
            options: ["A", "B", "C", "D"],
            correctAnswer: "D",
          },
          {
            id: "q25",
            text: "Sample Question 25",
            options: ["A", "B", "C", "D"],
            correctAnswer: "A",
          },
        ],
      },
      {
        section: "Section 2",
        questions: [
          {
            id: "q26",
            text: "This is the first question of Section 2.",
            options: ["A", "B", "C", "D"],
            correctAnswer: "B",
          },
        ],
      },
      {
        section: "Section 3",
        questions: [
          {
            id: "q27",
            text: "This is the first question of Section 3 (Descriptive).",
            options: [],
            correctAnswer: "",
          },
        ],
      },
    ],
  },
  // ... other tests
  {
    id: "upsc-gs-b55",
    title: "GS Foundation",
    subtitle: "प्रीलिम्स + मेन्स (नोएडा क्लासरूम से लाइव)",
    batchStartDate: "3 अक्टूबर",
    isLive: true,
    medium: "हिंदी",
    showAiBadge: true,
    showLiveCircle: true,
    mainTitle: "IAS GS Foundation Live/Online (English) : B55",
    courseType: "Test Series",
    testCount: "200 Tests",
    mediumIconText: "Hin",
    questions: [] /* Add questions here */,
  },
  {
    id: "upsc-gs-b56",
    title: "GS Foundation",
    subtitle: "प्रीलिम्स + मेन्स (नोएडा क्लासरूम से लाइव)",
    batchStartDate: "3 अक्टूबर",
    isLive: true,
    medium: "हिंदी",
    showAiBadge: true,
    showLiveCircle: true,
    mainTitle: "IAS GS Foundation Live/Online (English) : B56",
    courseType: "Test Series",
    testCount: "200 Tests",
    mediumIconText: "Hin",
    questions: [],
  },
  {
    id: "upsc-gs-b57",
    title: "GS Foundation",
    subtitle: "प्रीलिम्स + मेन्स (नोएडा क्लासरूम से लाइव)",
    batchStartDate: "3 अक्टूबर",
    isLive: true,
    medium: "हिंदी",
    showAiBadge: true,
    showLiveCircle: true,
    mainTitle: "IAS GS Foundation Live/Online (English) : B57",
    courseType: "Test Series",
    testCount: "200 Tests",
    mediumIconText: "Hin",
    questions: [],
  },
  {
    id: "upsc-gs-b58",
    title: "GS Foundation",
    subtitle: "प्रीलिम्स + मेन्स (नोएडा क्लासरूम से लाइव)",
    batchStartDate: "3 अक्टूबर",
    isLive: true,
    medium: "हिंदी",
    showAiBadge: true,
    showLiveCircle: true,
    mainTitle: "IAS GS Foundation Live/Online (English) : B58",
    courseType: "Test Series",
    testCount: "200 Tests",
    mediumIconText: "Hin",
    questions: [],
  },
  {
    id: "upsc-gs-b59",
    title: "GS Foundation",
    subtitle: "प्रीलिम्स + मेन्स (नोएडा क्लासरूम से लाइव)",
    batchStartDate: "3 अक्टूबर",
    isLive: true,
    medium: "हिंदी",
    showAiBadge: true,
    showLiveCircle: true,
    mainTitle: "IAS GS Foundation Live/Online (English) : B59",
    courseType: "Test Series",
    testCount: "200 Tests",
    mediumIconText: "Hin",
    questions: [],
  },
  {
    id: "upsc-gs-b60",
    title: "GS Foundation",
    subtitle: "प्रीलिम्स + मेन्स (नोएडा क्लासरूम से लाइव)",
    batchStartDate: "3 अक्टूबर",
    isLive: true,
    medium: "हिंदी",
    showAiBadge: true,
    showLiveCircle: true,
    mainTitle: "IAS GS Foundation Live/Online (English) : B60",
    courseType: "Test Series",
    testCount: "200 Tests",
    mediumIconText: "Hin",
    questions: [],
  },
  {
    id: "upsc-gs-b61",
    title: "GS Foundation",
    subtitle: "प्रीलिम्स + मेन्स (नोएडा क्लासरूम से लाइव)",
    batchStartDate: "3 अक्टूबर",
    isLive: true,
    medium: "हिंदी",
    showAiBadge: true,
    showLiveCircle: true,
    mainTitle: "IAS GS Foundation Live/Online (English) : B61",
    courseType: "Test Series",
    testCount: "200 Tests",
    mediumIconText: "Hin",
    questions: [],
  },
];

// --- 3. Main Export ---
// This object holds all the data for the list pages
const TEST_SERIES_LIST_DATA = {
  upsc: {
    hero: {
      title: "UPSC Test Series",
      image: "/images/categoryhome.webp",
      logo: "/images/upsc.png",
      price: "6000",
      originalPrice: "9000",
      discount: "(10% off)",
      buyNowId: "upsc-test-series-main-package", // ID for buy now link
    },
    tests: upscTests,
  },
  cgl: {
    hero: {
      title: "CGL Test Series",
      image: "/images/categoryhome.webp",
      logo: "/images/cgl.png",
      price: "4000",
      originalPrice: "5000",
      discount: "(20% off)",
      buyNowId: "cgl-test-series-main-package",
    },
    // Reusing mock data for CGL, but with different IDs
    tests: upscTests.map((t) => ({ ...t, id: t.id.replace("upsc", "cgl") })),
  },
  appsc: {
    hero: {
      title: "APPSC Test Series",
      image: "/images/categoryhome.webp",
      logo: "/images/appsc.png",
      price: "5000",
      originalPrice: "6000",
      discount: "(15% off)",
      buyNowId: "appsc-test-series-main-package",
    },
    tests: upscTests.map((t) => ({ ...t, id: t.id.replace("upsc", "appsc") })),
  },
  appolice: {
    hero: {
      title: "AP Police SI Test Series",
      image: "/images/categoryhome.webp",
      logo: "/images/appolice.png",
      price: "4500",
      originalPrice: "5000",
      discount: "(10% off)",
      buyNowId: "appolice-test-series-main-package",
    },
    tests: upscTests.map((t) => ({
      ...t,
      id: t.id.replace("upsc", "appolice"),
    })),
  },
  // ... add other categories (tspsc, sbi, etc.) here
};

export default TEST_SERIES_LIST_DATA;
