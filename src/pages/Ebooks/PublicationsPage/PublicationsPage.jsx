import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header/Header.jsx"; // Fixed path
import CategoryHeader from "../../../components/CategoryHeader/CategoryHeader.jsx"; // Fixed path
import SearchBar from "../../../components/SearchBar/SearchBar.jsx"; // Fixed path
import Button from "../../../components/Button/Button.jsx";
import ProductCard from "../../../components/ProductCard/ProductCard.jsx";
import styles from "./PublicationsPage.module.css"; // Fixed path
import EBOOKS_DATA from "../../../data/ebooks.js"; // Fixed path
// 🎯 Import the list of purchased Ebook IDs
import { purchasedEbookIds } from "../../../data/userEbooks.js";

export default function PublicationsPage() {
  const navigate = useNavigate();
  const params = useParams();

  const mainCategory =
    params.mainCategory || params.category || params.cat || null;
  const subCategory =
    params.subCategory || params.subcategory || params.sub || null;

  const [query, setQuery] = useState("");

  const catKey = mainCategory ? String(mainCategory).toLowerCase() : null;
  const subKey = subCategory ? String(subCategory).toLowerCase() : null;

  // category meta (for hero/title)
  const categoryMeta = useMemo(() => {
    const cats = EBOOKS_DATA?.categories || [];
    return cats.find((c) => String(c.key).toLowerCase() === catKey) || null;
  }, [catKey]);

  // Build a flattened list of books depending on route context
  const allBooks = useMemo(() => {
    const subcategories = EBOOKS_DATA?.subcategories || {};

    // 1) specific subcategory under a category: /ebooks/:category/:subcategory
    if (catKey && subKey) {
      const subs = subcategories[catKey] || [];
      const subObj = subs.find((s) => String(s.id).toLowerCase() === subKey);
      return (subObj?.books || []).map((b) => ({
        ...b,
        category: catKey,
        subcategory: subKey,
      }));
    }

    // 2) only category: return all books under that category (flatten)
    if (catKey) {
      const subs = subcategories[catKey] || [];
      const books = subs.flatMap((s) =>
        (s.books || []).map((b) => ({
          ...b,
          category: catKey,
          subcategory: s.id,
        }))
      );
      return books;
    }

    // 3) global: flatten everything across categories/subcategories
    return Object.keys(subcategories).flatMap((cat) =>
      (subcategories[cat] || []).flatMap((s) =>
        (s.books || []).map((b) => ({ ...b, category: cat, subcategory: s.id }))
      )
    );
  }, [catKey, subKey]);

  // header infof
  const headerInfo = useMemo(() => {
    const categoryTitle =
      categoryMeta?.title || (catKey ? catKey.toUpperCase() : "E-Books");
    const hero =
      categoryMeta?.hero ||
      categoryMeta?.logo ||
      (catKey ? `/images/${catKey}-hero.png` : "/images/ebooks-hero.png");
    return { categoryTitle, hero };
  }, [categoryMeta, catKey]);

  // filter books by search
  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    return allBooks.filter((b) => {
      if (!b || !b.id) return false;
      if (catKey && String(b.category || "").toLowerCase() !== catKey)
        return false;
      if (subKey && String(b.subcategory || "").toLowerCase() !== subKey)
        return false;
      if (!q) return true;
      return (
        (b.title || "").toLowerCase().includes(q) ||
        (b.author || "").toLowerCase().includes(q) ||
        (b.tag || "").toLowerCase().includes(q)
      );
    });
  }, [allBooks, catKey, subKey, query]);

  // header title with optional subcategory label
  const headerTitle = `${headerInfo.categoryTitle}${
    subKey
      ? ` - ${
          (EBOOKS_DATA?.subcategories?.[catKey] || []).find(
            (s) => String(s.id).toLowerCase() === subKey
          )?.title || subKey.toUpperCase()
        }`
      : ""
  }`;

  // --- Handlers for ProductCard ---

  // Handler for View Details (always navigates to the description tab)
  const handleViewDetails = (book) => {
    const categoryForPath = book.category || mainCategory || "all";
    const subForPath = book.subcategory || subCategory || book.sub || "all";
    navigate(`/ebooks/${categoryForPath}/${subForPath}/${book.id}`);
  };

  // Handler for direct download (only used when purchased)
  const handleDownloadAction = (book) => {
    if (!book.pdfUrl) {
      console.error(`Download failed: No PDF URL found for ${book.title}.`);
      return;
    }

    // Create a temporary link element to trigger direct download
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

  // Handler for View (opens PDF viewer tab - used when purchased)
  const handleViewAction = (book) => {
    const categoryForPath = book.category || mainCategory || "all";
    const subForPath = book.subcategory || subCategory || book.sub || "all";
    // Navigate directly to the 'book' viewer tab
    navigate(`/ebooks/${categoryForPath}/${subForPath}/${book.id}/book`);
  };

  // Handler for Buy Now (Go to checkout - only used when NOT purchased)
  const handleBuyNow = (book) => {
    if (book.price) {
      navigate(`/buy-now/${book.buyNowId}`);
    } else {
      handleViewDetails(book); // Fallback to details if no price/ID
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* <Header imageSrc={headerInfo.hero} alt={headerTitle} /> */}

      <CategoryHeader
        title={headerTitle || "E-Books"}
        languages={[
          { key: "en", label: "English" },
          { key: "hi", label: "Hindi" },
          { key: "te", label: "Telugu" },
        ]}
        active={localStorage.getItem("bb_lang_code") || "en"}
        onChange={(k) => {
          try {
            localStorage.setItem("bb_lang_code", k);
          } catch {}
        }}
        showDivider
      />

      <section className={styles.controls}>
        <div className={styles.controlsInner}>
          <div className={styles.searchCol}>
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search E-Books (title, author, tag..)"
            />
          </div>

          <div className={styles.actionsCol}>
            <div className={styles.resultCount}>
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {filtered.length === 0 && (
            <div className={styles.noResults}>
              No e-books found{query ? ` for “${query}”` : ""}.
            </div>
          )}

          {filtered.map((book) => {
            const thumb = book.thumb || book.logo || "/images/default-book.png";
            const categoryForPath = book.category || mainCategory || "all";
            const subForPath =
              book.subcategory || subCategory || book.sub || "all";

            // 🎯 Check if the ebook is purchased
            const isBookPurchased = purchasedEbookIds.includes(String(book.id));

            return (
              <div key={book.id} className={styles.cardWrapper}>
                {/* --- Use ProductCard --- */}
                <ProductCard
                  variant="ebook"
                  image={thumb}
                  title={book.title}
                  tag={book.tag || "E-Book"}
                  validity={book.validity}
                  medium={book.medium}
                  price={book.price || 10000} // Mock price from image
                  originalPrice={book.originalPrice || 12000} // Mock price
                  discount={book.discount || "10% off"} // Mock discount
                  // 🎯 PASS PURCHASE STATUS
                  isPurchased={isBookPurchased}
                  // === HANDLERS ===
                  // Used by the store view ("View Details" button)
                  onViewDetails={() => handleViewDetails(book)}
                  // If purchased, these slots are used for View/Download
                  onView={
                    isBookPurchased ? () => handleViewAction(book) : undefined
                  }
                  onDownload={
                    isBookPurchased
                      ? () => handleDownloadAction(book)
                      : undefined
                  }
                  // Used by the store view ("Buy Now" button)
                  onBuyNow={
                    isBookPurchased ? undefined : () => handleBuyNow(book)
                  }
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
