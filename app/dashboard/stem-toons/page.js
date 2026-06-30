import { Lightbulb } from "lucide-react";

const StemToonsIndexPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-md w-full bg-white rounded-2xl p-6 sm:p-8 border border-[#EEEEEE] shadow-sm text-center">
        <div className="w-16 h-16 bg-[#FF6B8A]/10 text-[#FF6B8A] rounded-full flex items-center justify-center mx-auto mb-6">
          <Lightbulb className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-bold text-[#111827] mb-3">
          Stem Toons
        </h2>
        
        <p className="text-[#7A7A7A] text-sm leading-relaxed mb-6">
          Enhance your learning with our comprehensive Stem Toons. Select a category and topic from the sidebar on the left to start exploring.
        </p>

        <div className="text-xs text-[#2C5F8D] font-medium bg-[#2C5F8D]/5 py-2 px-4 rounded-lg inline-block">
          Select a category to view toons and illustrations.
        </div>
      </div>
    </div>
  );
};

export default StemToonsIndexPage;
