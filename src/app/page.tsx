"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCarousel from "@/components/ProjectCarousel";
import { featuredProjects } from "@/data/projects";
import {
  Mail,
  Code2,
  Layout,
  CheckCircle2,
  Check,
  Menu,
  ArrowUpRight,
  Sparkles,
  Layers,
  Palette,
} from "lucide-react";

// Inline brand SVGs for precision
function FourPointStar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74V9.87H5.06v8.63h2.8z" />
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function FigmaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 38 57">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  );
}

function ReactIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NextjsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="none">
      <circle cx="90" cy="90" r="90" fill="white" />
      <path
        d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
        fill="#1A0735"
      />
      <rect x="115" y="54" width="12" height="72" fill="#1A0735" />
    </svg>
  );
}

function TailwindIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#38BDF8">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  );
}

function TypescriptIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M11.5 10H6.5V11.5H8.2V18H9.8V11.5H11.5V10Z" fill="white" />
      <path
        d="M17.5 12.8C17.5 11.2 16.2 10 14.2 10C12.5 10 11.4 10.9 11.4 12.3H13C13 11.6 13.5 11.2 14.3 11.2C15.1 11.2 15.7 11.6 15.7 12.2C15.7 12.8 15.3 13 14 13.4C12.3 13.9 11.2 14.6 11.2 16.1C11.2 17.5 12.4 18.2 14.1 18.2C15.3 18.2 16.5 17.6 17 16.9V18H18.5V13.8C18.5 13.3 18.2 12.9 17.5 12.8ZM14.2 17.1C13.2 17.1 12.7 16.7 12.7 16C12.7 15.3 13.3 14.9 14.5 14.5C15.5 14.2 15.8 13.9 15.8 13.9V14.9C15.8 16.2 15.1 17.1 14.2 17.1Z"
        fill="white"
      />
    </svg>
  );
}

function GitIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#F05032">
      <path d="M21.62 10.38L13.62 2.38C13.15 1.91 12.38 1.91 11.91 2.38L10.22 4.07L12.5 6.35C13.06 6.16 13.72 6.29 14.16 6.73C14.6 7.17 14.73 7.83 14.54 8.39L16.78 10.63C17.34 10.44 18 10.57 18.44 11.01C19.03 11.6 19.03 12.55 18.44 13.14C17.85 13.73 16.9 13.73 16.31 13.14C15.87 12.7 15.74 12.04 15.93 11.48L13.85 9.4C13.44 9.54 12.98 9.51 12.6 9.29L10.37 11.52C10.56 12.08 10.43 12.74 9.99 13.18C9.4 13.77 8.45 13.77 7.86 13.18C7.27 12.59 7.27 11.64 7.86 11.05C8.3 10.61 8.96 10.48 9.52 10.67L11.73 8.46V5.58L2.38 14.93C1.91 15.4 1.91 16.17 2.38 16.64L10.38 24.64C10.85 25.11 11.62 25.11 12.09 24.64L21.62 15.11C22.09 14.64 22.09 13.87 21.62 13.4L21.62 10.38Z" />
    </svg>
  );
}

