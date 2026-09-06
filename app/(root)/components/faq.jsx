
"use client";
import { HelpCircle } from "lucide-react";
import { faqSections } from "@/data";
import { useGetFaq } from "@/hooks";

const FAQ = () => {
    const { faqData, isError } = useGetFaq();

    // Normalize API data to match the static structure
    const apiSections = (faqData ?? []).map((section) => ({
        id: section.id,
        title: section.name,
        description: section.description,
        icon: section.icon || <HelpCircle />,
        faqs: section.items,
    }));

    // Use API data if available and no error, otherwise use static faqSections as fallback
    const sections = !isError && apiSections.length > 0 ? apiSections : faqSections;

    const categoryLinks = sections.map((section) => ({
        id: section.id,
        title: section.title,
    }));

    return (
        <section id="faq" className="w-full overflow-hidden bg-[#f7f4ef] text-[#0b2447] pb-16 md:pb-24">
            <div className="mx-auto max-w-275 px-6">
                {/* Hero */}
                <div className="pb-8 xl:pb-10 pt-10 md:pt-14 lg:pt-20 xl:pt-30 text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(11,36,71,0.08)] bg-[rgba(11,36,71,0.06)] px-4 py-1.75 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#0b2447]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]" />
                        Frequently Asked Questions
                    </div>

                    <h1 className="mx-auto mb-5 max-w-205 text-[26px] md:text-4xl lg:text-[42px] xl:text-5xl font-extrabold leading-[1.08] tracking-[-0.025em] text-[#234C7B]">
                        Everything you need to know about {" "}
                        <span className="text-[#ff6b6b]">STEMRN.</span>
                    </h1>

                    <p className="mx-auto max-w-155 text-sm lg:text-[17px] leading-[1.55] text-[#4a5568]">
                        Answers to the most common questions from nursing students,
                        educators, and curious minds.
                    </p>
                </div>

                {/* Category Navigation */}
                <div className="mb-6 md:mb-10 xl:mb-15 flex flex-wrap items-center justify-center gap-2">
                    {categoryLinks.map((category) => (
                        <a
                            key={category.id}
                            href={`#${category.id}`}
                            className="inline-flex items-center gap-1 rounded-full border border-[rgba(11,36,71,0.08)] bg-white px-4 py-2.25 text-[13.5px] font-medium text-[#0b2447] shadow-[0_1px_3px_rgba(11,36,71,0.04),0_1px_2px_rgba(11,36,71,0.03)] transition-all duration-200 hover:-translate-y-px hover:border-[#ff6b6b] hover:text-[#ff6b6b]"
                        >
                            {category?.title ?? ""}
                        </a>
                    ))}
                </div>

                {/* FAQ Sections */}
                <div className="space-y-8 lg:space-y-16">
                    {sections?.map((section) => (
                        <div key={section.id} id={section.id}>
                            <div className="mb-6 flex items-center gap-3 md:gap-4 border-b-2 border-[rgba(11,36,71,0.08)] pb-5">
                                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-[#ffe3e3] text-[#ff6b6b] shrink-0">
                                    {section?.icon}
                                </div>

                                <div>
                                    <h2 className="mb-1 text-lg lg:text-[26px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0b2447]">
                                        {section?.title ?? ""}
                                    </h2>

                                    <p className="text-sm leading-[1.4] text-[#4a5568]">
                                        {section?.description ?? ""}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                {section?.faqs?.map((faq, index) => (
                                    <details
                                        key={index}
                                        className="group overflow-hidden rounded-[14px] border border-[rgba(11,36,71,0.08)] bg-white shadow-[0_1px_3px_rgba(11,36,71,0.04),0_1px_2px_rgba(11,36,71,0.03)] transition-all duration-200 hover:border-[rgba(11,36,71,0.16)] hover:shadow-[0_4px_20px_rgba(11,36,71,0.06),0_2px_6px_rgba(11,36,71,0.04)] open:border-[#ff6b6b] open:shadow-[0_8px_32px_rgba(255,107,107,0.1)]"
                                    >
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-semibold leading-[1.4] tracking-[-0.005em] text-[#0b2447]">
                                            {faq?.question ?? ""}

                                            <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ffe3e3] transition-transform duration-300 group-open:rotate-180">
                                                <span className="absolute h-0.5 w-3 bg-[#ff6b6b]" />
                                                <span className="absolute h-3 w-0.5 bg-[#ff6b6b] group-open:hidden" />
                                            </div>
                                        </summary>

                                        <div className="px-6 pb-6 text-[15px] leading-[1.7] text-[#4a5568]">
                                            <p>{faq?.answer ?? ""}</p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default FAQ;