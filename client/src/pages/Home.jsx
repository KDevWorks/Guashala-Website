import React from 'react';
import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import AboutPreview from '../components/home/AboutPreview';
import WhatWeDo from '../components/home/WhatWeDo';
import CausesPreview from '../components/home/CausesPreview';
import ImpactStories from '../components/home/ImpactStories';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';

const Home = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <SEO 
        title="Home" 
        description="Welcome to our Gaushala. Join us in our mission to care for and protect cows through shelter, medical care, and community support."
      />
      
      <Hero />
      <Stats />
      <AboutPreview />
      <WhatWeDo />
      <CausesPreview />
      <ImpactStories />
      <Testimonials />
      <FAQ />
    </main>
  );
};

export default Home;
