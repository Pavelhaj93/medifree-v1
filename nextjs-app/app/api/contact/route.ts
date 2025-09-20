import { contactSchema } from "@/app/lib/schemas";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    const result = await resend.emails.send({
      from: "no-reply@medifree.cz",
      to: "info@medifree.cz",
      subject: `Nový email od: ${data.name}`,
      replyTo: data.email,
      html: `
        <p><strong>Jméno:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p>${data.message}</p>
      `,
    });

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 400 }
    );
  }
}
