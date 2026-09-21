"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCarousel from "@/components/ProjectCarousel";
import { featuredProjects } from "@/data/projects";
import {
  Mail,
  Code2,
  Layout,
  Check,
  Menu,
  ArrowUpRight,
  Sparkles,
  Layers,
  Palette,
  Send,
  Loader2,
  Briefcase,
  Building2,
  Calendar,
  Award,
  ExternalLink,
  ChevronDown,
  X,
} from "lucide-react";
import { Experience, defaultExperiences } from "@/data/experience";
import { Certificate, defaultCertificates } from "@/data/certificates";
import SignatureIntro from "@/components/SignatureIntro";

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
        fill="#140507"
      />
      <rect x="115" y="54" width="12" height="72" fill="#140507" />
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
  { top: "2%", left: "6%", size: "w-5 h-5", delay: 0, duration: 5.5, color: "text-[#D8C4AC]", type: "star" },
  { top: "4%", right: "12%", size: "w-6 h-6", delay: 1.2, duration: 6, color: "text-[#C8A49F]", type: "sparkle" },
  { top: "7%", left: "24%", size: "w-3.5 h-3.5", delay: 2.1, duration: 4.8, color: "text-[#D8C4AC]", type: "dot" },
  { top: "9%", right: "28%", size: "w-4 h-4", delay: 0.8, duration: 5.2, color: "text-[#EEE4DA]", type: "star" },
  { top: "12%", left: "4%", size: "w-7 h-7", delay: 1.7, duration: 6.8, color: "text-[#4D0E13]", type: "sparkle" },
  { top: "15%", right: "6%", size: "w-5 h-5", delay: 2.9, duration: 5.4, color: "text-[#D8C4AC]", type: "star" },

  // Card 1 zone (18% - 32%)
  { top: "18%", left: "12%", size: "w-3.5 h-3.5", delay: 0.5, duration: 4.5, color: "text-[#D8C4AC]", type: "dot" },
  { top: "21%", right: "16%", size: "w-6 h-6", delay: 1.9, duration: 6.2, color: "text-[#C8A49F]", type: "sparkle" },
  { top: "24%", left: "3%", size: "w-8 h-8", delay: 2.4, duration: 7.2, color: "text-[#4D0E13]", type: "layers" },
  { top: "26%", right: "4%", size: "w-4 h-4", delay: 0.3, duration: 5.1, color: "text-[#D8C4AC]", type: "star" },
  { top: "29%", left: "15%", size: "w-5 h-5", delay: 1.4, duration: 5.8, color: "text-[#EEE4DA]", type: "sparkle" },
  { top: "32%", right: "10%", size: "w-3.5 h-3.5", delay: 2.7, duration: 4.6, color: "text-[#4D0E13]", type: "dot" },

  // Gap between Card 1 and Card 2 (35% - 45%)
  { top: "35%", left: "7%", size: "w-5 h-5", delay: 0.9, duration: 5.6, color: "text-[#D8C4AC]", type: "star" },
  { top: "37%", right: "18%", size: "w-7 h-7", delay: 2.0, duration: 6.5, color: "text-[#C8A49F]", type: "sparkle" },
  { top: "40%", left: "20%", size: "w-4 h-4", delay: 1.1, duration: 4.9, color: "text-[#D8C4AC]", type: "dot" },
  { top: "42%", right: "3%", size: "w-9 h-9", delay: 0.6, duration: 7.8, color: "text-[#EEE4DA]", type: "palette" },
  { top: "45%", left: "4%", size: "w-6 h-6", delay: 2.3, duration: 6.1, color: "text-[#4D0E13]", type: "sparkle" },

  // Card 2 zone (48% - 60%)
  { top: "48%", right: "14%", size: "w-4 h-4", delay: 1.5, duration: 5.3, color: "text-[#D8C4AC]", type: "star" },
  { top: "51%", left: "10%", size: "w-5 h-5", delay: 2.8, duration: 6.0, color: "text-[#EEE4DA]", type: "sparkle" },
  { top: "53%", right: "5%", size: "w-3.5 h-3.5", delay: 0.4, duration: 4.7, color: "text-[#4D0E13]", type: "dot" },
  { top: "56%", left: "16%", size: "w-4 h-4", delay: 1.8, duration: 5.0, color: "text-[#D8C4AC]", type: "star" },
  { top: "59%", right: "11%", size: "w-7 h-7", delay: 2.5, duration: 6.7, color: "text-[#C8A49F]", type: "sparkle" },

  // Gap between Card 2 and Card 3 (62% - 72%)
  { top: "62%", left: "3%", size: "w-8 h-8", delay: 0.7, duration: 8.0, color: "text-[#D8C4AC]", type: "code" },
  { top: "65%", right: "7%", size: "w-5 h-5", delay: 1.6, duration: 5.5, color: "text-[#EEE4DA]", type: "star" },
  { top: "67%", left: "12%", size: "w-3.5 h-3.5", delay: 2.2, duration: 4.8, color: "text-[#4D0E13]", type: "dot" },
  { top: "70%", right: "15%", size: "w-6 h-6", delay: 0.9, duration: 6.3, color: "text-[#C8A49F]", type: "sparkle" },
  { top: "72%", left: "5%", size: "w-4 h-4", delay: 2.6, duration: 5.2, color: "text-[#D8C4AC]", type: "star" },

  // Card 3 & Bottom zone (75% - 98%)
  { top: "75%", right: "4%", size: "w-6 h-6", delay: 1.3, duration: 5.9, color: "text-[#EEE4DA]", type: "sparkle" },
  { top: "78%", left: "14%", size: "w-4 h-4", delay: 0.2, duration: 4.6, color: "text-[#4D0E13]", type: "dot" },
  { top: "81%", right: "12%", size: "w-8 h-8", delay: 2.1, duration: 6.9, color: "text-[#C8A49F]", type: "sparkle" },
  { top: "84%", left: "6%", size: "w-5 h-5", delay: 1.7, duration: 5.7, color: "text-[#D8C4AC]", type: "star" },
  { top: "87%", right: "20%", size: "w-3.5 h-3.5", delay: 2.9, duration: 4.7, color: "text-[#D8C4AC]", type: "dot" },
  { top: "90%", left: "11%", size: "w-6 h-6", delay: 0.6, duration: 6.4, color: "text-[#4D0E13]", type: "sparkle" },
  { top: "93%", right: "6%", size: "w-4 h-4", delay: 1.4, duration: 5.1, color: "text-[#D8C4AC]", type: "star" },
  { top: "96%", left: "18%", size: "w-3.5 h-3.5", delay: 2.4, duration: 4.9, color: "text-[#4D0E13]", type: "dot" },
  { top: "98%", right: "13%", size: "w-5 h-5", delay: 1.0, duration: 5.8, color: "text-[#C8A49F]", type: "sparkle" },
];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liveProjects, setLiveProjects] = useState(featuredProjects);
  const [liveExperiences, setLiveExperiences] = useState<Experience[]>(defaultExperiences);
  const [liveCertificates, setLiveCertificates] = useState<Certificate[]>(defaultCertificates);
  const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [liveProfile, setLiveProfile] = useState({
    name: "Nayssa Chu Bustamante",
    title: "Diseño UX/UI & Desarrollo Front-End",
    heroSubtitle: "Diseño interfaces intuitivas, elegantes y técnicamente viables.",
    aboutTitle: "Sobre mí",
    aboutText:
      "Estudiante de 8vo ciclo de Ingeniería de Sistemas e Informática. Lo que más me apasiona es el desarrollo Front-End y el diseño UX/UI. Me interesa no solo que una aplicación o página web funcione, sino también que sea intuitiva, visualmente atractiva y que realmente facilite la experiencia de quien la utiliza.",
    email: "nayssa1310@gmail.com",
    available: true,
    availableText: "Disponible para proyectos & prácticas",
    showExperience: false,
    showCertificates: true,
    location: "Lima, Perú",
    linkedin: "https://www.linkedin.com/in/nayssa",
    github: "https://github.com/Nayssa10",
  });

  useEffect(() => {
    // Show intro only on first visit per session
    try {
      const hasSeen = sessionStorage.getItem("portfolio_intro_seen");
      if (!hasSeen) {
        setShowIntro(true);
        sessionStorage.setItem("portfolio_intro_seen", "true");
      }
    } catch {}

    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const featured = data.filter((p: { featured?: boolean }) => p.featured);
          if (featured.length > 0) {
            setLiveProjects(featured);
          }
        }
      })
      .catch(() => {});

    fetch("/api/experiences")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLiveExperiences(data);
        }
      })
      .catch(() => {});

    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLiveCertificates(data);
        }
      })
      .catch(() => {});

    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) {
          setLiveProfile(data);
        }
      })
      .catch(() => {});
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(liveProfile.email || "nayssa1310@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setFormSent(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setFormSent(false), 5000);
      } else {
        // Fallback to mailto
        const subject = encodeURIComponent(`Mensaje de ${formState.name || "Contacto Portfolio"}`);
        const body = encodeURIComponent(`${formState.message}\n\nDe: ${formState.name} (${formState.email})`);
        window.open(`mailto:nayssa1310@gmail.com?subject=${subject}&body=${body}`, "_blank");
        setFormSent(true);
      }
    } catch {
      const subject = encodeURIComponent(`Mensaje de ${formState.name || "Contacto Portfolio"}`);
      const body = encodeURIComponent(`${formState.message}\n\nDe: ${formState.name} (${formState.email})`);
      window.open(`mailto:nayssa1310@gmail.com?subject=${subject}&body=${body}`, "_blank");
      setFormSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const projects = liveProjects;
  const displayedCertificates = showAllCertificates
    ? liveCertificates
    : liveCertificates.slice(0, 3);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#140507] text-[#EEE4DA] flex flex-col font-sans selection:bg-[#4D0E13] selection:text-[#EEE4DA]">
      {showIntro && (
        <SignatureIntro
          name="Nayssa Kristel"
          subtitle={liveProfile.title || "Diseño UX/UI · Desarrollo Front-End"}
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* HERO SECTION: Exact layout from user reference with interactive motion */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#160407] via-[#20070A] to-[#120305] px-6 sm:px-10 lg:px-16 py-6">


        {/* Floating Sparkles in the background */}
        <motion.div
          animate={{ y: [-15, 15, -15], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-1/4 pointer-events-none text-[#D8C4AC]/50"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        <motion.div
          animate={{ y: [15, -15, 15], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-36 right-1/4 pointer-events-none text-[#C8A49F]/50"
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
            className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#D8C4AC]/25 flex items-center justify-center font-serif font-bold text-2xl text-white shadow-lg transition-all"
          >
            N
          </motion.a>

          {/* Center Navigation Pill (Centered in header) */}
          <nav className="hidden md:flex items-center gap-6 px-7 py-2.5 rounded-full bg-white/10 hover:bg-white/[0.14] backdrop-blur-md border border-[#D8C4AC]/25 text-sm font-medium text-white/90 shadow-lg transition-all absolute left-1/2 -translate-x-1/2">
            <a href="#perfil" className="hover:text-[#D8C4AC] transition-colors">
              Perfil
            </a>
            <Link
              href="/proyectos"
              className="hover:text-[#D8C4AC] transition-colors"
            >
              Proyectos
            </Link>
            {liveProfile.showExperience && (
              <a href="#experiencia" className="hover:text-[#D8C4AC] transition-colors">
                Experiencia
              </a>
            )}
            {liveProfile.showCertificates !== false && liveCertificates.length > 0 && (
              <a href="#certificados" className="hover:text-[#D8C4AC] transition-colors">
                Certificados
              </a>
            )}
            <a href="#habilidades" className="hover:text-[#D8C4AC] transition-colors">
              Habilidades
            </a>
            <a href="#contacto" className="hover:text-[#D8C4AC] transition-colors">
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
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#D8C4AC]/25 flex items-center justify-center text-white/90 hover:text-white transition-all shadow-md"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title="Menú"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className="md:hidden w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#D8C4AC]/25 flex items-center justify-center text-white/90 hover:text-white transition-all shadow-md cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </motion.header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="md:hidden relative z-40 w-full max-w-sm mx-auto my-3 p-5 rounded-2xl bg-[#22080C]/95 backdrop-blur-xl border border-[#D8C4AC]/30 shadow-2xl flex flex-col gap-3"
            >
              <a
                href="#perfil"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/10 text-white/90 hover:text-white text-sm font-medium transition-colors"
              >
                Perfil
              </a>
              <Link
                href="/proyectos"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/10 text-white/90 hover:text-white text-sm font-medium transition-colors"
              >
                Proyectos
              </Link>
              {liveProfile.showExperience && (
                <a
                  href="#experiencia"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl hover:bg-white/10 text-white/90 hover:text-white text-sm font-medium transition-colors"
                >
                  Experiencia
                </a>
              )}
              {liveProfile.showCertificates !== false && liveCertificates.length > 0 && (
                <a
                  href="#certificados"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl hover:bg-white/10 text-white/90 hover:text-white text-sm font-medium transition-colors"
                >
                  Certificados
                </a>
              )}
              <a
                href="#habilidades"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/10 text-white/90 hover:text-white text-sm font-medium transition-colors"
              >
                Habilidades
              </a>
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-[#D8C4AC] text-[#140507] text-center text-sm font-bold shadow-md"
              >
                Contacto
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero 3-Column Split Content (Perfil section first, at top) */}
        <div id="perfil" className="relative z-20 w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 py-6 lg:py-0">
          {/* Left Column: Welcome */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5 order-2 lg:order-1"
          >
            <h1 className="font-dancing text-4xl sm:text-6xl lg:text-[66px] font-bold text-white leading-[1.15] tracking-wide">
              {liveProfile.name.split(" ").length > 1 ? (
                <>
                  {liveProfile.name.split(" ").slice(0, -1).join(" ")} <br className="hidden sm:inline" />{" "}
                  <span className="font-semibold bg-gradient-to-r from-[#EEE4DA] via-[#D8C4AC] to-[#C8A49F] bg-clip-text text-transparent">
                    {liveProfile.name.split(" ").slice(-1)[0]}
                  </span>
                </>
              ) : (
                liveProfile.name
              )}
            </h1>

            {liveProfile.available && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4D0E13]/50 border border-[#C8A49F]/40 text-[11px] font-semibold text-[#EEE4DA] backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {liveProfile.availableText}
              </span>
            )}

            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-xs sm:max-w-sm font-light">
              {liveProfile.heroSubtitle}
            </p>
          </motion.div>

          {/* Center Column: Big Beautiful Avatar with Floating Motion */}
          <div className="lg:col-span-4 flex justify-center items-end relative order-1 lg:order-2 self-end h-full min-h-[300px] sm:min-h-[460px] lg:min-h-[580px]">

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
                  className="w-auto h-[320px] sm:h-[460px] lg:h-[560px] max-w-[85vw] sm:max-w-none object-contain select-none pointer-events-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: About Me */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col items-center text-center gap-5 sm:gap-6 order-3"
          >
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[50px] font-semibold text-white tracking-tight w-full text-center">
              Sobre mí
            </h2>

            <p className="text-xs sm:text-[15px] text-white/80 leading-relaxed max-w-sm sm:max-w-md font-light text-center whitespace-pre-line">
              {liveProfile.aboutText}
            </p>

            <div className="pt-2 sm:pt-3 w-full flex justify-center lg:justify-end">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#proyectos"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-[#D8C4AC] hover:bg-[#EEE4DA] text-[#140507] font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(216,196,172,0.3)] hover:shadow-[0_0_30px_rgba(216,196,172,0.5)] transition-all"
              >
                Ver Proyectos
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row (Copyright, Scroll Icon, Socials) */}
        <footer className="relative z-30 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#D8C4AC]/15 text-xs text-white/50">
          {/* Left: Copyright */}
          <div className="order-2 sm:order-1">
            <span>© {new Date().getFullYear()} {liveProfile.name} · Todos los derechos reservados</span>
          </div>

          {/* Center: Mouse Scroll Indicator (Animated) */}
          <div className="order-1 sm:order-2 flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
            <a
              href="#proyectos"
              className="w-5 h-9 rounded-full border-2 border-[#D8C4AC]/40 flex items-start justify-center p-1 backdrop-blur-sm shadow-sm"
              aria-label="Hacer scroll hacia abajo"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-2 bg-[#D8C4AC] rounded-full"
              />
            </a>
          </div>

          {/* Right: Social Circles */}
          <div className="order-3 flex items-center gap-2.5">
            <motion.a
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href={`mailto:${liveProfile.email}`}
              title="Email"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D8C4AC] hover:text-[#140507] text-[#EEE4DA]/90 border border-[#D8C4AC]/30 backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
            >
              <Mail className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href={liveProfile.linkedin || "https://www.linkedin.com/in/nayssa"}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D8C4AC] hover:text-[#140507] text-[#EEE4DA]/90 border border-[#D8C4AC]/30 backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
            >
              <LinkedinIcon className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href={liveProfile.github || "https://github.com/Nayssa10"}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D8C4AC] hover:text-[#140507] text-[#EEE4DA]/90 border border-[#D8C4AC]/30 backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
            >
              <GithubIcon className="w-4 h-4" />
            </motion.a>
          </div>
        </footer>
      </section>

      {/* SELECTED WORK / CASE STUDIES - HORIZONTAL FEATURE ROWS */}
      <section id="proyectos" className="relative w-full max-w-full py-24 sm:py-28 px-6 bg-gradient-to-b from-[#120305] via-[#160407] to-[#140507] border-t border-[#D8C4AC]/20 overflow-hidden overflow-x-clip [contain:paint]">
        {/* Ambient Atmospheric Glows */}
        <div className="absolute top-1/4 -left-16 w-80 h-80 bg-[#4D0E13]/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 -right-16 w-80 h-80 bg-[#C8A49F]/20 rounded-full blur-[100px] pointer-events-none" />

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
                Una selección de los proyectos que he desarrollado, enfocados en crear soluciones web funcionales, atractivas y bien construidas.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-10 sm:gap-12">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-[#22080C]/80 hover:bg-[#2A0B10] border border-[#D8C4AC]/20 hover:border-[#D8C4AC]/55 backdrop-blur-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all group shadow-2xl"
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
                  className={`lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 ${
                    idx % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-[#D8C4AC] transition-colors">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="text-xs font-semibold text-[#D8C4AC] uppercase tracking-wider mt-2">
                        {project.subtitle}
                      </p>
                    )}
                    <p className="text-sm sm:text-base text-white/75 mt-4 leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg bg-white/5 text-white/85 text-xs font-medium border border-[#D8C4AC]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-end pt-2">
                      <a
                        href={project.link?.trim() || project.github?.trim() || "https://github.com/Nayssa10"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D8C4AC] hover:text-white transition-colors group/link"
                      >
                        <span>Ver proyecto</span>
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
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white/10 hover:bg-[#D8C4AC] border border-[#D8C4AC]/35 hover:border-[#D8C4AC] backdrop-blur-md text-sm font-bold text-white hover:text-[#140507] shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_0_30px_rgba(216,196,172,0.45)] transition-all duration-300 cursor-pointer"
              >
                <span>Ver más proyectos</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* EXPERIENCE / EXPERIENCIA (Conditionally rendered from Admin panel) */}
      {liveProfile.showExperience && (
        <section id="experiencia" className="relative w-full max-w-full py-24 sm:py-28 px-6 bg-gradient-to-b from-[#140507] via-[#20070A] to-[#140507] border-t border-[#D8C4AC]/20 overflow-hidden overflow-x-clip [contain:paint]">
          {/* Ambient Background Glows */}
          <div className="absolute top-1/3 -left-20 w-80 h-80 bg-[#4D0E13]/25 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#C8A49F]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#D8C4AC]/25 text-[#D8C4AC] text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Trayectoria & Práctica</span>
              </div>
              <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-white font-normal mb-4">
                Experiencia Laboral
              </h2>
              <p className="text-sm sm:text-base text-[#D8C4AC]/80 font-light leading-relaxed">
                Roles y proyectos donde he aportado valor en diseño de interfaces y desarrollo front-end.
              </p>
            </div>

            {/* Experiences List */}
            <div className="space-y-6 sm:space-y-8">
              {liveExperiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] border border-[#D8C4AC]/20 hover:border-[#D8C4AC]/40 transition-all duration-300 backdrop-blur-md shadow-lg group relative"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-serif italic text-xl sm:text-2xl text-white font-medium group-hover:text-[#EEE4DA] transition-colors">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4D0E13] text-[#EEE4DA] border border-[#C8A49F]/40 font-bold shadow-sm">
                            Actual
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#D8C4AC] mt-1.5 font-medium">
                        <Building2 className="w-3.5 h-3.5 opacity-80" />
                        <span>{exp.company}</span>
                        {exp.location && (
                          <>
                            <span className="opacity-40">·</span>
                            <span className="text-xs text-[#D8C4AC]/70">{exp.location}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-[#D8C4AC]/20 text-xs font-mono text-[#D8C4AC] shrink-0 self-start">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#EEE4DA]/80 leading-relaxed font-light mb-5 whitespace-pre-line">
                    {exp.description}
                  </p>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-[#D8C4AC]/10">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-[#C8A49F]/10 text-[#EEE4DA] text-xs font-mono border border-[#C8A49F]/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CERTIFICATES / CERTIFICADOS & LOGROS */}
      {liveProfile.showCertificates !== false && liveCertificates.length > 0 && (
        <section id="certificados" className="relative w-full max-w-full py-24 sm:py-28 px-6 bg-gradient-to-b from-[#140507] via-[#1C060A] to-[#140507] border-t border-[#D8C4AC]/20 overflow-hidden overflow-x-clip [contain:paint]">
          {/* Ambient Background Glows */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#4D0E13]/25 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-[#C8A49F]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#D8C4AC]/25 text-[#D8C4AC] text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md">
                <Award className="w-3.5 h-3.5" />
                <span>Validación & Credenciales</span>
              </div>
              <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-white font-normal mb-4">
                Certificados & Logros
              </h2>
              <p className="text-sm sm:text-base text-[#D8C4AC]/80 font-light leading-relaxed">
                Certificaciones, cursos y reconocimientos que respaldan mi aprendizaje continuo, preparación técnica y desarrollo profesional.
              </p>
            </div>

            {/* Certificates Grid */}
            <div
              className={`grid grid-cols-1 ${
                displayedCertificates.length === 1
                  ? "max-w-md mx-auto"
                  : displayedCertificates.length === 2
                  ? "md:grid-cols-2 max-w-3xl mx-auto"
                  : "md:grid-cols-2 lg:grid-cols-3"
              } gap-6 sm:gap-8`}
            >
              {displayedCertificates.map((cert, idx) => (
                <motion.div
                  key={cert.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-[#D8C4AC]/20 hover:border-[#D8C4AC]/50 transition-all duration-300 backdrop-blur-md shadow-lg flex flex-col justify-between group relative"
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
                      <h3 className="font-serif italic text-xl sm:text-2xl text-white font-medium group-hover:text-[#EEE4DA] transition-colors leading-snug">
                        {cert.title}
                      </h3>
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
            </div>

            {/* View More Certificates Action Button (shown when more than 3) */}
            {liveCertificates.length > 3 && (
              <div className="mt-14 sm:mt-16 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowAllCertificates(!showAllCertificates)}
                  className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white/10 hover:bg-[#D8C4AC] border border-[#D8C4AC]/35 hover:border-[#D8C4AC] backdrop-blur-md text-sm font-bold text-white hover:text-[#140507] shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_0_30px_rgba(216,196,172,0.45)] transition-all duration-300 cursor-pointer"
                >
                  <span>
                    {showAllCertificates
                      ? "Ver menos certificados"
                      : `Ver más certificados (${liveCertificates.length - 3})`}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      showAllCertificates ? "rotate-180" : "group-hover:translate-y-0.5"
                    }`}
                  />
                </motion.button>
              </div>
            )}
          </div>

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
                  className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-[#4D0E13] text-[#EEE4DA] text-xs font-mono uppercase tracking-wider border border-[#D8C4AC]/30 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* SKILLS TIMELINE / HABILIDADES */}
      <section id="habilidades" className="w-full max-w-full py-24 px-6 bg-gradient-to-b from-[#140507] via-[#22080C] to-[#160407] border-t border-[#D8C4AC]/20 relative overflow-hidden overflow-x-clip [contain:paint]">
        {/* Subtle, faint ambient stars */}
        <motion.div
          animate={{ y: [-4, 4, -4], opacity: [0.12, 0.3, 0.12] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-[8%] pointer-events-none text-[#D8C4AC]/30"
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
        <motion.div
          animate={{ y: [4, -4, 4], opacity: [0.12, 0.3, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-36 right-[8%] pointer-events-none text-[#C8A49F]/40"
        >
          <FourPointStar className="w-4 h-4" />
        </motion.div>


        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header with scroll enter animation */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#EEE4DA] bg-[#4D0E13]/60 px-3.5 py-1 rounded-full border border-[#C8A49F]/30">
              Especialidad & Dominio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mt-4">
              Mis Habilidades
            </h2>
            <p className="text-sm sm:text-base text-white/70 mt-3 leading-relaxed">
              Disciplinas y competencias prácticas que combino para crear interfaces intuitivas, escalables y con criterio técnico.
            </p>
          </motion.div>

          {/* DESKTOP TIMELINE (Compact & Scalable: Ready for 3, 4 or more pillars) */}
          <div className="hidden lg:flex flex-col relative py-4">
            {/* TIMELINE AXIS & NODES */}
            <div className="relative mb-8">
              {/* Continuous Clean Horizontal Line (Draws smoothly on scroll) */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 left-10 right-10 h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#D8C4AC]/45 to-transparent z-0 origin-center"
              />

              <div className="grid grid-cols-3 gap-8 relative z-10">
                {/* Node 1 */}
                <motion.div
                  initial={{ opacity: 0, y: -16, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-13 h-13 rounded-full bg-[#140507] border border-[#D8C4AC]/60 flex items-center justify-center text-[#D8C4AC] shadow-md relative z-20 cursor-pointer transition-transform"
                  >
                    <Palette className="w-5 h-5" />
                  </motion.div>
                  {/* Compact stem & arrowhead pointing DOWN */}
                  <div className="flex flex-col items-center mt-2">
                    <div className="w-0.5 h-6 bg-[#D8C4AC]/70" />
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-[#D8C4AC]/80" />
                  </div>
                </motion.div>

                {/* Node 2 */}
                <motion.div
                  initial={{ opacity: 0, y: -16, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-13 h-13 rounded-full bg-[#140507] border border-[#D8C4AC]/60 flex items-center justify-center text-[#D8C4AC] shadow-md relative z-20 cursor-pointer transition-transform"
                  >
                    <Layout className="w-5 h-5" />
                  </motion.div>
                  <div className="flex flex-col items-center mt-2">
                    <div className="w-0.5 h-6 bg-[#D8C4AC]/70" />
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-[#D8C4AC]/80" />
                  </div>
                </motion.div>

                {/* Node 3 */}
                <motion.div
                  initial={{ opacity: 0, y: -16, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-13 h-13 rounded-full bg-[#140507] border border-[#D8C4AC]/60 flex items-center justify-center text-[#D8C4AC] shadow-md relative z-20 cursor-pointer transition-transform"
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  <div className="flex flex-col items-center mt-2">
                    <div className="w-0.5 h-6 bg-[#D8C4AC]/70" />
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-[#D8C4AC]/80" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* COLUMNS ALIGNED UNDERNEATH WITH ORGANIC LEVITATION */}
            <div className="grid grid-cols-3 gap-8 text-center items-start">
              {/* Col 1: Diseño UX/UI (Floats gently) */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="px-3 flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="flex flex-col items-center cursor-default transition-transform"
                >
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#D8C4AC] uppercase block mb-1.5">
                    01 · Experiencia
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                    Diseño UX/UI
                  </h3>
                  <p className="text-xs sm:text-[13px] text-white/70 max-w-xs mx-auto leading-relaxed font-light mb-3">
                    Interfaces intuitivas, prototipado interactivo y diseño centrado en resolver fricciones de usuario.
                  </p>
                  <div className="text-[11px] font-medium text-[#C8A49F] tracking-wide">
                    Figma · Design Systems · Prototipado
                  </div>
                </motion.div>
              </motion.div>

              {/* Col 2: Desarrollo Front-End (Counter-floats) */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="px-3 flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="flex flex-col items-center cursor-default transition-transform"
                >
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#D8C4AC] uppercase block mb-1.5">
                    02 · Desarrollo
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                    Desarrollo Front-End
                  </h3>
                  <p className="text-xs sm:text-[13px] text-white/70 max-w-xs mx-auto leading-relaxed font-light mb-3">
                    Traducción precisa a componentes modulares, limpios y dinámicos en código moderno.
                  </p>
                  <div className="text-[11px] font-medium text-[#C8A49F] tracking-wide">
                    Next.js · React · Tailwind CSS · TypeScript
                  </div>
                </motion.div>
              </motion.div>

              {/* Col 3: Rendimiento & a11y (Floats gently) */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="px-3 flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="flex flex-col items-center cursor-default transition-transform"
                >
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#D8C4AC] uppercase block mb-1.5">
                    03 · Calidad
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                    Rendimiento & a11y
                  </h3>
                  <p className="text-xs sm:text-[13px] text-white/70 max-w-xs mx-auto leading-relaxed font-light mb-3">
                    Accesibilidad universal, diseño responsive mobile-first y optimización web para velocidad real.
                  </p>
                  <div className="text-[11px] font-medium text-[#C8A49F] tracking-wide">
                    Accesibilidad a11y · Mobile-First · Performance
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* MOBILE / TABLET TIMELINE (Clean Open Stream with Entrance Animation) */}
          <div className="lg:hidden relative pl-8 border-l-2 border-[#D8C4AC]/40 space-y-10 my-8 ml-4">
            {[
              {
                badge: "01 · Experiencia",
                title: "Diseño UX/UI",
                desc: "Interfaces intuitivas, prototipado interactivo y diseño centrado en personas.",
                icon: <Palette className="w-5 h-5 text-[#D8C4AC]" />,
              },
              {
                badge: "02 · Desarrollo",
                title: "Desarrollo Front-End",
                desc: "Traducción precisa a componentes modulares, limpios y dinámicos en código moderno.",
                icon: <Layout className="w-5 h-5 text-[#D8C4AC]" />,
              },
              {
                badge: "03 · Calidad",
                title: "Rendimiento & a11y",
                desc: "Accesibilidad universal, diseño responsive mobile-first y código optimizado.",
                icon: <Sparkles className="w-5 h-5 text-[#D8C4AC]" />,
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Node icon attached to the vertical line */}
                <div className="absolute -left-[45px] top-0 w-10 h-10 rounded-full bg-[#140507] border-2 border-[#D8C4AC] flex items-center justify-center shadow-md">
                  {step.icon}
                </div>

                <div>
                  <span className="text-xs font-mono font-bold tracking-wider text-[#D8C4AC] block mb-1">
                    {step.badge}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC TECH ICONS RUNWAY / MARQUEE (EDGE TO EDGE) */}
      <section className="relative w-full max-w-full py-12 sm:py-14 bg-[#160407] border-t border-b border-[#D8C4AC]/20 overflow-hidden overflow-x-clip [contain:paint]">
        {/* Soft edge gradient fades for cinematic entry & exit */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#160407] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#160407] to-transparent z-10 pointer-events-none" />

        <div className="w-full max-w-full flex overflow-hidden select-none">
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

      {/* 2-COLUMN SPLIT CONTACT SECTION (Compact & Refined) */}
      <section id="contacto" className="w-full max-w-full py-12 sm:py-14 px-6 bg-gradient-to-b from-[#160407] via-[#20070A] to-[#120305] border-t border-[#D8C4AC]/20 relative overflow-hidden overflow-x-clip [contain:paint]">
        <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Title + Subtitle + Socials */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EEE4DA] bg-[#4D0E13]/60 px-2.5 py-0.5 rounded-full border border-[#C8A49F]/30 mb-3">
              Contacto
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-white leading-tight max-w-sm">
              Construyamos experiencias digitales memorables
            </h2>

            <p className="text-xs text-white/70 leading-relaxed font-light mt-2.5 max-w-sm">
              Abierta a proyectos freelance, colaboraciones y nuevas oportunidades donde pueda sumar valor con criterio UX/UI y front-end.
            </p>

            {/* Social Icons & Email below it */}
            <div className="mt-5 pt-4 border-t border-white/10 w-full flex flex-col gap-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D8C4AC] font-bold">
                Redes & Canales
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <motion.a
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  href={liveProfile.linkedin || "https://www.linkedin.com/in/nayssa"}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#D8C4AC] hover:text-[#140507] text-white border border-[#D8C4AC]/30 flex items-center justify-center transition-all shadow-sm"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  href={liveProfile.github || "https://github.com/Nayssa10"}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#D8C4AC] hover:text-[#140507] text-white border border-[#D8C4AC]/30 flex items-center justify-center transition-all shadow-sm"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={copyEmail}
                  title="Copiar correo"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/12 border border-white/15 hover:border-[#D8C4AC]/40 text-xs text-white/90 font-mono transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5 text-[#D8C4AC]" />}
                  <span>{copied ? "¡Copiado!" : (liveProfile.email || "nayssa1310@gmail.com")}</span>
                </motion.button>
              </div>

              <span className="text-[10px] font-mono text-white/40 tracking-wider">
                {liveProfile.location || "Lima, Perú"}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Direct Message Card */}
          <div className="lg:col-span-6 w-full">
            <div className="rounded-2xl bg-[#22080C]/85 border border-[#D8C4AC]/20 p-5 sm:p-6 backdrop-blur-md shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                    Escribime directamente
                  </h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <form onSubmit={handleSendMessage} className="flex flex-col gap-2.5">
                  <div>
                    <label className="block text-[10px] font-mono text-white/60 uppercase tracking-wider mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Tu nombre o empresa"
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 focus:border-[#D8C4AC] focus:bg-white/[0.09] text-xs text-white placeholder-white/30 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-white/60 uppercase tracking-wider mb-1">
                      Tu Correo
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="nombre@ejemplo.com"
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 focus:border-[#D8C4AC] focus:bg-white/[0.09] text-xs text-white placeholder-white/30 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-white/60 uppercase tracking-wider mb-1">
                      Mensaje
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="¿De qué trata tu proyecto o propuesta?"
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 focus:border-[#D8C4AC] focus:bg-white/[0.09] text-xs text-white placeholder-white/30 outline-none transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#D8C4AC] hover:bg-[#EEE4DA] text-[#140507] font-bold text-xs tracking-wide shadow-sm transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Enviando mensaje...</span>
                      </>
                    ) : formSent ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-800" />
                        <span>¡Mensaje enviado con éxito!</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar mensaje</span>
                        <Send className="w-3 h-3" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
