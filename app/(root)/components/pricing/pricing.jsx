"use client";
import { useGetUser } from "@/hooks";
import { useGetSubscriptionPlanData, useSubscriptionPlan } from "@/hooks/subscription-plan";
import toast from "react-hot-toast";
const planIcons = [
    {
        duration: "1 Month",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
            >
                <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
    },
    {
        duration: "3 Months",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
            >
                <rect x="3" y="4" width="18" height="18" rx="3" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
    },
    {
        duration: "12 Months",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
    },
];
const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3 stroke-3">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const PricingPage = () => {
    const { user } = useGetUser();
    const { planDataGet, isLoading, isFetching, isError } = useGetSubscriptionPlanData();
    console.log("🚀 Subscription plan data get----->", planDataGet);
    const { subscriptionPlan, isPending } = useSubscriptionPlan();

    const aiTools = [
        'My Tutor', 'Lecture Notes', 'Notes → Flashcard', 'Notes → Quiz',
        'Research Paper', 'Assignment Checker', 'Care Plan Builder', 'Drug Cards',
        'Charting Coach', 'Labs Interpretation', 'Practical Skills', 'Concept Map'
    ];

    const handleSubscription = (name) => {

        const payload = {
            ...name,
            package: name
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
            }
        });

        console.log("🚀 Plan name detect ------->", name);
    };

    // Note: UI
    return (
        <section id="pricing" className="min-h-screen overflow-x-hidden bg-[#EAEFF4] text-[#0b2447] py-8 md:py-12 lg:py-16">
            <div className="max-w-280 mx-auto px-6 md:px-8">
                {/* Hero Section */}
                <section className="text-center">
                    <div className="inline-flex items-center gap-2 bg-[rgba(11,36,71,0.06)] border border-[rgba(11,36,71,0.08)] py-1.75 px-3.5 rounded-full text-[11.5px] font-semibold tracking-[0.08em] uppercase text-[#0b2447] mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b6b]"></span>
                        Pricing
                    </div>
                    <h1 className="text-[26px] md:text-4xl lg:text-5xl font-extrabold leading-tight md:leading-[1.08] tracking-tight text-[#0b2447] max-w-205 mx-auto mb-4.5">
                        Choose the plan that fits your <span className="text-[#ff6b6b]">exam timeline.</span>
                    </h1>
                    <p className="text-sm lg:text-[17px] text-[#4a5568] max-w-155 mx-auto leading-relaxed">
                        Every plan includes full access to CARA AI tutor, 12,000+ exam-standard Q&amp;A with detailed explanations, 5,000 flashcards, and 12 clinical study tools. No hidden upsells.
                    </p>
                </section>

                {/* Plans Section */}
                <section className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center py-9 md:py-14 xl:py-20">
                        {planDataGet?.map((plan, idx) => {
                            const isFeatured = plan?.is_featured;
                            const currentPlanIcon = planIcons?.find(
                                (item) => item.duration === plan.display_title
                            );

                            return (
                                <div
                                    key={idx}
                                    className={`relative flex flex-col rounded-2xl p-4 md:p-5 xl:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[rgba(11,36,71,0.16)] ${isFeatured
                                        ? 'bg-primary text-white border border-[#0b2447] shadow-lg  hover:-translate-y-3.5'
                                        : 'h-fit bg-white border border-[rgba(11,36,71,0.08)] hover:border-[rgba(11,36,71,0.16)]'
                                        } `}
                                >
                                    {/* Badge */}
                                    {plan?.cta_text && (
                                        <p className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff6b6b] text-white text-[10.5px] font-bold tracking-[0.12em] uppercase py-1.75 px-3.5 rounded-full shadow-[0_6px_16px_rgba(255,107,107,0.35)] whitespace-nowrap">
                                            {plan?.cta_text ?? ""}
                                        </p>
                                    )}

                                    <div
                                        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${plan?.is_featured
                                            ? "bg-[rgba(255,107,107,0.18)] text-[#ffa3a3]"
                                            : "bg-[#ffe3e3] text-[#ff6b6b]"
                                            }`}
                                    >
                                        {currentPlanIcon?.icon}
                                    </div>

                                    {/* Kicker */}
                                    <span className={`text-[11px] font-semibold tracking-[0.11em] uppercase mb-1 ${isFeatured ? 'text-white/65' : 'text-[#4a5568]'}`}>
                                        NCLEX-RN Review
                                    </span>

                                    {/* Name */}
                                    <h5 className="text-[22px] font-bold tracking-tight leading-tight mb-4.5">
                                        {plan?.display_title ?? ""}
                                    </h5>

                                    {/* Price Block */}
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                        <span className="text-[46px] font-extrabold tracking-tighter leading-none">{plan?.price}</span>

                                        <span className="text-[13px] font-medium opacity-60">/ month</span>
                                    </div>
                                    <p className="text-[12.5px] font-medium opacity-60 mt-1.5">
                                        {plan?.price_sub_label ?? ""}
                                    </p>

                                    {/* Payment Sub */}
                                    <div className={`mt-4 py-3 border-t border-dashed ${isFeatured ? 'border-white/20' : 'border-[rgba(11,36,71,0.08)]'}`}>
                                        <p className="text-[9.5px] font-bold tracking-[0.14em] uppercase opacity-55 mb-1">
                                            {plan.display_title === '1 Month' || plan?.display_title === '1Month' ? 'Flexible billing' : 'or pay over time'}
                                        </p>
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            {plan.display_title === '1 Month' || plan?.display_title === '1Month' ? (
                                                <span className="font-medium text-sm">Billed monthly · cancel in dashboard</span>
                                            ) : (
                                                <>
                                                    <span>Split <span className={`font-semibold text-sm ${isFeatured ? 'text-[#ffa3a3]' : 'text-[#ff6b6b]'}`}>{plan?.billing_note ?? ""}</span> with</span>
                                                    <div className="inline-flex items-center gap-1">
                                                        <span className="inline-flex items-center h-4.5 px-2 rounded bg-[#4a4af4] text-white font-bold text-[9.5px] tracking-tight whitespace-nowrap">affirm</span>
                                                        <span className="inline-flex items-center h-4.5 px-2 rounded bg-[#ffa8cd] text-[#17120e] font-bold text-[9.5px] tracking-tight whitespace-nowrap">Klarna.</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Subscription Get Button */}
                                    <button
                                        onClick={() => handleSubscription(plan?.name)}
                                        disabled={isPending}
                                        className={`cursor-pointer block text-center py-3 px-5 rounded-xl font-semibold text-sm mt-5 mb-6 transition-all duration-200 ${isFeatured
                                            ? 'bg-[#ff6b6b] text-white border border-[#ff6b6b] shadow-[0_4px_14px_rgba(255,107,107,0.18)] hover:bg-[#ff5252] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(255,107,107,0.28)]'
                                            : 'bg-transparent text-[#0b2447] border border-[rgba(11,36,71,0.16)] hover:bg-[rgba(11,36,71,0.04)] hover:border-[#0b2447]'
                                            } ${isPending ? "opacity-50 cursor-not-allowed" : ""} `}
                                    >
                                        {isPending ? "Please Wait..." :
                                            user?.subscription?.package === "package-1" ? "Active Plan" :
                                                plan?.badge_text ?? ""
                                        }
                                    </button>

                                    {/* Features Label */}
                                    <p className="text-[11px] font-bold tracking-[0.11em] uppercase mb-3 opacity-55">
                                        What&apos;s included
                                    </p>

                                    {/* Features List */}
                                    <ul className="flex flex-col gap-2.5 text-[13.5px] leading-snug">
                                        {plan?.features
                                            ?.filter(Boolean)
                                            ?.map((feature, idx) => {

                                                const isCaraTutor = feature === "CARA AI tutor";
                                                const isAiTools = feature === "All 12 AI clinical tools";

                                                return (
                                                    <li
                                                        key={idx}
                                                        className={`flex gap-2.5`}
                                                    >

                                                        <span
                                                            className={`shrink-0 w-4.5 h-4.5 rounded flex items-center justify-center mt-0.5 ${isFeatured
                                                                ? "bg-[rgba(255,107,107,0.2)] text-[#ffa3a3]"
                                                                : "bg-[#ffe3e3] text-[#ff6b6b]"
                                                                }`}
                                                        >
                                                            <CheckIcon />
                                                        </span>

                                                        <div className="flex-1">
                                                            <span className="font-semibold">
                                                                {feature}
                                                            </span>

                                                            {/* CARA AI Tutor Description */}
                                                            {isCaraTutor && (
                                                                <p className="text-[11.5px] leading-relaxed mt-1 opacity-70 font-normal">
                                                                    Your 24/7 clinical reasoning coach — explains the why, drills your weak spots, and breaks down NGN cases step-by-step.
                                                                </p>
                                                            )}

                                                            {/* AI Tools Grid */}
                                                            {isAiTools && (
                                                                <div className="grid grid-cols-2 gap-1 gap-x-2.5 mt-2 text-[11.5px] leading-tight opacity-75">
                                                                    {aiTools.map((tool) => (
                                                                        <span
                                                                            key={tool}
                                                                            className="relative pl-2.5 before:absolute before:left-0 before:top-1.5 before:w-1 before:h-1 before:rounded-full before:bg-current  before:opacity-50"
                                                                        >
                                                                            {tool}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer note */}
                    <div className="text-center text-[13px] opacity-60 leading-relaxed">
                        <strong className="text-[#0b2447] font-semibold">All plans include a 7-day free trial</strong> with full access to your Q&amp;A bank, flashcards, study notes, and lecture notes upload. CARA AI tutor and clinical tools are included with daily usage limits during the trial; the 5 Next Gen NCLEX simulation tests unlock after you subscribe. No credit card required to start.<br />
                        Affirm and Klarna payment plans are available on 3-month and 12-month plans, subject to eligibility — checking eligibility does <strong>not</strong> affect your credit score.
                    </div>
                </section>
            </div>
        </section>
    );
};
export default PricingPage;