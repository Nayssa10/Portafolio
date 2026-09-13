export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: string;
  highlight: string;
  color: string;
  images: string[];
  featured: boolean;
}

export const allProjects: Project[] = [
  {
    id: "student-productivity-app",
    title: "App de Productividad y Bienestar Estudiantil",
    subtitle: "Caso de Estudio UX/UI · Mobile",
    description:
      "Investigación con usuarios y prototipado interactivo de alta fidelidad para reducir la sobrecarga cognitiva en universitarios.",
    tags: ["UX Research", "Figma", "Wireframes", "Design System"],
    category: "UX/UI Design",
    highlight: "8 entrevistas · 3 iteraciones de wireframes",
    color: "from-[#8D3A3C]/40 via-[#220D3E]/80 to-[#1A0735]",
    images: [
      "/projects/student-app-1.svg",
      "/projects/student-app-2.svg",
      "/projects/student-app-3.svg",
    ],
    featured: true,
  },
  {
    id: "ecommerce-checkout-redesign",
    title: "Rediseño de E-Commerce & Checkout Flow",
    subtitle: "Diseño Web & Optimización de Conversión",
    description:
      "Auditoría heurística y rediseño de interfaz para simplificar el embudo de compra en 3 pasos clave, priorizando accesibilidad y mobile-first.",
    tags: ["UI Design", "Figma", "Heurísticas", "Front-End Ready"],
    category: "Product Design",
    highlight: "-35% fricción en checkout conceptual",
    color: "from-[#7B694E]/40 via-[#220D3E]/80 to-[#1A0735]",
    images: [
      "/projects/ecommerce-1.svg",
      "/projects/ecommerce-2.svg",
      "/projects/ecommerce-3.svg",
    ],
    featured: true,
  },
  {
    id: "tailwind-design-system",
    title: "Design System & UI Library con Tailwind",
    subtitle: "Frontend & Arquitectura de Componentes",
    description:
      "Librería de componentes atómicos documentados con tokens de diseño, contrastes WCAG AA y variantes interactivas listas para producción.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Atomic Design"],
    category: "Design Engineering",
    highlight: "Tokens centralizados · 20+ componentes",
    color: "from-[#C6B39A]/30 via-[#220D3E]/80 to-[#1A0735]",
    images: [
      "/projects/design-system-1.svg",
      "/projects/design-system-2.svg",
      "/projects/design-system-3.svg",
    ],
    featured: true,
  },
  {
    id: "clinical-dashboard",
    title: "Dashboard Clínico & Teleconsulta Médica",
    subtitle: "Diseño Web App & Gestión de Pacientes",
    description:
      "Plataforma SaaS para médicos con gestión de historias clínicas electrónicas, agenda interactiva y visualización clara de analítica de consultas.",
    tags: ["UX Research", "SaaS Dashboard", "Figma", "Design Tokens"],
    category: "UX/UI Design",
    highlight: "Historial clínico en 1 clic · WCAG AA",
    color: "from-[#8D3A3C]/35 via-[#220D3E]/80 to-[#1A0735]",
    images: [
      "/projects/student-app-1.svg",
      "/projects/design-system-2.svg",
      "/projects/student-app-3.svg",
    ],
    featured: false,
  },
  {
    id: "fintech-savings-app",
    title: "Finanzas Personales & Microinversiones",
    subtitle: "Fintech App & Educación Financiera",
    description:
      "Aplicación móvil para la gestión de presupuestos cotidianos, metas de ahorro automatizadas y visualización intuitiva de carteras de inversión.",
    tags: ["Mobile UX", "React Native", "Figma", "Design System"],
    category: "Product Design",
    highlight: "Onboarding guiado · +32% retención",
    color: "from-[#7B694E]/35 via-[#220D3E]/80 to-[#1A0735]",
    images: [
      "/projects/ecommerce-3.svg",
      "/projects/student-app-2.svg",
      "/projects/ecommerce-1.svg",
    ],
    featured: false,
  },
  {
    id: "startup-brand-landing",
    title: "Sitio Web Interactivo & Identidad de Marca",
    subtitle: "Desarrollo Frontend & Dirección Creativa",
    description:
      "Landing page de alto impacto visual con microinteracciones fluidas en Framer Motion, tipografía editorial y rendimiento de 98 en Google Lighthouse.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "SEO Ready"],
    category: "Design Engineering",
    highlight: "98 Lighthouse Score · Carga ultrarrápida",
    color: "from-[#C6B39A]/25 via-[#220D3E]/80 to-[#1A0735]",
    images: [
      "/projects/design-system-1.svg",
      "/projects/design-system-3.svg",
      "/projects/ecommerce-2.svg",
    ],
    featured: false,
  },
];

export const featuredProjects = allProjects.filter((p) => p.featured);
