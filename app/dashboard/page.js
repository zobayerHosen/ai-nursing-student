import React from 'react';
import QuickActions from './components/dashboard/quick-actions';
import CoreLearning from './components/dashboard/core-learning';
import BodySystem from './components/dashboard/body-system';
import PopularCheatSheet from './components/dashboard/popular-cheat-sheet';

const DashboardPage = () => {
    return (
        <div className='w-full flex flex-col gap-8 p-6'>
            <QuickActions />
            <CoreLearning />
            <BodySystem />
            <PopularCheatSheet />
        </div>
    );
};

export default DashboardPage;