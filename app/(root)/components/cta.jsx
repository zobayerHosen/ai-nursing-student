const CTA = () => {
    return (
        <div className="relative w-full max-w-[1100px] mx-auto mb-20 mt-10 overflow-hidden rounded-[24px] bg-[#0b2447] px-6 py-14 text-center text-white md:px-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,107,107,0.14),transparent_50%)]" />

            <div className="relative z-10">
                <h2 className="mb-4 text-[32px] font-extrabold leading-[1.15] tracking-[-0.025em] md:text-[38px]">
                    Still have <span className="text-[#ffa3a3]">questions?</span>
                </h2>

                <p className="mx-auto mb-7 max-w-[480px] text-[15.5px] leading-[1.55] text-white/80">
                    If you couldn’t find what you’re looking for here,
                    reach out directly.
                </p>

                <a
                    href="mailto:hello@stemrn.com"
                    className="inline-flex items-center rounded-xl bg-[#ff6b6b] px-8 py-[14px] text-[15px] font-semibold text-white shadow-[0_6px_20px_rgba(255,107,107,0.3)] transition-all duration-200 hover:-translate-y-px hover:bg-[#ff5252] hover:shadow-[0_10px_28px_rgba(255,107,107,0.4)]"
                >
                    Email Us →
                </a>
            </div>
        </div>
    );
};
export default CTA;