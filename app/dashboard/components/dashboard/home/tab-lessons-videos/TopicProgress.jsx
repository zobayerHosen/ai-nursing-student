import Link from "next/link";
import TopicProgressCard from "./TopicProgressCard";

export default function TopicProgress({ topicsData = [] }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl h-full">
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-medium">
          By topic
        </h2>

        <Link href="#" className="text-[#233043] hover:text-[#111827] font-medium">
          All topics →
        </Link>
      </div>

      <div className="space-y-8">
        {topicsData.map((item) => {
          const progressValues = item.progress ? item.progress.split("/") : [0, 1];
          const completed = parseInt(progressValues[0], 10);
          const total = parseInt(progressValues[1] || 1, 10);
          return (
            <TopicProgressCard
              key={item.module_id || item.module_name}
              title={item.module_name}
              logo={item.logo}
              completed={completed}
              total={total}
            />
          );
        })}
        {topicsData.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No topics in progress yet.
          </div>
        )}
      </div>
    </div>
  );
}