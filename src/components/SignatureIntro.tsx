"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SignatureIntroProps {
  onComplete?: () => void;
  subtitle?: string;
  name?: string;
}

// Letter definitions with relative horizontal offsets and handwriting timings
const LINE1_LETTERS = [
  { char: "N", x: 235, y: 110 },
  { char: "a", x: 275, y: 112 },
  { char: "y", x: 315, y: 118 },
  { char: "s", x: 355, y: 112 },
  { char: "s", x: 390, y: 112 },
  { char: "a", x: 425, y: 112 },
  { char: " ", x: 460, y: 112 },
  { char: "C", x: 495, y: 108 },
  { char: "h", x: 540, y: 108 },
  { char: "u", x: 580, y: 112 },
];

const LINE2_LETTERS = [
  { char: "B", x: 245, y: 195 },
  { char: "u", x: 285, y: 198 },
  { char: "s", x: 320, y: 198 },
  { char: "t", x: 355, y: 194 },
  { char: "a", x: 390, y: 198 },
  { char: "m", x: 435, y: 198 },
  { char: "a", x: 480, y: 198 },
  { char: "n", x: 520, y: 198 },
  { char: "t", x: 555, y: 194 },
  { char: "e", x: 585, y: 198 },
];

export default function SignatureIntro({
  onComplete,
  subtitle = "Diseño UX/UI · Desarrollo Front-End",
}: SignatureIntroProps) {
  const [isDone, setIsDone] = useState(false);
  const [line1Count, setLine1Count] = useState(0);
  const [line2Count, setLine2Count] = useState(0);
  const [drawFlourish, setDrawFlourish] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  // Pen coordinates and state
  const [penPos, setPenPos] = useState({ x: 200, y: 100, angle: -35, opacity: 0 });
  const [penWriting, setPenWriting] = useState(false);

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    // --- PHASE 1: Write "Nayssa Chu" (calm, steady handwriting speed) ---
    // Pen arrives at 'N'
    timers.push(
      setTimeout(() => {
        setPenPos({ x: LINE1_LETTERS[0].x, y: LINE1_LETTERS[0].y, angle: -32, opacity: 1 });
        setPenWriting(true);
      }, 350)
    );

    let currentTime = 450;
    LINE1_LETTERS.forEach((item, index) => {
      const letterDuration = item.char === " " ? 80 : 200;
      currentTime += letterDuration;

      timers.push(
        setTimeout(() => {
          setLine1Count(index + 1);
          setPenPos({
            x: item.x + (item.char === " " ? 15 : 22),
            y: item.y + (index % 2 === 0 ? -4 : 3),
            angle: -30 + (index % 3) * 3,
            opacity: 1,
          });
        }, currentTime)
      );
    });

    // --- PHASE 2: Pen lifts slightly and moves to "Bustamante" ---
    currentTime += 250;
    timers.push(
      setTimeout(() => {
        setPenPos((prev) => ({ ...prev, y: prev.y - 20, opacity: 0.7 }));
      }, currentTime)
    );

    currentTime += 200;
    timers.push(
      setTimeout(() => {
        setPenPos({ x: LINE2_LETTERS[0].x, y: LINE2_LETTERS[0].y, angle: -32, opacity: 1 });
      }, currentTime)
    );

    // --- PHASE 3: Write "Bustamante" letter by letter ---
    LINE2_LETTERS.forEach((item, index) => {
      const letterDuration = 180;
      currentTime += letterDuration;

      timers.push(
        setTimeout(() => {
          setLine2Count(index + 1);
          setPenPos({
            x: item.x + 20,
            y: item.y + (index % 2 === 0 ? -3 : 2),
            angle: -30 + (index % 2) * 4,
            opacity: 1,
          });
        }, currentTime)
      );
    });

    // --- PHASE 4: Draw Signature Underline Flourish ---
    currentTime += 200;
    timers.push(
      setTimeout(() => {
        setDrawFlourish(true);
        // Pen sweeps down and traces underline
        setPenPos({ x: 210, y: 242, angle: -28, opacity: 1 });
      }, currentTime)
    );

    // Pen glides along the underline
    currentTime += 300;
    timers.push(
      setTimeout(() => {
        setPenPos({ x: 420, y: 246, angle: -25, opacity: 1 });
      }, currentTime)
    );

    currentTime += 400;
    timers.push(
      setTimeout(() => {
        setPenPos({ x: 630, y: 240, angle: -20, opacity: 1 });
      }, currentTime)
    );

    // --- PHASE 5: Pen lifts up and vanishes with sparkle ---
    currentTime += 300;
    timers.push(
      setTimeout(() => {
        setPenPos((prev) => ({ ...prev, y: prev.y - 40, opacity: 0 }));
        setPenWriting(false);
        setShowSubtitle(true);
      }, currentTime)
    );

    // --- PHASE 6: Transition smoothly into Portfolio ---
    currentTime += 1600;
    timers.push(
      setTimeout(() => {
        setIsDone(true);
        if (onComplete) {
          setTimeout(onComplete, 700);
        }
      }, currentTime)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsDone(true);
    if (onComplete) {
      setTimeout(onComplete, 350);
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
          onClick={handleSkip}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#140507] via-[#1a060a] to-[#120305] text-[#EEE4DA] px-4 select-none overflow-hidden cursor-pointer"
        >
          {/* Ambient Luxury Atmospheric Glows */}
          <div className="absolute w-[650px] h-[650px] rounded-full bg-[#4D0E13]/35 blur-[140px] pointer-events-none" />
          <div className="absolute w-[450px] h-[450px] rounded-full bg-[#D8C4AC]/10 blur-[110px] pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="absolute top-8 right-8 text-xs font-mono uppercase tracking-widest text-[#D8C4AC]/60 hover:text-[#EEE4DA] transition-colors px-3.5 py-1.5 rounded-full border border-[#D8C4AC]/20 hover:border-[#D8C4AC]/40 backdrop-blur-md cursor-pointer z-30"
          >
            Saltar
          </button>

          {/* Main Stage */}
          <div className="relative w-full max-w-4xl flex flex-col items-center justify-center text-center">
            <svg
              viewBox="0 0 800 340"
              className="w-full max-w-[760px] h-auto overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Soft Gold Ink Glow Filter */}
                <filter id="gold-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Ink Gradient */}
                <linearGradient id="ink-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#EEE4DA" />
                  <stop offset="70%" stopColor="#D8C4AC" />
                  <stop offset="100%" stopColor="#C8A49F" />
                </linearGradient>

                {/* Pen Gold Nib Gradient */}
                <linearGradient id="pen-gold" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#EEE4DA" />
                  <stop offset="70%" stopColor="#D8C4AC" />
                  <stop offset="100%" stopColor="#9C7753" />
                </linearGradient>

                {/* Pen Barrel Burgundy Gradient */}
                <linearGradient id="pen-wood" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4D0E13" />
                  <stop offset="60%" stopColor="#22080C" />
                  <stop offset="100%" stopColor="#140507" />
                </linearGradient>
              </defs>

              {/* LINE 1: "Nayssa Chu" written letter by letter */}
              <text
                x="400"
                y="115"
                textAnchor="middle"
                fill="url(#ink-grad)"
                filter="url(#gold-glow)"
                className="font-dancing"
                style={{
                  fontSize: "76px",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                }}
              >
                {LINE1_LETTERS.map((item, idx) => (
                  <tspan
                    key={idx}
                    style={{
                      opacity: idx < line1Count ? 1 : 0,
                      transition: "opacity 0.18s ease-out",
                    }}
                  >
                    {item.char}
                  </tspan>
                ))}
              </text>

              {/* LINE 2: "Bustamante" written letter by letter */}
              <text
                x="400"
                y="198"
                textAnchor="middle"
                fill="url(#ink-grad)"
                filter="url(#gold-glow)"
                className="font-dancing"
                style={{
                  fontSize: "66px",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                }}
              >
                {LINE2_LETTERS.map((item, idx) => (
                  <tspan
                    key={idx}
                    style={{
                      opacity: idx < line2Count ? 1 : 0,
                      transition: "opacity 0.18s ease-out",
                    }}
                  >
                    {item.char}
                  </tspan>
                ))}
              </text>

              {/* UNDERLINE FLOURISH (Drawn after text finishes) */}
              {drawFlourish && (
                <motion.path
                  d="M 210 242 C 340 252, 510 252, 635 238 C 665 234, 678 226, 658 234 C 610 252, 400 262, 280 258 C 235 256, 215 250, 250 248 C 300 244, 540 244, 620 246"
                  stroke="url(#ink-grad)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#gold-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
                />
              )}

              {/* Sparkle star at flourish tip */}
              {showSubtitle && (
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.6, 1], opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <circle cx="620" cy="246" r="3.5" fill="#EEE4DA" filter="url(#gold-glow)" />
                  <line x1="612" y1="246" x2="628" y2="246" stroke="#EEE4DA" strokeWidth="1" />
                  <line x1="620" y1="238" x2="620" y2="254" stroke="#EEE4DA" strokeWidth="1" />
                </motion.g>
              )}

              {/* WET INK GLOW AT PEN TIP */}
              {penWriting && (
                <circle
                  cx={penPos.x}
                  cy={penPos.y}
                  r="5"
                  fill="#FFFFFF"
                  filter="url(#gold-glow)"
                  opacity={penPos.opacity * 0.8}
                  style={{ transition: "cx 0.18s ease-out, cy 0.18s ease-out" }}
                />
              )}

              {/* REAL CALLIGRAPHY FOUNTAIN PEN (Follows the letters in real time) */}
              <g
                style={{
                  transform: `translate(${penPos.x}px, ${penPos.y}px) rotate(${penPos.angle}deg)`,
                  opacity: penPos.opacity,
                  transition:
                    "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease",
                  transformOrigin: "0px 0px",
                  pointerEvents: "none",
                }}
              >
                {/* Wet ink bloom around nib tip */}
                <circle cx="0" cy="0" r="6" fill="#EEE4DA" opacity="0.5" filter="url(#gold-glow)" />

                {/* Golden Calligraphy Nib (Point exactly at 0, 0) */}
                <path
                  d="M 0 0 L -5 -15 L -7 -34 L 7 -34 L 5 -15 Z"
                  fill="url(#pen-gold)"
                  stroke="#EEE4DA"
                  strokeWidth="0.8"
                />
                {/* Nib ink slit and breather hole */}
                <line x1="0" y1="0" x2="0" y2="-20" stroke="#3D0B0F" strokeWidth="1" />
                <circle cx="0" cy="-20" r="1.4" fill="#3D0B0F" />

                {/* Pen Collar / Gold Band */}
                <rect
                  x="-7"
                  y="-44"
                  width="14"
                  height="10"
                  rx="1.5"
                  fill="#4D0E13"
                  stroke="#D8C4AC"
                  strokeWidth="0.8"
                />

                {/* Pen Barrel (Burgundy and gold luxury body) */}
                <path
                  d="M -6 -44 L -4.5 -140 C -4.5 -155, 4.5 -155, 4.5 -140 L 6 -44 Z"
                  fill="url(#pen-wood)"
                  stroke="#D8C4AC"
                  strokeWidth="1"
                />

                {/* Feather Quill / Flutes Accent */}
                <path
                  d="M 0 -60 Q 18 -95, 6 -135 Q 1 -90, 0 -60"
                  fill="#D8C4AC"
                  opacity="0.35"
                />
                <path
                  d="M 0 -75 Q -14 -105, -3 -130 Q 0 -95, 0 -75"
                  fill="#EEE4DA"
                  opacity="0.25"
                />

                {/* Top Finial Gold Crown */}
                <circle cx="0" cy="-144" r="3.5" fill="url(#pen-gold)" stroke="#D8C4AC" strokeWidth="0.5" />
              </g>
            </svg>

            {/* Subtitle with soft fade in */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-4 flex items-center justify-center gap-2.5"
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
