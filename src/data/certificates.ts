export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string | null;
  image?: string | null;
  description?: string | null;
  order: number;
}

export const defaultCertificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Diseño UX/UI & Design Systems",
    issuer: "Coursera / Google",
    date: "2024",
    url: "",
    image: "",
    description: "Metodologías de diseño centrado en el usuario, prototipado interactivo en Figma y creación de sistemas de diseño escalables.",
    order: 1,
  },
  {
    id: "cert-2",
    title: "Desarrollo Front-End con React & TypeScript",
    issuer: "Platzi",
    date: "2024",
    url: "",
    image: "",
    description: "Arquitectura de componentes, gestión de estado, TypeScript avanzado y buenas prácticas en aplicaciones web modernas.",
    order: 2,
  },
  {
    id: "cert-3",
    title: "Ingeniería de Software & Metodologías Ágiles",
    issuer: "Universidad",
    date: "2023",
    url: "",
    image: "",
    description: "Fundamentos de ciclo de vida del software, patrones arquitectónicos y trabajo colaborativo con Scrum/Kanban.",
    order: 3,
  },
];
