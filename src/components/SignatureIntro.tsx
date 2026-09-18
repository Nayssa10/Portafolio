"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SignatureIntroProps {
  onComplete?: () => void;
  name?: string;
  subtitle?: string;
}

export default function SignatureIntro({
  onComplete,
  name = "Nayssa Chu",
  subtitle = "Diseño UX/UI · Desarrollo Front-End",
}: SignatureIntroProps) {
  const [isDone, setIsDone] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    // 1. Signature writes for ~2.6s
    const subTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 2200);

    // 2. Intro finishes and dissolves after 3.8s
    const finishTimer = setTimeout(() => {
      setIsDone(true);
      if (onComplete) {
        setTimeout(onComplete, 700);
      }
    }, 3800);

    return () => {
      clearTimeout(subTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsDone(true);
    if (onComplete) {
      setTimeout(onComplete, 400);
    }
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="signature-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#140507] via-[#1a060a] to-[#120305] text-[#EEE4DA] px-6 select-none overflow-hidden"
        >
          {/* Ambient Luxury Atmospheric Glows */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#4D0E13]/35 blur-[120px] pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#D8C4AC]/10 blur-[80px] pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-8 right-8 text-xs font-mono uppercase tracking-widest text-[#D8C4AC]/60 hover:text-[#EEE4DA] transition-colors px-3 py-1.5 rounded-full border border-[#D8C4AC]/20 hover:border-[#D8C4AC]/40 backdrop-blur-md cursor-pointer z-20"
          >
            Saltar
          </button>

          {/* Main Signature Container */}
          <div className="relative w-full max-w-2xl flex flex-col items-center justify-center text-center">
            {/* SVG Signature Write-On Canvas */}
            <svg
              viewBox="0 0 700 240"
              className="w-full max-w-[620px] h-auto overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glow Filter */}
                <filter id="sig-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Linear Gradient for ink */}
                <linearGradient id="sig-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EEE4DA" />
                  <stop offset="50%" stopColor="#D8C4AC" />
                  <stop offset="100%" stopColor="#C8A49F" />
                </linearGradient>

                {/* Animated Reveal Mask for the text */}
                <mask id="write-mask">
                  <motion.path
                    d="M 50 110 Q 120 70, 180 110 T 300 110 T 420 110 T 560 110 T 660 110"
                    fill="none"
                    stroke="white"
                    strokeWidth="110"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.1, ease: [0.45, 0, 0.25, 1] }}
                  />
                </mask>
              </defs>

              {/* Masked Signature Text */}
              <g mask="url(#write-mask)">
                <text
                  x="50%"
                  y="125"
                  textAnchor="middle"
                  fill="url(#sig-gradient)"
                  filter="url(#sig-glow)"
                  className="font-dancing"
                  style={{
                    fontSize: "82px",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                  }}
                >
                  {name}
                </text>
              </g>

              {/* Real SVG Handwriting Calligraphic Stroke (Nayssa Chu flourish underline) */}
              <motion.path
                d="M 120 155 C 220 168, 380 172, 540 148 C 580 142, 605 130, 585 145 C 550 170, 360 185, 230 180 C 180 178, 150 172, 175 168 C 220 160, 480 162, 565 164"
                stroke="url(#sig-gradient)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#sig-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2.0,
                  delay: 0.5,
                  ease: [0.33, 1, 0.68, 1],
                }}
              />

              {/* Sparkle star at the flourish tip */}
              <motion.circle
                cx="565"
                cy="164"
                r="3"
                fill="#EEE4DA"
                filter="url(#sig-glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.8, 1], opacity: [0, 1, 0.8] }}
                transition={{ delay: 2.4, duration: 0.5 }}
              />
            </svg>

            {/* Subtitle & Role Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-4 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D8C4AC]/70" />
              <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#D8C4AC]/90 uppercase font-light">
                {subtitle}
              </p>
              <Sparkles className="w-3.5 h-3.5 text-[#D8C4AC]/70" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
