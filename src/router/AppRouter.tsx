// AppRouter.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import LoginPage from "../pages/Login/LoginPage";
import Home from "../pages/Home/Home";
import RegistrationPage from "../pages/Registration/RegistrationPage";
import CourseDetailsP from "../pages/CoursesDetails/CoursesDetailsP";
import ShoppingCartP from "../pages/ShoppingCart/ShoppingCartP";
import CreateCoursePage from "../pages/CreateCourse/CreateCoursePage";
import AllCoursesPage from "../pages/AllCourses/AllCoursesPage";
import MyCoursesPage from "../pages/MyCoursesAndCreatedCourses/MyCoursesPage";
import EditCoursePage from "../pages/EditCourse/EditCoursePage";
import MyAccountPage from "../pages/MyAccountAndChangePassword/MyAccountPage";
import ProtectedRoute from "./ProtectedRoute";
import CreateLessonsPage from "../pages/CreateLessons/CreateLessonsPage";
import AllLessonsPage from "../pages/AllLessonsPage/AllLessonsPage";
import DemoLessonsPage from "../pages/DemoLessonsPage/DemoLessonsPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/log" element={<LoginPage />} />
        <Route path="/reg" element={<RegistrationPage />} />
        <Route path="/courses" element={<AllCoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailsP />} />
        <Route path="/shopping_cart" element={<ShoppingCartP />} />
        <Route
          path="/create_course"
          element={
            <ProtectedRoute>
              <CreateCoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create_lesson/:courseId"
          element={
            <ProtectedRoute>
              <CreateLessonsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit_course/:courseId"
          element={
            <ProtectedRoute>
              <EditCoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my_account"
          element={
            <ProtectedRoute>
              <MyAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my_courses"
          element={
            <ProtectedRoute>
              <MyCoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons/:courseId"
          element={
            <ProtectedRoute>
              <AllLessonsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/demo_lessons/:courseId" element={<DemoLessonsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
