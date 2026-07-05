"use client";

import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import RecentlyWatched from "./RecentlyWatched";
import TopicProgress from "./TopicProgress";

const totalLessons = 82;

const lessonData = [
  {
    name: "Watched",
    value: 28,
    subtitle: "Lessons you've completed",
    color: "#F5659A",
  },
  {
    name: "In progress",
    value: 3,
    subtitle: "Started but not finished",
    color: "#F4A51C",
  },
  {
    name: "Not started",
    value: 51,
    subtitle: "Still to watch",
    color: "#E7DDCC",
  },
];

const completedPercentage = Math.round(
  (lessonData[0].value / totalLessons) * 100
);

const CenterLabel = () => (
  <>
    <text
      x="50%"
      y="46%"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{
        fontSize: "36px",
        fontWeight: 700,
        fill: "#111827",
      }}
    >
      {completedPercentage}%
    </text>

    <text
      x="50%"
      y="63%"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{
        fontSize: "10px",
        fill: "#8B97A7",
        letterSpacing: "1px",
      }}
    >
      COMPLETE
    </text>
  </>
);

export default function LessonVideos() {
  return (
    <div className="bg-white rounded-3xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl text-[#111827]">
            Library at a glance
          </h2>

          <span className="text-sm text-[#A1A1AA]">
            {totalLessons} lessons total
          </span>
        </div>

        <Link
          href="/dashboard/lesson-videos"
          className="text-[#111827] font-medium hover:underline"
        >
          Browse library →
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center  justify-between gap-10">
        {/* Chart */}
        <div className="w-[220px] h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={lessonData}
                dataKey="value"
                innerRadius={70}
                outerRadius={95}
                stroke="none"
              >
                {lessonData.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.color}
                  />
                ))}
              </Pie>

              <CenterLabel />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-6">
          {lessonData.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-4"
            >
              <div
                className="w-3 h-3 rounded-full mt-2"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <div>
                <h3 className="text-md font-medium text-[#111827]">
                  {item.name}
                </h3>

                <p className="text-[#8B97A7] text-sm">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="space-y-10 min-w-[170px]">
          {lessonData.map((item) => (
            <div key={item.name}>
              <div className="flex items-end">
                <span className="text-xl leading-none text-[#111827]">
                  {item.value}
                </span>

                <span className="text-md text-[#B3B3B3] mb-1">
                  /{totalLessons}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-10">
        <TopicProgress />
        <RecentlyWatched />
      </div>
    </div>
  );
}