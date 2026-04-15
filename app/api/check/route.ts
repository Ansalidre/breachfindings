import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, domain } = await req.json();

  // ─── DARKSCOPE API (sobald Account vorhanden) ────────────────
  // const DARKSCOPE_API_KEY = process.env.DARKSCOPE_API_KEY;
  //
  // const response = await fetch("https://api.darkscope.com/v1/check", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${DARKSCOPE_API_KEY}`,
  //   },
  //   body: JSON.stringify({ email, domain }),
  // });
  // const data = await response.json();
  // return NextResponse.json({
  //   breachCountEmail: data.email_breaches,
  //   breachCountDomain: data.domain_breaches,
  //   emailsDiscovered: data.emails_found,
  // });
  // ─────────────────────────────────────────────────────────────

  // DUMMY-DATEN (werden durch echte API ersetzt)
  await new Promise((r) => setTimeout(r, 800)); // simuliert API-Delay

  return NextResponse.json({
    breachCountEmail: email ? Math.floor(Math.random() * 10) + 1 : null,
    breachCountDomain: Math.floor(Math.random() * 25) + 5,
    emailsDiscovered: Math.floor(Math.random() * 200) + 50,
  });
}
