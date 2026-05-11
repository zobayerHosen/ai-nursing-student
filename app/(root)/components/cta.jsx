const CTA = () => {
    return (
        <div className="relative w-full sm:max-w-[95%] md:max-w-275 mx-auto mb-12 mt-8 overflow-hidden rounded-[20px] bg-[#0b2447] py-10 text-center text-white sm:mb-16 sm:mt-9 sm:rounded-[22px] sm:py-12 md:mb-20 md:mt-10 md:rounded-3xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,107,107,0.14),transparent_50%)]" />

            <div className="relative z-10 px-4">
                <h2 className="mb-3 text-[26px] font-extrabold leading-[1.2] tracking-[-0.025em] sm:mb-3.5 sm:text-[30px] md:mb-4 md:text-[34px] lg:text-[38px]">
                    Still have <span className="text-[#ffa3a3]">questions?</span>
                </h2>

                <p className="mx-auto mb-6 w-full text-[14px] leading-normal text-white/80 sm:mb-6.5 sm:max-w-[95%] sm:text-[15px] md:mb-7 md:max-w-120 md:text-[15.5px] lg:text-[16px]">
                    If you couldn&apos;t find what you&apos;re looking for here,
                    reach out directly.
                </p>

                <a
                    href="mailto:hello@stemrn.com"
                    className="inline-flex items-center rounded-lg px-6 py-3 text-[14px] font-semibold text-white shadow-[0_6px_20px_rgba(255,107,107,0.3)] transition-all duration-200 hover:-translate-y-px hover:bg-[#ff5252] hover:shadow-[0_10px_28px_rgba(255,107,107,0.4)] sm:rounded-xl sm:px-7 sm:py-3 sm:text-[14.5px] md:px-8 md:py-3.5 md:text-[15px]"
                    style={{ backgroundColor: '#ff6b6b' }}
                >
                    Email Us →
                </a>
            </div>
        </div>
    );
};
export default CTA;