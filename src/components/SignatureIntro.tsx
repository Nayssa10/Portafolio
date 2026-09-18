"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SignatureIntroProps {
  onComplete?: () => void;
  name?: string;
  subtitle?: string;
}

// Continuous cursive handwriting path for "Nayssa Chu" with sweeping signature underline flourish
const SIGNATURE_PATH =
  "M 160 135 C 150 120, 155 80, 185 65 C 195 60, 205 75, 200 95 L 190 140 C 195 110, 220 70, 245 65 C 255 62, 260 75, 255 100 L 248 140 C 248 142, 265 140, 280 125 C 275 115, 260 115, 255 125 C 250 135, 260 142, 275 140 L 278 120 L 278 140 C 282 142, 295 138, 305 125 L 305 135 C 308 142, 318 142, 325 135 L 328 120 L 326 175 C 324 190, 310 195, 300 185 C 290 175, 315 155, 335 140 C 345 132, 355 122, 362 118 C 368 115, 372 120, 368 128 C 362 138, 372 142, 380 138 C 390 132, 400 122, 408 118 C 414 115, 418 120, 414 128 C 408 138, 418 142, 426 138 C 435 132, 442 125, 448 120 C 442 115, 430 115, 426 125 C 422 135, 432 142, 445 140 L 448 120 L 448 140 C 455 142, 480 135, 500 120 C 525 90, 515 65, 545 60 C 565 55, 570 75, 555 95 C 530 130, 520 145, 555 140 C 568 138, 580 120, 595 75 C 602 55, 612 55, 608 75 L 598 140 C 602 122, 615 116, 625 122 C 630 126, 630 135, 628 140 C 635 142, 645 138, 652 125 L 652 136 C 655 142, 665 142, 670 136 L 672 125 L 672 140 C 685 142, 730 138, 770 125 C 800 115, 820 100, 805 112 C 760 145, 450 178, 260 182 C 170 184, 130 175, 175 168 C 240 158, 620 162, 760 166 C 795 167, 815 162, 800 170";

