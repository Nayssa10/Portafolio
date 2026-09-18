import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { defaultExperiences } from "@/data/experience";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });

    if (experiences && experiences.length > 0) {
      return NextResponse.json(experiences);
    }
    return NextResponse.json(defaultExperiences);
  } catch (error) {
    console.warn("Could not fetch experiences from DB, falling back to static data:", error);
    return NextResponse.json(defaultExperiences);
  }
}
