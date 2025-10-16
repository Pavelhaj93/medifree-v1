import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    // Configure transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: "Medifree Website",
      to: "info@medifree.cz",
      subject: "Nová zpráva z webu Medifree",
      text: `Od: ${name} (${email})\n\n${message}`,
      html: `
        <h2>Nová zpráva z webu Medifree</h2>
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Zpráva:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response("Message sent successfully", { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return new Response("Failed to send email", { status: 500 });
  }
}
