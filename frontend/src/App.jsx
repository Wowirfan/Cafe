import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSettings } from "./context/SettingsContext.jsx";
import Loader from "./components/Loader.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Menu from "./pages/Menu.jsx";
import Gallery from "./pages/Gallery.jsx";
import Reservation from "./pages/Reservation.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageMenu from "./pages/admin/ManageMenu.jsx";
import ManageGallery from "./pages/admin/ManageGallery.jsx";
import ManageReservations from "./pages/admin/ManageReservations.jsx";
import ManageTestimonials from "./pages/admin/ManageTestimonials.jsx";
import ManageMessages from "./pages/admin/ManageMessages.jsx";
import SiteSettings from "./pages/admin/SiteSettings.jsx";

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

function App() {
  const { loading } = useSettings();

  if (loading) return <Loader />;

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public site */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/menu" element={<PublicLayout><Menu /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
        <Route path="/reservation" element={<PublicLayout><Reservation /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<ManageMenu />} />
          <Route path="gallery" element={<ManageGallery />} />
          <Route path="reservations" element={<ManageReservations />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
          <Route path="messages" element={<ManageMessages />} />
          <Route path="settings" element={<SiteSettings />} />
        </Route>

        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </>
  );
}

export default App;
