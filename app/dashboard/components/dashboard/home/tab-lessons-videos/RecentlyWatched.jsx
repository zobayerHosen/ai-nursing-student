import Link from "next/link";
import RecentlyWatchedCard from "./RecentlyWatchedCard";

import { PlayCircle } from "lucide-react";

export default function RecentlyWatched({ watchedData = [] }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl h-full">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-medium">
          Recently watched
        </h2>

        <Link href="#" className="text-[#233043] hover:text-[#111827] font-medium">
          View history →
        </Link>
      </div>

      {/* header */}
      <div className="grid grid-cols-[1fr_90px_60px_100px] text-xs uppercase text-[#9CA3AF] mb-4 px-14">
        <div>Lesson</div>
        <div>Watched</div>
        <div>Duration</div>
        <div>Status</div>
      </div>

      <div>
        {watchedData.map((item, index) => (
          <RecentlyWatchedCard
            key={index}
            icon={PlayCircle}
            title={item.lesson}
            category={item.module_name}
            watched={new Date(item.watched_at).toLocaleDateString()}
            duration={`${item.duration}m`}
            status={item.status}
            color="#FF5E96"
            iconBg="#FFE5EF"
          />
        ))}
        {watchedData.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No recently watched videos.
          </div>
        )}
      </div>
    </div>
  );
}