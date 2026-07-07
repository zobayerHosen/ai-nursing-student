"use client";

const navItems = [
  {
    id: "practice-category",
    label: "Tutorial QBank",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: "full-nclex",
    label: "Next-Gen NCLEX RN",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4V2h6v2" />
        <polyline points="9 13 11 15 15 11" />
      </svg>
    ),
  },
];

const NclexSidebar = ({ section, onSectionChange, onClose }) => {
  return (
    <aside className="w-full h-full border-r border-black/10 bg-white overflow-y-auto overflow-x-hidden flex flex-col px-6 py-4">
      {/* header */}
      <div className="pb-4 border-b border-black/10">
        <h2 className="text-xl leading-none font-semibold text-[#424242]">
          NCLEX Exams
        </h2>
        <div className="mt-1.5 text-[#787878] font-medium text-sm">
          Master NCLEX Practice
        </div>
      </div>

      {/* navigation */}
      <nav className="flex-1 pt-4 flex flex-col gap-1">
        {navItems?.map((item) => {
          const isActive = section === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                onClose?.();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 text-left cursor-pointer ${isActive
                ? "bg-[#2C5F8D] text-white"
                : "text-[#64748b] hover:bg-[#f3f6fa] hover:text-[#0f172a]"
                }`}
            >
              <span className="flex items-center justify-center shrink-0">
                {item.icon ?? ""}
              </span>
              <span>{item.label ?? ""}</span>
            </button>
          );
        })}
      </nav>

      {/* footer stats */}
      <div className="pt-4 border-t border-black/10 mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-[#787878]">
          <span className="text-amber-500">⭐</span>
          <span className="font-semibold">69%</span> overall
        </div>
      </div>
    </aside>
  );
};
export default NclexSidebar;