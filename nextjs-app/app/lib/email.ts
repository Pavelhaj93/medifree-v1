import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

// All site email goes through here (Gmail + app password). Swap the transport to change provider.
let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD");
  }
  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  return transporter;
}

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export async function sendMail(message: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}) {
  await getTransporter().sendMail({
    from: `"Medifree" <${process.env.GMAIL_USER}>`,
    ...message,
  });
}

export const shopAdminEmail = () => process.env.SHOP_ADMIN_EMAIL || "info@medifree.cz";
