"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCarousel from "@/components/ProjectCarousel";
import { allProjects } from "@/data/projects";
import {
  ArrowLeft,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

function FourPointStar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

const backgroundStars = [
  { top: "3%", left: "8%", size: "w-5 h-5", delay: 0, duration: 5.5, color: "text-[#C6B39A]", type: "star" },
  { top: "6%", right: "12%", size: "w-6 h-6", delay: 1.2, duration: 6, color: "text-[#8D3A3C]", type: "sparkle" },
  { top: "12%", left: "4%", size: "w-7 h-7", delay: 1.7, duration: 6.8, color: "text-[#8D3A3C]", type: "sparkle" },
  { top: "18%", right: "8%", size: "w-4 h-4", delay: 0.5, duration: 5.1, color: "text-[#C6B39A]", type: "star" },
  { top: "25%", left: "12%", size: "w-5 h-5", delay: 2.1, duration: 5.8, color: "text-[#C6B39A]", type: "sparkle" },
  { top: "32%", right: "5%", size: "w-6 h-6", delay: 1.4, duration: 6.4, color: "text-[#8D3A3C]", type: "sparkle" },
  { top: "40%", left: "6%", size: "w-4 h-4", delay: 0.9, duration: 5.2, color: "text-[#C6B39A]", type: "star" },
  { top: "48%", right: "10%", size: "w-7 h-7", delay: 2.4, duration: 6.7, color: "text-[#8D3A3C]", type: "sparkle" },
  { top: "58%", left: "5%", size: "w-5 h-5", delay: 1.1, duration: 5.6, color: "text-[#C6B39A]", type: "star" },
  { top: "68%", right: "7%", size: "w-6 h-6", delay: 2.8, duration: 6.2, color: "text-[#8D3A3C]", type: "sparkle" },
  { top: "78%", left: "9%", size: "w-4 h-4", delay: 0.4, duration: 4.9, color: "text-[#C6B39A]", type: "star" },
  { top: "88%", right: "12%", size: "w-6 h-6", delay: 1.9, duration: 6.5, color: "text-[#8D3A3C]", type: "sparkle" },
  { top: "95%", left: "14%", size: "w-5 h-5", delay: 0.7, duration: 5.4, color: "text-[#C6B39A]", type: "star" },
];

const categories = ["Todos", "UX/UI Design", "Product Design", "Design Engineering"];

export default function ProyectosPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [projectsList, setProjectsList] = useState(allProjects);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjectsList(data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredProjects =
    selectedCategory === "Todos"
      ? projectsList
      : projectsList.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#1A0735] text-white flex flex-col font-sans selection:bg-[#8D3A3C] selection:text-white relative overflow-hidden">
      {/* Ambient Atmospheric Glows */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-[#8D3A3C]/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#C6B39A]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#8D3A3C]/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Ambient Constellation */}
      {backgroundStars.map((item, idx) => (
        <motion.div
          key={idx}
          animate={{ y: [-10, 10, -10], rotate: [0, 8, 0], opacity: [0.12, 0.38, 0.12] }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
          style={{ top: item.top, left: item.left, right: item.right }}
          className={`absolute pointer-events-none ${item.color} z-0`}
        >
          {item.type === "star" ? (
            <FourPointStar className={item.size} />
          ) : (
            <Sparkles className={item.size} />
          )}
        </motion.div>
      ))}

      {/* Top Navbar */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-4 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#C6B39A]/25 text-xs font-semibold text-white/90 hover:text-white transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Volver al Inicio</span>
        </Link>

        <Link
          href="/"
          className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#C6B39A]/25 flex items-center justify-center font-serif font-bold text-xl text-white shadow-lg transition-all"
        >
          N
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-6 py-12 sm:py-16">
        {/* Header Title & Description */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6B39A] bg-[#220D3E]/80 px-4 py-1.5 rounded-full border border-[#C6B39A]/30 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Portafolio Completo
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            Todos los Proyectos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-white/70 mt-4 leading-relaxed font-light"
          >
            Explora todos los casos de estudio, investigaciones de usuario, arquitecturas de diseño
            y desarrollos interactivos creados para producción.
          </motion.p>

          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all backdrop-blur-md ${
                  selectedCategory === cat
                    ? "bg-[#C6B39A] text-[#1A0735] shadow-[0_0_15px_rgba(198,179,154,0.4)]"
                    : "bg-white/10 hover:bg-white/20 text-white/80 border border-[#C6B39A]/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Cards List */}
        <div className="flex flex-col gap-10 sm:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="rounded-3xl bg-[#220D3E]/70 hover:bg-[#220D3E] border border-[#C6B39A]/20 hover:border-[#C6B39A]/55 backdrop-blur-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all group shadow-2xl"
              >
                {/* Visual Carousel Side */}
                <div
                  className={`lg:col-span-5 border-b lg:border-b-0 ${
                    idx % 2 === 1 ? "lg:order-2 lg:border-l" : "lg:border-r"
                  } border-white/10 relative min-h-[280px] sm:min-h-[340px] flex items-center justify-center overflow-hidden`}
                >
                  <ProjectCarousel
                    images={project.images}
                    title={project.title}
                    category={project.category}
                    highlight={project.highlight}
                    color={project.color}
                  />
                </div>

                {/* Content Side */}
                <div
                  className={`lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between gap-6 ${
                    idx % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-[#C6B39A] uppercase tracking-wider">
                        {project.subtitle}
                      </p>
                      {project.featured && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#8D3A3C]/40 text-[#C6B39A] border border-[#C6B39A]/30">
                          ★ Destacado
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-[#C6B39A] transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-base text-white/75 mt-3 leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg bg-white/5 text-white/85 text-xs font-medium border border-[#C6B39A]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-semibold text-white/45">
                        {project.category}
                      </span>
                      <a
                        href={`mailto:nayssa1310@gmail.com?subject=Consulta sobre ${encodeURIComponent(
                          project.title
                        )}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C6B39A] hover:text-white transition-colors group/link"
                      >
                        <span>Solicitar detalles</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-20 w-full border-t border-[#C6B39A]/15 py-8 text-center text-xs text-white/50">
        <p>© 2026 Nayssa Chu · Diseñado con precisión y arquitectura de componentes</p>
      </footer>
    </div>
  );
}
