"use client";

import { Modal } from "antd";
import { AlertTriangle } from "lucide-react";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Upload, ShieldAlert, Trash2 } from "lucide-react";
import CommonFieldsetInput from "@/components/common-fieldset-input";

export default function GeneralSettings({ showToast }) {
  const [profilePic, setProfilePic] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
  );

  const fileInputRef = useRef(null);

  // React Hook Form setup
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      first_name: "Zobayer",
      last_name: "Hosen",
      email: "example@gmail.com",
    }
  });

  const handlePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        showToast("Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePicture = () => {
    setProfilePic(
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120"
    );
    showToast("Profile picture deleted. Reverted to default.");
  };

  const onSubmit = (data) => {
    console.log("General Save: ", data);
    showToast("Account details saved successfully!");
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    setIsDeleteModalOpen(false);
    showToast("Account deletion request submitted.", "error");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fadeIn">
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
              <img
                src={profilePic}
                alt="Avatar"
                className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-sm shrink-0"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#2C5F8D] hover:bg-[#224b70] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Upload size={13} className="shrink-0" />
                  Change Picture
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

          {/* First Name Field - Required input field */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CommonFieldsetInput
              label="First Name"
              type="text"
              control={control}
              placeholder="e.g. Zobayer"
              name="first_name"
              register_as="first_name"
              required
              errors={errors}
              validationRules={{ required: "First Name is required" }}
            />

            {/* Last Name Field */}
            <CommonFieldsetInput
              label="Last Name"
              type="text"
              control={control}
              placeholder="e.g. Hosen"
              name="last_name"
              register_as="last_name"
              required={false}
              errors={errors}
            />
          </div>

          {/* Email Field */}
          <CommonFieldsetInput
            label="Email"
            type="email"
            control={control}
            placeholder="e.g. johndoe@mail.com"
            name="email"
            disabled={true}
            register_as="email"
            required={false}
            errors={errors}
            innerWrapper="bg-gray-200!"
          />
        </div>
      </div>

      <hr className="border-slate-200/80" />

      {/* Save Changes button on bottom right */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#2C5F8D] hover:bg-[#224b70] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          Save Changes
        </button>
      </div>

      <hr className="border-slate-200/80" />

      {/* Delete Account */}
      <div className="bg-[#FFF0F2] border border-[#FFE2E6] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-[#FF4D4D] flex items-center gap-1.5">
            <ShieldAlert size={18} />
            Delete Account
          </h4>
          <p className="text-xs text-[#FF4D4D]/75 leading-relaxed font-medium">Delete your Ace-Nuryr,g öccount and data permanently.</p>
        </div>
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <Trash2 size={14} />
          Delete Account
        </button>
        {/* Confirmation Modal */}
        <Modal
          open={isDeleteModalOpen}
          onCancel={handleCancelDelete}
          footer={null}
          closeIcon={null}
          centered
        >
          <div className="flex flex-col text-center items-center gap-3 mb-4">
            <AlertTriangle className="shrink-0 text-red-500 bg-gray-100 p-2 rounded-full w-10 h-10" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancelDelete}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    </form>
  );
}