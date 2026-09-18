import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updated = await prisma.experience.update({
      where: { id },
      data: {
        role: body.role,
        company: body.company,
        period: body.period,
        location: body.location,
        description: body.description,
        technologies: Array.isArray(body.technologies) ? body.technologies : undefined,
        current: typeof body.current === "boolean" ? body.current : undefined,
        order: Number(body.order) || 0,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Admin experience PUT error:", error);
    return NextResponse.json({ error: "Error al actualizar experiencia" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.experience.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin experience DELETE error:", error);
    return NextResponse.json({ error: "Error al eliminar experiencia" }, { status: 500 });
  }
}
