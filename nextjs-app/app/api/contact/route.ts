import { sendMail } from "@/app/lib/email";
import { escapeHtml, escapeMultiline } from "@/app/lib/html";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    await sendMail({
      to: "info@medifree.cz",
      replyTo: String(email),
      subject: "Nová zpráva z webu Medifree",
      text: `Od: ${name} (${email})\n\n${message}`,
      html: `
        <h2>Nová zpráva z webu Medifree</h2>
        <p><strong>Jméno:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Zpráva:</strong></p>
        <p>${escapeMultiline(message)}</p>
      `,
    });

    return new Response("Message sent successfully", { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return new Response("Failed to send email", { status: 500 });
  }
}
