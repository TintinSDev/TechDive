"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormInput) {
  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY in environment variables.");
    return { success: false, error: "Email provider configuration error." };
  }

  try {
    const { name, email, subject, message } = data;

    // 🚀 UPDATED: Using your custom verified domain infrastructure
    await resend.emails.send({
      from: `TechDive Contact <notifications@techdive.space>`, // ✨ Swapped from onboarding@resend.dev
      to: "support@techdive.space",
      replyTo: email,
      subject: `🚨 TechDive Inquiry: ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #334155; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">New Contact Form Message</h2>
          <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 15px; border-radius: 6px; font-size: 14px; line-height: 1.6;">${message}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error: any) {
    console.error(
      "Failed to transmit contact dispatch email via Resend:",
      error,
    );
    return {
      success: false,
      error: error.message || "Failed to deliver message.",
    };
  }
}
