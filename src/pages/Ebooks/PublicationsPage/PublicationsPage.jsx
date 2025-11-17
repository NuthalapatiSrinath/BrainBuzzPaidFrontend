// src/pages/PublicationsPage/PublicationsPage.jsx
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header/Header.jsx"; // Fixed path
import CategoryHeader from "../../../components/CategoryHeader/CategoryHeader.jsx"; // Fixed path
import SearchBar from "../../../components/SearchBar/SearchBar.jsx"; // Fixed path
import Button from "../../../components/Button/Button.jsx";
import ProductCard from "../../../components/ProductCard/ProductCard.jsx"; // <-- 1. Import new component
import styles from "./PublicationsPage.module.css"; // Fixed path
import EBOOKS_DATA from "../../../data/ebooks.js"; // Fixed path

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
              placeholder="Search E-Books (title, author, tag...)"
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

            // handler for View (navigate to book detail)
            const handleView = () =>
              navigate(`/ebooks/${categoryForPath}/${subForPath}/${book.id}`, {
                state: { book },
              });

            // handler for Download / Buy
            const handleBuyNow = () => {
              if (book.price) {
                navigate(`/buy/${book.id}`); // Or your checkout route
                return;
              }
              if (book.pdfUrl) {
                const a = document.createElement("a");
                a.href = book.pdfUrl;
                const safeTitle = (book.title || "ebook").replace(/\s+/g, "-");
                a.download = `${safeTitle}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                return;
              }
              handleView();
            };

            return (
              <div key={book.id} className={styles.cardWrapper}>
                {/* --- 2. Use ProductCard --- */}
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
                  onViewDetails={handleView}
                  onBuyNow={handleBuyNow}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
