import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LandingHeader from './LandingHeader';
import LandingHero from './LandingHero';
import LandingAbout from './LandingAbout';
import LandingServices from './LandingServices';
import LandingFeatures from './LandingFeatures';
import LandingContact from './LandingContact';
import LandingFooter from './LandingFooter';

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <LandingHeader scrollToSection={scrollToSection} />
      <div className="pt-24">
        <LandingHero />
        <LandingAbout />
        <LandingServices />
        <LandingFeatures />
        <LandingContact />
        <LandingFooter />
      </div>
    </div>
  );
};

export default LandingPage;