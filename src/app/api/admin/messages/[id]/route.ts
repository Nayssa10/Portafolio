import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updated = await prisma.message.update({
      where: { id },
      data: {
        read: Boolean(body.read),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Message PATCH error:", error);
    return NextResponse.json({ error: "Error al actualizar mensaje" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.message.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Message DELETE error:", error);
    return NextResponse.json({ error: "Error al eliminar mensaje" }, { status: 500 });
  }
}
