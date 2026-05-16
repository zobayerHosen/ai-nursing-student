
import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";


const EmptyCategorySelect = () => {
    return (
        <div className="w-full text-center">
            {/* Animated Icon */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: 1,
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="relative mx-auto mb-8 flex items-center justify-center"
            >
                {/* Background Glow */}
                <div className="absolute h-32 w-32 rounded-full bg-blue-200 blur-3xl opacity-60" />

                {/* Main Icon Container */}
                <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-white shadow-2xl border border-blue-100">
                    <BookOpen className="h-14 w-14 text-[#2C5F8D]" />

                    {/* Floating Spark Icon */}
                    <motion.div
                        animate={{
                            y: [-4, -12, -4],
                            rotate: [0, 10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -top-2 -right-2"
                    >
                        <Sparkles className="h-6 w-6 text-yellow-500" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Content */}
            <div className="space-y-4">
                <h1 className="text-2xl md:text-4xl font-semibold text-[#424242]">
                    No Study Category Selected
                </h1>

                <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-md mx-auto">
                    Please select the study category first, then start
                    your learning journey with interactive flash cards.
                </p>
            </div>

            {/* Decorative Dots */}
            <div className="mt-10 flex items-center justify-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2C5F8D]" />
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
            </div>
        </div>
    );
};

export default EmptyCategorySelect;