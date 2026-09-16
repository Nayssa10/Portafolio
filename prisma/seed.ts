import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { allProjects } from "../src/data/projects";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Seed Admin User
  const username = process.env.ADMIN_USER || "Nayssa";
  const password = process.env.ADMIN_PASSWORD || "Nayssa1305";
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { username },
    update: { password: hashedPassword },
    create: {
      username,
      password: hashedPassword,
    },
  });
  console.log(`👤 Admin user seeded: ${admin.username}`);

  // 2. Seed Profile
  await prisma.profile.upsert({
    where: { id: "profile" },
    update: {
      name: "Nayssa Chu Bustamante",
      title: "Diseño UX/UI & Desarrollo Front-End",
      heroSubtitle: "Diseño interfaces intuitivas, elegantes y técnicamente viables.",
      bio: "Diseño interfaces intuitivas, elegantes y técnicamente viables.",
      aboutTitle: "Sobre mí",
      aboutText:
        "Estudiante de 8vo ciclo de Ingeniería de Sistemas e Informática. Lo que más me apasiona es el desarrollo Front-End y el diseño UX/UI. Me interesa no solo que una aplicación o página web funcione, sino también que sea intuitiva, visualmente atractiva y que realmente facilite la experiencia de quien la utiliza.",
      email: "nayssa1310@gmail.com",
      available: true,
      availableText: "Disponible para proyectos & prácticas",
      location: "Lima, Perú",
      linkedin: "https://www.linkedin.com/in/nayssa",
      github: "https://github.com/Nayssa10",
    },
    create: {
      id: "profile",
      name: "Nayssa Chu Bustamante",
      title: "Diseño UX/UI & Desarrollo Front-End",
      heroSubtitle: "Diseño interfaces intuitivas, elegantes y técnicamente viables.",
      bio: "Diseño interfaces intuitivas, elegantes y técnicamente viables.",
      aboutTitle: "Sobre mí",
      aboutText:
        "Estudiante de 8vo ciclo de Ingeniería de Sistemas e Informática. Lo que más me apasiona es el desarrollo Front-End y el diseño UX/UI. Me interesa no solo que una aplicación o página web funcione, sino también que sea intuitiva, visualmente atractiva y que realmente facilite la experiencia de quien la utiliza.",
      email: "nayssa1310@gmail.com",
      available: true,
      availableText: "Disponible para proyectos & prácticas",
      location: "Lima, Perú",
      linkedin: "https://www.linkedin.com/in/nayssa",
      github: "https://github.com/Nayssa10",
    },
  });
  console.log("📝 Profile seeded");

  // 3. Seed Projects
  for (let i = 0; i < allProjects.length; i++) {
    const p = allProjects[i];
    await prisma.project.upsert({
      where: { slug: p.id },
      update: {
        title: p.title,
        subtitle: p.subtitle,
        category: p.category,
        highlight: p.highlight,
        color: p.color,
        description: p.description,
        tags: p.tags,
        featured: p.featured,
        order: i,
        images: p.images,
      },
      create: {
        slug: p.id,
        title: p.title,
        subtitle: p.subtitle,
        category: p.category,
        highlight: p.highlight,
        color: p.color,
        description: p.description,
        tags: p.tags,
        featured: p.featured,
        order: i,
        images: p.images,
      },
    });
  }
  console.log(`📦 Seeded ${allProjects.length} projects with all frontend fields`);

  // 4. Seed Skills
  const skillsData = [
    {
      badge: "01 · Experiencia",
      category: "UX/UI Design",
      title: "Diseño UX/UI",
      description:
        "Interfaces intuitivas, prototipado interactivo y diseño centrado en resolver fricciones de usuario.",
      tags: ["Figma", "Design Systems", "Prototipado", "Wireframing"],
      order: 1,
    },
    {
      badge: "02 · Desarrollo",
      category: "Front-End",
      title: "Desarrollo Front-End",
      description:
        "Traducción precisa a componentes modulares, limpios y dinámicos en código moderno.",
      tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      order: 2,
    },
    {
      badge: "03 · Calidad",
      category: "Calidad & Rendimiento",
      title: "Rendimiento & a11y",
      description:
        "Accesibilidad universal, diseño responsive mobile-first y optimización web para velocidad real.",
      tags: ["Accesibilidad a11y", "Mobile-First", "Performance", "Clean Code"],
      order: 3,
    },
  ];

  await prisma.skill.deleteMany({});
  for (const skill of skillsData) {
    await prisma.skill.create({ data: skill });
  }
  console.log("⚡ Seeded 3 skills");

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
