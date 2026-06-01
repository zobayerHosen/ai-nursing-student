"use client";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import AuthCommonTitle from "./auth-common-title";
import Link from "next/link";
import { useStepProfileSetup } from "@/hooks/auth/step-profile-setup/step-profile-setup";
import { useForm } from "react-hook-form";
import setToken from "@/utils/setToken";
import { useRouter } from "next/navigation";

const ReviewAndSetupForm = () => {
    const router = useRouter();
    const { stepProfileSetup, isPending } = useStepProfileSetup();
    const [receiveEmails, setReceiveEmails] = useState(true);
    const [showWarning, setShowWarning] = useState(false);
    const [existingData, setExistingData] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            agreedToTerms: false,
            agreedToPrivacy: false,
            receiveEmails: true,
        },
    });

    useEffect(() => {
        const data = localStorage.getItem("profile-setup-data");

        if (data) {
            setExistingData(JSON.parse(data));
        }
    }, []);
    console.log("Existing data", existingData)


    const onSubmit = (data) => {
        setShowWarning(false);

        const payload = {
            ...existingData,
            ...data,
            receiveEmails,
        };

        stepProfileSetup(payload, {
            onSuccess: (responseData) => {
                localStorage.removeItem("profile-setup-data");
                
                const data = responseData?.data || responseData;
                const token = data?.tokens?.access;
                
                if (token) {
                    setToken(token, data?.expires_in);
                }
                router.push("/dashboard");
            },
            onError: (error) => {
                console.error("Profile setup failed", error);
            }
        });
    };

    const onFormError = () => {
        setShowWarning(true);
    };

    // Note: UI
    return (
        <div className="w-full max-w-130 mx-auto flex flex-col pt-10 px-4">
            <StepProgress />
            <AuthCommonTitle title="Review & Finish" />

            <p className="text-[#525252] mb-8 text-sm">Step 3 of 3 — Agreements</p>

            <form onSubmit={handleSubmit(onSubmit, onFormError)} className="space-y-6">
                {/* Terms of Use Notice */}
                <div className="bg-white text-sm text-gray-700 leading-relaxed flex flex-col gap-2">
                    <h4 className="text-[#424242] font-bold text-2xl">Terms of Use</h4>
                    <p>This guide is intended for educational purposes only and should be used in conjunction with formal nursing education, clinical training, and institutional protocols. Always follow your facility&apos;s guidelines and seek guidance from experienced nursing professionals and healthcare providers.</p>
                </div>
                {/* Terms & Conditions - Updated Design */}
                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
                    <h3 className="font-bold text-xl text-[#424242]">Terms & Conditions</h3>
                    <p className="text-sm text-[#424242] font-semibold">Updated January 2025</p>

                    <Link
                        href="#"
                        className="text-primary hover:underline text-sm font-bold inline-block"
                    >
                        Read Full Terms & Conditions
                    </Link>

                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mt-0.5 w-4.5 h-4.5 accent-primary"
                            {...register("agreedToTerms", {
                                required: "Please agree to the Terms & Conditions",
                            })}
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                            Yes, I agree to the{" "}
                            <span className="text-primary font-bold block">Terms & Conditions</span>
                        </label>
                    </div>
                </div>

                {/* Privacy Policy - Updated Design */}
                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
                    <h3 className="font-bold text-xl text-[#424242]">Privacy Policy</h3>
                    <p className="text-sm text-[#424242] font-semibold">Updated January 2025</p>

                    <Link
                        href="#"
                        className="text-primary hover:underline text-sm font-bold inline-block"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="#"
                        className="text-primary hover:underline text-sm font-bold inline-block"
                    >
                        Notice for California Residents
                    </Link>

                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="privacy"
                            className="mt-0.5 w-4.5 h-4.5 accent-primary"
                            {...register("agreedToPrivacy", {
                                required: "Please agree to the Privacy Policy",
                            })}
                        />
                        <label htmlFor="privacy" className="text-sm text-gray-700 cursor-pointer">
                            Yes, I agree to the{" "}
                            <span className="text-primary font-bold block">Privacy Policy</span>
                        </label>
                    </div>
                </div>

                {/* Educational Purpose Disclaimer */}
                <div className="flex items-start gap-3 px-1">
                    <input
                        type="checkbox"
                        id="educational"
                        className="w-4.5 h-4.5 accent-primary"
                        {...register("educational", {
                            required: "Please agree to the Educational Purpose Disclaimer",
                        })}
                    />
                    <p className="text-sm text-gray-700 leading-relaxed">
                        I understand STEMRN is for{" "}
                        <span className="font-semibold">educational purposes only</span>
                        {" "}and does not replace clinical training or professional medical advice.
                    </p>
                </div>

                {/* Optional Email Checkbox */}
                <div className="flex items-center gap-3 px-1">
                    <input
                        type="checkbox"
                        id="emails"
                        checked={receiveEmails}
                        onChange={(e) => setReceiveEmails(e.target.checked)}
                        className="w-4.5 h-4.5 accent-primary border-gray-300 rounded cursor-pointer shrink-0"
                    />
                    <p className="text-sm text-[#6D6D6D]">
                        Send me study tips and NCLEX prep resources by email (optional)
                    </p>
                </div>

                {/* Warning Message */}
                {showWarning && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                        <span>⚠️</span>
                        Please agree to the Terms & Conditions and Privacy Policy to continue.
                    </div>
                )}

                {/* Continue Button Section */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="cursor-pointer w-full bg-primary hover:bg-primary/80 text-white font-semibold py-3.5 px-6 rounded-xl transition duration-200 shadow-md hover:shadow-lg focus:outline-none text-base"
                >
                    {isPending ? "Continue...." : "Continue"}
                </button>
            </form>
        </div>
    );
};

