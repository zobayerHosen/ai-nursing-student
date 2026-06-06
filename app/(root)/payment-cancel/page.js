"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { XCircle, ArrowLeft, RefreshCw, HeadphonesIcon, Mail } from "lucide-react";

const CancelContent = () => {
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.title = "Payment Cancelled - STEMRN";
    }, []);

    const reason = searchParams?.get("reason") || null;

    return (
        <div className="min-h-screen bg-[#EAEFF4] flex flex-col">
            {/* Header */}
            <header className="w-full bg-white border-b border-[rgba(11,36,71,0.06)]">
                <div className="max-w-280 mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
                    <Link href="/" className="text-xl font-extrabold tracking-tight text-[#0b2447]">
                        STEM<span className="text-[#ff6b6b]">RN</span>
                    </Link>
                    <Link
                        href="/subscription-plan-choose"
                        className="text-sm font-semibold text-[#2c5f8d] hover:text-[#0b2447] transition-colors"
                    >
                        View Plans →
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
                        {/* Cancel Icon */}
                        <div className="relative mx-auto mb-6 w-20 h-20 md:w-24 md:h-24">
                            {/* Outer Ring */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={mounted ? { scale: 1 } : {}}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute inset-0 rounded-full bg-rose-50 border border-rose-200/60"
                            />
                            {/* X Circle */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={mounted ? { scale: 1 } : {}}
                                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                                className="relative z-10 w-full h-full rounded-full bg-[#ff6b6b] flex items-center justify-center shadow-lg shadow-rose-200/50"
                            >
                                <motion.div
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={mounted ? { rotate: 0, opacity: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                                >
                                    <XCircle className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={2} />
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
                            Payment Cancelled
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={mounted ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-[15px] md:text-[16px] text-[#4a5568] leading-relaxed mb-6"
                        >
                        No charges have been made. Your payment was not
                        processed and no payment has been taken.
                        </motion.p>

                        {/* Helpful Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={mounted ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.45, duration: 0.5 }}
                            className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-5 mb-8 text-left"
                        >
                            <div className="flex items-start gap-3">
                                <HeadphonesIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-[13px] font-bold text-amber-800 mb-1">
                                        Need help completing your purchase?
                                    </h4>
                                    <p className="text-[13px] text-amber-700/80 leading-relaxed">
                                        If you encountered an issue during checkout, our support team
                                        is here to help. Reach out and we&apos;ll get you sorted.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={mounted ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.55, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-3"
                        >
                            <Link
                                href="/subscription-plan-choose"
                                className="flex-1 flex items-center justify-center gap-2 bg-[#0b2447] text-white py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-[#15305a] hover:-translate-y-px shadow-sm active:scale-[0.98]"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </Link>
                            <a
                                href="mailto:hello@stemrn.com"
                                className="flex-1 flex items-center justify-center gap-2 bg-white text-[#0b2447] border border-[rgba(11,36,71,0.16)] py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-[rgba(11,36,71,0.04)] hover:border-[#0b2447] active:scale-[0.98]"
                            >
                                <Mail className="w-4 h-4" />
                                Contact Support
                            </a>
                        </motion.div>

                        {/* Return Link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={mounted ? { opacity: 1 } : {}}
                            transition={{ delay: 0.65, duration: 0.4 }}
                            className="mt-6"
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#4a5568] hover:text-[#0b2447] transition-colors"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Back to Home
                            </Link>
                        </motion.div>
                    </div>
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

export default function PaymentCancelPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#EAEFF4] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#0b2447] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <CancelContent />
        </Suspense>
    );
}
