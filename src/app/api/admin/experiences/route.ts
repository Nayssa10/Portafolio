import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Admin experiences GET error:", error);
    return NextResponse.json({ error: "Error al obtener experiencias" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { role, company, period, location, description, technologies, current, order } = body;

    if (!role || !company || !period || !description) {
      return NextResponse.json(
        { error: "Puesto, empresa, período y descripción son obligatorios" },
        { status: 400 }
      );
    }

    const newExperience = await prisma.experience.create({
      data: {
        role,
        company,
        period,
        location: location || "Lima, Perú · Remoto",
        description,
        technologies: Array.isArray(technologies) ? technologies : [],
        current: Boolean(current),
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(newExperience, { status: 201 });
  } catch (error) {
    console.error("Admin experiences POST error:", error);
    return NextResponse.json({ error: "Error al crear experiencia" }, { status: 500 });
  }
}
