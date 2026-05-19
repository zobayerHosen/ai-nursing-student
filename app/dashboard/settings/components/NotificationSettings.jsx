"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Bell, Sparkles, User, Volume2 } from "lucide-react";

export default function NotificationSettings({ showToast }) {
  const {
    handleSubmit,
  } = useForm({
    defaultValues: {
      email_alerts: true,
      study_reminders: true,
      progress_reports: false,
      product_updates: true,
    }
  });

  const onSubmit = (data) => {
    console.log("Notification Save: ", data);
    showToast("Notification preferences updated!");
  };

  return (
    <>
      Notification page
    </>
    // <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fadeIn">
    //   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-4">
    //     <div>
    //       <h3 className="text-xl font-bold text-slate-800 tracking-tight">Notification Settings</h3>
    //       <p className="text-slate-400 text-xs mt-1">Configure how you receive learning notifications and updates.</p>
    //     </div>

    //     <div className="lg:col-span-2 space-y-4">
    //       {[
    //         {
    //           id: "email_alerts",
    //           label: "Email Notifications",
    //           desc: "Receive notifications about account updates, safety alerts, and NCLEX study guides via email.",
    //           icon: <Bell size={18} className="text-[#2C5F8D]" />
    //         },
    //         {
    //           id: "study_reminders",
    //           label: "Study Reminders",
    //           desc: "Get daily prompts to practice QBank and review flashcards.",
    //           icon: <Sparkles size={18} className="text-pink-500" />
    //         },
    //         {
    //           id: "progress_reports",
    //           label: "Performance Reports",
    //           desc: "Receive weekly detailed summaries of your mock exam scores and nursing core learning progress.",
    //           icon: <User size={18} className="text-amber-500" />
    //         },
    //         {
    //           id: "product_updates",
    //           label: "Weekly Updates",
    //           desc: "Stay informed on new clinical tools, cheat sheets, body system notes, and release logs.",
    //           icon: <Volume2 size={18} className="text-emerald-500" />
    //         }
    //       ].map((item) => (
    //         <div key={item.id} className="flex gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
    //           <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
    //             {item.icon}
    //           </div>
    //           <div className="space-y-1 flex-1">
    //             <label htmlFor={item.id} className="text-sm font-bold text-slate-800 block cursor-pointer select-none">
    //               {item.label}
    //             </label>
    //             <p className="text-xs text-slate-500 leading-relaxed max-w-xl">{item.desc}</p>
    //           </div>
    //           <div className="shrink-0 flex items-center">
    //             <input
    //               type="checkbox"
    //               id={item.id}
    //               className="rounded border-slate-350 text-[#2C5F8D] focus:ring-[#2C5F8D] w-5 h-5 cursor-pointer"
    //               defaultChecked={item.id !== "progress_reports"}
    //             />
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   <hr className="border-slate-200/80" />

    //   <div className="flex justify-end">
    //     <button
    //       type="submit"
    //       className="bg-[#2C5F8D] hover:bg-[#224b70] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-2"
    //     >
    //       Save Preferences
    //     </button>
    //   </div>
    // </form>
  );
}
