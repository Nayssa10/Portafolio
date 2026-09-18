"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface ProjectCarouselProps {
  images?: string[];
  title: string;
  category?: string;
  highlight?: string;
  color?: string;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "tween" as const, ease: [0.22, 1, 0.36, 1], duration: 0.6 },
      opacity: { duration: 0.45, ease: "easeInOut" },
      scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      filter: { duration: 0.35 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
    filter: "blur(6px)",
    transition: {
      x: { type: "tween" as const, ease: [0.22, 1, 0.36, 1], duration: 0.5 },
      opacity: { duration: 0.35, ease: "easeInOut" },
      scale: { duration: 0.5 },
      filter: { duration: 0.25 },
    },
  }),
};

export default function ProjectCarousel({
  images = [],
  title,
  category,
  highlight,
  color,
  className = "",
  autoPlay = true,
  autoPlayInterval = 2800,
}: ProjectCarouselProps) {
  const [[currentIndex, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hasImages = images && images.length > 0;
  const isMultiple = hasImages && images.length > 1;

  const paginate = useCallback(
    (newDirection: number) => {
      if (!isMultiple) return;
      setPage(([prevIndex]) => {
        const nextIndex = (prevIndex + newDirection + images.length) % images.length;
        return [nextIndex, newDirection];
      });
    },
    [isMultiple, images.length]
  );

  useEffect(() => {
    if (!autoPlay || !isMultiple || isHovered || isZoomed) return;

    const timer = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, isMultiple, isHovered, isZoomed, autoPlayInterval, paginate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isMultiple) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    }
  };

  // Fallback view when no images are provided
  if (!hasImages) {
    return (
      <div
        className={`relative w-full h-full min-h-[260px] sm:min-h-[300px] flex flex-col justify-between p-8 bg-gradient-to-br ${
          color || "from-[#4D0E13]/60 via-[#22080C]/90 to-[#140507]"
        } ${className}`}
      >
        <div className="flex items-center justify-between">
          {category && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/40 text-white/90 backdrop-blur-md border border-white/15">
              {category}
            </span>
          )}
        </div>
        <div className="text-xs text-white/50 pt-2">
          <span>Estudio de caso UX/UI & Front-End</span>
        </div>
      </div>
    );
  }

  const activeImage = images[currentIndex];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`Galería de imágenes para ${title}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={`group/carousel relative w-full h-full min-h-[260px] sm:min-h-[320px] lg:min-h-[360px] overflow-hidden bg-[#140406] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8C4AC] ${className}`}
    >
      {/* Dynamic Slide Progress Bar */}
      {isMultiple && autoPlay && !isHovered && !isZoomed && (
        <div className="absolute top-0 inset-x-0 h-0.5 bg-white/10 z-30 overflow-hidden">
          <motion.div
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
            className="h-full bg-gradient-to-r from-[#4D0E13] via-[#D8C4AC] to-[#4D0E13]"
          />
        </div>
      )}

      {/* Background visual blur layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-10" />

      {/* Main Image Viewport with Animated Transitions and Drag / Swipe */}
      <div className="relative w-full h-full min-h-[260px] sm:min-h-[320px] lg:min-h-[360px] flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag={isMultiple ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, { offset, velocity }) => {
              const swipeThreshold = 50;
              if (offset.x < -swipeThreshold || velocity.x < -400) {
                paginate(1);
              } else if (offset.x > swipeThreshold || velocity.x > 400) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing p-2"
          >
            <div className="relative w-full h-full">
              <Image
                src={activeImage}
                alt={`${title} - Imagen ${currentIndex + 1} de ${images.length}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-contain drop-shadow-2xl select-none"
                priority={currentIndex === 0}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Category Pill Top Left */}
      {category && (
        <div className="absolute top-4 left-4 z-20">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-black/60 text-white/95 backdrop-blur-md border border-white/20 shadow-lg">
            {category}
          </span>
        </div>
      )}

      {/* Top Right Controls: Counter Badge & Zoom */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {isMultiple && (
          <span className="text-[11px] font-semibold tracking-wider px-2.5 py-1 rounded-full bg-black/60 text-[#D8C4AC] backdrop-blur-md border border-white/20 shadow-lg">
            {currentIndex + 1} / {images.length}
          </span>
        )}
        <button
          type="button"
          onClick={() => setIsZoomed(true)}
          title="Ver en detalle"
          aria-label="Ampliar imagen"
          className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-lg"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation Arrow Buttons */}
      {isMultiple && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Imagen anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/65 hover:bg-black/90 text-white border border-white/25 backdrop-blur-md flex items-center justify-center shadow-xl transition-all sm:opacity-0 sm:group-hover/carousel:opacity-100 focus:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => paginate(1)}
            aria-label="Siguiente imagen"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/65 hover:bg-black/90 text-white border border-white/25 backdrop-blur-md flex items-center justify-center shadow-xl transition-all sm:opacity-0 sm:group-hover/carousel:opacity-100 focus:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </>
      )}

      {/* Bottom Indicators */}
      <div className="absolute bottom-3 inset-x-0 z-20 flex flex-col items-center gap-2 px-4 pointer-events-none">

        {isMultiple && (
          <div className="flex items-center gap-1.5 pointer-events-auto bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPage([idx, idx > currentIndex ? 1 : -1])}
                aria-label={`Ir a diapositiva ${idx + 1}`}
                aria-current={currentIndex === idx ? "true" : "false"}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? "w-6 h-2 bg-[#D8C4AC] shadow-[0_0_8px_rgba(216,196,172,0.6)]"
                    : "w-2 h-2 bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Zoom / Lightbox Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[88vh] h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                aria-label="Cerrar modal de imagen"
                className="absolute top-2 right-2 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Active Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={activeImage}
                  alt={`${title} - Imagen ampliada`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>

              {/* Modal Bottom Controls */}
              {isMultiple && (
                <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-4 z-50">
                  <button
                    type="button"
                    onClick={() => paginate(-1)}
                    aria-label="Imagen anterior"
                    className="w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/25 flex items-center justify-center transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-semibold text-white/90 bg-black/60 px-4 py-1.5 rounded-full border border-white/20">
                    {currentIndex + 1} / {images.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => paginate(1)}
                    aria-label="Siguiente imagen"
                    className="w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/25 flex items-center justify-center transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
