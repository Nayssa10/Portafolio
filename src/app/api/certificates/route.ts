import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { defaultCertificates } from "@/data/certificates";

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { order: "asc" },
    });

    if (certificates && certificates.length > 0) {
      return NextResponse.json(certificates);
    }
    return NextResponse.json(defaultCertificates);
  } catch (error) {
    console.warn("Could not fetch certificates from DB, falling back to static data:", error);
    return NextResponse.json(defaultCertificates);
  }
}