export default function SignatureIntro({
  onComplete,
  subtitle = "Diseño UX/UI · Desarrollo Front-End",
}: SignatureIntroProps) {
  const [isDone, setIsDone] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  const pathRef = useRef<SVGPathElement | null>(null);
  const glowPathRef = useRef<SVGPathElement | null>(null);
  const penRef = useRef<SVGGElement | null>(null);
  const inkPointRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    const glowPath = glowPathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    if (glowPath) {
      glowPath.style.strokeDasharray = `${totalLength}`;
      glowPath.style.strokeDashoffset = `${totalLength}`;
    }

    // Set initial pen position at start of path
    const startPt = path.getPointAtLength(0);
    if (penRef.current) {
      penRef.current.style.transform = `translate(${startPt.x}px, ${startPt.y}px) rotate(-35deg)`;
      penRef.current.style.opacity = "1";
    }

    let startTime: number | null = null;
    const duration = 3200; // 3.2 seconds for realistic handwriting
    let animId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Custom smooth easing
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const currentLength = totalLength * ease;
      const dashOffset = totalLength - currentLength;

      path.style.strokeDashoffset = `${dashOffset}`;
      if (glowPath) {
        glowPath.style.strokeDashoffset = `${dashOffset}`;
      }

      if (currentLength > 0 && currentLength <= totalLength) {
        const p = path.getPointAtLength(currentLength);
        const pPrev = path.getPointAtLength(Math.max(0, currentLength - 4));
        const angleRad = Math.atan2(p.y - pPrev.y, p.x - pPrev.x);
        const angleDeg = angleRad * (180 / Math.PI);

        // Natural dynamic pen angle reacting to stroke direction
        const penTilt = Math.max(-55, Math.min(-18, -35 + angleDeg * 0.18));

        if (penRef.current) {
          penRef.current.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${penTilt}deg)`;
          if (progress >= 0.98) {
            // Pen lifts and disappears smoothly at the end
            penRef.current.style.opacity = "0";
            penRef.current.style.transition = "opacity 0.4s ease, transform 0.4s ease";
          }
        }

        if (inkPointRef.current) {
          inkPointRef.current.setAttribute("cx", `${p.x}`);
          inkPointRef.current.setAttribute("cy", `${p.y}`);
          inkPointRef.current.style.opacity = progress >= 0.98 ? "0" : "0.8";
        }
      }

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setShowSubtitle(true);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) setTimeout(onComplete, 700);
        }, 1100);
      }
    };

    const delayTimer = setTimeout(() => {
      animId = requestAnimationFrame(animate);
    }, 400);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(animId);
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
              viewBox="0 0 960 260"
              className="w-full max-w-[840px] h-auto overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Soft Gold Glow Filter */}
                <filter id="ink-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Ink Linear Gradient */}
                <linearGradient id="ink-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="20%" stopColor="#EEE4DA" />
                  <stop offset="60%" stopColor="#D8C4AC" />
                  <stop offset="100%" stopColor="#C8A49F" />
                </linearGradient>

                {/* Pen Gold Nib Gradient */}
                <linearGradient id="nib-gold" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#EEE4DA" />
                  <stop offset="70%" stopColor="#D8C4AC" />
                  <stop offset="100%" stopColor="#9C7753" />
                </linearGradient>

                {/* Pen Body Dark Gradient */}
                <linearGradient id="pen-barrel" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4D0E13" />
                  <stop offset="60%" stopColor="#22080C" />
                  <stop offset="100%" stopColor="#140507" />
                </linearGradient>
              </defs>

              {/* Ambient Glow Trail behind the stroke */}
              <path
                ref={glowPathRef}
                d={SIGNATURE_PATH}
                stroke="#D8C4AC"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.25"
                filter="url(#ink-glow)"
              />

              {/* Main Calligraphy Ink Stroke */}
              <path
                ref={pathRef}
                d={SIGNATURE_PATH}
                stroke="url(#ink-gradient)"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#ink-glow)"
              />

              {/* Wet Ink Contact Point directly beneath the nib tip */}
              <circle
                ref={inkPointRef}
                cx="160"
                cy="135"
                r="4.5"
                fill="#FFFFFF"
                filter="url(#ink-glow)"
                opacity="0.8"
              />

              {/* Final Flourish Star Sparkle */}
              {showSubtitle && (
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <circle cx="800" cy="170" r="3.5" fill="#EEE4DA" filter="url(#ink-glow)" />
                  <line x1="792" y1="170" x2="808" y2="170" stroke="#EEE4DA" strokeWidth="1" />
                  <line x1="800" y1="162" x2="800" y2="178" stroke="#EEE4DA" strokeWidth="1" />
                </motion.g>
              )}

              {/* THE REAL CALLIGRAPHY FOUNTAIN PEN (Follows the stroke point-by-point) */}
              <g
                ref={penRef}
                style={{
                  pointerEvents: "none",
                  opacity: 0,
                  transformOrigin: "0px 0px",
                }}
              >
                {/* Wet ink bloom around the tip */}
                <circle cx="0" cy="0" r="6" fill="#EEE4DA" opacity="0.4" filter="url(#ink-glow)" />

                {/* Golden Calligraphy Nib (Tip anchored exactly at 0, 0) */}
                <path
                  d="M 0 0 L -4.5 -14 L -6.5 -32 L 6.5 -32 L 4.5 -14 Z"
                  fill="url(#nib-gold)"
                  stroke="#EEE4DA"
                  strokeWidth="0.8"
                />
                {/* Nib ink slit and breather hole */}
                <line x1="0" y1="0" x2="0" y2="-18" stroke="#3D0B0F" strokeWidth="0.9" />
                <circle cx="0" cy="-18" r="1.3" fill="#3D0B0F" />

                {/* Pen Collar / Grip Band */}
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

                {/* Pen Body / Barrel (Burgundy and gold) */}
                <path
                  d="M -5.5 -42 L -4 -130 C -4 -145, 4 -145, 4 -130 L 5.5 -42 Z"
                  fill="url(#pen-barrel)"
                  stroke="#D8C4AC"
                  strokeWidth="1"
                />

                {/* Luxury Quill / Feather Flutes */}
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

                {/* Pen Top Cap Finial */}
                <circle cx="0" cy="-134" r="3.5" fill="url(#nib-gold)" stroke="#D8C4AC" strokeWidth="0.5" />
              </g>
            </svg>

            {/* Subtitle & Role Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-3 flex items-center justify-center gap-2.5"
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
