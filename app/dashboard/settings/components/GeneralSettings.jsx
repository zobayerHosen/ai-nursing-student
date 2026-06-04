"use client";

import React, { useState, useRef } from "react";
import { Upload, ZoomIn } from "lucide-react";
import { useGetUser } from "@/hooks";
import { useUpdateAvatar } from "@/hooks/user/update-avatar.hook";
import ProfileName from "./user-profile/profile-name";
import DeleteAccount from "./user-profile/delete-account";
import Image from "next/image";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function GeneralSettings({ showToast }) {
  const { user } = useGetUser();
  const queryClient = useQueryClient();
  const { updateAvatar, isPending: avatarPending } = useUpdateAvatar();
  const [isZoomed, setIsZoomed] = useState();

  const [profilePic, setProfilePic] = useState(
    user?.profile_photo ?? "/dummyProfile.jpg"
  );

  const fileInputRef = useRef(null);

  const handlePictureChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePic(reader.result);
    };

    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("profile_photo", file);

    updateAvatar(formData, {
      onSuccess: (response) => {
        toast.success(response?.message ?? "Profile updatead successfully!");
        queryClient.invalidateQueries({ queryKey: ["user"] });

        // If API returns uploaded image URL
        if (response?.data?.profile_photo) {
          setProfilePic(response.data.profile_photo);
        }
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong!")
      },
    });
  };

  const handleDeletePicture = () => {
    setProfilePic(
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120"
    );
    showToast("Profile picture deleted. Reverted to default.");
  };

  // Note: UI
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-4">
        {/* Left Column: Section Title */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Account Details</h3>
          <p className="text-slate-400 text-xs mt-1">Configure your personal information, profile photo and secure credentials.</p>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Picture Upload row */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">Profile Picture</label>
            <div className="flex items-center gap-4">
              {/* profile image */}
              <div title="See The Profile Picture" className="relative w-14 h-14 rounded-full overflow-hidden group shrink-0">
                <Image
                  width={320}
                  height={150}
                  src={profilePic}
                  alt="Avatar"
                  className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-sm"
                />
                {/* Profile image zoom icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setIsZoomed(true)}
                    className="bg-primary p-1.5 rounded-full shadow cursor-pointer"
                  >
                    <ZoomIn className="w-4 h-4 text-white" />
                  </button>
                </div>

                {avatarPending && (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              {/* buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={avatarPending}
                  className={`bg-[#2C5F8D] hover:bg-[#224b70] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 ${avatarPending ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <Upload size={13} className="shrink-0" />
                  {avatarPending ? "Uploading..." : "Change Picture"}
                </button>
                <button
                  type="button"
                  onClick={handleDeletePicture}
                  className="bg-[#FFF0F2] hover:bg-[#FFE2E6] text-[#FF4D4D] px-4 py-2 rounded-lg text-xs font-semibold active:scale-95 transition-all cursor-pointer"
                >
                  Delete Picture
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePictureChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <ProfileName />
        </div>
      </div>

      <hr className="border-slate-200/80" />

      {/* educational background information */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            Educational Information
          </h3>

          <p className="text-sm text-slate-500">
            Your selected program and academic background.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              label: "Nursing Program",
              value: user?.program_display,
            },
            {
              label: "Country / State",
              value: user?.country_display,
            },
            {
              label: "University",
              value: user?.university,
            },
            {
              label: "How Do You Hear About Us",
              value: user?.about_us_display,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:border-[#2C5F8D]/30 transition-all"
            >
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                {item.label}
              </p>

              <p className="font-semibold text-slate-800 leading-relaxed">
                {item.value || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200/80" />

      {/* Delete Account */}
      <DeleteAccount />

      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-9999 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <div className="relative w-full max-w-4xl h-[90vh] max-h-150">
            <Image
              src={user?.profile_photo}
              alt={user?.full_name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}