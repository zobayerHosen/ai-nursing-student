import React from 'react';
import HomeHeader from './components/home-header';
import Hero from './components/hero';
import StatsSection from './components/stats-section';
import RootsSection from './components/roots-section';
import CTA from './components/cta';
import VisualNotes from './components/visual-notes';
import StemrnFeatureSection from './components/stemrn-feature-section/stemrn-feature-section';

const HomePage = () => {
    return (
        <div className='w-full'>
            <HomeHeader />
            <Hero />
            <StatsSection />
            <RootsSection />
            <StemrnFeatureSection />
            <VisualNotes />
            <CTA />
        </div>
    );
};

export default HomePage;