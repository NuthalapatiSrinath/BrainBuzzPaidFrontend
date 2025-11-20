/**
 * This utility simulates fetching the list of courses a user has purchased.
 * In a real application, this data would come from an API endpoint after user login.
 * The CourseDescriptionPage will use this list to determine if the "Buy Now" button
 * should be replaced with a "Start Course" button.
 */
export const purchasedCourseIds = [
  // List of identifiers for courses the user "owns"
  "upsc-gs-b54",
  "upsc-prelims-c01",
  "group1",
];

// This helper is also useful for determining the user's progress for MyCoursesPage
export const getCourseProgress = (courseId) => {
  switch (courseId) {
    case "upsc-gs-b54":
      return 60;
    case "upsc-prelims-c01":
      return 30;
    case "group1":
      return 10;
    default:
      return 0;
  }
};