export default ReviewAndSetupForm;

// Note: Step Progress Bar
const StepProgress = () => (
    <div className="flex items-center justify-center w-full px-4 bg-white shadow-md rounded-2xl py-5 mb-8">
        <div className="flex items-center w-full max-w-md">
            {/* Step 1 - Account */}
            <div className="flex flex-col items-center text-center flex-1">
                <div className={`p-2 w-8 h-8 rounded-full border-8 border-primary flex items-center justify-center shadow-sm transition-all bg-white`}>
                    <span className={`text-lg text-primary shrink-0`}>
                        <FaCheck className="p-1" />
                    </span>
                </div>
                <div className="mt-2 text-center">
                    <h5 className={`text-[10px] font-medium text-gray-400`}>
                        STEP 1
                    </h5>
                    <div className={`text-sm font-medium text-[#1E40AF]`}>
                        Account
                    </div>
                </div>
            </div>

            {/* Line 1 */}
            <div className={`flex-1 h-0.5 mx-2 -mt-6 transition-all bg-[#1E40AF]`} />

            {/* Step 2 - Profile */}
            <div className="flex flex-col items-center text-center flex-1">
                <div className={`p-2 w-8 h-8 rounded-full border-8 border-primary flex items-center justify-center shadow-sm transition-all bg-white`}>
                    <span className={`text-lg text-primary shrink-0`}>
                        <FaCheck className="p-1" />
                    </span>
                </div>
                <div className="mt-2 text-center">
                    <div className={`text-[10px] font-medium text-gray-400`}>
                        STEP 2
                    </div>
                    <div className={`text-sm font-medium text-gray-700`}>
                        Profile
                    </div>
                </div>
            </div>

            {/* Line 2 */}
            <div className={`flex-1 h-0.5 mx-2 -mt-6 transition-all bg-[#1E40AF]`} />

            {/* Step 3 - Terms */}
            <div className="flex flex-col items-center text-center flex-1">
                <div className={`p-2 w-8 h-8 rounded-full border-8 border-primary flex items-center justify-center shadow-sm transition-all bg-white`}>
                    <span className={`text-lg text-primary shrink-0`}>
                        <FaCheck className="p-1" />
                    </span>
                </div>
                <div className="mt-2 text-center">
                    <div className={`text-[10px] font-medium text-gray-400`}>
                        STEP 3
                    </div>
                    <div className={`text-sm font-medium text-gray-700`}>
                        Terms
                    </div>
                </div>
            </div>
        </div>
    </div>
);