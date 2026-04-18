import React from 'react';
import HomeHeader from './components/home-header';
import Hero from './components/hero';
import StatsSection from './components/stats-section';
import RootsSection from './components/roots-section';

const HomePage = () => {
    return (
        <div className='w-full'>
            <HomeHeader />
            <Hero />
            <StatsSection />
            <RootsSection />
        </div>
    );
};

export default HomePage;