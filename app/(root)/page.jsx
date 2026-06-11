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
import HomeCheatSheets from './components/home-cheat-sheet';
import HomeNCLEXQuestions from './components/home-nclex-exam/home-nclex-exam';
import GoogleOneTap from './components/google-one-tap';

const HomePage = () => {
    return (
        <div className='w-full'>
            <GoogleOneTap />
            <HomeHeader />
            <Hero />
            <StatsSection />
            <RootsSection />
            <StemrnFeatureSection />
            <VisualNotes />
            <AIToolsSection />
            <HomeNCLEXQuestions />
            <HomeCheatSheets />
            <Pricing />
            <FAQ />
        </div>
    );
};
export default HomePage;