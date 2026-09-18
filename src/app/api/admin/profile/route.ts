import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    let profile = await prisma.profile.findUnique({
      where: { id: "profile" },
    });

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          id: "profile",
        },
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ error: "Error al obtener perfil" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();

    const updated = await prisma.profile.upsert({
      where: { id: "profile" },
      update: {
        name: body.name,
        title: body.title,
        heroSubtitle: body.heroSubtitle,
        bio: body.bio,
        aboutTitle: body.aboutTitle,
        aboutText: body.aboutText,
        email: body.email,
        available: body.available,
        availableText: body.availableText,
        location: body.location,
        linkedin: body.linkedin,
        github: body.github,
        showExperience: body.showExperience ?? false,
      },
      create: {
        id: "profile",
        name: body.name || "Nayssa Chu Bustamante",
        title: body.title || "Diseño UX/UI & Desarrollo Front-End",
        heroSubtitle: body.heroSubtitle || "Diseño interfaces intuitivas, elegantes y técnicamente viables.",
        bio: body.bio || "Diseño interfaces intuitivas, elegantes y técnicamente viables.",
        aboutTitle: body.aboutTitle || "Sobre mí",
        aboutText: body.aboutText || "Estudiante de 8vo ciclo de Ingeniería de Sistemas e Informática. Lo que más me apasiona es el desarrollo Front-End y el diseño UX/UI. Me interesa no solo que una aplicación o página web funcione, sino también que sea intuitiva, visualmente atractiva y que realmente facilite la experiencia de quien la utiliza.",
        email: body.email || "nayssa1310@gmail.com",
        available: body.available ?? true,
        availableText: body.availableText || "Disponible para proyectos & prácticas",
        showExperience: body.showExperience ?? false,
        location: body.location || "Lima, Perú",
        linkedin: body.linkedin || "https://www.linkedin.com/in/nayssa",
        github: body.github || "https://github.com/Nayssa10",
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Profile PUT error:", error);
    return NextResponse.json({ error: "Error al actualizar perfil" }, { status: 500 });
  }
}
