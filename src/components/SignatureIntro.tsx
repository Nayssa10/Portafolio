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
  name = "Nayssa Kristel",
}: SignatureIntroProps) {
  const [isDone, setIsDone] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const targetText = name.trim() || "Nayssa Kristel";

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const typeSpeed = 80; // Smooth, rhythmic typewriter speed (ms per char)
    let detailTimer: NodeJS.Timeout | null = null;
    let completeTimer: NodeJS.Timeout | null = null;

    const interval = setInterval(() => {
      index++;
      setDisplayedText(targetText.slice(0, index));

      if (index >= targetText.length) {
        clearInterval(interval);
        setIsTyping(false);

        // Show underline and subtitle after a short breath
        detailTimer = setTimeout(() => {
          setShowDetails(true);
        }, 280);

        // Transition out smoothly
        completeTimer = setTimeout(() => {
          setIsDone(true);
          if (onComplete) {
            setTimeout(onComplete, 650);
          }
        }, 2200);
      }
    }, typeSpeed);

    return () => {
      clearInterval(interval);
      if (detailTimer) clearTimeout(detailTimer);
      if (completeTimer) clearTimeout(completeTimer);
    };
  }, [targetText, onComplete]);

  const handleSkip = () => {
    setIsDone(true);
    if (onComplete) {
      setTimeout(onComplete, 250);
    }
  };

  // Split displayed text into first and second word for rich gradient accent
  const { firstWord, secondWord } = useMemo(() => {
    const spaceIdx = targetText.indexOf(" ");
    if (spaceIdx === -1) {
      return { firstWord: displayedText, secondWord: "" };
    }
    const boundary = spaceIdx + 1;
    if (displayedText.length <= boundary) {
      return { firstWord: displayedText, secondWord: "" };
    }
    return {
      firstWord: displayedText.slice(0, boundary),
      secondWord: displayedText.slice(boundary),
    };
  }, [displayedText, targetText]);

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

          {/* Center Stage */}
          <div className="relative z-10 w-full max-w-3xl flex flex-col items-center justify-center text-center">
            {/* Top decorative badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#D8C4AC]/20 backdrop-blur-md mb-6"
            >
              <Sparkles className="w-3 h-3 text-[#D8C4AC]" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC]/80">
                Portafolio Personal
              </span>
            </motion.div>

            {/* Typewriter Text (Single Line: Nayssa Kristel) */}
            <div className="min-h-[1.3em] flex items-center justify-center px-4">
              <h1 className="font-dancing text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wide drop-shadow-[0_4px_30px_rgba(216,196,172,0.35)] inline-flex items-center flex-wrap justify-center">
                <span className="text-white">{firstWord}</span>
                {secondWord && (
                  <span className="bg-gradient-to-r from-[#FFFFFF] via-[#EEE4DA] to-[#D8C4AC] bg-clip-text text-transparent pr-4 sm:pr-6 inline-block">
                    {secondWord}
                  </span>
                )}
                {/* Blinking Typewriter Cursor (only during typing) */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.span
                      key="typing-cursor"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: [1, 0, 1] }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="inline-block w-[3px] sm:w-[4px] h-[0.72em] bg-[#EEE4DA] ml-2 align-baseline rounded-full shadow-[0_0_12px_#EEE4DA]"
                    />
                  )}
                </AnimatePresence>
              </h1>
            </div>

            {/* Elegant Underline Divider */}
            <div className="w-full flex justify-center mt-6 h-[2px]">
              {showDetails && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[2px] w-48 sm:w-72 bg-gradient-to-r from-transparent via-[#D8C4AC] to-transparent origin-center shadow-[0_0_15px_#D8C4AC]"
                />
              )}
            </div>

            {/* Subtitle / Role Tag */}
            <div className="min-h-[2rem] flex items-center justify-center mt-4">
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
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
