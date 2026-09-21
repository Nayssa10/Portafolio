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
  EyeOff,
  Briefcase,
  Building2,
  Calendar,
  Upload,
  Image as ImageIcon,
  Loader2,
  Award,
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

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string | null;
  description: string;
  technologies: string[];
  current: boolean;
  order: number;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string | null;
  image?: string | null;
  description?: string | null;
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
  showExperience?: boolean;
  showCertificates?: boolean;
  location: string;
  linkedin: string;
  github: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  // Perfil is the FIRST tab by default!
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "experiences" | "certificates" | "skills" | "messages">("profile");
  const [loading, setLoading] = useState(true);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
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

  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [isCreatingExperience, setIsCreatingExperience] = useState(false);
  const [experienceForm, setExperienceForm] = useState<Partial<Experience>>({
    role: "",
    company: "",
    period: "",
    location: "Lima, Perú · Remoto",
    description: "",
    technologies: [],
    current: false,
    order: 0,
  });

  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [isCreatingCertificate, setIsCreatingCertificate] = useState(false);
  const [certificateForm, setCertificateForm] = useState<Partial<Certificate>>({
    title: "",
    issuer: "",
    date: "",
    url: "",
    image: "",
    description: "",
    order: 0,
  });
  const [isUploadingCertImage, setIsUploadingCertImage] = useState(false);
  const certFileInputRef = useRef<HTMLInputElement>(null);

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
      const [profRes, projRes, expRes, certRes, skillRes, msgRes] = await Promise.all([
        fetch("/api/admin/profile"),
        fetch("/api/admin/projects"),
        fetch("/api/admin/experiences"),
        fetch("/api/admin/certificates"),
        fetch("/api/admin/skills"),
        fetch("/api/admin/messages"),
      ]);

      if (projRes.status === 401 || profRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (profRes.ok) setProfile(await profRes.json());
      if (projRes.ok) setProjects(await projRes.json());
      if (expRes.ok) setExperiences(await expRes.json());
      if (certRes.ok) setCertificates(await certRes.json());
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
    if (!projectForm.title?.trim()) {
      alert("Por favor ingresá un título para el proyecto.");
      return;
    }
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

  // --- Experience Handlers ---
  const handleSaveExperience = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!experienceForm.role?.trim() || !experienceForm.company?.trim()) {
      alert("Por favor ingresá el puesto y la empresa u organización.");
      return;
    }
    try {
      const url = editingExperience
        ? `/api/admin/experiences/${editingExperience.id}`
        : "/api/admin/experiences";
      const method = editingExperience ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...experienceForm,
          order: Number(experienceForm.order) || 0,
          technologies: Array.isArray(experienceForm.technologies)
            ? experienceForm.technologies
            : [],
        }),
      });

      if (res.ok) {
        setEditingExperience(null);
        setIsCreatingExperience(false);
        fetchData();
      } else {
        const err = await res.json();
        alert(`Error al guardar: ${err.error || "No se pudo guardar la experiencia"}`);
      }
    } catch (err) {
      console.error("Error saving experience:", err);
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!confirm("¿Seguro que deseás eliminar esta experiencia?")) return;
    try {
      await fetch(`/api/admin/experiences/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error("Error deleting experience:", err);
    }
  };

  const handleToggleShowExperience = async (newVisibility: boolean) => {
    if (!profile) return;
    const updated = { ...profile, showExperience: newVisibility };
    setProfile(updated);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error("Error toggling experience visibility:", err);
    }
  };

  // --- Certificate Handlers ---
  const handleSaveCertificate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!certificateForm.title?.trim() || !certificateForm.issuer?.trim() || !certificateForm.date?.trim()) {
      alert("Por favor completá el título, la institución emisora y la fecha.");
      return;
    }
    try {
      const url = editingCertificate
        ? `/api/admin/certificates/${editingCertificate.id}`
        : "/api/admin/certificates";
      const method = editingCertificate ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...certificateForm,
          order: Number(certificateForm.order) || 0,
        }),
      });

      if (res.ok) {
        setEditingCertificate(null);
        setIsCreatingCertificate(false);
        fetchData();
      } else {
        const err = await res.json();
        alert(`Error al guardar: ${err.error || "No se pudo guardar el certificado"}`);
      }
    } catch (err) {
      console.error("Error saving certificate:", err);
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!confirm("¿Seguro que deseás eliminar este certificado o logro?")) return;
    try {
      await fetch(`/api/admin/certificates/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error("Error deleting certificate:", err);
    }
  };

  const handleToggleShowCertificates = async (newVisibility: boolean) => {
    if (!profile) return;
    const updated = { ...profile, showCertificates: newVisibility };
    setProfile(updated);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error("Error toggling certificates visibility:", err);
    }
  };

  const handleCertImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingCertImage(true);
    const formData = new FormData();
    formData.append("files", files[0]);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Error al subir imagen");
      }

      const data = await res.json();
      if (data.urls && data.urls.length > 0) {
        setCertificateForm((prev) => ({
          ...prev,
          image: data.urls[0],
        }));
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error al subir la imagen del certificado");
    } finally {
      setIsUploadingCertImage(false);
      if (certFileInputRef.current) {
        certFileInputRef.current.value = "";
      }
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
    <div className="min-h-screen bg-[#F8F5F1] text-[#4D0E13] flex flex-col md:flex-row font-sans selection:bg-[#4D0E13] selection:text-[#EEE4DA] relative">
      {/* FIXED LEFT SIDEBAR */}
      <aside className="md:fixed md:inset-y-0 md:left-0 md:w-64 w-full bg-[#EEE4DA] border-b md:border-b-0 md:border-r border-[#D8C4AC] flex flex-col justify-between z-30 shadow-md shrink-0">
        {/* Top: Brand & User Info */}
        <div className="p-5 sm:p-6 border-b border-[#D8C4AC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4D0E13] border border-[#4D0E13] flex items-center justify-center text-[#EEE4DA] font-serif italic text-xl shadow-md shrink-0">
              N
            </div>
            <div className="min-w-0">
              <h1 className="font-serif italic text-base leading-tight text-[#4D0E13] flex items-center gap-1.5">
                <span>Panel de Gestión</span>
                <span className="text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-[#4D0E13] text-[#EEE4DA] not-italic font-bold shadow-sm">
                  Admin
                </span>
              </h1>
              <p className="text-[11px] font-mono text-[#8C252C] font-medium truncate mt-0.5">
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
                ? "bg-[#4D0E13] text-[#EEE4DA] shadow-md font-bold"
                : "text-[#4D0E13]/70 hover:text-[#4D0E13] hover:bg-[#D8C4AC]/25"
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
                ? "bg-[#4D0E13] text-[#EEE4DA] shadow-md font-bold"
                : "text-[#4D0E13]/70 hover:text-[#4D0E13] hover:bg-[#D8C4AC]/25"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FolderKanban className="w-4 h-4 shrink-0" />
              <span>Proyectos</span>
            </div>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                activeTab === "projects"
                  ? "bg-[#EEE4DA] text-[#4D0E13]"
                  : "bg-[#D8C4AC]/40 text-[#4D0E13] border border-[#D8C4AC]"
              }`}
            >
              {projects.length}
            </span>
          </button>

          {/* 3. EXPERIENCIA */}
          <button
            onClick={() => {
              setActiveTab("experiences");
              setIsCreatingExperience(false);
              setEditingExperience(null);
            }}
            className={`flex-1 md:flex-none flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "experiences"
                ? "bg-[#4D0E13] text-[#EEE4DA] shadow-md font-bold"
                : "text-[#4D0E13]/70 hover:text-[#4D0E13] hover:bg-[#D8C4AC]/25"
            }`}
          >
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>Experiencia</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-tight ${
                  profile?.showExperience
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-[#D8C4AC]/40 text-[#8C252C]"
                }`}
              >
                {profile?.showExperience ? "On" : "Off"}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                  activeTab === "experiences"
                    ? "bg-[#EEE4DA] text-[#4D0E13]"
                    : "bg-[#D8C4AC]/40 text-[#4D0E13] border border-[#D8C4AC]"
                }`}
              >
                {experiences.length}
              </span>
            </div>
          </button>

          {/* 4. CERTIFICADOS */}
          <button
            onClick={() => {
              setActiveTab("certificates");
              setIsCreatingCertificate(false);
              setEditingCertificate(null);
            }}
            className={`flex-1 md:flex-none flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "certificates"
                ? "bg-[#4D0E13] text-[#EEE4DA] shadow-md font-bold"
                : "text-[#4D0E13]/70 hover:text-[#4D0E13] hover:bg-[#D8C4AC]/25"
            }`}
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 shrink-0" />
              <span>Certificados</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-tight ${
                  profile?.showCertificates !== false
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-[#D8C4AC]/40 text-[#8C252C]"
                }`}
              >
                {profile?.showCertificates !== false ? "On" : "Off"}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                  activeTab === "certificates"
                    ? "bg-[#EEE4DA] text-[#4D0E13]"
                    : "bg-[#D8C4AC]/40 text-[#4D0E13] border border-[#D8C4AC]"
                }`}
              >
                {certificates.length}
              </span>
            </div>
          </button>

          {/* 5. HABILIDADES */}
          <button
            onClick={() => {
              setActiveTab("skills");
              setIsCreatingSkill(false);
              setEditingSkill(null);
            }}
            className={`flex-1 md:flex-none flex items-center justify-between gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "skills"
                ? "bg-[#4D0E13] text-[#EEE4DA] shadow-md font-bold"
                : "text-[#4D0E13]/70 hover:text-[#4D0E13] hover:bg-[#D8C4AC]/25"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Wrench className="w-4 h-4 shrink-0" />
              <span>Habilidades</span>
            </div>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                activeTab === "skills"
                  ? "bg-[#EEE4DA] text-[#4D0E13]"
                  : "bg-[#D8C4AC]/40 text-[#4D0E13] border border-[#D8C4AC]"
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
                ? "bg-[#4D0E13] text-[#EEE4DA] shadow-md font-bold"
                : "text-[#4D0E13]/70 hover:text-[#4D0E13] hover:bg-[#D8C4AC]/25"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Inbox className="w-4 h-4 shrink-0" />
              <span>Mensajes</span>
            </div>
            {unreadMessagesCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#4D0E13] text-[#EEE4DA] shadow-sm">
                {unreadMessagesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Bottom: External link & Logout */}
        <div className="p-4 border-t border-[#D8C4AC] flex flex-row md:flex-col gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex-1 flex items-center justify-center gap-2 text-xs text-[#4D0E13] hover:text-[#66151B] px-3.5 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF7F3] transition-all border border-[#D8C4AC] font-semibold shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#4D0E13]" />
            <span>Ver Portafolio</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 text-xs text-[#8C252C] hover:text-[#EEE4DA] px-3.5 py-2 rounded-xl bg-[#C8A49F]/20 hover:bg-[#4D0E13] transition-all border border-[#C8A49F]/40 cursor-pointer font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Salir</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area (offset by left sidebar on desktop) */}
      <div className="flex-1 md:ml-64 p-6 sm:p-10 max-w-6xl xl:max-w-7xl w-full relative z-10 min-h-screen">
        <main className="w-full">
          {/* TAB 1: PERFIL & BIO (FIRST!) */}
          {activeTab === "profile" && profile && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif italic text-2xl sm:text-3xl text-[#4D0E13] font-semibold">
                  Perfil, Hero & Sobre Mí
                </h2>
                <p className="text-xs text-[#8C252C] mt-1 font-medium">
                  Administra todos los textos, títulos y enlaces mostrados en la cabecera y sección principal
                </p>
              </div>

              {profileSuccessMsg && (
                <div className="p-4 rounded-2xl bg-[#4D0E13] border border-[#4D0E13] text-[#EEE4DA] text-xs flex items-center gap-2.5 shadow-md font-medium">
                  <CheckCircle className="w-4 h-4 text-[#D8C4AC]" />
                  <span>{profileSuccessMsg}</span>
                </div>
              )}

              <form
                onSubmit={handleSaveProfile}
                className="bg-[#FFFFFF] border border-[#D8C4AC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm"
              >
                {/* 1. Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-1.5">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-xs font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-1.5">
                      Título
                    </label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) =>
                        setProfile({ ...profile, title: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-xs font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF]"
                    />
                  </div>
                </div>

                {/* 2. Hero Subtitle */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-1.5">
                    Bajada del Hero
                  </label>
                  <textarea
                    rows={2}
                    value={profile.heroSubtitle ?? profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, heroSubtitle: e.target.value, bio: e.target.value })
                    }
                    placeholder="Diseño UX/UI & Desarrollo Front-End..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-xs font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] leading-relaxed"
                  />
                </div>

                {/* 3. Sobre Mí */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-1.5">
                    Sobre Mí
                  </label>
                  <textarea
                    rows={4}
                    value={profile.aboutText || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, aboutText: e.target.value })
                    }
                    placeholder="Estudiante de 8vo ciclo de Ingeniería de Sistemas e Informática..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-xs font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] leading-relaxed"
                  />
                </div>

                {/* 4. Availability Status */}
                <div className="p-5 rounded-2xl bg-[#FAF7F3] border border-[#D8C4AC]/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif italic text-base text-[#4D0E13] font-semibold">
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
                      <div className="w-11 h-6 bg-[#D8C4AC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4D0E13]"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13]/80 font-medium mb-1">
                      Texto de disponibilidad
                    </label>
                    <input
                      type="text"
                      value={profile.availableText}
                      onChange={(e) =>
                        setProfile({ ...profile, availableText: e.target.value })
                      }
                      placeholder="Disponible para proyectos & prácticas"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D8C4AC] text-[#4D0E13] text-xs font-medium focus:outline-none focus:border-[#4D0E13]"
                    />
                  </div>
                </div>

                {/* 5. Sección de Experiencia en Portafolio */}
                <div className="p-5 rounded-2xl bg-[#FAF7F3] border border-[#D8C4AC]/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif italic text-base text-[#4D0E13] font-semibold">
                        Sección de Experiencia en el Portafolio
                      </h4>
                      <p className="text-xs text-[#8C252C] mt-0.5 font-medium">
                        {profile.showExperience
                          ? "Visible en tu sitio público (ubicada entre Proyectos y Habilidades)."
                          : "Oculta temporalmente (ideal si aún no tenés experiencia formal para mostrar)."}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={profile.showExperience ?? false}
                        onChange={(e) =>
                          setProfile({ ...profile, showExperience: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#D8C4AC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4D0E13]"></div>
                    </label>
                  </div>
                </div>

                {/* 6. Contact & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-1.5">
                      Email de Contacto
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-xs font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-1.5">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-xs font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF]"
                    />
                  </div>
                </div>

                {/* 6. Social Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-1.5">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={profile.linkedin}
                      onChange={(e) =>
                        setProfile({ ...profile, linkedin: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-xs font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-1.5">
                      GitHub
                    </label>
                    <input
                      type="url"
                      value={profile.github}
                      onChange={(e) =>
                        setProfile({ ...profile, github: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-xs font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-[#D8C4AC]">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-7 py-3 rounded-xl bg-[#4D0E13] hover:bg-[#66151B] text-[#EEE4DA] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8C4AC]">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingProject(false);
                        setEditingProject(null);
                      }}
                      aria-label="Volver a proyectos"
                      title="Volver a proyectos"
                      className="w-10 h-10 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF7F3] border border-[#D8C4AC] flex items-center justify-center text-[#4D0E13] hover:text-[#66151B] transition-all cursor-pointer shadow-sm shrink-0"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="font-serif italic text-2xl text-[#4D0E13] font-semibold">
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
                      className="px-4 py-2 rounded-xl text-[#8C252C] hover:text-[#4D0E13] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      form="project-form"
                      className="px-5 py-2.5 rounded-xl bg-[#4D0E13] hover:bg-[#66151B] text-[#EEE4DA] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Guardar</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] border border-[#D8C4AC] rounded-3xl p-7 sm:p-10 shadow-sm">
                  <form id="project-form" onSubmit={handleSaveProject} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* COLUMNA IZQUIERDA: Textos y Datos */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
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
                            placeholder="App de Productividad y Bienestar Estudiantil"
                            className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                            Subtítulo
                          </label>
                          <input
                            type="text"
                            value={projectForm.subtitle || ""}
                            onChange={(e) =>
                              setProjectForm({ ...projectForm, subtitle: e.target.value })
                            }
                            placeholder="CASO DE ESTUDIO UX/UI · MOBILE"
                            className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                          Descripción *
                        </label>
                        <textarea
                          rows={5}
                          required
                          value={projectForm.description || ""}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="Investigación con usuarios y prototipado interactivo de alta fidelidad para reducir la sobrecarga cognitiva en universitarios..."
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] leading-relaxed transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                          Etiquetas (Tags)
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
                          placeholder="UX Research, Figma, Wireframes, Design System"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                        />
                      </div>
                    </div>

                    {/* COLUMNA DERECHA: Multimedia y Configuración */}
                    <div className="lg:col-span-5 space-y-6 lg:pl-8 lg:border-l lg:border-[#D8C4AC]/60">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                          Imágenes del Proyecto ({projectForm.images?.length || 0})
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
                          className="border-2 border-dashed border-[#D8C4AC] hover:border-[#4D0E13]/60 bg-[#FAF7F3] hover:bg-[#FFFFFF] rounded-2xl p-5 text-center cursor-pointer transition-all flex items-center justify-center gap-3.5 group shadow-sm"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#4D0E13] flex items-center justify-center text-[#EEE4DA] group-hover:scale-105 transition-transform shadow-sm shrink-0">
                            {isUploadingImages ? (
                              <Loader2 className="w-5 h-5 animate-spin text-[#EEE4DA]" />
                            ) : (
                              <Upload className="w-5 h-5 text-[#EEE4DA]" />
                            )}
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold text-[#4D0E13]">
                              {isUploadingImages ? "Subiendo imágenes..." : "Subir capturas o mockups"}
                            </p>
                            <p className="text-[11px] text-[#8C252C] font-mono mt-0.5">
                              PNG, JPG, SVG o WebP
                            </p>
                          </div>
                        </div>

                        {uploadError && (
                          <p className="text-xs text-rose-600 font-mono mt-1.5">{uploadError}</p>
                        )}

                        {/* Thumbnails */}
                        {projectForm.images && projectForm.images.length > 0 && (
                          <div className="grid grid-cols-3 gap-3 pt-3">
                            {projectForm.images.map((imgUrl, index) => (
                              <div
                                key={index}
                                className="relative group rounded-xl overflow-hidden border border-[#D8C4AC] bg-[#FAF7F3] aspect-video flex items-center justify-center shadow-sm"
                              >
                                <img
                                  src={imgUrl}
                                  alt={`Imagen ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(index)}
                                  className="absolute inset-0 bg-[#4D0E13]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-rose-200 hover:text-white cursor-pointer"
                                  title="Eliminar imagen"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-[#EEE4DA] bg-[#4D0E13]/80 px-1.5 py-0.5 rounded">
                                  #{index + 1}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Enlaces de Proyecto */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                            Enlace Web / Desplegado
                          </label>
                          <input
                            type="url"
                            placeholder="https://mi-proyecto.com"
                            value={projectForm.link || ""}
                            onChange={(e) =>
                              setProjectForm({ ...projectForm, link: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                            Repositorio GitHub
                          </label>
                          <input
                            type="url"
                            placeholder="https://github.com/usuario/repo"
                            value={projectForm.github || ""}
                            onChange={(e) =>
                              setProjectForm({ ...projectForm, github: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end pt-1">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                            Categoría
                          </label>
                          <select
                            value={projectForm.category || "UX/UI Design"}
                            onChange={(e) =>
                              setProjectForm({ ...projectForm, category: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                          >
                            <option value="UX/UI Design">UX/UI Design</option>
                            <option value="Product Design">Product Design</option>
                            <option value="Design Engineering">Design Engineering</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
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
                              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                            />
                          </div>

                          <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-[#4D0E13] mb-3 shrink-0">
                            <input
                              type="checkbox"
                              checked={projectForm.featured ?? true}
                              onChange={(e) =>
                                setProjectForm({
                                  ...projectForm,
                                  featured: e.target.checked,
                                })
                              }
                              className="accent-[#4D0E13] w-4 h-4 cursor-pointer"
                            />
                            <span>Destacado</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              /* PROJECTS LIST VIEW */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif italic text-2xl sm:text-3xl text-[#4D0E13] font-semibold">
                      Proyectos
                    </h2>
                    <p className="text-xs text-[#8C252C] mt-1 font-medium">
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
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#4D0E13] hover:bg-[#66151B] text-[#EEE4DA] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nuevo Proyecto</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-[#FFFFFF] border border-[#D8C4AC] rounded-3xl p-6 flex flex-col justify-between hover:border-[#8C252C]/50 transition-all group shadow-sm hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <span className="text-[10px] font-mono font-bold text-[#8C252C] uppercase tracking-widest">
                            {proj.subtitle || proj.category}
                          </span>
                          <div className="flex items-center gap-2">
                            {proj.featured && (
                              <span className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4D0E13] text-[#EEE4DA] border border-[#4D0E13] font-bold shadow-sm">
                                Destacado
                              </span>
                            )}
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF7F3] text-[#4D0E13] font-bold border border-[#D8C4AC]">
                              #{proj.order}
                            </span>
                          </div>
                        </div>

                        <h3 className="font-serif italic text-xl text-[#4D0E13] mb-2 group-hover:text-[#66151B] transition-colors font-semibold">
                          {proj.title}
                        </h3>

                        <p className="text-xs text-[#4D0E13]/80 line-clamp-2 mb-4 leading-relaxed font-normal">
                          {proj.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {proj.tags.slice(0, 4).map((tag, i) => {
                            const tagStyles = [
                              "bg-[#D8C4AC]/30 text-[#4D0E13] border-[#D8C4AC]",
                              "bg-[#C8A49F]/25 text-[#66151B] border-[#C8A49F]/60",
                              "bg-[#FAF7F3] text-[#8C252C] border-[#D8C4AC]",
                              "bg-[#4D0E13]/10 text-[#4D0E13] border-[#4D0E13]/20",
                            ];
                            const currentStyle = tagStyles[i % tagStyles.length];
                            return (
                              <span
                                key={i}
                                className={`text-[10px] px-2.5 py-1 rounded-lg border font-mono font-medium transition-all ${currentStyle}`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#D8C4AC]">
                        <span className="text-[11px] font-mono text-[#8C252C] font-medium">
                          /{proj.slug}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setProjectForm(proj);
                            }}
                            className="p-2 rounded-xl bg-[#FAF7F3] hover:bg-[#D8C4AC]/40 text-[#4D0E13] border border-[#D8C4AC] transition-all cursor-pointer shadow-sm"
                            title="Editar"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-2 rounded-xl bg-[#C8A49F]/20 text-[#8C252C] hover:bg-[#4D0E13] hover:text-[#EEE4DA] border border-[#C8A49F]/40 transition-all cursor-pointer shadow-sm"
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

          {/* TAB: EXPERIENCIA */}
          {activeTab === "experiences" && (
            isCreatingExperience || editingExperience ? (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8C4AC]">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingExperience(false);
                        setEditingExperience(null);
                      }}
                      aria-label="Volver a experiencias"
                      title="Volver a experiencias"
                      className="w-10 h-10 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF7F3] border border-[#D8C4AC] flex items-center justify-center text-[#4D0E13] hover:text-[#66151B] transition-all cursor-pointer shadow-sm shrink-0"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="font-serif italic text-2xl text-[#4D0E13] font-semibold">
                      {editingExperience ? "Editar Experiencia" : "Nueva Experiencia"}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingExperience(false);
                        setEditingExperience(null);
                      }}
                      className="px-4 py-2 rounded-xl text-[#8C252C] hover:text-[#4D0E13] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      form="experience-form"
                      className="px-5 py-2.5 rounded-xl bg-[#4D0E13] hover:bg-[#66151B] text-[#EEE4DA] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Guardar</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] border border-[#D8C4AC] rounded-3xl p-7 sm:p-10 shadow-sm">
                  <form id="experience-form" onSubmit={handleSaveExperience} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                          Puesto / Rol *
                        </label>
                        <input
                          type="text"
                          required
                          value={experienceForm.role || ""}
                          onChange={(e) =>
                            setExperienceForm({ ...experienceForm, role: e.target.value })
                          }
                          placeholder="ej. Diseñadora UX/UI & Desarrolladora Frontend"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                          Empresa u Organización *
                        </label>
                        <input
                          type="text"
                          required
                          value={experienceForm.company || ""}
                          onChange={(e) =>
                            setExperienceForm({ ...experienceForm, company: e.target.value })
                          }
                          placeholder="ej. Empresa, Startup o Proyectos Freelance"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                          Período *
                        </label>
                        <input
                          type="text"
                          required
                          value={experienceForm.period || ""}
                          onChange={(e) =>
                            setExperienceForm({ ...experienceForm, period: e.target.value })
                          }
                          placeholder="ej. 2024 - Presente o Ene 2024 - Jul 2024"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                          Ubicación / Modalidad
                        </label>
                        <input
                          type="text"
                          value={experienceForm.location || ""}
                          onChange={(e) =>
                            setExperienceForm({ ...experienceForm, location: e.target.value })
                          }
                          placeholder="ej. Lima, Perú · Remoto"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                          Orden
                        </label>
                        <input
                          type="number"
                          value={experienceForm.order ?? 0}
                          onChange={(e) =>
                            setExperienceForm({ ...experienceForm, order: Number(e.target.value) })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FAF7F3] border border-[#D8C4AC]/70">
                      <input
                        type="checkbox"
                        id="current-job"
                        checked={experienceForm.current ?? false}
                        onChange={(e) =>
                          setExperienceForm({ ...experienceForm, current: e.target.checked })
                        }
                        className="accent-[#4D0E13] w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="current-job" className="text-sm font-medium text-[#4D0E13] cursor-pointer select-none">
                        Actualmente me desempeño en este rol (mostrar badge "Actual")
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                        Descripción de responsabilidades y aportes *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={experienceForm.description || ""}
                        onChange={(e) =>
                          setExperienceForm({ ...experienceForm, description: e.target.value })
                        }
                        placeholder="Detallá los desafíos abordados, tus principales responsabilidades y el impacto logrado..."
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                        Tecnologías & Herramientas (Separadas por comas)
                      </label>
                      <input
                        type="text"
                        value={experienceForm.technologies?.join(", ") || ""}
                        onChange={(e) =>
                          setExperienceForm({
                            ...experienceForm,
                            technologies: e.target.value
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean),
                          })
                        }
                        placeholder="Figma, Next.js, React, Tailwind CSS, TypeScript"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                      />
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              /* EXPERIENCES LIST VIEW */
              <div className="space-y-6">
                {/* Visibility Toggle Banner */}
                <div className="bg-[#FFFFFF] border border-[#D8C4AC] rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                      profile?.showExperience
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                        : "bg-[#FAF7F3] text-[#8C252C] border-[#D8C4AC]"
                    }`}>
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-serif italic text-lg text-[#4D0E13] font-semibold">
                          Visibilidad de la Sección en el Portafolio
                        </h3>
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold border ${
                          profile?.showExperience
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : "bg-[#D8C4AC]/40 text-[#8C252C] border-[#D8C4AC]"
                        }`}>
                          {profile?.showExperience ? "Visible en la Web" : "Oculta"}
                        </span>
                      </div>
                      <p className="text-xs text-[#8C252C] mt-1 font-medium leading-relaxed">
                        {profile?.showExperience
                          ? "La sección está activa y se muestra en tu sitio público (entre Proyectos y Habilidades)."
                          : "La sección está oculta en tu sitio público. Podés activarla en cualquier momento cuando desees mostrarla."}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleShowExperience(!profile?.showExperience)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer shrink-0 font-mono ${
                      profile?.showExperience
                        ? "bg-[#FAF7F3] hover:bg-[#D8C4AC]/30 text-[#8C252C] border border-[#D8C4AC]"
                        : "bg-[#4D0E13] hover:bg-[#66151B] text-[#EEE4DA]"
                    }`}
                  >
                    {profile?.showExperience ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        <span>Ocultar sección</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        <span>Hacer visible</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif italic text-2xl sm:text-3xl text-[#4D0E13] font-semibold">
                      Experiencias ({experiences.length})
                    </h2>
                    <p className="text-xs text-[#8C252C] mt-1 font-medium">
                      Roles laborales, prácticas y proyectos profesionales
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreatingExperience(true);
                      setEditingExperience(null);
                      setExperienceForm({
                        role: "",
                        company: "",
                        period: "",
                        location: "Lima, Perú · Remoto",
                        description: "",
                        technologies: ["Figma", "React", "Next.js", "Tailwind CSS"],
                        current: false,
                        order: experiences.length,
                      });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#4D0E13] hover:bg-[#66151B] text-[#EEE4DA] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nueva Experiencia</span>
                  </button>
                </div>

                {/* Experiences List */}
                {experiences.length === 0 ? (
                  <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border border-[#D8C4AC] shadow-sm">
                    <Briefcase className="w-8 h-8 text-[#8C252C]/60 mx-auto mb-3" />
                    <p className="font-serif italic text-base text-[#4D0E13] font-semibold">
                      Aún no tenés experiencias registradas
                    </p>
                    <p className="text-xs text-[#8C252C] mt-1 mb-5">
                      Podés agregar tu primer rol cuando estés lista. Recordá que podés mantener la sección oculta hasta entonces.
                    </p>
                    <button
                      onClick={() => {
                        setIsCreatingExperience(true);
                        setEditingExperience(null);
                        setExperienceForm({
                          role: "",
                          company: "",
                          period: "",
                          location: "Lima, Perú · Remoto",
                          description: "",
                          technologies: ["Figma", "React", "Next.js", "Tailwind CSS"],
                          current: false,
                          order: 0,
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4D0E13] text-[#EEE4DA] text-xs font-bold uppercase tracking-wider hover:bg-[#66151B] transition-all cursor-pointer shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar primera experiencia</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {experiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="bg-[#FFFFFF] border border-[#D8C4AC] rounded-3xl p-6 hover:border-[#8C252C]/50 transition-all shadow-sm hover:shadow-md"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <h3 className="font-serif italic text-lg text-[#4D0E13] font-semibold">
                                {exp.role}
                              </h3>
                              {exp.current && (
                                <span className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4D0E13] text-[#EEE4DA] font-bold shadow-sm">
                                  Actual
                                </span>
                              )}
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF7F3] text-[#4D0E13] font-bold border border-[#D8C4AC]">
                                #{exp.order}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#8C252C] mt-1 font-medium">
                              <Building2 className="w-3.5 h-3.5" />
                              <span>{exp.company}</span>
                              {exp.location && (
                                <>
                                  <span>·</span>
                                  <span>{exp.location}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono px-3 py-1 rounded-xl bg-[#FAF7F3] text-[#4D0E13] border border-[#D8C4AC] font-semibold">
                              {exp.period}
                            </span>
                            <button
                              onClick={() => {
                                setEditingExperience(exp);
                                setIsCreatingExperience(false);
                                setExperienceForm({ ...exp });
                              }}
                              className="p-2 rounded-xl bg-[#FAF7F3] text-[#4D0E13] hover:bg-[#D8C4AC]/30 border border-[#D8C4AC] transition-all cursor-pointer shadow-sm"
                              title="Editar"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteExperience(exp.id)}
                              className="p-2 rounded-xl bg-[#C8A49F]/20 text-[#8C252C] hover:bg-[#4D0E13] hover:text-[#EEE4DA] border border-[#C8A49F]/40 transition-all cursor-pointer shadow-sm"
                              title="Eliminar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-[#4D0E13]/85 leading-relaxed font-normal mb-4 whitespace-pre-line">
                          {exp.description}
                        </p>

                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#D8C4AC]/50">
                            {exp.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-[#FAF7F3] text-[#4D0E13] border border-[#D8C4AC] font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}

          {/* TAB: CERTIFICADOS */}
          {activeTab === "certificates" && (
            isCreatingCertificate || editingCertificate ? (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8C4AC]">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingCertificate(false);
                        setEditingCertificate(null);
                      }}
                      aria-label="Volver a certificados"
                      title="Volver a certificados"
                      className="w-10 h-10 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF7F3] border border-[#D8C4AC] flex items-center justify-center text-[#4D0E13] hover:text-[#66151B] transition-all cursor-pointer shadow-sm shrink-0"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="font-serif italic text-2xl text-[#4D0E13] font-semibold">
                      {editingCertificate ? "Editar Certificado o Logro" : "Nuevo Certificado o Logro"}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingCertificate(false);
                        setEditingCertificate(null);
                      }}
                      className="px-4 py-2 rounded-xl text-[#8C252C] hover:text-[#4D0E13] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      form="certificate-form"
                      className="px-5 py-2.5 rounded-xl bg-[#4D0E13] hover:bg-[#66151B] text-[#EEE4DA] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Guardar</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] border border-[#D8C4AC] rounded-3xl p-7 sm:p-10 shadow-sm">
                  <form id="certificate-form" onSubmit={handleSaveCertificate} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                          Título de la certificación o logro *
                        </label>
                        <input
                          type="text"
                          required
                          value={certificateForm.title || ""}
                          onChange={(e) =>
                            setCertificateForm({ ...certificateForm, title: e.target.value })
                          }
                          placeholder="ej. Diseño UX/UI & Design Systems"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                          Institución u Organización Emisora *
                        </label>
                        <input
                          type="text"
                          required
                          value={certificateForm.issuer || ""}
                          onChange={(e) =>
                            setCertificateForm({ ...certificateForm, issuer: e.target.value })
                          }
                          placeholder="ej. Google, Coursera, Platzi, Universidad"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                          Fecha *
                        </label>
                        <input
                          type="text"
                          required
                          value={certificateForm.date || ""}
                          onChange={(e) =>
                            setCertificateForm({ ...certificateForm, date: e.target.value })
                          }
                          placeholder="ej. 2024 o Octubre 2024"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                          URL de Verificación / Credencial
                        </label>
                        <input
                          type="url"
                          value={certificateForm.url || ""}
                          onChange={(e) =>
                            setCertificateForm({ ...certificateForm, url: e.target.value })
                          }
                          placeholder="https://..."
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                          Orden
                        </label>
                        <input
                          type="number"
                          value={certificateForm.order ?? 0}
                          onChange={(e) =>
                            setCertificateForm({ ...certificateForm, order: Number(e.target.value) })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all"
                        />
                      </div>
                    </div>

                    {/* Image / Badge upload */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                        Foto o Insignia del Certificado (Opcional)
                      </label>
                      <input
                        ref={certFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCertImageSelected}
                        className="hidden"
                      />
                      <div className="flex flex-wrap items-center gap-4">
                        {certificateForm.image ? (
                          <div className="relative group w-28 h-20 rounded-2xl overflow-hidden border border-[#D8C4AC] bg-[#FAF7F3] shadow-sm">
                            <img
                              src={certificateForm.image}
                              alt="Vista previa del certificado"
                              className="w-full h-full object-contain p-1"
                            />
                            <button
                              type="button"
                              onClick={() => setCertificateForm({ ...certificateForm, image: "" })}
                              className="absolute top-1 right-1 p-1 rounded-full bg-[#4D0E13] text-white hover:bg-red-700 transition-colors"
                              title="Quitar imagen"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : null}

                        <button
                          type="button"
                          disabled={isUploadingCertImage}
                          onClick={() => certFileInputRef.current?.click()}
                          className="px-4 py-2.5 rounded-xl bg-[#FAF7F3] hover:bg-[#D8C4AC]/30 border border-[#D8C4AC] text-[#4D0E13] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isUploadingCertImage ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Subiendo imagen...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              <span>{certificateForm.image ? "Cambiar Imagen" : "Subir Imagen / Badge"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-2">
                        Descripción o Aprendizajes Clave (Opcional)
                      </label>
                      <textarea
                        rows={3}
                        value={certificateForm.description || ""}
                        onChange={(e) =>
                          setCertificateForm({ ...certificateForm, description: e.target.value })
                        }
                        placeholder="Breve resumen de las competencias, herramientas o logros acreditados..."
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] text-sm font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] transition-all resize-y"
                      />
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Visibility Toggle Card */}
                <div className="bg-[#FFFFFF] border border-[#D8C4AC] rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                      profile?.showCertificates !== false
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                        : "bg-[#FAF7F3] text-[#8C252C] border-[#D8C4AC]"
                    }`}>
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-serif italic text-lg text-[#4D0E13] font-semibold">
                          Visibilidad de la Sección en el Portafolio
                        </h3>
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold border ${
                          profile?.showCertificates !== false
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : "bg-[#D8C4AC]/40 text-[#8C252C] border-[#D8C4AC]"
                        }`}>
                          {profile?.showCertificates !== false ? "Visible en la Web" : "Oculta"}
                        </span>
                      </div>
                      <p className="text-xs text-[#8C252C] mt-1 font-medium leading-relaxed">
                        {profile?.showCertificates !== false
                          ? "La sección está activa y se muestra en tu sitio público."
                          : "La sección está oculta en tu sitio público. Podés activarla en cualquier momento."}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleShowCertificates(profile?.showCertificates === false)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer shrink-0 font-mono ${
                      profile?.showCertificates !== false
                        ? "bg-[#FAF7F3] hover:bg-[#D8C4AC]/30 text-[#8C252C] border border-[#D8C4AC]"
                        : "bg-[#4D0E13] hover:bg-[#66151B] text-[#EEE4DA]"
                    }`}
                  >
                    {profile?.showCertificates !== false ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        <span>Ocultar sección</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        <span>Hacer visible</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif italic text-2xl sm:text-3xl text-[#4D0E13] font-semibold">
                      Certificados & Logros ({certificates.length})
                    </h2>
                    <p className="text-xs text-[#8C252C] mt-1 font-medium">
                      Diplomas, certificaciones oficiales, premios y logros académicos o profesionales
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreatingCertificate(true);
                      setEditingCertificate(null);
                      setCertificateForm({
                        title: "",
                        issuer: "",
                        date: "",
                        url: "",
                        image: "",
                        description: "",
                        order: certificates.length,
                      });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#4D0E13] hover:bg-[#66151B] text-[#EEE4DA] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nuevo Certificado</span>
                  </button>
                </div>

                {/* Certificates List */}
                {certificates.length === 0 ? (
                  <div className="bg-[#FFFFFF] border border-[#D8C4AC] rounded-3xl p-12 text-center shadow-sm">
                    <Award className="w-12 h-12 text-[#D8C4AC] mx-auto mb-3" />
                    <h3 className="font-serif italic text-xl text-[#4D0E13] font-semibold">
                      No hay certificados registrados
                    </h3>
                    <p className="text-xs text-[#8C252C] mt-1.5 max-w-sm mx-auto font-medium">
                      Agregá tus certificaciones de cursos, talleres o logros para dar evidencia de tus competencias técnicas.
                    </p>
                    <button
                      onClick={() => {
                        setIsCreatingCertificate(true);
                        setEditingCertificate(null);
                        setCertificateForm({
                          title: "",
                          issuer: "",
                          date: "",
                          url: "",
                          image: "",
                          description: "",
                          order: 0,
                        });
                      }}
                      className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#4D0E13] text-[#EEE4DA] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#66151B] transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar Primer Certificado</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="bg-[#FFFFFF] border border-[#D8C4AC] rounded-2xl p-6 shadow-sm hover:border-[#4D0E13]/50 transition-all flex flex-col justify-between group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#4D0E13]/10 text-[#4D0E13] font-bold">
                                {cert.issuer}
                              </span>
                              <span className="text-[10px] font-mono text-[#8C252C] font-semibold">
                                {cert.date}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingCertificate(cert);
                                  setCertificateForm(cert);
                                }}
                                title="Editar"
                                className="w-8 h-8 rounded-lg bg-[#FAF7F3] hover:bg-[#D8C4AC]/40 text-[#4D0E13] flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteCertificate(cert.id)}
                                title="Eliminar"
                                className="w-8 h-8 rounded-lg bg-[#FAF7F3] hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            {cert.image && (
                              <div className="w-16 h-12 rounded-xl overflow-hidden border border-[#D8C4AC] bg-[#FAF7F3] shrink-0">
                                <img
                                  src={cert.image}
                                  alt={cert.title}
                                  className="w-full h-full object-contain p-1"
                                />
                              </div>
                            )}
                            <div>
                              <h4 className="font-serif italic text-lg text-[#4D0E13] font-semibold leading-tight">
                                {cert.title}
                              </h4>
                              {cert.description && (
                                <p className="text-xs text-[#8C252C] mt-1.5 line-clamp-2 font-light leading-relaxed">
                                  {cert.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {cert.url && (
                          <div className="pt-3 mt-3 border-t border-[#D8C4AC]/40 flex justify-end">
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-mono text-[#4D0E13] hover:text-[#8C252C] font-semibold"
                            >
                              <span>Ver credencial</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}

          {/* TAB 3: HABILIDADES */}
          {activeTab === "skills" && (
            isCreatingSkill || editingSkill ? (
              /* DEDICATED FULL VIEW (Clean view without modal) */
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8C4AC]">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingSkill(false);
                        setEditingSkill(null);
                      }}
                      className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4D0E13] hover:text-[#66151B] px-3.5 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF7F3] border border-[#D8C4AC] transition-all cursor-pointer shadow-sm font-semibold"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Volver a habilidades</span>
                    </button>
                    <h2 className="font-serif italic text-2xl text-[#4D0E13] font-semibold">
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
                      className="px-4 py-2 rounded-xl text-[#8C252C] hover:text-[#4D0E13] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveSkill()}
                      className="px-5 py-2.5 rounded-xl bg-[#4D0E13] hover:bg-[#66151B] text-[#EEE4DA] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Guardar Habilidad</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] border border-[#D8C4AC] rounded-3xl p-6 sm:p-8 shadow-sm">
                  <form onSubmit={handleSaveSkill} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-1.5">
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
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-xs font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-1.5">
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
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-xs font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-1.5">
                          Categoría
                        </label>
                        <input
                          type="text"
                          value={skillForm.category || ""}
                          onChange={(e) =>
                            setSkillForm({ ...skillForm, category: e.target.value })
                          }
                          placeholder="UX/UI Design"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-xs font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-1.5">
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
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-xs font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF] leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-[#4D0E13] font-semibold mb-1.5">
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
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#D8C4AC] text-[#4D0E13] placeholder-[#4D0E13]/35 text-xs font-medium focus:outline-none focus:border-[#4D0E13] focus:bg-[#FFFFFF]"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D8C4AC]">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingSkill(false);
                          setEditingSkill(null);
                        }}
                        className="px-4 py-2.5 rounded-xl text-[#8C252C] hover:text-[#4D0E13] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#4D0E13] hover:bg-[#66151B] text-[#EEE4DA] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer"
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
                    <h2 className="font-serif italic text-2xl sm:text-3xl text-[#4D0E13] font-semibold">
                      Habilidades
                    </h2>
                    <p className="text-xs text-[#8C252C] mt-1 font-medium">
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
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#4D0E13] hover:bg-[#66151B] text-[#EEE4DA] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nueva Habilidad</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {skills.map((s, idx) => {
                    const badgeStyles = [
                      "bg-[#D8C4AC]/30 text-[#4D0E13] border-[#D8C4AC]",
                      "bg-[#C8A49F]/30 text-[#66151B] border-[#C8A49F]/70",
                      "bg-[#4D0E13] text-[#EEE4DA] border-[#4D0E13]",
                    ];
                    return (
                      <div
                        key={s.id}
                        className="bg-[#FFFFFF] border border-[#D8C4AC] rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md text-center hover:border-[#8C252C]/50 transition-all"
                      >
                        <div>
                          <span
                            className={`text-[11px] font-mono uppercase tracking-widest font-bold inline-block px-3 py-1 rounded-full border mb-3 ${
                              badgeStyles[idx % badgeStyles.length]
                            }`}
                          >
                            {s.badge || s.category}
                          </span>
                          <h3 className="font-serif italic text-lg text-[#4D0E13] font-semibold mb-2">
                            {s.title}
                          </h3>
                          <p className="text-xs text-[#4D0E13]/80 mb-4 leading-relaxed font-normal">
                            {s.description}
                          </p>
                          <div className="text-[11px] font-mono text-[#8C252C] font-medium">
                            {s.tags.join(" · ")}
                          </div>
                        </div>
                        <div className="flex justify-center gap-2 pt-4 border-t border-[#D8C4AC] mt-5">
                          <button
                            onClick={() => {
                              setEditingSkill(s);
                              setSkillForm(s);
                            }}
                            className="p-2 rounded-xl bg-[#FAF7F3] hover:bg-[#D8C4AC]/40 text-[#4D0E13] border border-[#D8C4AC] transition-all cursor-pointer shadow-sm"
                            title="Editar"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(s.id)}
                            className="p-2 rounded-xl bg-[#C8A49F]/20 text-[#8C252C] hover:bg-[#4D0E13] hover:text-[#EEE4DA] border border-[#C8A49F]/40 transition-all cursor-pointer shadow-sm"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          )}

          {/* TAB 4: MENSAJES */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif italic text-2xl sm:text-3xl text-[#4D0E13] font-semibold flex items-center gap-3">
                    Bandeja de Mensajes
                    {unreadMessagesCount > 0 && (
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4D0E13] text-[#EEE4DA] not-italic shadow-sm font-bold">
                        {unreadMessagesCount} nuevos
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-[#8C252C] mt-1 font-medium">
                    Mensajes enviados directamente desde tu sitio
                  </p>
                </div>
              </div>

              {/* Status banner */}
              <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#D8C4AC] flex items-start gap-3.5 shadow-sm">
                <Mail className="w-4 h-4 text-[#4D0E13] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-[#4D0E13] font-serif italic text-sm">
                    Recepción en Base de Datos & Gmail
                  </p>
                  <p className="text-[#8C252C] font-normal leading-relaxed">
                    Cada mensaje queda registrado de forma permanente en tu base de datos PostgreSQL. Para recibirlos también al instante en tu correo (<strong>nayssa1310@gmail.com</strong>), configurá tu Contraseña de Aplicación de 16 caracteres en <code className="bg-[#FAF7F3] px-1.5 py-0.5 rounded text-[#4D0E13] font-mono text-[11px] border border-[#D8C4AC]">.env.local</code>.
                  </p>
                </div>
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border border-[#D8C4AC] shadow-sm">
                  <Inbox className="w-8 h-8 text-[#8C252C]/60 mx-auto mb-3" />
                  <p className="font-serif italic text-base text-[#4D0E13] font-semibold">
                    Bandeja limpia por ahora
                  </p>
                  <p className="text-xs text-[#8C252C] mt-1">
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
                          ? "bg-[#FAF7F3] border-[#D8C4AC] opacity-80"
                          : "bg-[#FFFFFF] border-[#D8C4AC] shadow-sm ring-1 ring-[#4D0E13]/10"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2.5">
                          {!msg.read && (
                            <span className="w-2 h-2 rounded-full bg-[#4D0E13] shrink-0 animate-pulse" />
                          )}
                          <h4 className="font-serif italic text-base text-[#4D0E13] font-semibold">
                            {msg.name}
                          </h4>
                          <span className="text-xs text-[#8C252C] font-mono font-medium">
                            &lt;{msg.email}&gt;
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8C252C]">
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

                      <p className="text-xs text-[#4D0E13] bg-[#FAF7F3] p-4 rounded-2xl border border-[#D8C4AC] whitespace-pre-wrap leading-relaxed my-3 font-normal">
                        {msg.message}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <a
                          href={`mailto:${msg.email}?subject=Respuesta a tu mensaje desde mi portafolio`}
                          className="inline-flex items-center gap-1.5 text-xs text-[#4D0E13] hover:text-[#66151B] font-mono font-medium transition-colors"
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
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium shadow-sm ${
                              msg.read
                                ? "text-[#8C252C] border-[#D8C4AC] bg-[#FAF7F3] hover:bg-[#D8C4AC]/30"
                                : "text-[#EEE4DA] border-[#4D0E13] bg-[#4D0E13] hover:bg-[#66151B]"
                            }`}
                          >
                            <Check className="w-3 h-3" />
                            <span>{msg.read ? "Marcar no leído" : "Marcar leído"}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-2 rounded-xl bg-[#C8A49F]/20 text-[#8C252C] hover:bg-[#4D0E13] hover:text-[#EEE4DA] border border-[#C8A49F]/40 transition-colors cursor-pointer shadow-sm"
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
