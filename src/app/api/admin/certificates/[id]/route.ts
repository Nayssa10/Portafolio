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

    const updated = await prisma.certificate.update({
      where: { id },
      data: {
        title: body.title,
        issuer: body.issuer,
        date: body.date,
        url: body.url !== undefined ? body.url : undefined,
        image: body.image !== undefined ? body.image : undefined,
        description: body.description !== undefined ? body.description : undefined,
        order: Number(body.order) || 0,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Admin certificate PUT error:", error);
    return NextResponse.json({ error: "Error al actualizar certificado" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.certificate.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin certificate DELETE error:", error);
    return NextResponse.json({ error: "Error al eliminar certificado" }, { status: 500 });
  }
}
