import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { allProjects as fallbackProjects } from "@/data/projects";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });

    if (projects && projects.length > 0) {
      return NextResponse.json(projects);
    }
    return NextResponse.json(fallbackProjects);
  } catch (error) {
    console.warn("Could not fetch projects from DB, falling back to static data:", error);
    return NextResponse.json(fallbackProjects);
  }
}
