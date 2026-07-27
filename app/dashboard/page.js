import AskAtlas from "./components/dashboard/home/ask-atlas";
import TracYourProgress from "./components/dashboard/home/track-your-progress";

const DashboardPage = () => {
  return (
    <div className="w-full p-6">
      <AskAtlas />
      <TracYourProgress />
    </div>
  );
};

export default DashboardPage;
