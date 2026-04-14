import React from 'react';
import HomeHeader from './components/home-header';
import Hero from './components/hero';

const HomePage = () => {
    return (
        <div className='w-full'>
            <HomeHeader />
            <Hero />
        </div>
    );
};

export default HomePage;