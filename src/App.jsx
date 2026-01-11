import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./Styles/DesignSystem.css";

/* ================= NAVBAR ================= */
import Navbar from "./Components/Navbar.jsx";

/* ================= HOME SECTIONS ================= */
import HeroForm from "./Components/HeroForm.jsx";
import CollaborationSlider from "./Components/CollaborationSlider.jsx";
import WhyHindusthan from "./Components/WhyHindusthan.jsx";
import InstitutionCourses from "./Components/InstitutionCourses.jsx";
import HighlightsSection from "./Components/HighlightsSection.jsx";
import TopRecruiters from "./Components/TopRecruiters.jsx";
import Gallery from "./Components/Gallery.jsx";

/* ================= AUTH ================= */
import SetPassword from "./Components/SetPassword.jsx";
import ForgotPassword from "./Components/ForgotPassword.jsx";

/* ================= STUDENT DASHBOARD ================= */
import Dashboard from "./Components/Dashboard.jsx";
import DashboardHome from "./Components/DashboardHome.jsx";
import DashboardPlaceholder from "./Components/DashboardPlaceholder.jsx";
import AllApplicationForms from "./Components/AllApplicationForms.jsx";
import MyPayments from "./Components/MyPayments.jsx";
import Profile from "./Components/Profile.jsx";

/* ================= ADMIN ================= */
import AdminLayout from "./Admin/AdminLayout.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import AdminApplications from "./Admin/AdminApplications.jsx";
import AdminDocuments from "./Admin/AdminDocuments.jsx";
import AdminPayments from "./Admin/AdminPayments.jsx";
import AdminProfile from "./Admin/AdminProfile.jsx";
import AdminManagement from "./Admin/AdminManagement.jsx";
import AdminStudents from "./Admin/AdminStudents.jsx";
import AdminReports from "./Admin/AdminReports.jsx";
import AdminSettings from "./Admin/AdminSettings.jsx";
import AdminApplicationDetail from "./Admin/AdminApplicationDetail.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import ApplicationForm from "./Components/Application/ApplicationForm.jsx";
import Footer from "./Components/Footer.jsx";
import Preloader from "./Components/Preloader.jsx";

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const handleLoad = () => {
      // Small delay for smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Fallback timeout in case window.load doesn't fire
      const fallback = setTimeout(handleLoad, 5000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <>
      <Preloader isLoading={isLoading} />
      <Router>
        <Routes>

          {/* ================= HOME (WITH NAVBAR) ================= */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HeroForm />
                <WhyHindusthan />
                <InstitutionCourses />
                <HighlightsSection />
                <TopRecruiters />
                <Gallery />
                <Footer />
              </>
            }
          />

          {/* ================= AUTH (NO NAVBAR) ================= */}
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/application-form" element={<ApplicationForm />} />

          {/* ================= STUDENT DASHBOARD (NO NAVBAR) ================= */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route
              path="application-forms"
              element={<AllApplicationForms />}
            />
            <Route
              path="my-payments"
              element={<MyPayments />}
            />
            <Route
              path="my-queries"
              element={<DashboardPlaceholder title="My Queries" />}
            />
            <Route
              path="prospectus"
              element={<DashboardPlaceholder title="Prospectus" />}
            />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* ================= ADMIN PANEL ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="applications/:userId" element={<AdminApplicationDetail />} />
            <Route path="documents" element={<AdminDocuments />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="admins" element={<AdminManagement />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
