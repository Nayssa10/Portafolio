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
  name = "Nayssa Chu Bustamante",
  subtitle = "Diseño UX/UI · Desarrollo Front-End",
}: SignatureIntroProps) {
  const [isDone, setIsDone] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    // 1. Reveal subtitle after writing finishes
    const subTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 3200);

    // 2. Dissolve intro after user has enjoyed the animation
    const finishTimer = setTimeout(() => {
      setIsDone(true);
      if (onComplete) {
        setTimeout(onComplete, 700);
      }
    }, 4500);

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
          exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#140507] via-[#1a060a] to-[#120305] text-[#EEE4DA] px-4 select-none overflow-hidden"
        >
          {/* Ambient Luxury Atmospheric Glows */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#4D0E13]/35 blur-[140px] pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#D8C4AC]/10 blur-[100px] pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-8 right-8 text-xs font-mono uppercase tracking-widest text-[#D8C4AC]/60 hover:text-[#EEE4DA] transition-colors px-3.5 py-1.5 rounded-full border border-[#D8C4AC]/20 hover:border-[#D8C4AC]/40 backdrop-blur-md cursor-pointer z-30"
          >
            Saltar
          </button>

          {/* Main Signature Stage */}
          <div className="relative w-full max-w-4xl flex flex-col items-center justify-center text-center">
            <svg
              viewBox="0 0 1000 280"
              className="w-full max-w-[860px] h-auto overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glow Filter */}
                <filter id="sig-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Ink Gradient */}
                <linearGradient id="sig-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#EEE4DA" />
                  <stop offset="65%" stopColor="#D8C4AC" />
                  <stop offset="100%" stopColor="#C8A49F" />
                </linearGradient>

                {/* Pen Gold Nib Gradient */}
                <linearGradient id="pen-nib-gold" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EEE4DA" />
                  <stop offset="50%" stopColor="#D8C4AC" />
                  <stop offset="100%" stopColor="#9C7753" />
                </linearGradient>

                {/* Pen Body Dark Gradient */}
                <linearGradient id="pen-body" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4D0E13" />
                  <stop offset="60%" stopColor="#22080C" />
                  <stop offset="100%" stopColor="#140507" />
                </linearGradient>

                {/* Progressive Reveal Mask synchronized with the pen */}
                <mask id="pen-write-mask">
                  <motion.rect
                    x="100"
                    y="40"
                    height="130"
                    fill="white"
                    initial={{ width: 0 }}
                    animate={{ width: 800 }}
                    transition={{
                      duration: 2.1,
                      ease: [0.35, 0.05, 0.25, 0.95],
                      delay: 0.2,
                    }}
                  />
                </mask>
              </defs>

              {/* 1. MASKED SIGNATURE TEXT (Writes letter-by-letter) */}
              <g mask="url(#pen-write-mask)">
                <text
                  x="500"
                  y="130"
                  textAnchor="middle"
                  fill="url(#sig-gradient)"
                  filter="url(#sig-glow)"
                  className="font-dancing"
                  style={{
                    fontSize: "64px",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  {name}
                </text>
              </g>

              {/* 2. SIGNATURE UNDERLINE FLOURISH (Draws after the name is written) */}
              <motion.path
                d="M 220 178 C 360 190, 580 192, 760 172 C 800 167, 820 156, 795 168 C 740 192, 470 205, 320 198 C 260 195, 230 188, 275 184 C 340 178, 640 180, 740 182"
                stroke="url(#sig-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#sig-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 2.3,
                  ease: [0.25, 1, 0.5, 1],
                }}
              />

              {/* 3. FLOURISH SPARKLE */}
              <motion.circle
                cx="740"
                cy="182"
                r="3.5"
                fill="#EEE4DA"
                filter="url(#sig-glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.8, 1], opacity: [0, 1, 0.9] }}
                transition={{ delay: 3.3, duration: 0.4 }}
              />

              {/* 4. THE CALLIGRAPHY PLUMA (Fountain Pen Writing on Screen) */}
              <motion.g
                initial={{
                  x: 160,
                  y: 125,
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  // Moves along the text, then sweeps to underline, then lifts up and fades away
                  x: [
                    160, 240, 330, 430, 530, 640, 740, 830, // Writing text (0.2s - 2.3s)
                    830, 220,                                // Move to underline start (2.3s - 2.4s)
                    360, 580, 760, 795, 470, 275, 740,       // Tracing underline flourish (2.4s - 3.4s)
                    760                                      // Lift up
                  ],
                  y: [
                    125, 118, 126, 119, 125, 118, 124, 122, // Oscillates with cursive letters
                    122, 178,                                // Down to underline
                    190, 192, 172, 168, 205, 184, 182,       // Underline sweep
                    145                                      // Pen lifts up
                  ],
                  opacity: [
                    0, 1, 1, 1, 1, 1, 1, 1,
                    1, 1,
                    1, 1, 1, 1, 1, 1, 1,
                    0                                        // Dissolves away cleanly
                  ],
                  rotate: [
                    -32, -28, -34, -29, -33, -28, -32, -30,
                    -20, -35,
                    -32, -30, -28, -25, -34, -30, -26,
                    -15
                  ],
                }}
                transition={{
                  duration: 3.5,
                  times: [
                    0, 0.08, 0.18, 0.28, 0.38, 0.48, 0.58, 0.65,
                    0.68, 0.71,
                    0.75, 0.80, 0.84, 0.87, 0.90, 0.93, 0.96,
                    1.0,
                  ],
                  ease: "easeInOut",
                  delay: 0.1,
                }}
              >
                {/* Glowing ink contact point */}
                <circle cx="0" cy="0" r="5" fill="#EEE4DA" opacity="0.6" filter="url(#sig-glow)" />

                {/* Nib (Plumilla dorada de caligrafía) */}
                <path
                  d="M 0 0 L -4.5 -14 L -6.5 -32 L 6.5 -32 L 4.5 -14 Z"
                  fill="url(#pen-nib-gold)"
                  stroke="#EEE4DA"
                  strokeWidth="0.8"
                />
                {/* Ink canal and breather hole */}
                <line x1="0" y1="0" x2="0" y2="-18" stroke="#3D0B0F" strokeWidth="1" />
                <circle cx="0" cy="-18" r="1.3" fill="#3D0B0F" />

                {/* Pen Grip / Collar */}
                <rect
                  x="-6"
                  y="-42"
                  width="12"
                  height="10"
                  rx="1.5"
                  fill="#4D0E13"
                  stroke="#D8C4AC"
                  strokeWidth="0.8"
                />

                {/* Pen Body (Pluma estilográfica elegante) */}
                <path
                  d="M -5.5 -42 L -4 -130 C -4 -145, 4 -145, 4 -130 L 5.5 -42 Z"
                  fill="url(#pen-body)"
                  stroke="#D8C4AC"
                  strokeWidth="1"
                />

                {/* Feather Quill / Pluma accents */}
                <path
                  d="M 0 -55 Q 16 -85, 5 -125 Q 1 -80, 0 -55"
                  fill="#D8C4AC"
                  opacity="0.35"
                />
                <path
                  d="M 0 -70 Q -12 -95, -3 -120 Q 0 -90, 0 -70"
                  fill="#EEE4DA"
                  opacity="0.25"
                />

                {/* Top Finial Gold Accent */}
                <circle cx="0" cy="-134" r="3.5" fill="url(#pen-nib-gold)" stroke="#D8C4AC" strokeWidth="0.5" />
              </motion.g>
            </svg>

            {/* Subtitle & Role Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-2 flex items-center justify-center gap-2.5"
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
