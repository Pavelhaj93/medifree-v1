// Email service configuration
// You can switch between different email providers by changing the implementation

interface EmailData {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    path: string;
  }>;
}

export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    if (!process.env.SMTP_HOST) {
      console.error(
        "No SMTP configuration found. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and FROM_EMAIL in your environment."
      );
      return false;
    }
    return await sendWithNodemailer(data);
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

// Removed Resend and SendGrid implementations. Only Nodemailer is used for all emails.

// Commented out SendGrid implementation - uncomment and install @sendgrid/mail to use
/*
async function sendWithSendGrid(data: EmailData): Promise<boolean> {
  try {
    const sgMail = await import('@sendgrid/mail').catch(() => null);
    if (!sgMail) {
      console.error('SendGrid not installed. Run: npm install @sendgrid/mail');
      return false;
    }
    
    sgMail.default.setApiKey(process.env.SENDGRID_API_KEY!);
    
    const emailData: any = {
      from: process.env.FROM_EMAIL || 'noreply@medifree.cz',
      to: data.to,
      subject: data.subject,
      html: data.html,
    };
    
    if (data.attachments) {
      emailData.attachments = data.attachments.map(att => ({
        filename: att.filename,
        content: att.path,
        type: 'application/pdf',
        disposition: 'attachment',
      }));
    }
    
    await sgMail.default.send(emailData);
    console.log('Email sent successfully with SendGrid');
    return true;
  } catch (error) {
    console.error('SendGrid error:', error);
    return false;
  }
}
*/

async function sendWithNodemailer(data: EmailData): Promise<boolean> {
  try {
    // Import nodemailer dynamically
    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailData: any = {
      from: process.env.FROM_EMAIL || "noreply@medifree.cz",
      to: data.to,
      subject: data.subject,
      html: data.html,
    };

    // Nodemailer can handle attachments from URLs
    if (data.attachments) {
      emailData.attachments = data.attachments;
    }

    await transporter.sendMail(emailData);
    console.log("Email sent successfully with Nodemailer");
    return true;
  } catch (error) {
    console.error("Nodemailer error:", error);
    return false;
  }
}
