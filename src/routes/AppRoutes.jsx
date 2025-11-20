import React from "react";
import { Routes, Route } from "react-router-dom";

// Scroll To Top Component
import ScrollToTop from "../components/ScrollToTop";

// Layout
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

// Core pages
import HomePage from "../pages/HomePage/HomePage";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import ContactUs from "../pages/ContactUs/ContactUs";

// ========================
// PAYMENT FLOW PAGES
// ========================
import PaymentPage from "../pages/PaymentPages/PaymentPage/PaymentPage";
import PaymentAddressPage from "../pages/PaymentPages/PaymentAddressPage/PaymentAddressPage";
import PaymentMethodPage from "../pages/PaymentPages/PaymentMethodPage/PaymentMethodPage";
import PaymentSuccessPage from "../pages/PaymentPages/PaymentSuccessPage/PaymentSuccessPage";
import InvoicePage from "../pages/PaymentPages/InvoicePage/InvoicePage";

// ========================
// CURRENT AFFAIRS FLOW
// ========================
import CurrentAffairsPage from "../pages/CurrentAffairs/CurrentAffairsPage/CurrentAffairsPage";
import CurrentAffairsSubcategories from "../pages/CurrentAffairs/CurrentAffairsSubcategories/CurrentAffairsSubcategories";
import CurrentAffairsArticlePage from "../pages/CurrentAffairs/CurrentAffairsArticlePage/CurrentAffairsArticlePage";
import CurrentAffairsArticlesPage from "../pages/CurrentAffairs/CurrentAffairsArticlesPage/CurrentAffairsArticlesPage";

// ========================
// DAILY QUIZZES FLOW
// ========================
import DailyQuizzesPage from "../pages/DailyQuizzes/DailyQuizzesPage/DailyQuizzesPage";
import DailyQuizzesSubcategories from "../pages/DailyQuizzes/DailyQuizzesSubcategories/DailyQuizzesSubcategories";
import QuizzesListPage from "../pages/DailyQuizzes/QuizzesListPage/QuizzesListPage";
import QuizDescriptionPage from "../pages/DailyQuizzes/QuizDescriptionPage/QuizDescriptionPage";
import QuizPlayPage from "../pages/DailyQuizzes/QuizPlayPage/QuizPlayPage";
import QuizResultPage from "../pages/DailyQuizzes/QuizResultPage/QuizResultPage";
import QuizCorrectAnswersPage from "../pages/DailyQuizzes/QuizCorrectAnswersPage/QuizCorrectAnswersPage";

// ========================
// EBOOKS FLOW (PUBLICATIONS)
// ========================
import EbooksPage from "../pages/Ebooks/EbooksPage/EbooksPage";
import EbooksSubcategories from "../pages/Ebooks/EbooksSubcategories/EbooksSubcategories";
import PublicationsPage from "../pages/Ebooks/PublicationsPage/PublicationsPage";
import BookDetailPage from "../pages/Ebooks/BookDetailPage/BookDetailPage"; // Needs tab parameter
// New Purchased Ebooks Page

// ========================
// PREVIOUS PAPERS FLOW
// ========================
import PreviousQuestionPapers from "../pages/PreviousQuesitonPapers/PreviousQuestionPapers/PreviousQuestionPapers";
import PreviousPapersSubcategories from "../pages/PreviousQuesitonPapers/PreviousPapersSubcategories/PreviousPapersSubcategories";
import CategoryPublications from "../sections/CategoryPublications/CategoryPublications";
import PaperDetail from "../sections/CategoryPublications/PaperDetail";

// ========================
// ONLINE COURSES FLOW
// ========================
import OnlineCoursesPage from "../pages/OnlineCourses/OnlineCoursesPage/OnlineCoursesPage";
import OnlineCoursesAllPage from "../pages/OnlineCourses/OnlineCoursesAllPage/OnlineCoursesAllPage";
import OnlineCoursesSubcategories from "../pages/OnlineCourses/OnlineCoursesSubcategories/OnlineCoursesSubcategories";
import OnlineCoursesListPage from "../pages/OnlineCourses/OnlineCoursesListPage/OnlineCoursesListPage";
import CourseDescriptionPage from "../pages/OnlineCourses/CourseDescriptionPage/CourseDescriptionPage";
import CourseVideoPlayerPage from "../pages/OnlineCourses/CourseVideoPlayerPage/CourseVideoPlayerPage";
import CoursesDataPage from "../pages/OnlineCourses/CoursesDataPage/CoursesDataPage";

