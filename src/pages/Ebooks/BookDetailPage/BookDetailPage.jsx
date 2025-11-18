import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import Header from "../../../components/Header/Header"; // REMOVED
// import CategoryHeader from "../../../components/CategoryHeader/CategoryHeader"; // REMOVED
import Button from "../../../components/Button/Button";
import TabSwitchPage from "../../../components/TabSwitchPage/TabSwitchPage";
import AuthorCard from "../../../components/AuthorCard/AuthorCard";
import PricingTab from "./PricingTabContent/PricingTabContent"; // Corrected Import Path
import CourseHero from "../../../components/CourseHero/CourseHero"; // 1. IMPORT NEW HERO
import EBOOKS_DATA from "../../../data/ebooks";
import styles from "./BookDetailPage.module.css";

// --- Mock Data for New Tabs ---
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
  const { id, category, subcategory } = useParams();
  const navigate = useNavigate();

  const catKey = category?.toLowerCase();
  const subKey = subcategory?.toLowerCase();

  const catInfo = useMemo(
    () => EBOOKS_DATA.categories.find((c) => c.key === catKey),
    [catKey]
  );

  const book = useMemo(() => {
    const subs = EBOOKS_DATA.subcategories[catKey] || [];
    const sub = subs.find((s) => s.id === subKey);
    return sub?.books?.find((b) => String(b.id) === String(id)) || null;
  }, [catKey, subKey, id]);

  // Download handler
  const handleDownloadClick = () => {
    if (!book.pdfUrl) {
      alert("No PDF available for this book.");
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
      window.open(book.pdfUrl, "_blank", "noopener");
    }
  };

  // --- Define Content for Each Tab ---

  const descriptionContent = (
    <div className={`${styles.panelContent} ${styles.description}`}>
      <div className={styles.aboutbook}>About Book:</div>
      <p className={styles.descText}>
        {book?.description ||
          "This course is designed to help aspirants systematically prepare for competitive exams with expert guidance, structured study material, and proven strategies. Covering all key subjects, concepts, and problem-solving techniques, the course ensures that students build a strong foundation while practicing with mock tests and previous-year papers."}
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
              label="Download"
              onClick={handleDownloadClick}
              className={styles.smallDownload}
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
        price="Rs.6000"
        onBuyNow={() => alert("Redirecting to Buy...")}
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
          <p>No preview available for this book.</p>
        </div>
      )}
    </div>
  );

  // --- Create the tabs array for TabSwitchPage ---
  const tabs = [
    { id: "description", label: "Description", content: descriptionContent },
    { id: "author", label: "Author", content: authorContent },
    { id: "pricing", label: "Pricing", content: pricingContent },
    { id: "images", label: "Images", content: imagesContent },
    { id: "book", label: "Book", content: bookContent },
  ];

  if (!book) {
    return (
      <div className={styles.pageWrapper}>
        <div style={{ padding: 40 }}>
          <h2>Book not found</h2>
          <p>
            We couldn’t find the requested book: <strong>{id}</strong>.
          </p>
          <button type="button" onClick={() => navigate(-1)}>
            Go back
          </button>
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
      {/* 2. RENDER THE NEW COURSEHERO COMPONENT */}
      <CourseHero
        title={heroTitle}
        price={6000} // Mock data from image
        originalPrice={9000} // Mock data from image
        discount="(10% off)" // Mock data from image
        onBuyNow={() => alert("Redirecting to Buy...")}
      />

      {/* 3. REMOVED OLD HEADER AND CATEGORYHEADER */}
      {/* <Header ... /> */}
      {/* <CategoryHeader ... /> */}

      <main className={styles.contentArea}>
        <TabSwitchPage
          tabs={tabs}
          defaultTab="description"
          navClassName={styles.tabs}
          contentClassName={styles.panel}
        />
      </main>
    </div>
  );
}
