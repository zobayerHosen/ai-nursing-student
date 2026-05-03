"use client";

import CommonFieldsetInput from "@/components/common-fieldset-input";
import { useForm } from "react-hook-form";
import AuthCommonTitle from "./auth-common-title";
import { useMemo } from "react";

const SetNewPasswordForm = () => {

    // Note: react hook form
    const {
        control,
        formState: { errors },
        handleSubmit,
        watch
    } = useForm({
        mode: "onChange",
    });

    const password = watch("password", "");

    // Password strength logic
    const getPasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };

    const strength = useMemo(() => getPasswordStrength(password), [password]);
    const strengthLabel = ["Weak", "Weak", "Medium", "Good", "Strong"][strength];
    const strengthColor = ["#ff4d4f", "#ff4d4f", "#faad14", "#52c41a", "#16a34a"][strength];



    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="w-full max-w-130 mx-auto flex flex-col gap-8 pt-10">
            <AuthCommonTitle
                title="Create New Password"
                description="Please enter a new password. Your new password must be different from previous password."
            />

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                <CommonFieldsetInput
                    label="Password"
                    type="password"
                    name="password"
                    control={control}
                    register_as="password"
                    placeholder="minimum 8 character"
                    required
                    errors={errors}
                    validationRules={{ required: "Password is required" }}
                />

                {password && (
                    <div className="flex items-center gap-3 mt-1">
                        <div className="flex gap-1 flex-1">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="h-1.5 flex-1 rounded-full"
                                    style={{
                                        backgroundColor: i <= strength ? strengthColor : "#e5e7eb",
                                    }}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-medium" style={{ color: strengthColor }}>
                            {strengthLabel}
                        </span>
                    </div>
                )}

                <CommonFieldsetInput
                    label="Confirm Password"
                    type="password"
                    name="confirm_password"
                    control={control}
                    placeholder="Repeat password"
                    register_as="confirm_password"
                    required
                    errors={errors}
                    validationRules={{
                        required: "Confirm password is required",
                        validate: (value) => value === watch("password") || "Passwords do not match",
                    }}
                />

                {/* Continue Button */}
                <button
                    // onClick={() => router.push("/auth/profile-setup")}
                    type="submit"
                    className="cursor-pointer w-full bg-primary hover:bg-primary/80 text-white py-4 rounded-xl text-base font-medium transition mt-2"
                >
                    Continue
                </button>
            </form>
        </div>
    );
};

export default SetNewPasswordForm;