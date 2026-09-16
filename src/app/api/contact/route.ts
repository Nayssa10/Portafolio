import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nombre, email y mensaje son obligatorios" },
        { status: 400 }
      );
    }

    // 1. Always save in database first so message is never lost
    const savedMessage = await prisma.message.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim(),
        message: String(message).trim(),
      },
    });

    // 2. Dispatch to Gmail if credentials exist
    const gmailUser = process.env.GMAIL_USER || "nayssa1310@gmail.com";
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    let emailSent = false;
    if (gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        await transporter.sendMail({
          from: `"Portafolio Nayssa" <${gmailUser}>`,
          to: gmailUser,
          replyTo: email,
          subject: `Nuevo mensaje de ${name} vía Portafolio`,
          text: `Has recibido un nuevo mensaje desde tu portafolio:\n\nNombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <h2 style="color: #6366f1; margin-top: 0;">Nuevo mensaje en tu Portafolio</h2>
              <p><strong>De:</strong> ${name} &lt;${email}&gt;</p>
              <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #6366f1;">
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
              <p style="font-size: 12px; color: #64748b;">Recibido el ${new Date().toLocaleString("es-PE", { timeZone: "America/Lima" })}</p>
            </div>
          `,
        });
        emailSent = true;
      } catch (mailError) {
        console.error("Nodemailer error (email notification failed):", mailError);
      }
    } else {
      console.info("GMAIL_APP_PASSWORD not configured. Message stored in DB only.");
    }

    return NextResponse.json({
      success: true,
      emailSent,
      id: savedMessage.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Error al procesar el mensaje" },
      { status: 500 }
    );
  }
}