const projectStars = [
  // Top header zone (1% - 15%)
  { top: "2%", left: "6%", size: "w-5 h-5", delay: 0, duration: 5.5, color: "text-[#C6B39A]", type: "star" },
  { top: "4%", right: "12%", size: "w-6 h-6", delay: 1.2, duration: 6, color: "text-[#8D3A3C]", type: "sparkle" },
  { top: "7%", left: "24%", size: "w-3.5 h-3.5", delay: 2.1, duration: 4.8, color: "text-[#C6B39A]", type: "dot" },
  { top: "9%", right: "28%", size: "w-4 h-4", delay: 0.8, duration: 5.2, color: "text-[#C6B39A]", type: "star" },
  { top: "12%", left: "4%", size: "w-7 h-7", delay: 1.7, duration: 6.8, color: "text-[#8D3A3C]", type: "sparkle" },
  { top: "15%", right: "6%", size: "w-5 h-5", delay: 2.9, duration: 5.4, color: "text-[#C6B39A]", type: "star" },

  // Card 1 zone (18% - 32%)
  { top: "18%", left: "12%", size: "w-3.5 h-3.5", delay: 0.5, duration: 4.5, color: "text-[#C6B39A]", type: "dot" },
  { top: "21%", right: "16%", size: "w-6 h-6", delay: 1.9, duration: 6.2, color: "text-[#8D3A3C]", type: "sparkle" },
  { top: "24%", left: "3%", size: "w-8 h-8", delay: 2.4, duration: 7.2, color: "text-[#8D3A3C]", type: "layers" },
  { top: "26%", right: "4%", size: "w-4 h-4", delay: 0.3, duration: 5.1, color: "text-[#C6B39A]", type: "star" },
  { top: "29%", left: "15%", size: "w-5 h-5", delay: 1.4, duration: 5.8, color: "text-[#C6B39A]", type: "sparkle" },
  { top: "32%", right: "10%", size: "w-3.5 h-3.5", delay: 2.7, duration: 4.6, color: "text-[#8D3A3C]", type: "dot" },

  // Gap between Card 1 and Card 2 (35% - 45%)
  { top: "35%", left: "7%", size: "w-5 h-5", delay: 0.9, duration: 5.6, color: "text-[#C6B39A]", type: "star" },
  { top: "37%", right: "18%", size: "w-7 h-7", delay: 2.0, duration: 6.5, color: "text-[#8D3A3C]", type: "sparkle" },
  { top: "40%", left: "20%", size: "w-4 h-4", delay: 1.1, duration: 4.9, color: "text-[#C6B39A]", type: "dot" },
  { top: "42%", right: "3%", size: "w-9 h-9", delay: 0.6, duration: 7.8, color: "text-[#C6B39A]", type: "palette" },
  { top: "45%", left: "4%", size: "w-6 h-6", delay: 2.3, duration: 6.1, color: "text-[#8D3A3C]", type: "sparkle" },

  // Card 2 zone (48% - 60%)
  { top: "48%", right: "14%", size: "w-4 h-4", delay: 1.5, duration: 5.3, color: "text-[#C6B39A]", type: "star" },
  { top: "51%", left: "10%", size: "w-5 h-5", delay: 2.8, duration: 6.0, color: "text-[#C6B39A]", type: "sparkle" },
  { top: "53%", right: "5%", size: "w-3.5 h-3.5", delay: 0.4, duration: 4.7, color: "text-[#8D3A3C]", type: "dot" },
  { top: "56%", left: "16%", size: "w-4 h-4", delay: 1.8, duration: 5.0, color: "text-[#C6B39A]", type: "star" },
  { top: "59%", right: "11%", size: "w-7 h-7", delay: 2.5, duration: 6.7, color: "text-[#8D3A3C]", type: "sparkle" },

  // Gap between Card 2 and Card 3 (62% - 72%)
  { top: "62%", left: "3%", size: "w-8 h-8", delay: 0.7, duration: 8.0, color: "text-[#C6B39A]", type: "code" },
  { top: "65%", right: "7%", size: "w-5 h-5", delay: 1.6, duration: 5.5, color: "text-[#C6B39A]", type: "star" },
  { top: "67%", left: "12%", size: "w-3.5 h-3.5", delay: 2.2, duration: 4.8, color: "text-[#8D3A3C]", type: "dot" },
  { top: "70%", right: "15%", size: "w-6 h-6", delay: 0.9, duration: 6.3, color: "text-[#8D3A3C]", type: "sparkle" },
  { top: "72%", left: "5%", size: "w-4 h-4", delay: 2.6, duration: 5.2, color: "text-[#C6B39A]", type: "star" },

  // Card 3 & Bottom zone (75% - 98%)
  { top: "75%", right: "4%", size: "w-6 h-6", delay: 1.3, duration: 5.9, color: "text-[#C6B39A]", type: "sparkle" },
  { top: "78%", left: "14%", size: "w-4 h-4", delay: 0.2, duration: 4.6, color: "text-[#8D3A3C]", type: "dot" },
  { top: "81%", right: "12%", size: "w-8 h-8", delay: 2.1, duration: 6.9, color: "text-[#8D3A3C]", type: "sparkle" },
  { top: "84%", left: "6%", size: "w-5 h-5", delay: 1.7, duration: 5.7, color: "text-[#C6B39A]", type: "star" },
  { top: "87%", right: "20%", size: "w-3.5 h-3.5", delay: 2.9, duration: 4.7, color: "text-[#C6B39A]", type: "dot" },
  { top: "90%", left: "11%", size: "w-6 h-6", delay: 0.6, duration: 6.4, color: "text-[#8D3A3C]", type: "sparkle" },
  { top: "93%", right: "6%", size: "w-4 h-4", delay: 1.4, duration: 5.1, color: "text-[#C6B39A]", type: "star" },
  { top: "96%", left: "18%", size: "w-3.5 h-3.5", delay: 2.4, duration: 4.9, color: "text-[#8D3A3C]", type: "dot" },
  { top: "98%", right: "13%", size: "w-5 h-5", delay: 1.0, duration: 5.8, color: "text-[#C6B39A]", type: "sparkle" },
];

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("nayssa1310@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const projects = featuredProjects;

  return (
    <div className="min-h-screen bg-[#1A0735] text-white flex flex-col font-sans selection:bg-[#8D3A3C] selection:text-white">
      {/* HERO SECTION: Exact layout from user reference with interactive motion */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#16052F] via-[#1A0735] to-[#120426] px-6 sm:px-10 lg:px-16 py-6">


        {/* Floating Sparkles in the background */}
        <motion.div
          animate={{ y: [-15, 15, -15], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-1/4 pointer-events-none text-[#C6B39A]/50"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        <motion.div
          animate={{ y: [15, -15, 15], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-36 right-1/4 pointer-events-none text-[#8D3A3C]/50"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>

        {/* Top Floating Navbar */}
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-30 flex items-center justify-between w-full max-w-7xl mx-auto"
        >
          {/* Logo Button (Glassmorphic rounded square) */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#C6B39A]/25 flex items-center justify-center font-serif font-bold text-2xl text-white shadow-lg transition-all"
          >
            N
          </motion.a>

          {/* Center Pill Menu */}
          <nav className="hidden md:flex items-center gap-6 px-7 py-2.5 rounded-full bg-white/10 hover:bg-white/[0.14] backdrop-blur-md border border-[#C6B39A]/25 text-sm font-medium text-white/90 shadow-lg transition-all">
            <a href="#" className="hover:text-[#C6B39A] transition-colors">
              Inicio
            </a>
            <Link
              href="/proyectos"
              className="hover:text-[#C6B39A] transition-colors"
            >
              Proyectos
            </Link>
            <a href="#habilidades" className="hover:text-[#C6B39A] transition-colors">
              Habilidades
            </a>
            <a href="#contacto" className="hover:text-[#C6B39A] transition-colors">
              Contacto
            </a>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={copyEmail}
              title="Copiar correo"
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#C6B39A]/25 flex items-center justify-center text-white/90 hover:text-white transition-all shadow-md"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4" />}
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              href="#proyectos"
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#C6B39A]/25 flex items-center justify-center text-white/90 hover:text-white transition-all shadow-md"
            >
              <Menu className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.header>

        {/* Hero 3-Column Split Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 py-4 lg:py-0">
          {/* Left Column: Welcome */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col items-start text-left gap-5 order-2 lg:order-1"
          >
            <h1 className="font-dancing text-5xl sm:text-6xl lg:text-[66px] font-bold text-white leading-[1.12] tracking-wide">
              Nayssa Chu <br />
              <span className="font-semibold bg-gradient-to-r from-white via-[#C6B39A] to-[#8D3A3C] bg-clip-text text-transparent">
                Bustamante
              </span>
            </h1>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#220D3E]/80 border border-[#C6B39A]/35 text-[11px] font-semibold text-[#C6B39A] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Disponible para proyectos & prácticas
            </span>

            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-xs font-light">
              Diseño UX/UI & Desarrollo Front-End. Construyendo interfaces intuitivas, elegantes y técnicamente viables.
            </p>
          </motion.div>

          {/* Center Column: Big Beautiful Avatar with Floating Motion */}
          <div className="lg:col-span-4 flex justify-center items-end relative order-1 lg:order-2 self-end h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[600px]">

            {/* Floating Main Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative z-10 w-full flex justify-center items-end"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex justify-center"
              >
                {/* Main Hero Avatar Image (Transparent Cutout) */}
                <Image
                  src="/nayssa-anime-hero.png"
                  alt="Nayssa Chu - Avatar Principal"
                  width={420}
                  height={630}
                  priority
                  className="w-auto h-[440px] sm:h-[500px] lg:h-[560px] object-contain select-none pointer-events-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: About Me */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col items-center text-center gap-6 order-3"
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[50px] font-semibold text-white tracking-tight w-full text-center">
              Sobre mí
            </h2>

            <p className="text-sm sm:text-[15px] text-white/80 leading-relaxed max-w-sm sm:max-w-md font-light text-center">
              Estudiante de 8vo ciclo de Ingeniería de Sistemas e Informática. Lo que más me apasiona es el{" "}
              <span className="text-[#C6B39A] font-medium">desarrollo Front-End</span> y el{" "}
              <span className="text-[#C6B39A] font-medium">diseño UX/UI</span>. Me interesa no solo
              que una aplicación o página web funcione, sino también que sea intuitiva, visualmente
              atractiva y que realmente facilite la experiencia de quien la utiliza.
            </p>

            <div className="pt-3 w-full flex justify-end">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#proyectos"
                className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-[#C6B39A] hover:bg-[#D5C5AE] text-[#1A0735] font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(198,179,154,0.3)] hover:shadow-[0_0_30px_rgba(198,179,154,0.5)] transition-all"
              >
                Ver Proyectos
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row (Copyright, Scroll Icon, Socials) */}
        <footer className="relative z-30 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#C6B39A]/15 text-xs text-white/50">
          {/* Left: Copyright */}
          <div className="order-2 sm:order-1">
            <span>© 2026 Nayssa Chu · Todos los derechos reservados</span>
          </div>

          {/* Center: Mouse Scroll Indicator (Animated) */}
          <div className="order-1 sm:order-2 flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
            <a
              href="#proyectos"
              className="w-5 h-9 rounded-full border-2 border-[#C6B39A]/40 flex items-start justify-center p-1 backdrop-blur-sm shadow-sm"
              aria-label="Hacer scroll hacia abajo"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-2 bg-[#C6B39A] rounded-full"
              />
            </a>
          </div>

          {/* Right: Social Circles */}
          <div className="order-3 flex items-center gap-2.5">
            <motion.a
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href="mailto:nayssa1310@gmail.com"
              title="Email"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C6B39A] hover:text-[#1A0735] text-white/90 border border-[#C6B39A]/30 backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
            >
              <Mail className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.linkedin.com/in/nayssa"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C6B39A] hover:text-[#1A0735] text-white/90 border border-[#C6B39A]/30 backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
            >
              <LinkedinIcon className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/Nayssa10"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C6B39A] hover:text-[#1A0735] text-white/90 border border-[#C6B39A]/30 backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
            >
              <GithubIcon className="w-4 h-4" />
            </motion.a>
          </div>
        </footer>
      </section>

      {/* SELECTED WORK / CASE STUDIES - HORIZONTAL FEATURE ROWS */}
      <section id="proyectos" className="relative py-24 sm:py-28 px-6 bg-gradient-to-b from-[#120426] via-[#1A0735] to-[#14052B] border-t border-[#C6B39A]/20 overflow-hidden">
        {/* Ambient Atmospheric Glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8D3A3C]/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-[#C6B39A]/15 rounded-full blur-[130px] pointer-events-none" />

        {/* Ambient Constellation (Data-driven, evenly distributed across full section height) */}
        {projectStars.map((item, idx) => (
          <motion.div
            key={idx}
            animate={
              item.type === "dot"
                ? { scale: [0.8, 1.4, 0.8], opacity: [0.15, 0.5, 0.15] }
                : { y: [-10, 10, -10], rotate: [0, 8, 0], opacity: [0.12, 0.38, 0.12] }
            }
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
            }}
            className={`absolute pointer-events-none ${item.color} z-0`}
          >
            {item.type === "star" && <FourPointStar className={item.size} />}
            {item.type === "sparkle" && <Sparkles className={item.size} />}
            {item.type === "layers" && <Layers className={item.size} />}
            {item.type === "palette" && <Palette className={item.size} />}
            {item.type === "code" && <Code2 className={item.size} />}
            {item.type === "dot" && (
              <span className="block w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_6px_currentColor]" />
            )}
          </motion.div>
        ))}

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Proyectos
              </h2>
              <p className="text-sm sm:text-base text-white/70 mt-2 max-w-xl">
                Estudios de caso diseñados desde el problema y la investigación hasta la solución
                visual y la arquitectura de componentes.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-10 sm:gap-12">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-[#220D3E]/70 hover:bg-[#220D3E] border border-[#C6B39A]/20 hover:border-[#C6B39A]/55 backdrop-blur-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all group shadow-2xl"
              >
                {/* Visual Carousel Preview Side */}
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
                    <p className="text-xs font-bold text-[#C6B39A] uppercase tracking-wider mb-2">
                      {project.subtitle}
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-[#C6B39A] transition-colors">
                      {project.title}
                    </h3>
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
                        Figma & Next.js
                      </span>
                      <a
                        href="mailto:nayssa1310@gmail.com?subject=Consulta sobre caso de estudio"
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
          </div>

          {/* More Projects Action Button */}
          <div className="mt-16 sm:mt-20 flex justify-center">
            <Link href="/proyectos">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white/10 hover:bg-[#C6B39A] border border-[#C6B39A]/35 hover:border-[#C6B39A] backdrop-blur-md text-sm font-bold text-white hover:text-[#1A0735] shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_0_30px_rgba(198,179,154,0.45)] transition-all duration-300 cursor-pointer"
              >
                <span>Ver más proyectos</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* SKILLS & TOOLKIT */}
      <section id="habilidades" className="py-24 px-6 bg-[#14052B] border-t border-[#C6B39A]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C6B39A] bg-[#220D3E]/80 px-3.5 py-1 rounded-full border border-[#C6B39A]/30">
              Herramientas & Conocimiento
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mt-4">
              Mi Caja de Herramientas
            </h2>
            <p className="text-sm sm:text-base text-white/70 mt-3">
              Tecnologías y metodologías que combino en cada fase de diseño y desarrollo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <motion.div whileHover={{ y: -6 }} className="p-7 rounded-3xl bg-[#220D3E]/60 hover:bg-[#220D3E]/90 border border-[#C6B39A]/20 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#8D3A3C]/20 border border-[#C6B39A]/25 flex items-center justify-center p-2 text-[#C6B39A]">
                  <FigmaIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Diseño UX/UI</h3>
                  <p className="text-xs text-white/60">Experiencia e interfaz</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-white/80">
                {[
                  "Figma (Auto Layout, Components, Variants)",
                  "User Research & Entrevistas",
                  "Wireframing & Prototipado interactivo",
                  "Arquitectura de la Información",
                  "Design Systems & Guías de Estilo",
                  "Evaluación Heurística & Usabilidad",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C6B39A] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Category 2 */}
            <motion.div whileHover={{ y: -6 }} className="p-7 rounded-3xl bg-[#220D3E]/60 hover:bg-[#220D3E]/90 border border-[#C6B39A]/20 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#8D3A3C]/20 border border-[#C6B39A]/25 flex items-center justify-center text-[#C6B39A]">
                  <Layout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Desarrollo Front-End</h3>
                  <p className="text-xs text-white/60">Implementación en código</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-white/80">
                {[
                  "React & Next.js (App Router)",
                  "Tailwind CSS v4 & CSS moderno",
                  "TypeScript & JavaScript (ES6+)",
                  "HTML5 semántico & Accesibilidad web",
                  "Responsive Web Design (Mobile First)",
                  "Git & GitHub para control de versiones",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C6B39A] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Category 3 */}
            <motion.div whileHover={{ y: -6 }} className="p-7 rounded-3xl bg-[#220D3E]/60 hover:bg-[#220D3E]/90 border border-[#C6B39A]/20 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#8D3A3C]/20 border border-[#C6B39A]/25 flex items-center justify-center text-[#C6B39A]">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Ingeniería de Sistemas</h3>
                  <p className="text-xs text-white/60">Fundamentos técnicos</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-white/80">
                {[
                  "Estructuras de Datos & Algoritmos",
                  "Consumo e integración de APIs REST",
                  "Modelado de Sistemas & Diagramas de Flujo",
                  "Metodologías Ágiles (Scrum)",
                  "Criterio de rendimiento & optimización web",
                  "Resolución estructurada de problemas",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C6B39A] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DYNAMIC TECH ICONS RUNWAY / MARQUEE (EDGE TO EDGE) */}
      <section className="relative py-12 sm:py-14 bg-[#16052F] border-t border-b border-[#C6B39A]/20 overflow-hidden">
        {/* Soft edge gradient fades for cinematic entry & exit */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#16052F] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#16052F] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden select-none">
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 22,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex items-center gap-14 sm:gap-20 shrink-0 pr-14 sm:pr-20"
          >
            {[
              <FigmaIcon key="figma-1" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <ReactIcon key="react-1" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <NextjsIcon key="next-1" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <TailwindIcon key="tailwind-1" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <TypescriptIcon key="ts-1" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <GitIcon key="git-1" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <GithubIcon key="github-1" className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
              <FigmaIcon key="figma-2" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <ReactIcon key="react-2" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <NextjsIcon key="next-2" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <TailwindIcon key="tailwind-2" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <TypescriptIcon key="ts-2" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <GitIcon key="git-2" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <GithubIcon key="github-2" className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
            ].map((icon, idx) => (
              <div
                key={idx}
                className="opacity-75 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer flex items-center justify-center filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
              >
                {icon}
              </div>
            ))}
          </motion.div>

          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 22,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex items-center gap-14 sm:gap-20 shrink-0 pr-14 sm:pr-20"
            aria-hidden="true"
          >
            {[
              <FigmaIcon key="figma-dup-1" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <ReactIcon key="react-dup-1" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <NextjsIcon key="next-dup-1" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <TailwindIcon key="tailwind-dup-1" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <TypescriptIcon key="ts-dup-1" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <GitIcon key="git-dup-1" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <GithubIcon key="github-dup-1" className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
              <FigmaIcon key="figma-dup-2" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <ReactIcon key="react-dup-2" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <NextjsIcon key="next-dup-2" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <TailwindIcon key="tailwind-dup-2" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <TypescriptIcon key="ts-dup-2" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <GitIcon key="git-dup-2" className="w-8 h-8 sm:w-10 sm:h-10" />,
              <GithubIcon key="github-dup-2" className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
            ].map((icon, idx) => (
              <div
                key={idx}
                className="opacity-75 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer flex items-center justify-center filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
              >
                {icon}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTACT BANNER */}
      <section id="contacto" className="py-24 px-6 bg-[#120426] border-t border-[#C6B39A]/20">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#2A0E46] via-[#220D3E] to-[#1A0735] p-10 md:p-14 overflow-hidden border border-[#C6B39A]/30 shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#8D3A3C]/25 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#C6B39A]/15 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              <span className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 text-[#C6B39A] border border-[#C6B39A]/30">
                ¿Hablamos?
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-xl">
                Construyamos experiencias digitales memorables
              </h2>

              <p className="text-sm sm:text-base text-white/70 max-w-lg leading-relaxed">
                Actualmente estoy abierta a prácticas pre-profesionales, proyectos freelance y
                nuevas oportunidades donde pueda sumar valor con UX/UI y Front-End.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:nayssa1310@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C6B39A] hover:bg-[#D5C5AE] text-[#1A0735] font-bold text-sm shadow-[0_0_20px_rgba(198,179,154,0.3)] hover:shadow-[0_0_30px_rgba(198,179,154,0.5)] transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Enviar un correo</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/nayssa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/20"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/Nayssa10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/20"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </motion.a>
              </div>

              <p className="text-xs text-white/50 pt-4">
                nayssa1310@gmail.com · Lima, Perú
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