// ========================
// LIVE CLASSES FLOW
// ========================
import LiveClasses from "../pages/LiveClasses/LiveClasses";
import AllLiveClassesPage from "../pages/LiveClasses/AllLiveClassesPage/AllLiveClassesPage";
import LiveClassesSubcategories from "../pages/LiveClasses/LiveClassesSubcategories/LiveClassesSubcategories";
import SubcategoryClassesPage from "../pages/LiveClasses/SubcategoryClassesPage/SubcategoryClassesPage";

// ========================
// TEST SERIES FLOW
// ========================
import TestSeriesPage from "../pages/TestSeries/TestSeriesPage/TestSeriesPage";
import TestSeriesListPage from "../pages/TestSeries/TestSeriesListPage/TestSeriesListPage";
import TestSeriesDescriptionPage from "../pages/TestSeries/TestSeriesDescriptionPage/TestSeriesDescriptionPage";
import TestInstructionsPage from "../pages/TestSeries/TestInstructionsPage/TestInstructionsPage";
import TestPlayPage from "../pages/TestSeries/TestPlayPage/TestPlayPage";
import TestResultPage from "../pages/TestSeries/TestResultPage/TestResultPage";

// User Panel Pages
import MyCoursesPage from "../pages/TopBar/TopbarPanelPages/MyCoursesPage/MyCoursesPage";
import MyTestSeries from "../pages/TopBar/TopbarPanelPages/MyTestSeries/MyTestSeries";
import MyEbooksPage from "../pages/TopBar/TopbarPanelPages/MyEbooksPage/MyEbooksPage";

function AppRoutes() {
  return (
    <>
      {/* Ensures window scrolls to top whenever route changes */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* Home */}
          <Route index element={<HomePage />} />
          {/* ============================================================
                💳 PAYMENT FLOW (UPDATED)
            ============================================================ */}
          {/* Step 1: Product Details & Coupon */}
          <Route path="/buy-now/:buyNowId" element={<PaymentPage />} />
          {/* Step 2: Billing Address & Contact Info */}
          <Route
            path="/payment-address/:buyNowId"
            element={<PaymentAddressPage />}
          />
          {/* Step 3: Payment Method Selection (UPI/Card/NetBanking) */}
          <Route
            path="/payment-method/:buyNowId"
            element={<PaymentMethodPage />}
          />
          {/* Step 4: Payment Success Page */}
          <Route
            path="/payment-success/:buyNowId"
            element={<PaymentSuccessPage />}
          />
          <Route path="/invoice/:buyNowId" element={<InvoicePage />} />
          {/* User Profile Routes */}
          <Route path="/mycourses" element={<MyCoursesPage />} />
          <Route path="/coursesdatapage" element={<CoursesDataPage />} />
          <Route path="/mytestseries" element={<MyTestSeries />} />
          <Route path="/myebooks" element={<MyEbooksPage />} />{" "}
          {/* 🎯 NEW EBOOKS PAGE */}
          {/* ============================================================
                📚 ONLINE COURSES
            ============================================================ */}
          <Route path="online-courses" element={<OnlineCoursesPage />} />
          <Route path="online-courses/all" element={<OnlineCoursesAllPage />} />
          <Route
            path="online-courses/:category"
            element={<OnlineCoursesSubcategories />}
          />
          <Route
            path="online-courses/:category/:subcategory"
            element={<OnlineCoursesListPage />}
          />
          <Route
            path="online-courses/:category/:subcategory/:courseId/:tab?"
            element={<CourseDescriptionPage />}
          />
          <Route
            path="online-courses/:category/:subcategory/:courseId/video/:videoId"
            element={<CourseVideoPlayerPage />}
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
              📝 DAILY QUIZZES
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
              📚 E-BOOKS (Updated to include optional tab parameter)
          ============================================================ */}
          <Route path="ebooks" element={<EbooksPage />} />
          <Route path="ebooks/:category" element={<EbooksSubcategories />} />
          <Route
            path="ebooks/:category/:subcategory"
            element={<PublicationsPage />}
          />
          {/* 🎯 UPDATED ROUTE: Includes optional tab for detail page */}
          <Route
            path="ebooks/:category/:subcategory/:id/:tab?"
            element={<BookDetailPage />}
          />
          {/* ============================================================
              📄 PREVIOUS PAPERS
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
          <Route path="test-series" element={<TestSeriesPage />} />
          <Route
            path="test-series/:category"
            element={<TestSeriesListPage />}
          />
          <Route
            path="test-series/:category/:seriesId/:tab?"
            element={<TestSeriesDescriptionPage />}
          />
          <Route
            path="test-series/:category/:seriesId/instructions"
            element={<TestInstructionsPage />}
          />
          <Route
            path="test-series/:category/:seriesId/play/:testId"
            element={<TestPlayPage />}
          />
          <Route
            path="test-series/:category/:seriesId/result/:testId"
            element={<TestResultPage />}
          />
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
