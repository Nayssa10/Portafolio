import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error("Admin skills GET error:", error);
    return NextResponse.json({ error: "Error al obtener habilidades" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { badge, category, title, description, tags, order } = body;

    if (!category || !title || !description) {
      return NextResponse.json(
        { error: "Categoría, título y descripción son obligatorios" },
        { status: 400 }
      );
    }

    const newSkill = await prisma.skill.create({
      data: {
        badge: badge || "01 · Experiencia",
        category,
        title,
        description,
        tags: Array.isArray(tags) ? tags : [],
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    console.error("Admin skills POST error:", error);
    return NextResponse.json({ error: "Error al crear habilidad" }, { status: 500 });
  }
}
