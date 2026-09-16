import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Admin projects GET error:", error);
    return NextResponse.json({ error: "Error al obtener proyectos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      subtitle,
      slug,
      category,
      highlight,
      color,
      description,
      problem,
      solution,
      impact,
      featured,
      order,
      tags,
      tools,
      images,
      metrics,
      caseStudy,
      link,
      github,
    } = body;

    if (!title || !slug || !description) {
      return NextResponse.json(
        { error: "Título, slug y descripción son obligatorios" },
        { status: 400 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        subtitle: subtitle || "",
        slug,
        category: category || "UX/UI Design",
        highlight: highlight || "",
        color: color || "from-[#8D3A3C]/40 via-[#220D3E]/80 to-[#1A0735]",
        description,
        problem: problem || null,
        solution: solution || null,
        impact: impact || null,
        featured: featured ?? true,
        order: Number(order) || 0,
        tags: Array.isArray(tags) ? tags : [],
        tools: Array.isArray(tools) ? tools : [],
        images: Array.isArray(images) ? images : [],
        metrics: metrics || undefined,
        caseStudy: caseStudy || undefined,
        link: link || null,
        github: github || null,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Admin projects POST error:", error);
    return NextResponse.json({ error: "Error al crear proyecto" }, { status: 500 });
  }
}
