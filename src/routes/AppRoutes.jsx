// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// ✅ ADD THIS
import ScrollToTop from "../components/ScrollToTop";

// Layout
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

// Core pages
import HomePage from "../pages/HomePage/HomePage";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import ContactUs from "../pages/ContactUs/ContactUs";

// ========================
// CURRENT AFFAIRS FLOW
// ========================
import CurrentAffairsPage from "../pages/CurrentAffairs/CurrentAffairsPage/CurrentAffairsPage.jsx";
import CurrentAffairsSubcategories from "../pages/CurrentAffairs/CurrentAffairsSubcategories/CurrentAffairsSubcategories.jsx";
import CurrentAffairsArticlePage from "../pages/CurrentAffairs/CurrentAffairsArticlePage/CurrentAffairsArticlePage.jsx";
import CurrentAffairsArticlesPage from "../pages/CurrentAffairs/CurrentAffairsArticlesPage/CurrentAffairsArticlesPage.jsx";

// ========================
// DAILY QUIZZES FLOW
// ========================
import DailyQuizzesPage from "../pages/DailyQuizzes/DailyQuizzesPage/DailyQuizzesPage.jsx";
import DailyQuizzesSubcategories from "../pages/DailyQuizzes/DailyQuizzesSubcategories/DailyQuizzesSubcategories.jsx";
import QuizzesListPage from "../pages/DailyQuizzes/QuizzesListPage/QuizzesListPage.jsx";
import QuizDescriptionPage from "../pages/DailyQuizzes/QuizDescriptionPage/QuizDescriptionPage.jsx";
import QuizPlayPage from "../pages/DailyQuizzes/QuizPlayPage/QuizPlayPage.jsx";
import QuizResultPage from "../pages/DailyQuizzes/QuizResultPage/QuizResultPage.jsx";
import QuizCorrectAnswersPage from "../pages/DailyQuizzes/QuizCorrectAnswersPage/QuizCorrectAnswersPage.jsx";

// ========================
// EBOOKS FLOW (PUBLICATIONS)
// ========================
import EbooksPage from "../pages/Ebooks/EbooksPage/EbooksPage.jsx";
import EbooksSubcategories from "../pages/Ebooks/EbooksSubcategories/EbooksSubcategories.jsx";
import PublicationsPage from "../pages/Ebooks/PublicationsPage/PublicationsPage.jsx";
import BookDetailPage from "../pages/Ebooks/BookDetailPage/BookDetailPage.jsx";

// ========================
// PREVIOUS PAPERS FLOW
// ========================
import PreviousQuestionPapers from "../pages/PreviousQuesitonPapers/PreviousQuestionPapers/PreviousQuestionPapers.jsx";
import PreviousPapersSubcategories from "../pages/PreviousQuesitonPapers/PreviousPapersSubcategories/PreviousPapersSubcategories.jsx";
import CategoryPublications from "../sections/CategoryPublications/CategoryPublications";
import PaperDetail from "../sections/CategoryPublications/PaperDetail";
import MyCoursesPage from "../pages/TopBar/TopbarPanelPages/MyCoursesPage/MyCoursesPage.jsx";
import MyTestSeries from "../pages/TopBar/TopbarPanelPages/MyTestSeries/MyTestSeries.jsx";
import CoursesDataPage from "../pages/OnlineCourses/CoursesDataPage/CoursesDataPage.jsx";
// ✅ FIX: Corrected LiveClasses path assuming it's in src/pages/
import LiveClasses from "../pages/LiveClasses/LiveClasses.jsx";
import AllLiveClassesPage from "../pages/LiveClasses/AllLiveClassesPage/AllLiveClassesPage.jsx";
import LiveClassesSubcategories from "../pages/LiveClasses/LiveClassesSubcategories/LiveClassesSubcategories.jsx";
import SubcategoryClassesPage from "../pages/LiveClasses/SubcategoryClassesPage/SubcategoryClassesPage.jsx";

// ✅ 1. Import all Test Series pages from the correct subfolder
import TestSeriesPage from "../pages/TestSeries/TestSeriesPage/TestSeriesPage.jsx";
import TestSeriesListPage from "../pages/TestSeries/TestSeriesListPage/TestSeriesListPage.jsx";
import TestSeriesDescriptionPage from "../pages/TestSeries/TestSeriesDescriptionPage/TestSeriesDescriptionPage.jsx";
import BuyNowPage from "../pages/BuyNowPage/BuyNowPage.jsx";
import TestInstructionsPage from "../pages/TestSeries/TestInstructionsPage/TestInstructionsPage.jsx";
import TestPlayPage from "../pages/TestSeries/TestPlayPage/TestPlayPage.jsx";
import TestResultPage from "../pages/TestSeries/TestResultPage/TestResultPage.jsx";
import OnlineCoursesPage from "../pages/OnlineCourses/OnlineCoursesPage/OnlineCoursesPage.jsx";
import OnlineCoursesAllPage from "../pages/OnlineCourses/OnlineCoursesAllPage/OnlineCoursesAllPage.jsx";
import OnlineCoursesListPage from "../pages/OnlineCourses/OnlineCoursesListPage/OnlineCoursesListPage.jsx";
import OnlineCoursesSubcategories from "../pages/OnlineCourses/OnlineCoursesSubcategories/OnlineCoursesSubcategories.jsx";
import CourseDescriptionPage from "../pages/OnlineCourses/CourseDescriptionPage/CourseDescriptionPage.jsx";
import CourseVideoPlayerPage from "../pages/OnlineCourses/CourseVideoPlayerPage/CourseVideoPlayerPage.jsx";

