"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Certificate, defaultCertificates } from "@/data/certificates";
import {
  ArrowLeft,
  Sparkles,
  Award,
  Calendar,
  ArrowUpRight,
  X,
} from "lucide-react";

function FourPointStar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

const backgroundStars = [
  { top: "3%", left: "8%", size: "w-5 h-5", delay: 0, duration: 5.5, color: "text-[#D8C4AC]", type: "star" },
  { top: "6%", right: "12%", size: "w-6 h-6", delay: 1.2, duration: 6, color: "text-[#C8A49F]", type: "sparkle" },
  { top: "12%", left: "4%", size: "w-7 h-7", delay: 1.7, duration: 6.8, color: "text-[#4D0E13]", type: "sparkle" },
  { top: "18%", right: "8%", size: "w-4 h-4", delay: 0.5, duration: 5.1, color: "text-[#D8C4AC]", type: "star" },
  { top: "25%", left: "12%", size: "w-5 h-5", delay: 2.1, duration: 5.8, color: "text-[#EEE4DA]", type: "sparkle" },
  { top: "32%", right: "5%", size: "w-6 h-6", delay: 1.4, duration: 6.4, color: "text-[#C8A49F]", type: "sparkle" },
  { top: "40%", left: "6%", size: "w-4 h-4", delay: 0.9, duration: 5.2, color: "text-[#D8C4AC]", type: "star" },
  { top: "48%", right: "10%", size: "w-7 h-7", delay: 2.4, duration: 6.7, color: "text-[#4D0E13]", type: "sparkle" },
  { top: "58%", left: "5%", size: "w-5 h-5", delay: 1.1, duration: 5.6, color: "text-[#EEE4DA]", type: "star" },
  { top: "68%", right: "7%", size: "w-6 h-6", delay: 2.8, duration: 6.2, color: "text-[#C8A49F]", type: "sparkle" },
  { top: "78%", left: "9%", size: "w-4 h-4", delay: 0.4, duration: 4.9, color: "text-[#D8C4AC]", type: "star" },
  { top: "88%", right: "12%", size: "w-6 h-6", delay: 1.9, duration: 6.5, color: "text-[#4D0E13]", type: "sparkle" },
  { top: "95%", left: "14%", size: "w-5 h-5", delay: 0.7, duration: 5.4, color: "text-[#D8C4AC]", type: "star" },
];

