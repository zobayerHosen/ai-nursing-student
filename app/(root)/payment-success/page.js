"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CheckCheck, ArrowRight, LayoutDashboard, Sparkles, Mail } from "lucide-react";

const SuccessContent = () => {
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.title = "Payment Successful - STEMRN";
    }, []);

    const planName = searchParams?.get("plan") || "Premium";
    const amount = searchParams?.get("amount") || null;

    return (
        <div className="min-h-screen bg-[#EAEFF4] flex flex-col">
            {/* Header */}
            <header className="w-full bg-white border-b border-[rgba(11,36,71,0.06)]">
                <div className="max-w-280 mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
                    <Link href="/" className="text-xl font-extrabold tracking-tight text-[#0b2447]">
                        STEM<span className="text-[#ff6b6b]">RN</span>
                    </Link>
                    <Link
                        href="/dashboard"
                        className="text-sm font-semibold text-primary hover:text-[#0b2447] transition-colors"
                    >
                        Go to Dashboard →
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-16 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={mounted ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-[520px]"
                >
                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-sm border border-[rgba(11,36,71,0.08)] p-8 md:p-10 lg:p-12 text-center">
                        {/* Success Icon */}
                        <div className="relative mx-auto mb-6 w-20 h-20 md:w-24 md:h-24">
                            {/* Outer Ring */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={mounted ? { scale: 1 } : {}}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute inset-0 rounded-full bg-emerald-50 border border-emerald-200/60"
                            />
                            {/* Checkmark Circle */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={mounted ? { scale: 1 } : {}}
                                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                                className="relative z-10 w-full h-full rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200/50"
                            >
                                <motion.div
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={mounted ? { pathLength: 1, opacity: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                                >
                                    <CheckCheck className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={2.5} />
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={mounted ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-[28px] md:text-[32px] font-extrabold tracking-tight text-[#0b2447] mb-2"
                        >
                            Payment Successful!
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={mounted ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-[15px] md:text-[16px] text-[#4a5568] leading-relaxed mb-8"
                        >
                            Thank you for your subscription. Your{" "}
                            <span className="font-semibold text-[#0b2447]">{planName}</span> plan
                            is now active and you have full access to all features.
                        </motion.p>

                        {/* Order Summary */}
                        {amount && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={mounted ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.45, duration: 0.5 }}
                                className="bg-[#EAEFF4]/60 rounded-2xl p-5 mb-8 text-left border border-[rgba(11,36,71,0.06)]"
                            >
                                <h4 className="text-[11px] font-bold tracking-widest uppercase text-[#4a5568] mb-3">
                                    Order Summary
                                </h4>
                                <div className="space-y-2.5">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[#4a5568]">Plan</span>
                                        <span className="font-semibold text-[#0b2447]">{planName}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[#4a5568]">Amount</span>
                                        <span className="font-semibold text-[#0b2447]">{amount}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[#4a5568]">Status</span>
                                        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            Completed
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={mounted ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.55, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-3"
                        >
                            <Link
                                href="/dashboard"
                                className="flex-1 flex items-center justify-center gap-2 bg-[#0b2447] text-white py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-[#15305a] hover:-translate-y-px shadow-sm active:scale-[0.98]"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Go to Dashboard
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/dashboard/settings?tab=subscription-billing"
                                className="flex-1 flex-row flex items-center justify-center gap-2 bg-white text-[#0b2447] border border-[rgba(11,36,71,0.16)] py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-[rgba(11,36,71,0.04)] hover:border-[#0b2447] active:scale-[0.98]"
                            >
                                View Subscription
                            </Link>
                        </motion.div>
                    </div>

                    {/* Footer Text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={mounted ? { opacity: 1 } : {}}
                        transition={{ delay: 0.7, duration: 0.4 }}
                        className="text-center text-[13px] text-[#4a5568] mt-6"
                    >
                        A confirmation email has been sent to your registered email address.
                    </motion.p>
                </motion.div>
            </main>

            {/* Simple Footer */}
            <footer className="border-t border-[rgba(11,36,71,0.06)] bg-white">
                <div className="max-w-280 mx-auto px-6 md:px-8 py-5 flex items-center justify-between text-[13px] text-[#4a5568]">
                    <span>© 2026 STEMRN Inc.</span>
                    <div className="flex items-center gap-4">
                        <Link href="/terms-conditions" className="hover:text-[#0b2447] transition-colors">
                            Terms
                        </Link>
                        <a href="mailto:hello@stemrn.com" className="hover:text-[#0b2447] transition-colors inline-flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" />
                            Support
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#EAEFF4] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#0b2447] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
