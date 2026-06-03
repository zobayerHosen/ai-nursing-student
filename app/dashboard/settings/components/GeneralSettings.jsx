"use client";

import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { useGetUser } from "@/hooks";
import { useUpdateAvatar } from "@/hooks/user/update-avatar.hook";
import ProfileName from "./profile-name";
import DeleteAccount from "./delete-account";
import Image from "next/image";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function GeneralSettings({ showToast }) {
  const { user } = useGetUser();
  const queryClient = useQueryClient();
  const { updateAvatar, isPending: avatarPending } = useUpdateAvatar();

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

        {/* Right Column: Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Picture Upload row */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">Profile Picture</label>
            <div className="flex items-center gap-4">
              {/* profile image */}
              <div className="relative w-14 h-14">
                <Image
                  width={320}
                  height={150}
                  src={profilePic}
                  alt="Avatar"
                  className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-sm"
                />

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
                  className="bg-[#2C5F8D] hover:bg-[#224b70] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
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

      {/* Delete Account */}
      <DeleteAccount />
    </div>
  );
}