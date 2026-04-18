"use client";

import { motion } from "framer-motion";

export default function ScreenLoading() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-primary overflow-hidden">
      {/* Dynamic Background Accents */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Loader Logo/Icon Area */}
        <div className="relative w-24 h-24 mb-8">
          {/* Outer Spinning Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 border-4 border-white/10 border-t-[#FE5E7E] rounded-full"
          />
          
          {/* Inner Pulsing Core */}
          <motion.div
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl"
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </motion.div>
        </div>

        {/* Text Area */}
        <div className="flex flex-col items-center gap-3">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white text-2xl font-bold tracking-[0.2em] uppercase"
          >
            STEMRN
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-white text-sm font-medium">Preparing your experience</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-1 h-1 bg-white rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-px w-full bg-white absolute top-1/4" />
        <div className="h-px w-full bg-white absolute top-3/4" />
        <div className="w-px h-full bg-white absolute left-1/4" />
        <div className="w-px h-full bg-white absolute left-3/4" />
      </div>
    </div>
  );
}
