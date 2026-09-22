"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUser } from "@/hooks";
import { getClientToken } from "@/utils/getClientToken";
import {
    useGetSubscriptionPlanData,
    useSubscriptionPlan,
    useSubscriptionPlanCancel,
} from "@/hooks/subscription-plan";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import LoadingIcon from "@/components/loading-icon";
import { Clock, Calendar, GraduationCap, Check, Lock, LogIn, UserPlus, X, Sparkles } from "lucide-react";

const planIcons = [
    {
        duration: "1 Month",
        icon: <Clock className="w-4 h-4 text-orange-500" />,
        bg: "bg-orange-100/80",
    },
    {
        duration: "3 Months",
        icon: <Calendar className="w-4 h-4 text-sky-600" />,
        bg: "bg-sky-100",
    },
    {
        duration: "12 Months",
        icon: <GraduationCap className="w-4 h-4 text-pink-300" />,
        bg: "bg-pink-400/20",
    },
];

const fallbackPlans = [
    {
        name: "1-month-plan",
        display_title: "1 Month",
        price: "$28",
        price_sub_label: "$28.00 billed monthly - cancel anytime",
        is_featured: false,
        badge_text: "Start 7-Day Free Trial",
        features: [
            "CARA AI tutor",
            "12,000+ exam-standard Q&A with detailed explanations",
            "5,000 verified flashcards",
            "Lecture notes — upload & AI convert",
            "All 12 AI clinical tools",
            "Study Notes, Body Systems, ECG Mastery",
            "Progress tracking & readiness score",
            "5 Next Gen NCLEX simulation tests",
        ],
    },
    {
        name: "3-month-plan",
        display_title: "3 Months",
        price: "$25.99",
        price_sub_label: "$77.97 billed every 3 months - save 7%",
        is_featured: false,
        badge_text: "Start 7-Day Free Trial",
        features: [
            "CARA AI tutor",
            "12,000+ exam-standard Q&A with detailed explanations",
            "5,000 verified flashcards",
            "Lecture notes — upload & AI convert",
            "All 12 AI clinical tools",
            "Study Notes, Body Systems, ECG Mastery",
            "Progress tracking & readiness score",
            "5 Next Gen NCLEX simulation tests",
        ],
    },
    {
        name: "12-month-plan",
        display_title: "12 Months",
        price: "$23.99",
        price_sub_label: "$287.88 billed annually - save $48/year",
        is_featured: true,
        badge_text: "Start 7-Day Free Trial",
        cta_text: "BEST VALUE - SAVE 14%",
        features: [
            "CARA AI tutor",
            "12,000+ exam-standard Q&A with detailed explanations",
            "5,000 verified flashcards",
            "Lecture notes — upload & AI convert",
            "All 12 AI clinical tools",
            "Study Notes, Body Systems, ECG Mastery",
            "Progress tracking & readiness score",
            "5 Next Gen NCLEX simulation tests",
            "Priority support",
        ],
    },
];

