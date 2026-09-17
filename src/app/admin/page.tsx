"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  FolderKanban,
  Wrench,
  Inbox,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  Mail,
  Save,
  Check,
  X,
  Sparkles,
  ArrowUpRight,
  ArrowLeft,
  Eye,
  Upload,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  category: string;
  highlight?: string | null;
  color?: string | null;
  description: string;
  problem?: string | null;
  solution?: string | null;
  impact?: string | null;
  featured: boolean;
  order: number;
  tags: string[];
  tools: string[];
  images: string[];
  link?: string | null;
  github?: string | null;
}

interface Skill {
  id: string;
  badge?: string | null;
  category: string;
  title: string;
  description: string;
  tags: string[];
  order: number;
}

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface Profile {
  id: string;
  name: string;
  title: string;
  heroSubtitle?: string;
  bio: string;
  aboutTitle?: string;
  aboutText?: string;
  email: string;
  available: boolean;
  availableText: string;
  location: string;
  linkedin: string;
  github: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  // Perfil is the FIRST tab by default!
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "skills" | "messages">("profile");
  const [loading, setLoading] = useState(true);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Form states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: "",
    subtitle: "",
    slug: "",
    category: "UX/UI Design",
    highlight: "",
    color: "from-[#4D0E13]/60 via-[#22080C]/90 to-[#140507]",
    description: "",
    problem: "",
    solution: "",
    impact: "",
    featured: true,
    order: 0,
    tags: [],
    tools: [],
    images: [],
    link: "",
    github: "",
  });

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isCreatingSkill, setIsCreatingSkill] = useState(false);
  const [skillForm, setSkillForm] = useState<Partial<Skill>>({
    badge: "01 · Experiencia",
    category: "UX/UI Design",
    title: "",
    description: "",
    tags: [],
    order: 0,
  });

  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");

  // Real local image upload states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleImageFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImages(true);
    setUploadError("");

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Error al subir imágenes");
      }

      const data = await res.json();
      if (data.urls && data.urls.length > 0) {
        setProjectForm((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...data.urls],
        }));
      }
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || "Error al subir imágenes");
    } finally {
      setIsUploadingImages(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setProjectForm((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isCreatingProject || editingProject) {
          setIsCreatingProject(false);
          setEditingProject(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCreatingProject, editingProject]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profRes, projRes, skillRes, msgRes] = await Promise.all([
        fetch("/api/admin/profile"),
        fetch("/api/admin/projects"),
        fetch("/api/admin/skills"),
        fetch("/api/admin/messages"),
      ]);

      if (projRes.status === 401 || profRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (profRes.ok) setProfile(await profRes.json());
      if (projRes.ok) setProjects(await projRes.json());
      if (skillRes.ok) setSkills(await skillRes.json());
      if (msgRes.ok) setMessages(await msgRes.json());
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // --- Project Handlers ---
  const handleSaveProject = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const url = editingProject
        ? `/api/admin/projects/${editingProject.id}`
        : "/api/admin/projects";
      const method = editingProject ? "PUT" : "POST";

      const autoSlug =
        projectForm.slug ||
        (projectForm.title || "")
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") ||
        `proyecto-${Date.now()}`;

      const payload = {
        ...projectForm,
        slug: autoSlug,
        color:
          projectForm.color ||
          "from-[#4D0E13]/60 via-[#22080C]/90 to-[#140507]",
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEditingProject(null);
        setIsCreatingProject(false);
        fetchData();
      }
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("¿Eliminar este proyecto?")) return;
    try {
      await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  // --- Skill Handlers ---
  const handleSaveSkill = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const url = editingSkill
        ? `/api/admin/skills/${editingSkill.id}`
        : "/api/admin/skills";
      const method = editingSkill ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillForm),
      });

      if (res.ok) {
        setEditingSkill(null);
        setIsCreatingSkill(false);
        fetchData();
      }
    } catch (err) {
      console.error("Error saving skill:", err);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm("¿Eliminar esta habilidad?")) return;
    try {
      await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  // --- Message Handlers ---
  const handleToggleReadMessage = async (id: string, currentRead: boolean) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !currentRead }),
      });
      fetchData();
    } catch (err) {
      console.error("Error toggling message read status:", err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("¿Eliminar este mensaje?")) return;
    try {
      await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  // --- Profile Handlers ---
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        setProfileSuccessMsg("¡Todos los cambios del perfil fueron guardados!");
        setTimeout(() => setProfileSuccessMsg(""), 3500);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#160407] text-[#EEE4DA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#D8C4AC] border-t-transparent rounded-full animate-spin" />
          <p className="font-serif italic text-sm text-[#D8C4AC]">Cargando panel de gestión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#160407] via-[#20070A] to-[#120305] text-[#EEE4DA] flex flex-col md:flex-row font-sans selection:bg-[#4D0E13] selection:text-[#EEE4DA] relative">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[480px] h-[480px] bg-[#4D0E13]/35 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-64 w-[480px] h-[480px] bg-[#C8A49F]/15 rounded-full blur-[150px] pointer-events-none" />

      {/* FIXED LEFT SIDEBAR */}
      <aside className="md:fixed md:inset-y-0 md:left-0 md:w-64 w-full bg-[#160407]/95 border-b md:border-b-0 md:border-r border-[#D8C4AC]/20 flex flex-col justify-between z-30 backdrop-blur-xl shadow-2xl shrink-0">
        {/* Top: Brand & User Info */}
        <div className="p-5 sm:p-6 border-b border-[#D8C4AC]/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4D0E13] border border-[#D8C4AC]/40 flex items-center justify-center text-[#D8C4AC] font-serif italic text-xl shadow-inner shrink-0">
              N
            </div>
            <div className="min-w-0">
              <h1 className="font-serif italic text-base leading-tight text-white flex items-center gap-1.5">
                <span>Panel de Gestión</span>
                <span className="text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-[#4D0E13] text-[#EEE4DA] border border-[#C8A49F]/40 not-italic font-bold">
                  Admin
                </span>
              </h1>
              <p className="text-[11px] font-mono text-[#D8C4AC]/80 font-medium truncate mt-0.5">
                {profile?.name || "Nayssa Chu Bustamante"}
              </p>
            </div>
          </div>
        </div>

        {/* Middle: Navigation Links (Perfil first) */}
        <nav className="flex-1 p-3 sm:p-4 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto">
          {/* 1. PERFIL (FIRST) */}
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 md:flex-none flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "profile"
                ? "bg-[#D8C4AC] text-[#140507] shadow-lg shadow-black/40 font-bold"
                : "text-[#D8C4AC]/80 hover:text-[#EEE4DA] hover:bg-white/[0.06]"
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>Perfil</span>
          </button>

          {/* 2. PROYECTOS */}
          <button
            onClick={() => {
              setActiveTab("projects");
              setIsCreatingProject(false);
              setEditingProject(null);
            }}
            className={`flex-1 md:flex-none flex items-center justify-between gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "projects"
                ? "bg-[#D8C4AC] text-[#140507] shadow-lg shadow-black/40 font-bold"
                : "text-[#D8C4AC]/80 hover:text-[#EEE4DA] hover:bg-white/[0.06]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FolderKanban className="w-4 h-4 shrink-0" />
              <span>Proyectos</span>
            </div>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                activeTab === "projects"
                  ? "bg-[#140507]/20 text-[#140507]"
                  : "bg-[#4D0E13]/60 text-[#EEE4DA]"
              }`}
            >
              {projects.length}
            </span>
          </button>

          {/* 3. HABILIDADES */}
          <button
            onClick={() => {
              setActiveTab("skills");
              setIsCreatingSkill(false);
              setEditingSkill(null);
            }}
            className={`flex-1 md:flex-none flex items-center justify-between gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "skills"
                ? "bg-[#D8C4AC] text-[#140507] shadow-lg shadow-black/40 font-bold"
                : "text-[#D8C4AC]/80 hover:text-[#EEE4DA] hover:bg-white/[0.06]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Wrench className="w-4 h-4 shrink-0" />
              <span>Habilidades</span>
            </div>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                activeTab === "skills"
                  ? "bg-[#140507]/20 text-[#140507]"
                  : "bg-[#4D0E13]/60 text-[#EEE4DA]"
              }`}
            >
              {skills.length}
            </span>
          </button>

          {/* 4. MENSAJES */}
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex-1 md:flex-none flex items-center justify-between gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "messages"
                ? "bg-[#D8C4AC] text-[#140507] shadow-lg shadow-black/40 font-bold"
                : "text-[#D8C4AC]/80 hover:text-[#EEE4DA] hover:bg-white/[0.06]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Inbox className="w-4 h-4 shrink-0" />
              <span>Mensajes</span>
            </div>
            {unreadMessagesCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#4D0E13] text-[#EEE4DA] border border-[#C8A49F]/30 shadow-sm">
                {unreadMessagesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Bottom: External link & Logout */}
        <div className="p-4 border-t border-[#D8C4AC]/15 flex flex-row md:flex-col gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex-1 flex items-center justify-center gap-2 text-xs text-[#EEE4DA] hover:text-white px-3.5 py-2 rounded-xl bg-[#24090D] hover:bg-[#340E14] transition-all border border-[#D8C4AC]/25 font-medium shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#D8C4AC]" />
            <span>Ver Portafolio</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 text-xs text-[#C8A49F] hover:text-[#EEE4DA] px-3.5 py-2 rounded-xl bg-[#4D0E13]/40 hover:bg-[#4D0E13]/80 transition-all border border-[#C8A49F]/30 cursor-pointer font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Salir</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area (offset by left sidebar on desktop) */}
      <div className="flex-1 md:ml-64 p-6 sm:p-10 max-w-5xl w-full relative z-10 min-h-screen">
        <main className="w-full">
          {/* TAB 1: PERFIL & BIO (FIRST!) */}
          {activeTab === "profile" && profile && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                  Perfil, Hero & Sobre Mí
                </h2>
                <p className="text-xs text-[#D8C4AC] mt-1 font-medium">
                  Administra todos los textos, títulos y enlaces mostrados en la cabecera y sección principal
                </p>
              </div>

              {profileSuccessMsg && (
                <div className="p-4 rounded-2xl bg-[#4D0E13] border border-[#D8C4AC]/50 text-[#EEE4DA] text-xs flex items-center gap-2.5 shadow-md font-medium">
                  <CheckCircle className="w-4 h-4 text-[#D8C4AC]" />
                  <span>{profileSuccessMsg}</span>
                </div>
              )}

              <form
                onSubmit={handleSaveProfile}
                className="bg-[#22080C]/90 border border-[#D8C4AC]/25 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl shadow-2xl shadow-black/40"
              >
                {/* 1. Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                      Título
                    </label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) =>
                        setProfile({ ...profile, title: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                    />
                  </div>
                </div>

                {/* 2. Hero Subtitle */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                    Bajada del Hero
                  </label>
                  <textarea
                    rows={2}
                    value={profile.heroSubtitle ?? profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, heroSubtitle: e.target.value, bio: e.target.value })
                    }
                    placeholder="Diseño UX/UI & Desarrollo Front-End..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC] leading-relaxed"
                  />
                </div>

                {/* 3. Sobre Mí */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                    Sobre Mí
                  </label>
                  <textarea
                    rows={4}
                    value={profile.aboutText || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, aboutText: e.target.value })
                    }
                    placeholder="Estudiante de 8vo ciclo de Ingeniería de Sistemas e Informática..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC] leading-relaxed"
                  />
                </div>

                {/* 4. Availability Status */}
                <div className="p-5 rounded-2xl bg-[#140406]/90 border border-[#D8C4AC]/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif italic text-base text-white font-medium">
                        Estado de Disponibilidad
                      </h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.available}
                        onChange={(e) =>
                          setProfile({ ...profile, available: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#4D0E13] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D8C4AC]"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC]/90 font-medium mb-1">
                      Texto de disponibilidad
                    </label>
                    <input
                      type="text"
                      value={profile.availableText}
                      onChange={(e) =>
                        setProfile({ ...profile, availableText: e.target.value })
                      }
                      placeholder="Disponible para proyectos & prácticas"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#180508] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                    />
                  </div>
                </div>

                {/* 5. Contact & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                      Email de Contacto
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                    />
                  </div>
                </div>

                {/* 6. Social Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={profile.linkedin}
                      onChange={(e) =>
                        setProfile({ ...profile, linkedin: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                      GitHub
                    </label>
                    <input
                      type="url"
                      value={profile.github}
                      onChange={(e) =>
                        setProfile({ ...profile, github: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-[#D8C4AC]/20">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-7 py-3 rounded-xl bg-[#D8C4AC] hover:bg-[#EEE4DA] text-[#140507] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios del Perfil</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: PROYECTOS */}
          {activeTab === "projects" && (
            isCreatingProject || editingProject ? (
              /* DEDICATED FULL VIEW (Clean dedicated window/screen without modal) */
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8C4AC]/20">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingProject(false);
                        setEditingProject(null);
                      }}
                      className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D8C4AC] hover:text-white px-3.5 py-2 rounded-xl bg-[#22080C] hover:bg-[#2E0A0F] border border-[#D8C4AC]/30 transition-all cursor-pointer shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Volver a proyectos</span>
                    </button>
                    <h2 className="font-serif italic text-2xl text-white">
                      {editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingProject(false);
                        setEditingProject(null);
                      }}
                      className="px-4 py-2 rounded-xl text-[#D8C4AC] hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveProject()}
                      className="px-5 py-2.5 rounded-xl bg-[#D8C4AC] hover:bg-[#EEE4DA] text-[#140507] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Guardar Proyecto</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#22080C]/90 border border-[#D8C4AC]/25 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
                  <form onSubmit={handleSaveProject} className="space-y-6">
                    {/* Row 1: Título & Subtítulo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          Título *
                        </label>
                        <input
                          type="text"
                          required
                          value={projectForm.title || ""}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              title: e.target.value,
                              slug:
                                projectForm.slug ||
                                e.target.value
                                  .toLowerCase()
                                  .replace(/[^a-z0-9]+/g, "-")
                                  .replace(/(^-|-$)/g, ""),
                            })
                          }
                          placeholder="App de Productividad"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          Subtítulo
                        </label>
                        <input
                          type="text"
                          value={projectForm.subtitle || ""}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, subtitle: e.target.value })
                          }
                          placeholder="Caso de Estudio UX/UI · Mobile"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        />
                      </div>
                    </div>

                    {/* Row 2: Categoría, Highlight & Orden/Destacado */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          Categoría
                        </label>
                        <select
                          value={projectForm.category || "UX/UI Design"}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, category: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        >
                          <option value="UX/UI Design">UX/UI Design</option>
                          <option value="Product Design">Product Design</option>
                          <option value="Design Engineering">Design Engineering</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          Highlight
                        </label>
                        <input
                          type="text"
                          value={projectForm.highlight || ""}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, highlight: e.target.value })
                          }
                          placeholder="8 entrevistas · 3 iteraciones"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        />
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="flex-1">
                          <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                            Orden
                          </label>
                          <input
                            type="number"
                            value={projectForm.order ?? 0}
                            onChange={(e) =>
                              setProjectForm({
                                ...projectForm,
                                order: Number(e.target.value),
                              })
                            }
                            className="w-full px-3 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium"
                          />
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#EEE4DA] font-medium mt-6 shrink-0">
                          <input
                            type="checkbox"
                            checked={projectForm.featured ?? true}
                            onChange={(e) =>
                              setProjectForm({
                                ...projectForm,
                                featured: e.target.checked,
                              })
                            }
                            className="accent-[#D8C4AC] w-4 h-4 cursor-pointer"
                          />
                          <span>Destacado</span>
                        </label>
                      </div>
                    </div>

                    {/* Row 3: Descripción */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                        Descripción *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={projectForm.description || ""}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Descripción breve del proyecto..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC] leading-relaxed"
                      />
                    </div>

                    {/* Row 4: Caso de estudio (Problema, Solución, Impacto) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          Problema
                        </label>
                        <textarea
                          rows={3}
                          value={projectForm.problem || ""}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, problem: e.target.value })
                          }
                          placeholder="El desafío o fricción..."
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          Solución
                        </label>
                        <textarea
                          rows={3}
                          value={projectForm.solution || ""}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, solution: e.target.value })
                          }
                          placeholder="La propuesta de diseño..."
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          Impacto
                        </label>
                        <textarea
                          rows={3}
                          value={projectForm.impact || ""}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, impact: e.target.value })
                          }
                          placeholder="Resultados métricos..."
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        />
                      </div>
                    </div>

                    {/* Row 5: Etiquetas & Herramientas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          Etiquetas
                        </label>
                        <input
                          type="text"
                          value={projectForm.tags?.join(", ") || ""}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              tags: e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean),
                            })
                          }
                          placeholder="UX Research, Figma, Design System"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          Herramientas
                        </label>
                        <input
                          type="text"
                          value={projectForm.tools?.join(", ") || ""}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              tools: e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean),
                            })
                          }
                          placeholder="Figma, Tailwind, Next.js"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        />
                      </div>
                    </div>

                    {/* Row 6: Imágenes (Real local file upload) */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                        Imágenes
                      </label>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageFilesSelected}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />

                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-[#D8C4AC]/30 hover:border-[#D8C4AC]/70 bg-[#140406]/80 hover:bg-[#140406] rounded-2xl p-6 text-center cursor-pointer transition-all flex items-center justify-center gap-4 group"
                      >
                        <div className="w-11 h-11 rounded-xl bg-[#4D0E13] border border-[#D8C4AC]/30 flex items-center justify-center text-[#D8C4AC] group-hover:scale-105 transition-transform shrink-0">
                          {isUploadingImages ? (
                            <Loader2 className="w-5 h-5 animate-spin text-[#D8C4AC]" />
                          ) : (
                            <Upload className="w-5 h-5 text-[#D8C4AC]" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-white">
                            {isUploadingImages ? "Subiendo imágenes..." : "Subir imágenes locales"}
                          </p>
                          <p className="text-xs text-[#D8C4AC]/70 font-mono">
                            PNG, JPG, SVG, WebP (se guardan directamente en el servidor local)
                          </p>
                        </div>
                      </div>

                      {uploadError && (
                        <p className="text-xs text-rose-400 mt-1.5 font-mono">{uploadError}</p>
                      )}

                      {/* Thumbnails */}
                      {projectForm.images && projectForm.images.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          {projectForm.images.map((imgUrl, index) => (
                            <div
                              key={index}
                              className="relative group rounded-xl overflow-hidden border border-[#D8C4AC]/30 bg-[#140406] w-24 h-20 flex items-center justify-center shadow-md shrink-0"
                            >
                              <img
                                src={imgUrl}
                                alt={`Imagen ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-rose-300 hover:text-rose-100 cursor-pointer"
                                title="Eliminar imagen"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-white/80 bg-black/60 px-1.5 py-0.5 rounded">
                                #{index + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Row 7: Enlaces */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          Enlace en vivo
                        </label>
                        <input
                          type="url"
                          value={projectForm.link || ""}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, link: e.target.value })
                          }
                          placeholder="https://..."
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          GitHub
                        </label>
                        <input
                          type="url"
                          value={projectForm.github || ""}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, github: e.target.value })
                          }
                          placeholder="https://github.com/..."
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D8C4AC]/20">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingProject(false);
                          setEditingProject(null);
                        }}
                        className="px-4 py-2.5 rounded-xl text-[#D8C4AC] hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#D8C4AC] hover:bg-[#EEE4DA] text-[#140507] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Guardar Proyecto</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              /* PROJECTS LIST VIEW */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                      Proyectos
                    </h2>
                    <p className="text-xs text-[#D8C4AC] mt-1 font-medium">
                      Todos los proyectos mostrados en el portafolio
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreatingProject(true);
                      setEditingProject(null);
                      setProjectForm({
                        title: "",
                        subtitle: "Caso de Estudio UX/UI · Mobile",
                        slug: "",
                        category: "UX/UI Design",
                        highlight: "8 entrevistas · 3 iteraciones",
                        color: "from-[#4D0E13]/60 via-[#22080C]/90 to-[#140507]",
                        description: "",
                        problem: "",
                        solution: "",
                        impact: "",
                        featured: true,
                        order: projects.length,
                        tags: ["UX Research", "Figma", "Design System"],
                        tools: ["Figma"],
                        images: ["/projects/student-app-1.svg"],
                        link: "",
                        github: "",
                      });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D8C4AC] hover:bg-[#EEE4DA] text-[#140507] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nuevo Proyecto</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-[#22080C]/90 border border-[#D8C4AC]/25 rounded-3xl p-6 flex flex-col justify-between hover:border-[#D8C4AC]/60 transition-all backdrop-blur-sm group shadow-xl shadow-black/40"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-[10px] font-mono font-bold text-[#D8C4AC] uppercase tracking-widest">
                            {proj.subtitle || proj.category}
                          </span>
                          <div className="flex items-center gap-2">
                            {proj.featured && (
                              <span className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4D0E13] text-[#EEE4DA] border border-[#C8A49F]/40 font-bold">
                                Destacado
                              </span>
                            )}
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#140406]/80 text-[#C8A49F] font-bold border border-[#D8C4AC]/20">
                              #{proj.order}
                            </span>
                          </div>
                        </div>

                        <h3 className="font-serif italic text-xl text-white mb-1.5 group-hover:text-[#D8C4AC] transition-colors font-medium">
                          {proj.title}
                        </h3>

                        {proj.highlight && (
                          <div className="mb-2">
                            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#4D0E13]/40 text-[#EEE4DA] border border-[#C8A49F]/40">
                              ✨ {proj.highlight}
                            </span>
                          </div>
                        )}

                        <p className="text-xs text-[#D8C4AC]/80 line-clamp-2 mb-4 leading-relaxed font-normal">
                          {proj.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {proj.tags.slice(0, 4).map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2.5 py-1 rounded-lg bg-[#C8A49F]/15 text-[#EEE4DA] border border-[#C8A49F]/30 font-mono font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#D8C4AC]/20">
                        <span className="text-[11px] font-mono text-[#D8C4AC]/80 font-medium">
                          /{proj.slug}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setProjectForm(proj);
                            }}
                            className="p-2 rounded-xl bg-[#24090D] hover:bg-[#D8C4AC] hover:text-[#140507] text-[#EEE4DA] border border-[#D8C4AC]/25 transition-all cursor-pointer"
                            title="Editar"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-2 rounded-xl bg-[#4D0E13]/40 text-[#C8A49F] hover:bg-[#4D0E13] hover:text-[#EEE4DA] border border-[#4D0E13] transition-all cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {/* TAB 3: HABILIDADES */}
          {activeTab === "skills" && (
            isCreatingSkill || editingSkill ? (
              /* DEDICATED FULL VIEW (Clean view without modal) */
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8C4AC]/20">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingSkill(false);
                        setEditingSkill(null);
                      }}
                      className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D8C4AC] hover:text-white px-3.5 py-2 rounded-xl bg-[#22080C] hover:bg-[#2E0A0F] border border-[#D8C4AC]/30 transition-all cursor-pointer shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Volver a habilidades</span>
                    </button>
                    <h2 className="font-serif italic text-2xl text-white">
                      {editingSkill ? "Editar Habilidad" : "Nueva Habilidad"}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingSkill(false);
                        setEditingSkill(null);
                      }}
                      className="px-4 py-2 rounded-xl text-[#D8C4AC] hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveSkill()}
                      className="px-5 py-2.5 rounded-xl bg-[#D8C4AC] hover:bg-[#EEE4DA] text-[#140507] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Guardar Habilidad</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#22080C]/90 border border-[#D8C4AC]/25 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
                  <form onSubmit={handleSaveSkill} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          Badge
                        </label>
                        <input
                          type="text"
                          required
                          value={skillForm.badge || ""}
                          onChange={(e) =>
                            setSkillForm({ ...skillForm, badge: e.target.value })
                          }
                          placeholder="01 · Experiencia"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          Título *
                        </label>
                        <input
                          type="text"
                          required
                          value={skillForm.title || ""}
                          onChange={(e) =>
                            setSkillForm({ ...skillForm, title: e.target.value })
                          }
                          placeholder="Diseño UX/UI"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                          Categoría
                        </label>
                        <input
                          type="text"
                          value={skillForm.category || ""}
                          onChange={(e) =>
                            setSkillForm({ ...skillForm, category: e.target.value })
                          }
                          placeholder="UX/UI Design"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                        Descripción *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={skillForm.description || ""}
                        onChange={(e) =>
                          setSkillForm({
                            ...skillForm,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC] leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-1.5">
                        Tecnologías
                      </label>
                      <input
                        type="text"
                        value={skillForm.tags?.join(", ") || ""}
                        onChange={(e) =>
                          setSkillForm({
                            ...skillForm,
                            tags: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                        placeholder="Next.js, React, Tailwind CSS, TypeScript"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#140406] border border-[#D8C4AC]/25 text-[#EEE4DA] text-xs font-medium focus:outline-none focus:border-[#D8C4AC]"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D8C4AC]/20">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingSkill(false);
                          setEditingSkill(null);
                        }}
                        className="px-4 py-2.5 rounded-xl text-[#D8C4AC] hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#D8C4AC] hover:bg-[#EEE4DA] text-[#140507] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Guardar Habilidad</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              /* SKILLS LIST VIEW */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                      Habilidades
                    </h2>
                    <p className="text-xs text-[#D8C4AC] mt-1 font-medium">
                      Administra las 3 columnas y tecnologías exhibidas en la sección de habilidades
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreatingSkill(true);
                      setEditingSkill(null);
                      setSkillForm({
                        badge: "01 · Experiencia",
                        category: "UX/UI Design",
                        title: "",
                        description: "",
                        tags: [],
                        order: skills.length,
                      });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D8C4AC] hover:bg-[#EEE4DA] text-[#140507] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nueva Habilidad</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {skills.map((s) => (
                    <div
                      key={s.id}
                      className="bg-[#22080C]/90 border border-[#D8C4AC]/25 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-sm shadow-xl shadow-black/40 text-center"
                    >
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-bold block mb-1">
                          {s.badge || s.category}
                        </span>
                        <h3 className="font-serif italic text-lg text-white font-medium mb-2">
                          {s.title}
                        </h3>
                        <p className="text-xs text-[#D8C4AC]/80 mb-4 leading-relaxed font-normal">
                          {s.description}
                        </p>
                        <div className="text-[11px] font-mono text-[#C8A49F] font-medium">
                          {s.tags.join(" · ")}
                        </div>
                      </div>
                      <div className="flex justify-center gap-2 pt-4 border-t border-[#D8C4AC]/20 mt-5">
                        <button
                          onClick={() => {
                            setEditingSkill(s);
                            setSkillForm(s);
                          }}
                          className="p-2 rounded-xl bg-[#24090D] text-[#EEE4DA] hover:bg-[#D8C4AC] hover:text-[#140507] border border-[#D8C4AC]/25 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(s.id)}
                          className="p-2 rounded-xl bg-[#4D0E13]/40 text-[#C8A49F] hover:bg-[#4D0E13] hover:text-[#EEE4DA] border border-[#4D0E13] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {/* TAB 4: MENSAJES */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif italic text-2xl sm:text-3xl text-white font-normal flex items-center gap-3">
                    Bandeja de Mensajes
                    {unreadMessagesCount > 0 && (
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4D0E13] text-[#EEE4DA] border border-[#C8A49F]/40 not-italic shadow-sm font-bold">
                        {unreadMessagesCount} nuevos
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-[#D8C4AC] mt-1 font-medium">
                    Mensajes enviados directamente desde tu sitio
                  </p>
                </div>
              </div>

              {/* Status banner */}
              <div className="p-5 rounded-3xl bg-[#22080C]/90 border border-[#D8C4AC]/25 flex items-start gap-3.5 backdrop-blur-md shadow-lg shadow-black/20">
                <Mail className="w-4 h-4 text-[#D8C4AC] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-white font-serif italic text-sm">
                    Recepción en Base de Datos & Gmail
                  </p>
                  <p className="text-[#D8C4AC]/80 font-normal leading-relaxed">
                    Cada mensaje queda registrado de forma permanente en tu base de datos PostgreSQL. Para recibirlos también al instante en tu correo (<strong>nayssa1310@gmail.com</strong>), configurá tu Contraseña de Aplicación de 16 caracteres en <code className="bg-[#140406] px-1.5 py-0.5 rounded text-[#D8C4AC] font-mono text-[11px] border border-[#D8C4AC]/25">.env.local</code>.
                  </p>
                </div>
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-16 bg-[#22080C]/60 rounded-3xl border border-[#D8C4AC]/20 backdrop-blur-sm">
                  <Inbox className="w-8 h-8 text-[#D8C4AC]/60 mx-auto mb-3" />
                  <p className="font-serif italic text-base text-white">
                    Bandeja limpia por ahora
                  </p>
                  <p className="text-xs text-[#D8C4AC]/70 mt-1">
                    Los mensajes que te envíen aparecerán organizados aquí.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-6 rounded-3xl border transition-all ${
                        msg.read
                          ? "bg-[#22080C]/60 border-[#D8C4AC]/20"
                          : "bg-[#22080C] border-[#D8C4AC]/50 shadow-xl shadow-black/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2.5">
                          {!msg.read && (
                            <span className="w-2 h-2 rounded-full bg-[#D8C4AC] shrink-0 animate-pulse" />
                          )}
                          <h4 className="font-serif italic text-base text-white font-medium">
                            {msg.name}
                          </h4>
                          <span className="text-xs text-[#D8C4AC] font-mono font-medium">
                            &lt;{msg.email}&gt;
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#D8C4AC]/70">
                          <Clock className="w-3 h-3" />
                          <span>
                            {new Date(msg.createdAt).toLocaleString("es-PE", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#EEE4DA] bg-[#140406] p-4 rounded-2xl border border-[#D8C4AC]/25 whitespace-pre-wrap leading-relaxed my-3 font-normal">
                        {msg.message}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <a
                          href={`mailto:${msg.email}?subject=Respuesta a tu mensaje desde mi portafolio`}
                          className="inline-flex items-center gap-1.5 text-xs text-[#D8C4AC] hover:text-white font-mono font-medium transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Responder por correo</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleToggleReadMessage(msg.id, msg.read)
                            }
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium ${
                              msg.read
                                ? "text-[#D8C4AC] border-[#D8C4AC]/20 hover:text-white"
                                : "text-[#140507] border-[#D8C4AC] bg-[#D8C4AC] hover:bg-[#EEE4DA]"
                            }`}
                          >
                            <Check className="w-3 h-3" />
                            <span>{msg.read ? "Marcar no leído" : "Marcar leído"}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-2 rounded-xl bg-[#4D0E13]/40 text-[#C8A49F] hover:bg-[#4D0E13] hover:text-[#EEE4DA] border border-[#4D0E13] transition-colors cursor-pointer"
                            title="Eliminar mensaje"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
