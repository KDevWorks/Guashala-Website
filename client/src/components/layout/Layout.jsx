import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import StickyDonateCTA from './StickyDonateCTA';
import ScrollToTop from '../common/ScrollToTop';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cream-50 font-body text-charcoal-900">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow pt-20 lg:pt-24">
        <Outlet />
      </main>
      <StickyDonateCTA />
      <Footer />
    </div>
  );
};

export default Layout;