function AppRoutes() {
  return (
    <>
      {/* 👇 This ensures window scrolls to top whenever route changes */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* Home */}
          <Route index element={<HomePage />} />
          <Route path="/mycourses" element={<MyCoursesPage />} />
          <Route path="/coursesdatapage" element={<CoursesDataPage />} />
          <Route path="/mytestseries" element={<MyTestSeries />} />

          {/* ============================================================
                📚 ONLINE COURSES (NEW)
            ============================================================ */}
          <Route path="online-courses" element={<OnlineCoursesPage />} />
          <Route path="online-courses/all" element={<OnlineCoursesAllPage />} />
          <Route
            path="online-courses/:category"
            element={<OnlineCoursesSubcategories />}
          />
          <Route
            path="online-courses/:category/:subcategory/:courseId/video/:videoId"
            element={<CourseVideoPlayerPage />}
          />
          <Route
            path="online-courses/:category/:subcategory"
            element={<OnlineCoursesListPage />}
          />
          {/* ✅ 2. Add the new route for the details page */}
          <Route
            path="online-courses/:category/:subcategory/:courseId/:tab?"
            element={<CourseDescriptionPage />}
          />

          {/* ============================================================
                📺 LIVE CLASSES
            ============================================================ */}
          <Route path="/liveclasses" element={<LiveClasses />} />
          <Route path="liveclasses/all" element={<AllLiveClassesPage />} />
          <Route
            path="/liveclasses/:category"
            element={<LiveClassesSubcategories />}
          />
          <Route
            path="/liveclasses/:category/:subcategory"
            element={<SubcategoryClassesPage />}
          />
          {/* ============================================================
              📰 CURRENT AFFAIRS
          ============================================================ */}
          <Route path="currentaffairs" element={<CurrentAffairsPage />} />
          <Route
            path="currentaffairs/:category"
            element={<CurrentAffairsSubcategories />}
          />
          <Route
            path="currentaffairs/:category/:subId"
            element={<CurrentAffairsArticlesPage />}
          />
          <Route
            path="currentaffairs/:category/:subId/:articleId"
            element={<CurrentAffairsArticlePage />}
          />
          {/* ============================================================
              📝 DAILY QUIZZES FLOW
          ============================================================ */}
          <Route path="dailyquizzes" element={<DailyQuizzesPage />} />
          <Route
            path="dailyquizzes/:category"
            element={<DailyQuizzesSubcategories />}
          />
          <Route
            path="dailyquizzes/:category/:subcategory"
            element={<QuizzesListPage />}
          />
          <Route
            path="dailyquizzes/:category/:subcategory/:quizId"
            element={<QuizDescriptionPage />}
          />
          <Route
            path="dailyquizzes/:category/:subcategory/:quizId/play"
            element={<QuizPlayPage />}
          />
          <Route
            path="dailyquizzes/:category/:subcategory/:quizId/result"
            element={<QuizResultPage />}
          />
          <Route
            path="dailyquizzes/:category/:subcategory/:quizId/review"
            element={<QuizCorrectAnswersPage />}
          />
          {/* ============================================================
              📚 E-BOOKS (PUBLICATIONS)
          ============================================================ */}
          <Route path="ebooks" element={<EbooksPage />} />
          <Route path="ebooks/:category" element={<EbooksSubcategories />} />
          <Route
            path="ebooks/:category/:subcategory"
            element={<PublicationsPage />}
          />
          <Route
            path="ebooks/:category/:subcategory/:id"
            element={<BookDetailPage />}
          />
          {/* ============================================================
              📄 PREVIOUS QUESTION PAPERS
          ============================================================ */}
          <Route path="previous-papers" element={<PreviousQuestionPapers />} />
          <Route
            path="previous-papers/:category"
            element={<PreviousPapersSubcategories />}
          />
          <Route
            path="previous-papers/:category/:subcategory"
            element={<CategoryPublications />}
          />
          <Route
            path="previous-papers/:category/:subcategory/:paperId"
            element={<PaperDetail />}
          />

          {/* ============================================================
                🏆 TEST SERIES
            ============================================================ */}
          {/* ✅ 2. All routes now point to the correct components */}

          {/* Main landing page (e.g., /test-series) */}
          <Route path="test-series" element={<TestSeriesPage />} />

          {/* List page for a specific category (e.g., /test-series/upsc) */}
          <Route
            path="test-series/:category"
            element={<TestSeriesListPage />}
          />

          {/* Description/Tests/Pricing page (e.g., /test-series/upsc/upsc-gs-b54/description) */}
          <Route
            path="test-series/:category/:seriesId/:tab?"
            element={<TestSeriesDescriptionPage />}
          />

          {/* Step 1: Instructions Page */}
          <Route
            path="test-series/:category/:seriesId/instructions"
            element={<TestInstructionsPage />}
          />

          {/* Step 2: Test Play Page */}
          <Route
            path="test-series/:category/:seriesId/play/:testId"
            element={<TestPlayPage />}
          />

          {/* Step 3: Test Result Page */}
          <Route
            path="test-series/:category/:seriesId/result/:testId"
            element={<TestResultPage />}
          />

          {/* Buy Now route (shared) */}
          <Route path="buy-now/:buyNowId" element={<BuyNowPage />} />

          {/* ============================================================
              🧭 ABOUT & CONTACT
          ============================================================ */}
          <Route path="aboutus" element={<AboutUsPage />} />
          <Route path="contactus" element={<ContactUs />} />
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={<div style={{ padding: 40 }}>404 Not Found</div>}
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
