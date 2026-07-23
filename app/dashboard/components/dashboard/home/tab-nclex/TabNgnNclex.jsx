import { Sparkles, Construction, Rocket } from "lucide-react";

const NgnNclex = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-20 px-6 bg-gradient-to-b from-white to-[#f8fafc] rounded-2xl border border-[#e2e8f0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#2C5F8D] via-[#4A90E2] to-[#2C5F8D]"></div>
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#4A90E2]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#2C5F8D]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Icon container */}
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-[#eef4fb] rounded-2xl blur-xl group-hover:scale-125 transition-all duration-500 ease-in-out"></div>
        <div className="relative bg-white w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg border border-[#e2e8f0] transform group-hover:-translate-y-1 transition-all duration-300">
          <Rocket className="w-10 h-10 text-[#2C5F8D] animate-[bounce_3s_infinite]" />
        </div>
      </div>
      
      <h2 className="text-[28px] font-extrabold text-[#0f172a] mb-3 tracking-tight">
        Major Update in Progress
      </h2>
      
      <p className="text-[#64748b] text-center max-w-[480px] text-[15px] leading-relaxed mb-8">
        We're building an entirely new Next-Gen NCLEX experience. Prepare for cutting-edge simulators, advanced clinical judgment scenarios, and deeper analytics.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-[#e2e8f0] shadow-sm transition-all hover:shadow-md cursor-default">
          <Construction className="w-4 h-4 text-amber-500" />
          <span className="text-[13px] font-bold text-[#475569] uppercase tracking-widest">
            Under Construction
          </span>
        </div>
        <div className="flex items-center gap-2 bg-[#eef4fb] px-5 py-2.5 rounded-xl border border-[#dbeafe] shadow-sm transition-all hover:shadow-md cursor-default">
          <Sparkles className="w-4 h-4 text-[#2C5F8D]" />
          <span className="text-[13px] font-bold text-[#2C5F8D] uppercase tracking-widest">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
};

export default NgnNclex;