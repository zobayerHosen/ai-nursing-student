import React from 'react';
import HomeHeader from './components/home-header';
import Hero from './components/hero';
import StatsSection from './components/stats-section';
import RootsSection from './components/roots-section';
import VisualNotes from './components/visual-notes';
import StemrnFeatureSection from './components/stemrn-feature-section/stemrn-feature-section';
import Pricing from './components/pricing/pricing';
import FAQ from './components/faq';
import AIToolsSection from './components/ai-tool-section';

const HomePage = () => {
    return (
        <div className='w-full'>
            <HomeHeader />
            <Hero />
            <StatsSection />
            <RootsSection />
            <StemrnFeatureSection />
            <VisualNotes />
            <AIToolsSection />
            <Pricing />
            <FAQ />
        </div>
    );
};
export default HomePage;