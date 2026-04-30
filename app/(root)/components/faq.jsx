
"use client";
import { faqSections } from "@/data";
import CTA from "./cta";

const categoryLinks = faqSections.map((section) => ({
    id: section.id,
    title: section.title,
}));

const FAQ = () => {
    return (
        <section className="w-full overflow-hidden bg-[#f7f4ef] text-[#0b2447]">
            <div className="mx-auto max-w-[1100px] px-6">
                {/* Hero */}
                <div className="pb-12 pt-20 text-center md:pb-14 md:pt-24">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(11,36,71,0.08)] bg-[rgba(11,36,71,0.06)] px-4 py-[7px] text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#0b2447]">
                        <span className="h-[6px] w-[6px] rounded-full bg-[#ff6b6b]" />
                        Frequently Asked Questions
                    </div>

                    <h1 className="mx-auto mb-5 max-w-[820px] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-extrabold leading-[1.08] tracking-[-0.025em] text-[#234C7B]">
                        Everything you need to know about {" "}
                        <span className="text-[#ff6b6b]">STEMRN.</span>
                    </h1>

                    <p className="mx-auto max-w-[620px] text-[17px] leading-[1.55] text-[#4a5568]">
                        Answers to the most common questions from nursing students,
                        educators, and curious minds.
                    </p>
                </div>

                {/* Category Navigation */}
                <div className="mb-[60px] flex flex-wrap items-center justify-center gap-2 px-3">
                    {categoryLinks.map((category) => (
                        <a
                            key={category.id}
                            href={`#${category.id}`}
                            className="inline-flex items-center gap-1 rounded-full border border-[rgba(11,36,71,0.08)] bg-white px-4 py-[9px] text-[13.5px] font-medium text-[#0b2447] shadow-[0_1px_3px_rgba(11,36,71,0.04),0_1px_2px_rgba(11,36,71,0.03)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#ff6b6b] hover:text-[#ff6b6b]"
                        >
                            {category.title}
                        </a>
                    ))}
                </div>

                {/* FAQ Sections */}
                <div className="space-y-16">
                    {faqSections.map((section) => (
                        <div key={section.id} id={section.id} className="scroll-mt-5">
                            <div className="mb-6 flex items-center gap-4 border-b-2 border-[rgba(11,36,71,0.08)] pb-5">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffe3e3] text-[#ff6b6b]">
                                    {section.icon}
                                </div>

                                <div>
                                    <h2 className="mb-1 text-[26px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0b2447]">
                                        {section.title}
                                    </h2>

                                    <p className="text-sm leading-[1.4] text-[#4a5568]">
                                        {section.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                {section.faqs.map((faq, index) => (
                                    <details
                                        key={index}
                                        className="group overflow-hidden rounded-[14px] border border-[rgba(11,36,71,0.08)] bg-white shadow-[0_1px_3px_rgba(11,36,71,0.04),0_1px_2px_rgba(11,36,71,0.03)] transition-all duration-200 hover:border-[rgba(11,36,71,0.16)] hover:shadow-[0_4px_20px_rgba(11,36,71,0.06),0_2px_6px_rgba(11,36,71,0.04)] open:border-[#ff6b6b] open:shadow-[0_8px_32px_rgba(255,107,107,0.1)]"
                                    >
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-semibold leading-[1.4] tracking-[-0.005em] text-[#0b2447]">
                                            {faq.question}

                                            <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ffe3e3] transition-transform duration-300 group-open:rotate-180">
                                                <span className="absolute h-[2px] w-3 bg-[#ff6b6b]" />
                                                <span className="absolute h-3 w-[2px] bg-[#ff6b6b] group-open:hidden" />
                                            </div>
                                        </summary>

                                        <div className="px-6 pb-6 text-[15px] leading-[1.7] text-[#4a5568]">
                                            <p>{faq.answer}</p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <CTA/>
            </div>
        </section>
    );
};

export default FAQ;
