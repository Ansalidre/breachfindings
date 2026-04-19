import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function generateToken(): string {
  return crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
}

export async function POST(req: NextRequest) {
  const { email, domain, leadId } = await req.json();

  // ─── DARKSCOPE API (once account is available) ────────────────
  // const response = await fetch("https://api.darkscope.com/v1/check", { ... });
  // const data = await response.json();
  // ─────────────────────────────────────────────────────────────

  // DUMMY DATA
  await new Promise((r) => setTimeout(r, 800));
  const results = {
    breachCountDomain: Math.floor(Math.random() * 25) + 5,
    emailsDiscovered: Math.floor(Math.random() * 200) + 50,
    breachCountEmail: email ? Math.floor(Math.random() * 10) + 1 : 0,
  };

  const token = generateToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  await supabase.from("verification_tokens").insert({
    token, lead_id: leadId, used: false, expires_at: expiresAt,
  });

  await supabase.from("leads").update({
    breach_count_email: results.breachCountEmail,
    breach_count_domain: results.breachCountDomain,
    emails_discovered: results.emailsDiscovered,
  }).eq("id", leadId);

  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify?token=${token}`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "noreply@apasec.de",
      to: email || domain,
      subject: "Your breach analysis is ready – view your results",
      html: `
        <h2>Your security analysis is complete</h2>
        <p>Click the link below to view your results:</p>
        <a href="${verifyUrl}" style="display:inline-block;background:#1ea7ff;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">
          View results →
        </a>
        <p style="color:#999;font-size:0.85rem;margin-top:16px;">
          This link is valid for 24 hours and can only be used once.
        </p>
      `,
    }),
  });

  return NextResponse.json({ success: true });
}
