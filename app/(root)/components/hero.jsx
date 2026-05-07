import Image from "next/image";
import heroImage from "@/public/assets/heroImg.png";
import Link from "next/link";
import { Play } from "lucide-react";

const Hero = () => {
    return (
        <section className="w-full bg-primary">
            <div className="flex min-h-screen flex-col overflow-hidden lg:flex-row">

                {/* Left Content */}
                <div className="flex w-full flex-col justify-center px-6 py-16 sm:px-10 lg:w-1/2 lg:px-[100px] container mx-auto">

                    {/* Badge */}
                    <div className="mb-8 inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-4.5 py-2.5 backdrop-blur-sm">
                        <span className="text-[15px] font-semibold uppercase tracking-[0.5px] text-white/95">
                            NEXT-GEN NCLEX PREP PLATFORM
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="max-w-[620px] text-6xl font-bold leading-[1.05] tracking-[-2px] text-white/95">
                        Pass NCLEX on Your First Attempt. Guaranteed.
                    </h1>

                    {/* Description */}
                    <p className="mt-8 max-w-[540px] text-[19px] leading-[1.8] text-white/90">
                        STEMRN combines 5,000+ NGN-style questions, CARA
                        your AI tutor, adaptive flashcards, and real-time lab
                        interpretation — everything you need, in one intelligent
                        platform.
                    </p>

                    {/* Buttons */}
                    <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                        <Link href={"/auth"} className="cursor-pointer rounded-[8px] bg-[#FF5B7F] px-8 py-3 text-[20px] font-semibold text-white transition hover:opacity-90">
                            Start Free Today
                        </Link>

                        <button className="cursor-pointer rounded-[8px] border border-white/60 bg-transparent px-8 py-3 text-[20px] font-semibold text-white transition hover:bg-white hover:text-[#366796]">
                            See How It Works
                        </button>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative flex w-full items-end justify-end lg:w-1/2 pt-14">
                    <div className="relative h-[500px] w-full sm:h-[650px] lg:h-screen">
                        <Image
                            src={heroImage}
                            alt="Hero Dashboard"
                            fill
                            priority
                            className="object-cover object-top-left"
                        />
                    </div>


                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-primary flex items-center justify-center size-16 rounded-full pointer-events-none text-white"> <Play className="w-7 h-7"/></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Hero;