export default function CertificadosPage() {
  const [certificatesList, setCertificatesList] = useState<Certificate[]>(defaultCertificates);
  const [selectedIssuer, setSelectedIssuer] = useState("Todos");
  const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCertificatesList(data);
        }
      })
      .catch(() => {});
  }, []);

  const issuers = ["Todos", ...Array.from(new Set(certificatesList.map((c) => c.issuer).filter(Boolean)))];

  const filteredCertificates =
    selectedIssuer === "Todos"
      ? certificatesList
      : certificatesList.filter((c) => c.issuer === selectedIssuer);

  return (
    <div className="min-h-screen bg-[#140507] text-[#EEE4DA] flex flex-col font-sans selection:bg-[#4D0E13] selection:text-[#EEE4DA] relative overflow-hidden">
      {/* Ambient Atmospheric Glows */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-[#4D0E13]/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#C8A49F]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#4D0E13]/25 rounded-full blur-[130px] pointer-events-none" />

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
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#D8C4AC]/25 text-xs font-semibold text-white/90 hover:text-white transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Volver al Inicio</span>
        </Link>

        <Link
          href="/"
          className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#D8C4AC]/25 flex items-center justify-center font-serif font-bold text-xl text-white shadow-lg transition-all"
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
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D8C4AC] bg-[#22080C]/90 px-4 py-1.5 rounded-full border border-[#D8C4AC]/30 mb-4"
          >
            <Award className="w-3.5 h-3.5" />
            Validación & Credenciales
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            Todos los Certificados
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#D8C4AC]/80 mt-4 leading-relaxed font-light"
          >
            Certificaciones, cursos y reconocimientos que respaldan mi aprendizaje continuo, preparación técnica y desarrollo profesional.
          </motion.p>

          {/* Issuer Filter Tabs (when more than 1 issuer) */}
          {issuers.length > 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-2 mt-8"
            >
              {issuers.map((issuer) => (
                <button
                  key={issuer}
                  type="button"
                  onClick={() => setSelectedIssuer(issuer)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all backdrop-blur-md cursor-pointer ${
                    selectedIssuer === issuer
                      ? "bg-[#D8C4AC] text-[#140507] shadow-[0_0_15px_rgba(216,196,172,0.4)] font-bold"
                      : "bg-white/10 hover:bg-white/20 text-white/80 border border-[#D8C4AC]/20"
                  }`}
                >
                  {issuer}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Certificates Grid */}
        <div
          className={`grid grid-cols-1 ${
            filteredCertificates.length === 1
              ? "max-w-md mx-auto"
              : filteredCertificates.length === 2
              ? "md:grid-cols-2 max-w-3xl mx-auto"
              : "md:grid-cols-2 lg:grid-cols-3"
          } gap-6 sm:gap-8`}
        >
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert, idx) => (
              <motion.div
                key={cert.id || idx}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="p-6 sm:p-7 rounded-3xl bg-[#22080C]/80 hover:bg-[#22080C] border border-[#D8C4AC]/20 hover:border-[#D8C4AC]/50 transition-all duration-300 backdrop-blur-md shadow-lg flex flex-col justify-between group relative"
              >
                <div className="space-y-4">
                  {/* Header tags: Issuer & Date */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#4D0E13]/60 text-[#EEE4DA] border border-[#C8A49F]/30 font-semibold shadow-sm">
                      {cert.issuer}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#D8C4AC]/75">
                      <Calendar className="w-3 h-3 opacity-70" />
                      <span>{cert.date}</span>
                    </div>
                  </div>

                  {/* Certificate Image preview if exists */}
                  {cert.image && (
                    <div
                      onClick={() => setSelectedCertImage(cert.image || null)}
                      className="relative w-full flex items-center justify-center py-2 cursor-pointer group/img"
                      title="Clic para ver en tamaño completo"
                    >
                      <div className="relative rounded-2xl overflow-hidden border border-[#D8C4AC]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover/img:border-[#D8C4AC]/60 group-hover/img:shadow-[0_15px_35px_rgba(216,196,172,0.15)] transition-all duration-300">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="max-h-56 sm:max-h-60 w-auto max-w-full object-contain rounded-2xl group-hover/img:scale-[1.02] transition-transform duration-300 block"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center p-2.5">
                          <span className="text-[11px] font-mono text-[#EEE4DA] bg-black/80 border border-[#D8C4AC]/30 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                            Ampliar certificado
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Title & Description */}
                  <div>
                    <h2 className="font-serif italic text-xl sm:text-2xl text-white font-medium group-hover:text-[#EEE4DA] transition-colors leading-snug">
                      {cert.title}
                    </h2>
                    {cert.description && (
                      <p className="text-xs sm:text-sm text-[#EEE4DA]/75 leading-relaxed font-light mt-2.5 whitespace-pre-line">
                        {cert.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Verification Link */}
                {cert.url && (
                  <div className="pt-4 mt-4 border-t border-[#D8C4AC]/15 flex items-center justify-end">
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#D8C4AC] hover:text-white transition-colors group/link"
                    >
                      <span>Ver credencial</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Certificate Image Lightbox Modal */}
      {selectedCertImage && (
        <div
          onClick={() => setSelectedCertImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-[#140507] border border-[#D8C4AC]/40 rounded-3xl overflow-hidden p-2 shadow-2xl"
          >
            <img
              src={selectedCertImage}
              alt="Certificado ampliado"
              className="w-auto h-auto max-h-[82vh] rounded-2xl object-contain mx-auto"
            />
            <button
              type="button"
              onClick={() => setSelectedCertImage(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-black/70 hover:bg-[#4D0E13] text-[#EEE4DA] border border-[#D8C4AC]/30 transition-colors"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <footer className="relative z-20 w-full border-t border-[#D8C4AC]/15 py-8 text-center text-xs text-[#D8C4AC]/60">
        <p>© 2026 Nayssa Chu · Diseñado con precisión y arquitectura de componentes</p>
      </footer>
    </div>
  );
}