const PricingPage = () => {
    const { user } = useGetUser();
    const { planDataGet, isLoading } = useGetSubscriptionPlanData();
    const { subscriptionPlan, isPending } = useSubscriptionPlan();
    const { subscripitonPlanCancel, isPending: cancelPending } = useSubscriptionPlanCancel();
    const queryClient = useQueryClient();

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [selectedPlanForAuth, setSelectedPlanForAuth] = useState(null);

    const displayPlans = planDataGet && planDataGet.length > 0 ? planDataGet : fallbackPlans;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isAuthModalOpen) {
                setIsAuthModalOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isAuthModalOpen]);

    const handleSubscription = (name) => {
        const token = getClientToken();
        if (!token || !user) {
            const chosenPlan = displayPlans.find((p) => p.name === name);
            setSelectedPlanForAuth(chosenPlan || { name });
            setIsAuthModalOpen(true);
            return;
        }

        const payload = {
            package: name,
        };

        subscriptionPlan(payload, {
            onSuccess: (data) => {
                const checkoutURL = data?.data?.checkout_url;
                if (checkoutURL) {
                    window.location.href = checkoutURL;
                    return;
                }
                toast.error("Checkout URL not found");
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message ?? "Something went wrong");
            },
        });
    };

    const handlePlanCancel = () => {
        subscripitonPlanCancel(undefined, {
            onSuccess: (data) => {
                toast.success(data?.message ?? "Plan cancelled successfully!");
                queryClient.invalidateQueries({ queryKey: ["user"] });
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message ?? "Something went wrong");
            },
        });
    };

    return (
        <section id="pricing" className="w-full bg-white py-14 sm:py-20 text-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Choose the <span className="text-[#2A5C8A]">plan</span> that fits your <span className="text-[#2A5C8A]">exam timeline.</span>
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm md:text-base font-medium mt-4 leading-relaxed max-w-2xl mx-auto">
                        Every plan includes full access to CARA AI tutor, 12,000+ exam-standard Q&amp;A with detailed explanations, 5,000 flashcards, and 12 clinical study tools. No hidden upsells.
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
                    {displayPlans.map((plan, idx) => {
                        const isFeatured = plan?.is_featured || idx === 2;
                        const iconData = planIcons.find(
                            (item) => item.duration === plan.display_title
                        ) || planIcons[idx % 3];

                        const currentPlan = user?.subscription?.plan_name;
                        const hasSubscription = !!currentPlan;
                        const isActivePlan = currentPlan === plan?.name;

                        const buttonText = !hasSubscription
                            ? "Start 7-Day Free Trial"
                            : isActivePlan
                            ? "Current Plan"
                            : "Switch to this Plan";

                        const sub = user?.subscription;

                        const rawFeatures =
                            plan?.features && plan.features.length > 0
                                ? plan.features
                                : fallbackPlans[idx % 3].features;
                        const featuresList = (
                            Array.isArray(rawFeatures)
                                ? rawFeatures
                                : typeof rawFeatures === "string"
                                ? rawFeatures.split("\n")
                                : []
                        )
                            .map((feat) => (typeof feat === "string" ? feat.trim() : feat))
                            .filter((feat) => (typeof feat === "string" ? feat.length > 0 : Boolean(feat)));

                        return (
                            <div
                                key={idx}
                                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                                    isFeatured
                                        ? "bg-[#2A5C8A] text-white shadow-xl hover:shadow-2xl"
                                        : "bg-[#F8FAFC] border border-slate-200/80 text-slate-900 hover:shadow-md"
                                }`}
                            >
                                {/* Featured Ribbon Badge */}
                                {isFeatured && (
                                    <div className="absolute top-0 right-0 bg-[#FF6B6B] text-white text-[9px] font-extrabold tracking-wider uppercase px-3.5 py-1.5 rounded-tr-3xl rounded-bl-xl shadow-xs">
                                        BEST VALUE - SAVE 14%
                                    </div>
                                )}

                                {/* Active Plan Badge */}
                                {isActivePlan && !isFeatured && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                                        Current Plan
                                    </div>
                                )}

                                <div>
                                    {/* Icon Badge */}
                                    <div className={`w-8 h-8 rounded-xl ${iconData.bg} flex items-center justify-center mb-4`}>
                                        {iconData.icon}
                                    </div>

                                    {/* Category Kicker */}
                                    <div className={`text-[11px] font-bold tracking-wider uppercase mb-1 ${isFeatured ? "text-slate-200/90" : "text-slate-800"}`}>
                                        NCLEX-RN REVIEW
                                    </div>

                                    {/* Duration */}
                                    <h3 className={`text-xl sm:text-2xl font-bold tracking-tight mb-3 ${isFeatured ? "text-white" : "text-slate-900"}`}>
                                        {plan?.display_title ?? "1 Month"}
                                    </h3>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isFeatured ? "text-white" : "text-slate-900"}`}>
                                            {plan?.price ?? "$28"}
                                        </span>
                                        <span className={`text-xs font-normal ${isFeatured ? "text-slate-300" : "text-slate-400"}`}>
                                            / month
                                        </span>
                                    </div>

                                    {/* Billing Subtext */}
                                    <p className={`text-xs mb-6 ${isFeatured ? "text-slate-300" : "text-slate-400"}`}>
                                        {plan?.price_sub_label ?? "$28.00 billed monthly - cancel anytime"}
                                    </p>

                                    {/* CTA Button */}
                                    {isActivePlan ? (
                                        <div className="mb-8 space-y-2">
                                            <div className="w-full text-center py-3 px-4 rounded-xl font-bold text-sm bg-emerald-500 text-white cursor-default">
                                                Current Plan
                                            </div>
                                            {sub?.auto_renew && !sub?.cancel_at_period_end && (
                                                <button
                                                    onClick={handlePlanCancel}
                                                    disabled={cancelPending}
                                                    className="w-full text-center py-2 px-4 rounded-xl font-semibold text-xs text-rose-500 border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                                                >
                                                    {cancelPending ? <LoadingIcon /> : "Cancel Subscription"}
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleSubscription(plan?.name)}
                                            disabled={isPending}
                                            className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#FF6B6B] hover:bg-[#ff5252] transition-all shadow-md shadow-rose-500/20 active:scale-[0.98] cursor-pointer mb-8 disabled:opacity-50"
                                        >
                                            {isPending ? "Please Wait..." : buttonText}
                                        </button>
                                    )}

                                    {/* Included Features List Header */}
                                    <div className={`text-[11px] font-bold tracking-wider uppercase mb-4 ${isFeatured ? "text-slate-200/90" : "text-slate-800"}`}>
                                        WHAT&apos;S INCLUDED
                                    </div>

                                    {/* Checklist */}
                                    <ul className="space-y-2.5 text-xs font-medium">
                                        {featuresList.map((feat, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-2.5">
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                                    isFeatured ? "bg-rose-400/20 text-[#FF6B6B]" : "bg-rose-100/70 text-[#FF6B6B]"
                                                }`}>
                                                    <Check className="w-3 h-3 stroke-3" />
                                                </div>
                                                <span className={isFeatured ? "text-slate-100" : "text-slate-700"}>
                                                    {feat}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Note */}
                <div className="mt-12 sm:mt-16 text-center text-xs text-slate-400 max-w-4xl mx-auto leading-relaxed">
                    All plans include a 7-day free trial with full access to your Q&amp;A bank, flashcards, study notes, and lecture notes upload. CARA AI tutor and clinical tools are included with daily usage limits during the trial; the 5 Next Gen NCLEX simulation tests unlock after you subscribe. No credit card required to start. Affirm and Klarna payment plans are available on 3-month and 12-month plans, subject to eligibility — checking eligibility does not affect your credit score.
                </div>

            </div>

            {/* Authentication Required Popup Modal */}
            <AnimatePresence>
                {isAuthModalOpen && (
                    <motion.div
                        key="auth-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
                        onClick={() => setIsAuthModalOpen(false)}
                    >
                        <motion.div
                            key="auth-modal-content"
                            initial={{ opacity: 0, scale: 0.95, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 16 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-6 pb-4 flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 text-[#2A5C8A] flex items-center justify-center shrink-0 shadow-xs">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                                            Please Log In First
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Account required to get subscription
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsAuthModalOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Body Content */}
                            <div className="px-6 py-2 space-y-3.5">
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    Please log in to your account first so we can link your subscription, progress, and study tools to your personal account.
                                </p>

                                {selectedPlanForAuth && (
                                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-xl bg-[#2A5C8A]/10 text-[#2A5C8A] flex items-center justify-center shrink-0">
                                                <Sparkles className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                                    Selected Plan
                                                </span>
                                                <span className="text-xs font-bold text-slate-800">
                                                    {selectedPlanForAuth.display_title || selectedPlanForAuth.name}
                                                </span>
                                            </div>
                                        </div>
                                        {selectedPlanForAuth.price && (
                                            <span className="text-xs font-extrabold text-[#2A5C8A] bg-white px-2.5 py-1 rounded-lg border border-slate-200/60 shadow-2xs">
                                                {selectedPlanForAuth.price}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="p-6 pt-4 flex flex-col gap-2.5 bg-slate-50/60 border-t border-slate-100 mt-4">
                                <Link
                                    href="/auth"
                                    onClick={() => setIsAuthModalOpen(false)}
                                    className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#2A5C8A] hover:bg-[#1E4366] transition-all shadow-md shadow-sky-900/10 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span>Log In to Account</span>
                                </Link>
                                <Link
                                    href="/auth/register"
                                    onClick={() => setIsAuthModalOpen(false)}
                                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <UserPlus className="w-4 h-4 text-slate-500" />
                                    <span>Create New Account</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setIsAuthModalOpen(false)}
                                    className="text-center text-[11px] font-medium text-slate-400 hover:text-slate-600 transition-colors pt-1 cursor-pointer"
                                >
                                    Cancel and browse plans
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PricingPage;