import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout';
import Loading from './components/common/Loading';
import DonationModal from './components/donation/DonationModal';

// Public Pages (lazy loaded)
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const OurWork = React.lazy(() => import('./pages/OurWork'));
const Causes = React.lazy(() => import('./pages/Causes'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Events = React.lazy(() => import('./pages/Events'));
const EventDetail = React.lazy(() => import('./pages/EventDetail'));
const VisitGaushala = React.lazy(() => import('./pages/VisitGaushala'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Donate = React.lazy(() => import('./pages/Donate'));
const Volunteer = React.lazy(() => import('./pages/Volunteer'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const UserProfile = React.lazy(() => import('./pages/UserProfile'));

// Admin Pages (lazy loaded)
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const DonationManagement = React.lazy(() => import('./pages/admin/DonationManagement'));
const CauseManagement = React.lazy(() => import('./pages/admin/CauseManagement'));
const GalleryManagement = React.lazy(() => import('./pages/admin/GalleryManagement'));
const EventManagement = React.lazy(() => import('./pages/admin/EventManagement'));
const ContentManagement = React.lazy(() => import('./pages/admin/ContentManagement'));
const VolunteerManagement = React.lazy(() => import('./pages/admin/VolunteerManagement'));
const VisitManagement = React.lazy(() => import('./pages/admin/VisitManagement'));

const App = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes wrapped in Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="our-work" element={<OurWork />} />
            <Route path="causes" element={<Causes />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventDetail />} />
            <Route path="visit" element={<VisitGaushala />} />
            <Route path="contact" element={<Contact />} />
            <Route path="donate" element={<Donate />} />
            <Route path="volunteer" element={<Volunteer />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          {/* Admin Routes wrapped in AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="donations" element={<DonationManagement />} />
            <Route path="causes" element={<CauseManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="volunteers" element={<VolunteerManagement />} />
            <Route path="visits" element={<VisitManagement />} />
          </Route>
        </Routes>
      </Suspense>

      {/* Global Donation Modal */}
      <DonationModal />
    </>
  );
};

export default App;
