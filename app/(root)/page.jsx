import HomeHeader from './components/home-header';
import Hero from './components/hero';
import NewStatsSection from './components/new-home-design/new-stats-section';
import NewAiTutorSection from './components/new-home-design/new-ai-tutor-section';
import NewSucceedSection from './components/new-home-design/new-succeed-section';
import NewAiToolsSection from './components/new-home-design/new-ai-tools-section';
import RootsSection from './components/new-home-design/roots-section';
import Pricing from './components/pricing/pricing';
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
            <Pricing />
        </div>
    );
};
export default HomePage;