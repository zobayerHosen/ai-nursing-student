import Link from "next/link";

const CTA = () => {
    return (
        <section className="w-full bg-white py-20 px-4">
            <div className="w-full max-w-[832px] mx-auto bg-[#14213D] rounded-2xl px-6 md:px-12 py-14 text-center shadow-lg">

                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Still have{" "}
                    <span className="text-[#FE5E7E]">questions?</span>
                </h2>

                <p className="mt-5 text-sm text-[#94A3B8] leading-5 max-w-md mx-auto">
                    If you couldn't find what you're looking for here, reach out directly.
                    The team (yes, actual humans) responds to every message.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mt-8 bg-[#FE5E7E] hover:bg-pink-400 transition-all duration-300 text-white font-semibold text-sm px-7 py-3 rounded-lg"
                >
                    Email Us
                    <span className="text-lg">→</span>
                </Link>
            </div>
        </section>
    );
};

export default CTA;