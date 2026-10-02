import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getSession } from "@/lib/auth";

const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME ||
  process.env.NOMBRE_DE_LA_NUBE_CLOUDINARY ||
  "nhcv9hfb";

const apiKey =
  process.env.CLOUDINARY_API_KEY ||
  process.env.CLAVE_API_DE_CLOUDINARY ||
  "589482782971371";

const apiSecret =
  process.env.CLOUDINARY_API_SECRET ||
  process.env.SECRETO_DE_API_CLOUDINARY ||
  process.env.SECRETO_API_CLOUDINARY;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

async function uploadToCloudinary(buffer: Buffer, folder: string = "portfolio"): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result?.secure_url) return reject(new Error("No URL returned from Cloudinary"));
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          error:
            "Faltan configurar las variables de Cloudinary en el entorno (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No se enviaron archivos" },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (!file || typeof file === "string" || !file.name) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const url = await uploadToCloudinary(buffer, "portfolio");
      uploadedUrls.push(url);
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Error al procesar la subida del archivo a Cloudinary";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
