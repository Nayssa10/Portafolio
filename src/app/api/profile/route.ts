import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const defaultProfile = {
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
  showExperience: false,
  showCertificates: true,
  location: "Lima, Perú",
  linkedin: "https://www.linkedin.com/in/nayssa",
  github: "https://github.com/Nayssa10",
};

export async function GET() {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: "profile" },
    });

    if (profile) {
      return NextResponse.json(profile);
    }
    return NextResponse.json(defaultProfile);
  } catch (error) {
    console.warn("Could not fetch profile from DB, falling back to default:", error);
    return NextResponse.json(defaultProfile);
  }
}
