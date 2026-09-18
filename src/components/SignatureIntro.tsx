"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SignatureIntroProps {
  onComplete?: () => void;
  subtitle?: string;
  name?: string;
}

export default function SignatureIntro({
  onComplete,
  subtitle = "Diseño UX/UI · Desarrollo Front-End",
  name = "Nayssa Chu Bustamante",
}: SignatureIntroProps) {
  const [isDone, setIsDone] = useState(false);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [currentLine, setCurrentLine] = useState<1 | 2 | 3>(1); // 1 = typing line 1, 2 = typing line 2, 3 = finished typing
  const [showDetails, setShowDetails] = useState(false);

  // Split name into two balanced lines
  const { line1Target, line2Target } = useMemo(() => {
    const rawName = name.trim() || "Nayssa Chu Bustamante";
    const parts = rawName.split(/\s+/);
    if (parts.length >= 3) {
      return {
        line1Target: parts.slice(0, -1).join(" "),
        line2Target: parts.slice(-1)[0],
      };
    } else if (parts.length === 2) {
      return {
        line1Target: parts[0],
        line2Target: parts[1],
      };
    }
    return {
      line1Target: rawName,
      line2Target: "",
    };
  }, [name]);

  // Typewriter effect sequence
  useEffect(() => {
    let index1 = 0;
    let index2 = 0;
    let timer: NodeJS.Timeout | null = null;

    const typeSpeed = 75; // ms per character

    // Start typing line 1
    const interval1 = setInterval(() => {
      index1++;
      setText1(line1Target.slice(0, index1));

      if (index1 >= line1Target.length) {
        clearInterval(interval1);
        setCurrentLine(2);

        // Pause briefly before line 2
        timer = setTimeout(() => {
          if (!line2Target) {
            setCurrentLine(3);
            setShowDetails(true);
            return;
          }

          const interval2 = setInterval(() => {
            index2++;
            setText2(line2Target.slice(0, index2));

            if (index2 >= line2Target.length) {
              clearInterval(interval2);
              setCurrentLine(3);

              // Show underline & subtitle
              timer = setTimeout(() => {
                setShowDetails(true);
              }, 250);

              // Finish intro smoothly after reading time
              timer = setTimeout(() => {
                setIsDone(true);
                if (onComplete) {
                  setTimeout(onComplete, 700);
                }
              }, 2200);
            }
          }, typeSpeed);
        }, 220);
      }
    }, typeSpeed);

    return () => {
      clearInterval(interval1);
      if (timer) clearTimeout(timer);
    };
  }, [line1Target, line2Target, onComplete]);

  const handleSkip = () => {
    setIsDone(true);
    if (onComplete) {
      setTimeout(onComplete, 300);
    }
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="typewriter-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleSkip}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#140507] via-[#1a060a] to-[#120305] text-[#EEE4DA] px-6 select-none overflow-hidden cursor-pointer"
        >
          {/* Ambient Luxury Atmospheric Glows */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#4D0E13]/35 blur-[140px] pointer-events-none" />
          <div className="absolute w-[420px] h-[420px] rounded-full bg-[#D8C4AC]/10 blur-[110px] pointer-events-none" />

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

          {/* Center Stage Content */}
          <div className="relative z-10 w-full max-w-3xl flex flex-col items-center justify-center text-center">
            {/* Top decorative badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#D8C4AC]/20 backdrop-blur-md mb-6"
            >
              <Sparkles className="w-3 h-3 text-[#D8C4AC]" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC]/80">
                Portafolio Personal
              </span>
            </motion.div>

            {/* Line 1: First Name */}
            <div className="min-h-[1.25em] flex items-center justify-center">
              <h1 className="font-dancing text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-wide drop-shadow-[0_4px_25px_rgba(216,196,172,0.3)] inline-flex items-center">
                <span>{text1}</span>
                {currentLine === 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.75, ease: "easeInOut" }}
                    className="inline-block w-[3px] sm:w-[5px] h-[0.75em] bg-[#EEE4DA] ml-2 align-baseline rounded-full shadow-[0_0_12px_#EEE4DA]"
                  />
                )}
              </h1>
            </div>

            {/* Line 2: Last Name */}
            {(line2Target || text2) && (
              <div className="min-h-[1.25em] flex items-center justify-center mt-1">
                <h2 className="font-dancing text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-[#FFFFFF] via-[#EEE4DA] to-[#D8C4AC] bg-clip-text text-transparent tracking-wide drop-shadow-[0_4px_25px_rgba(216,196,172,0.3)] inline-flex items-center">
                  <span>{text2}</span>
                  {currentLine === 2 && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.75, ease: "easeInOut" }}
                      className="inline-block w-[3px] sm:w-[5px] h-[0.75em] bg-[#D8C4AC] ml-2 align-baseline rounded-full shadow-[0_0_12px_#D8C4AC]"
                    />
                  )}
                  {currentLine === 3 && !showDetails && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.75, ease: "easeInOut" }}
                      className="inline-block w-[3px] sm:w-[5px] h-[0.75em] bg-[#D8C4AC] ml-2 align-baseline rounded-full shadow-[0_0_12px_#D8C4AC]"
                    />
                  )}
                </h2>
              </div>
            )}

            {/* Elegant Expanding Underline Divider */}
            <div className="w-full flex justify-center mt-6 h-[2px]">
              {showDetails && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[2px] w-48 sm:w-72 bg-gradient-to-r from-transparent via-[#D8C4AC] to-transparent origin-center shadow-[0_0_15px_#D8C4AC]"
                />
              )}
            </div>

            {/* Subtitle / Role */}
            <div className="min-h-[2rem] flex items-center justify-center mt-4">
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex items-center justify-center gap-2.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D8C4AC]/70" />
                  <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#D8C4AC]/90 uppercase font-light">
                    {subtitle}
                  </p>
                  <Sparkles className="w-3.5 h-3.5 text-[#D8C4AC]/70" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
