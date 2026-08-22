import React from 'react';
import HomeHeader from './components/home-header';
import Hero from './components/hero';
import NewStatsSection from './components/new-home-design/new-stats-section';
import NewAiTutorSection from './components/new-home-design/new-ai-tutor-section';
import NewSucceedSection from './components/new-home-design/new-succeed-section';
import NewAiToolsSection from './components/new-home-design/new-ai-tools-section';
import RootsSection from './components/roots-section';
import VisualNotes from './components/visual-notes';
import StemrnFeatureSection from './components/stemrn-feature-section/stemrn-feature-section';
import Pricing from './components/pricing/pricing';
import FAQ from './components/faq';
import HomeCheatSheets from './components/home-cheat-sheet';
import HomeNCLEXQuestions from './components/home-nclex-exam/home-nclex-exam';
import GoogleOneTap from './components/google-one-tap';

const HomePage = () => {
    return (
        <div className='w-full'>
            <GoogleOneTap />
            <HomeHeader />
            <Hero />
            <NewStatsSection />
            <NewAiTutorSection />
            <NewSucceedSection />
            <RootsSection />
            <NewAiToolsSection />
            {/* <StemrnFeatureSection /> */}
            {/* <VisualNotes /> */}
            {/* <HomeNCLEXQuestions /> */}
            {/* <HomeCheatSheets /> */}
            <Pricing />
            {/* <FAQ /> */}
        </div>
    );
};
export default HomePage;