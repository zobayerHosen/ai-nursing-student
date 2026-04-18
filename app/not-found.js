"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-primary flex flex-col items-center justify-center text-white p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -left-20 w-80 h-80 bg-white rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-400 rounded-full blur-[120px]"
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl"
        >
          <FiAlertCircle className="w-20 h-20 text-[#FE5E7E]" />
        </motion.div>

        {/* 404 Text */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-8xl md:text-9xl font-black tracking-tighter mb-4 selection:bg-[#FE5E7E]"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Oops! Page not found
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            The page you're looking for might have been moved, deleted, or
            never existed in the first place.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-[#FE5E7E] hover:bg-[#ff4d6e] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-pink-500/25 hover:-translate-y-1 active:scale-95"
          >
            <FiHome className="w-5 h-5" />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all border border-white/10 hover:border-white/20 hover:-translate-y-1 active:scale-95"
          >
            Go Back
          </button>
        </motion.div>
      </div>

      {/* Footer-like subtle text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-sm font-medium tracking-widest uppercase"
      >
        STEMRN &bull; Academic Excellence
      </motion.p>
    </div>
  );
}
