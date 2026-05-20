import NursingAssessmentsSidebar from "./components/nursing-assessments-sidebar";

const NursingAssessmentsLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <NursingAssessmentsSidebar />

      {/* Main Content Area */}
      <main className="flex-1 transition-all duration-300 overflow-y-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default NursingAssessmentsLayout;
