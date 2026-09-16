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

    const updated = await prisma.skill.update({
      where: { id },
      data: {
        badge: body.badge,
        category: body.category,
        title: body.title,
        description: body.description,
        tags: Array.isArray(body.tags) ? body.tags : undefined,
        order: Number(body.order) || 0,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Admin skill PUT error:", error);
    return NextResponse.json({ error: "Error al actualizar habilidad" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin skill DELETE error:", error);
    return NextResponse.json({ error: "Error al eliminar habilidad" }, { status: 500 });
  }
}
