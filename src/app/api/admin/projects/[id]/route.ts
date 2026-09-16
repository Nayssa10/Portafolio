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

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        slug: body.slug,
        category: body.category,
        highlight: body.highlight,
        color: body.color,
        description: body.description,
        problem: body.problem,
        solution: body.solution,
        impact: body.impact,
        featured: body.featured,
        order: Number(body.order) || 0,
        tags: Array.isArray(body.tags) ? body.tags : undefined,
        tools: Array.isArray(body.tools) ? body.tools : undefined,
        images: Array.isArray(body.images) ? body.images : undefined,
        metrics: body.metrics,
        caseStudy: body.caseStudy,
        link: body.link,
        github: body.github,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Admin project PUT error:", error);
    return NextResponse.json({ error: "Error al actualizar proyecto" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin project DELETE error:", error);
    return NextResponse.json({ error: "Error al eliminar proyecto" }, { status: 500 });
  }
}
