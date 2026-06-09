"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { KeyRound, Loader2 } from "lucide-react";
import CommonFieldsetInput from "@/components/common-fieldset-input";
import { useChangePassword } from "@/hooks";
import toast from "react-hot-toast";

export default function PasswordSettings({ showToast }) {
  const { changePassword, isPending } = useChangePassword();

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (data.new_password !== data.confirm_new_password) {
      toast.error("Passwords do not match!");
      return;
    }

    changePassword(data, {
      onSuccess: (response) => {
        toast.success(response?.message ?? "Password updated successfully!");
        reset();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      },
    }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Security Credentials</h3>
          <p className="text-slate-400 text-xs mt-1">Protect your account by setting a strong security password.</p>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Current Password */}
          <CommonFieldsetInput
            label="Current Password"
            type="password"
            control={control}
            placeholder="••••••••"
            name="current_password"
            register_as="current_password"
            required
            errors={errors}
            validationRules={{ required: "Current Password is required" }}
          />

          {/* New Password */}
          <CommonFieldsetInput
            label="New Password"
            type="password"
            control={control}
            placeholder="••••••••"
            name="new_password"
            register_as="new_password"
            required
            errors={errors}
            validationRules={{
              required: "New Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            }}
          />

          {/* Confirm New Password */}
          <CommonFieldsetInput
            label="Confirm New Password"
            type="password"
            control={control}
            placeholder="••••••••"
            name="confirm_new_password"
            register_as="confirm_new_password"
            required
            errors={errors}
            validationRules={{ required: "Please confirm your new password" }}
          />
        </div>
      </div>

      <hr className="border-slate-200/80" />

      <div className="flex justify-end">          <button
        type="submit"
        disabled={isPending}
        className={`bg-[#2C5F8D] hover:bg-[#224b70] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-2 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isPending ? <><Loader2 size={15} className="animate-spin" /> Change Password </> : <><KeyRound size={15} /> Change Password</>}
      </button>
      </div>
    </form>
  );
}
