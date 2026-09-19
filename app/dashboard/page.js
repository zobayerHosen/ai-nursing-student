import AskAtlas from "./components/dashboard/home/ask-atlas";
import BodySystemReview from "./components/dashboard/home/body-system-review";
import OtherClasses from "./components/dashboard/home/other-classes";
import SuccessTools from "./components/dashboard/home/success-tools";
import TracYourProgress from "./components/dashboard/home/track-your-progress";

const DashboardPage = () => {
  return (
    <div className="w-full max-w-full min-w-0 flex flex-col gap-5 sm:gap-6 p-4 sm:p-6 overflow-x-hidden">
      <AskAtlas />
      <TracYourProgress />
      <OtherClasses />
      <SuccessTools />
      <BodySystemReview />
    </div>
  );
};
export default DashboardPage;