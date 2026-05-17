import React from 'react';
import QuickActions from './components/dashboard/quick-actions';
import CoreLearning from './components/dashboard/core-learning';
import BodySystem from './components/dashboard/body-system';
import PopularCheatSheet from './components/dashboard/popular-cheat-sheet';

const DashboardPage = async () => {
    // Loading skeleton delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return (
        <div className='w-full flex flex-col gap-8 p-4 xl:p-6 bg-[#F7F7F7]'>
            <QuickActions />
            <CoreLearning />
            <BodySystem />
            <PopularCheatSheet />
        </div>
    );
};
export default DashboardPage;