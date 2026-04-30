"use client";
import { plans } from "@/data";
import Link from "next/link";
import { Check } from "lucide-react";

const Pricing = () => {
    return (
        <section className="w-full overflow-hidden bg-[#EAEFF4]">
            <div className="mx-auto container px-6">

                {/* Hero */}
                <div className="pb-10 pt-20 text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(11,36,71,0.08)] bg-[rgba(11,36,71,0.06)] px-[14px] py-[7px] text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#0B2447]">
                        <span className="h-[6px] w-[6px] rounded-full bg-[#FF6B6B]" />
                        Pricing
                    </div>

                    <h1 className="mx-auto mb-[18px] max-w-[820px] text-2xl font-extrabold leading-[1.08] tracking-[-0.025em] text-[#234C7B] sm:text-3xl md:text-4xl lg:text-[48px]">
                        Choose the plan that fits your{" "}
                        <span className="text-[#FF6B6B]">
                            exam timeline.
                        </span>
                    </h1>

                    <p className="mx-auto max-w-[620px] text-[17px] leading-[1.55] text-[#4A5568]">
                        Every plan includes full access to CARA AI tutor,
                        10,000+ NCLEX questions, 5,000 flashcards,
                        lecture recording, and 13 clinical study tools.
                        No hidden upsells.
                    </p>
                </div>

                {/* Plans */}
                <div className="pb-20">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-[18px]">

                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative flex flex-col rounded-[20px] border p-7 transition-all duration-300 hover:-translate-y-1
                                    
                                    ${plan.featured
                                        ? "border-[#0B2447] bg-[#0B2447] text-white shadow-[0_18px_50px_rgba(11,36,71,0.14),0_6px_20px_rgba(11,36,71,0.06)] xl:-translate-y-[10px]"
                                        : "border-[rgba(11,36,71,0.08)] bg-white text-[#0B2447] shadow-[0_1px_3px_rgba(11,36,71,0.04),0_1px_2px_rgba(11,36,71,0.03)]"
                                    }
                                `}
                            >
                                {plan.badge && (
                                    <div className="absolute left-1/2 top-[-13px] -translate-x-1/2 rounded-full bg-primary px-[14px] py-[7px] text-[10.5px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_6px_16px_rgba(255,107,107,0.35)] whitespace-nowrap">
                                        {plan.badge}
                                    </div>
                                )}

                                {/* Icon */}
                                <div
                                    className={`mb-5 flex h-[44px] w-[44px] items-center justify-center rounded-[12px]
                                        
                                        ${plan.featured
                                            ? "bg-[rgba(255,107,107,0.18)] text-[#FFA3A3]"
                                            : "bg-[#FFE3E3] text-[#FF6B6B]"
                                        }
                                    `}
                                >
                                    {plan.icon}
                                </div>

                                {/* Text */}
                                <span
                                    className={`mb-1 text-[11px] font-semibold uppercase tracking-[0.11em]
                                        
                                        ${plan.featured
                                            ? "text-white/65"
                                            : "text-[#4A5568]"
                                        }
                                    `}
                                >
                                    {plan.kicker}
                                </span>

                                <h3 className="mb-[18px] text-[22px] font-bold leading-[1.2] tracking-[-0.015em]">
                                    {plan.name}
                                </h3>

                                {/* Price */}
                                <div className="flex flex-wrap items-baseline gap-[10px]">
                                    {plan.strikePrice && (
                                        <span className="text-[19px] font-semibold tracking-[-0.015em] opacity-40 line-through">
                                            {plan.strikePrice}
                                        </span>
                                    )}

                                    <span className="text-[46px] font-extrabold leading-none tracking-[-0.03em]">
                                        {plan.price}
                                    </span>

                                    {plan.pricePer && (
                                        <span className="text-[12.5px] font-medium opacity-60">
                                            {plan.pricePer}
                                        </span>
                                    )}
                                </div>

                                <p className="mt-1 text-[12.5px] font-medium opacity-60">
                                    {plan.priceSub}
                                </p>

                                {/* Payment */}
                                <div
                                    className={`mt-[14px] border-y border-dashed py-3 text-[12.5px] leading-normal
                                        
                                        ${plan.featured
                                            ? "border-white/20"
                                            : "border-[rgba(11,36,71,0.08)]"
                                        }
                                    `}
                                >
                                    <div className="mb-[5px] text-[9.5px] font-bold uppercase tracking-[0.14em] opacity-55">
                                        {plan.paymentLabel || "or pay monthly"}
                                    </div>

                                    {plan.paymentText ? (
                                        <div>{plan.paymentText}</div>
                                    ) : (
                                        <div className="flex flex-wrap items-center gap-[6px]">
                                            Starting at{" "}
                                            <span
                                                className={`font-bold
                                                    
                                                    ${plan.featured
                                                        ? "text-[#FFA3A3]"
                                                        : "text-[#FF6B6B]"
                                                    }
                                                `}
                                            >
                                                {plan.paymentAmount}
                                            </span>

                                            with

                                            <div className="ml-[2px] inline-flex items-center gap-[5px]">
                                                <span className="rounded-[5px] bg-[#4A4AF4] px-[7px] py-[3px] text-[9.5px] font-bold text-white">
                                                    affirm
                                                </span>

                                                <span className="rounded-[5px] bg-[#FFA8CD] px-[7px] py-[3px] text-[9.5px] font-bold text-[#17120E]">
                                                    Klarna.
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Button */}
                                <Link
                                    href="#"
                                    className={`my-[18px] block rounded-[12px] border-[1.5px] px-5 py-[13px] text-center text-[14.5px] font-semibold tracking-[-0.005em] transition-all duration-200
                                        
                                        ${plan.featured
                                            ? "border-primary bg-primary text-white hover:bg-primary/80"
                                            : "border-primary bg-transparent text-primary hover:bg-primary/20"
                                        }
                                    `}
                                >
                                    {plan.buttonText}
                                </Link>

                                {/* Features */}
                                <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.11em] opacity-55">
                                    {plan.featured
                                        ? "Everything included"
                                        : "What's included"}
                                </div>

                                <ul className="flex flex-col gap-[10px] text-[13.5px] leading-[1.45]">
                                    {plan.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-[10px]"
                                        >
                                            <span
                                                className={`mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px]
                                                    
                                                    ${plan.featured
                                                        ? "bg-[rgba(255,107,107,0.2)] text-[#FFA3A3]"
                                                        : "bg-[#FFE3E3] text-[#FF6B6B]"
                                                    }
                                                `}
                                            >
                                                <Check className="h-[10px] w-[10px] stroke-3" />
                                            </span>

                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;