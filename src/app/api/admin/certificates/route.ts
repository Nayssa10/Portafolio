import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const certificates = await prisma.certificate.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(certificates);
  } catch (error) {
    console.error("Admin certificates GET error:", error);
    return NextResponse.json({ error: "Error al obtener certificados" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { title, issuer, date, url, image, description, order } = body;

    if (!title || !issuer || !date) {
      return NextResponse.json(
        { error: "Título, emisor y fecha son obligatorios" },
        { status: 400 }
      );
    }

    const newCertificate = await prisma.certificate.create({
      data: {
        title,
        issuer,
        date,
        url: url || "",
        image: image || "",
        description: description || "",
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(newCertificate, { status: 201 });
  } catch (error: any) {
    console.error("Admin certificates POST error:", error);
    return NextResponse.json(
      { error: error?.message || "Error al crear certificado" },
      { status: 500 }
    );
  }
}
