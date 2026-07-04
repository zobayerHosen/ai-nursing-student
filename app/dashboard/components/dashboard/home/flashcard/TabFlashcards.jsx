"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { flashcardData } from "./tab-flashcardData";
import TabFlashcardCategoryCard from "./TabFlashcardCategoryCard";

const cardData = [
  {
    name: "Easy",
    value: 30,
    color: "#5BC8B1",
  },
  {
    name: "Hard",
    value: 240,
    color: "#F56497",
  },
  {
    name: "New",
    value: 137,
    color: "#DED4C1",
  },
];

const totalCards = cardData.reduce(
  (acc, item) => acc + item.value,
  0
);

const CenterLabel = () => (
  <>
    <text
      x="50%"
      y="48%"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{
        fontSize: "32px",
        fontWeight: 700,
        fill: "#111827",
      }}
    >
      {totalCards}
    </text>

    <text
      x="50%"
      y="63%"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{
        fontSize: "12px",
        fill: "#8B97A7",
        letterSpacing: "1px",
      }}
    >
      CARDS
    </text>
  </>
);

const TabFlashcards = () => {
  return (
    <div className="bg-white rounded-2xl">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl leading-none text-[#1E293B]">
          Card mastery
        </h2>

        <p className="mt-3 text-[#8B97A7]">
          SRS health across your library
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Chart */}
        <div className="w-[220px] h-[220px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={cardData}
                dataKey="value"
                innerRadius={68}
                outerRadius={95}
                stroke="none"
              >
                {cardData.map((item) => (
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
        <div className="space-y-8">
          {cardData.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <div>
                <h3 className="text-md font-medium text-[#475569]">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {flashcardData.map((card, index) => (
          <TabFlashcardCategoryCard
            key={index}
            {...card}
          />
        ))}
      </div>
    </div>
  );
};

export default TabFlashcards;