export interface Experience {
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

export const defaultExperiences: Experience[] = [
  {
    id: "exp-1",
    role: "Diseñadora UX/UI & Desarrolladora Front-End",
    company: "Proyectos Independientes & Freelance",
    period: "2024 - Presente",
    location: "Lima, Perú · Remoto",
    description:
      "Diseño de prototipos de alta fidelidad en Figma, arquitecturas de información y desarrollo de componentes frontend accesibles y responsivos con Next.js y Tailwind CSS.",
    technologies: ["Figma", "Next.js", "TypeScript", "Tailwind CSS", "Design Systems"],
    current: true,
    order: 0,
  },
];
