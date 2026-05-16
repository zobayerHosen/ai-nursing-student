"use client";
import { BookOpen, TrendingUp, Calendar } from "lucide-react";

const categoryData = [
  { name: "Fundamentals of Nursing", accuracy: 87, cards: "6 / 6 cards", color: "#2C5F8D" },
  { name: "Medical Surgical Nursing", accuracy: 74, cards: "7 / 7 cards", color: "#2C5F8D" },
  { name: "Maternal Newborn Nursing", accuracy: 90, cards: "7 / 7 cards", color: "#2C5F8D" },
  { name: "Pediatric Nursing", accuracy: 0, cards: "0 / 0 cards", color: "#F3F4F6" },
  { name: "Mental Health Nursing", accuracy: 0, cards: "0 / 0 cards", color: "#F3F4F6" },
  { name: "Pharmacology", accuracy: 71, cards: "2 / 2 cards", color: "#2C5F8D" },
  { name: "Critical Care Nursing", accuracy: 100, cards: "1 / 1 cards", color: "#2C5F8D" },
  { name: "Community Health Nursing", accuracy: 0, cards: "0 / 0 cards", color: "#F3F4F6" },
  { name: "Nursing Leadership and Management", accuracy: 0, cards: "0 / 0 cards", color: "#F3F4F6" },
  { name: "Gerontological Nursing", accuracy: 0, cards: "0 / 0 cards", color: "#F3F4F6" },
  { name: "ECG Interpretation", accuracy: 0, cards: "0 / 0 cards", color: "#F3F4F6" },
  { name: "Dosage Calculations", accuracy: 0, cards: "0 / 0 cards", color: "#F3F4F6" },
  { name: "Nursing Assessment", accuracy: 0, cards: "0 / 0 cards", color: "#F3F4F6" },
  { name: "Clinical Skills", accuracy: 0, cards: "0 / 0 cards", color: "#F3F4F6" },
];

const ProgressView = () => {
  return (
    <div className="w-full">
      {/* header */}
      <div className="flex flex-col mb-10">
        <h2 className="text-2xl font-bold text-[#1E293B]">Progress</h2>
        <p className="text-gray-500 mt-1">Track your flashcard study progress across all nursing subjects</p>
      </div>
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 font-medium">Cards Reviewed</span>
            <BookOpen className="text-gray-300 w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-3xl font-bold text-[#1E293B]">23 / 23</h3>
          </div>
          <span className="text-xs text-gray-500">100% complete</span>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 font-medium">Overall Accuracy</span>
            <TrendingUp className="text-gray-300 w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-3xl font-bold text-[#1E293B]">83%</h3>
          </div>
          <span className="text-xs text-gray-500">Correct on first attempt</span>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 font-medium">Study Streak</span>
            <Calendar className="text-gray-300 w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-3xl font-bold text-[#1E293B]">7 days</h3>
          </div>
          <span className="text-xs text-gray-500">Keep it up!</span>
        </div>
      </div>

      {/* Progress by Category */}
      <h2 className="text-xl font-bold text-[#1E293B] mb-6">Progress by Category</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryData?.map((category, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[#424242] font-medium">{category?.name ?? ""}</span>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-[#1E293B] leading-none mb-1">{category?.accuracy ?? ""}%</span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Accuracy</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500">{category?.cards ?? ""}</span>
            </div>
            <div className="w-full bg-[#F3F4F6] h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${category?.accuracy}%`,
                  backgroundColor: category?.accuracy > 0 ? category?.color : 'transparent'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressView;
