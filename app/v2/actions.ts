"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";

const LEAD_INBOX = process.env.LEAD_ALERT_EMAIL ?? "joacochristophersen@gmail.com";
const EMAIL_RE = /\S+@\S+\.\S+/;

/** Corporate access request — runs entirely on the server, zero client JS. */
export async function requestAccess(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();

  if (!name || !company || !EMAIL_RE.test(email)) {
    redirect("/v2?error=1");
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Sin API key el lead no se pierde en silencio: queda en los logs del server.
    console.log("[v2/requestAccess] RESEND_API_KEY missing — lead:", { name, email, company });
    redirect("/v2/thanks");
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "VISIUM 5.0 <onboarding@resend.dev>",
      to: [LEAD_INBOX],
      replyTo: email,
      subject: `Access request — ${company}`,
      html: `
        <div style="background:#000000;padding:48px 24px;font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;">
          <div style="max-width:520px;margin:0 auto;background:#202020;border-radius:10px;padding:40px;">
            <p style="margin:0 0 32px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#999999;">
              Visium 5.0 · Corporate access request
            </p>
            <h1 style="margin:0 0 40px;font-size:30px;font-weight:300;letter-spacing:-0.025em;color:#ffffff;line-height:1.2;">
              A new development wants to be <em style="font-family:Georgia,serif;font-weight:500;">seen</em>.
            </h1>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:14px 0;border-top:1px solid #333333;font-size:11px;letter-spacing:0.05em;text-transform:uppercase;color:#999999;">Name</td>
                <td style="padding:14px 0;border-top:1px solid #333333;font-size:16px;color:#ffffff;text-align:right;">${name}</td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-top:1px solid #333333;font-size:11px;letter-spacing:0.05em;text-transform:uppercase;color:#999999;">Company</td>
                <td style="padding:14px 0;border-top:1px solid #333333;font-size:16px;color:#ffffff;text-align:right;">${company}</td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-top:1px solid #333333;font-size:11px;letter-spacing:0.05em;text-transform:uppercase;color:#999999;">Email</td>
                <td style="padding:14px 0;border-top:1px solid #333333;font-size:16px;color:#ffffff;text-align:right;">
                  <a href="mailto:${email}" style="color:#ffffff;">${email}</a>
                </td>
              </tr>
            </table>
            <a href="mailto:${email}" style="display:inline-block;margin-top:40px;background:#f5f5f0;color:#000000;font-size:16px;font-weight:500;padding:12px 24px;border-radius:9999px;text-decoration:none;">
              Reply now
            </a>
          </div>
        </div>
      `,
    });
  } catch (err) {
    // El lead ya quedó registrado en logs; la UX del visitante no se rompe por un fallo de email.
    console.error("[v2/requestAccess] Resend error:", err, { name, email, company });
  }

  redirect("/v2/thanks");
}
