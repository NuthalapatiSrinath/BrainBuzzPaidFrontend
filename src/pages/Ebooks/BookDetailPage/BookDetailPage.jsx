import React, { useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import AuthorCard from "../../../components/AuthorCard/AuthorCard";
import PricingTab from "./PricingTabContent/PricingTabContent";
import CourseHero from "../../../components/CourseHero/CourseHero";
import EBOOKS_DATA from "../../../data/ebooks";
import styles from "./BookDetailPage.module.css";
// Import list of purchased ebook IDs (Assuming path is correct per your instruction)
import { purchasedEbookIds } from "../../../data/userEbooks";

// --- Mock Data for Tabs (Keep these local) ---
const MOCK_AUTHORS = [
  {
    name: "Shankar",
    qualification: "BEd",
    language: "English",
    imageUrl: "https://placehold.co/200x150/EBF0FF/1F4D9D?text=S",
  },
  {
    name: "Sunitha",
    qualification: "BEd",
    language: "English",
    imageUrl: "https://placehold.co/200x150/EBF0FF/1F4D9D?text=S",
  },
];
const MOCK_IMAGES = [
  "/images/default-book.png",
  "/images/default-book.png",
  "/images/default-book.png",
  "/images/default-book.png",
];
// --- End Mock Data ---

export default function BookDetailPage() {
  // Extract parameters: category, subcategory, id, and the optional tab
  const { id, category, subcategory, tab } = useParams();
  const navigate = useNavigate();

  const catKey = category?.toLowerCase();
  const subKey = subcategory?.toLowerCase();
  // 🎯 Derive activeTab from URL, default to 'description'
  const activeTab = tab || "description";

  const { book, catInfo, isBookPurchased } = useMemo(() => {
    const cat = EBOOKS_DATA.categories.find((c) => c.key === catKey);
    const subs = EBOOKS_DATA.subcategories[catKey] || [];
    const sub = subs.find((s) => s.id === subKey);
    const selectedBook =
      sub?.books?.find((b) => String(b.id) === String(id)) || null;

    // Check purchase status
    const isPurchased = purchasedEbookIds.includes(String(id));

    return { book: selectedBook, catInfo: cat, isBookPurchased: isPurchased };
  }, [catKey, subKey, id]);

  // --- Handlers ---

  // 🎯 New handler to update the URL when a tab is clicked
  const handleTabChange = useCallback(
    (tabId) => {
      // Navigate to the new URL with the tab ID, replacing history state
      navigate(`/ebooks/${category}/${subcategory}/${id}/${tabId}`, {
        replace: true,
      });
    },
    [category, subcategory, id, navigate]
  );

  // Download handler (Initiates direct download)
  const handleDownloadClick = useCallback(() => {
    if (!book?.pdfUrl) {
      console.error("No PDF URL available for this book.");
      return;
    }
    try {
      const a = document.createElement("a");
      a.href = book.pdfUrl;
      const safeTitle = (book.title || "ebook")
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      a.download = `${safeTitle}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      // Fallback for security-restricted environments
      window.open(book.pdfUrl, "_blank", "noopener");
    }
  }, [book]);

  // Buy Now handler
  const handleBuyNow = useCallback(() => {
    // Implement actual checkout logic here
    console.log(`Redirecting to checkout for ${book?.buyNowId || id}`);
    // Example: navigate(`/buy-now/${book?.buyNowId || id}`);
  }, [book, id]);

  // --- Define Content for Each Tab (Functions/variables remain similar) ---

  const descriptionContent = (
    <div className={`${styles.panelContent} ${styles.description}`}>
      <div className={styles.aboutbook}>About Book:</div>
      <p className={styles.descText}>
        {book?.description || "No description available."}
      </p>
      <div className={styles.whatwillyouget}>What you will get:</div>
      <ul className={styles.bullets}>
        <li>Comprehensive syllabus coverage</li>
        <li>Expert-led interactive classes</li>
        <li>Time management & exam strategies</li>
        <li>Doubt-solving sessions</li>
        <li>Mock tests & performance analysis</li>
      </ul>
      <div className={styles.downloadthestructure}>Download the Structure:</div>
      <div className={styles.pdfCard}>
        <div className={styles.pdfIcon}>
          <img
            src="/images/pdf-icon.png"
            alt="PDF"
            onError={(e) =>
              (e.currentTarget.src = "/images/pdf-placeholder.png")
            }
          />
        </div>
        <div className={styles.pdfMeta}>
          <div className={styles.pdfTitle}>
            {book?.title || "IAS GS Foundation Structure.pdf"}
          </div>
          <div className={styles.pdfActions}>
            <Button
              label={isBookPurchased ? "Download" : "Buy to Download"}
              onClick={isBookPurchased ? handleDownloadClick : handleBuyNow}
              className={styles.smallDownload}
              disabled={!isBookPurchased && true}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const authorContent = (
    <div className={`${styles.panelContent} ${styles.authorTab}`}>
      {MOCK_AUTHORS.map((author) => (
        <AuthorCard key={author.name} {...author} />
      ))}
    </div>
  );

  const pricingContent = (
    <div className={`${styles.panelContent} ${styles.pricingTab}`}>
      <PricingTab
        title={book?.title || "IAS GS FOUNDATION COURSE"}
        price={`Rs.${book?.price || "6000"}`}
        onBuyNow={handleBuyNow}
      />
    </div>
  );

  const imagesContent = (
    <div className={`${styles.panelContent} ${styles.imagesTab}`}>
      {MOCK_IMAGES.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Book image ${index + 1}`}
          className={styles.galleryImage}
        />
      ))}
    </div>
  );

  const bookContent = (
    <div className={`${styles.panelContent} ${styles.bookViewer}`}>
      {book?.pdfUrl ? (
        <iframe
          src={book.pdfUrl}
          title={book.title}
          className={styles.pdfIframe}
        />
      ) : (
        <div className={styles.noPdf}>
          <p>No PDF URL found for viewer.</p>
        </div>
      )}
    </div>
  );

  // --- Map tab IDs to their content ---
  const tabContentMap = {
    description: descriptionContent,
    author: authorContent,
    pricing: pricingContent,
    images: imagesContent,
    book: bookContent,
  };

  // Define the full tabs list, filtering out 'pricing' if purchased
  const allTabs = [
    { id: "description", label: "Description" },
    { id: "author", label: "Author" },
    { id: "pricing", label: "Pricing" },
    { id: "images", label: "Images" },
    { id: "book", label: "Book Viewer" },
  ];

  const finalTabs = isBookPurchased
    ? allTabs.filter((t) => t.id !== "pricing")
    : allTabs;

  if (!book) {
    return (
      <div className={styles.pageWrapper}>
        <div style={{ padding: 40 }}>
          <h2>Book not found</h2>
          <Button label="Go Back" onClick={() => navigate(-1)} />
        </div>
      </div>
    );
  }

  // This title is for the new CourseHero
  const heroTitle = `${catInfo?.title || "E-Books"} - ${
    book?.title || "Test Series"
  }`;

  return (
    <div className={styles.pageWrapper}>
      {/* 1. CONDITIONAL RENDER: CourseHero is only shown if the book is NOT purchased (i.e., we need the "Buy Now" box). */}
      {!isBookPurchased && (
        <CourseHero
          title={heroTitle}
          price={book?.price || 6000}
          originalPrice={book?.originalPrice || 9000}
          discount={book?.discount || "(10% off)"}
          onBuyNow={handleBuyNow}
          // The isPurchased prop is passed for completeness if CourseHero has internal logic, but the conditional rendering handles the removal.
          isPurchased={isBookPurchased}
        />
      )}

      <main className={styles.contentArea}>
        {/* 🎯 MANUAL TAB NAVIGATION (Now controls URL) */}
        <nav className={styles.tabs} role="tablist">
          {finalTabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              className={`${styles.tabButton} ${
                activeTab === t.id ? styles.active : ""
              }`}
              // 🎯 Call handleTabChange to update the URL
              onClick={() => handleTabChange(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* 🎯 MANUAL TAB CONTENT RENDERING */}
        <div className={styles.panel} role="tabpanel">
          {tabContentMap[activeTab] || tabContentMap.description}
        </div>
      </main>
    </div>
  );
}
