import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, domain } = await req.json();

  // ─── DARKSCOPE API (sobald Account vorhanden) ────────────────
  // const DARKSCOPE_API_KEY = process.env.DARKSCOPE_API_KEY;
  //
  // const payload: Record<string, string> = {};
  // if (email) payload.email = email;
  // if (domain) payload.domain = domain;
  //
  // const response = await fetch("https://api.darkscope.com/v1/check", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${DARKSCOPE_API_KEY}`,
  //   },
  //   body: JSON.stringify(payload),
  // });
  // const data = await response.json();
  // return NextResponse.json({
  //   breachCountDomain: data.domain_breaches,       // Domain gebreached?
  //   emailsDiscovered: data.emails_found,            // Wieviele Mails gefunden?
  //   breachCountEmail: data.email_breaches ?? 0,     // Wie oft war die Mail in Breaches? (0 wenn keine Mail eingegeben)
  // });
  // ─────────────────────────────────────────────────────────────

  // DUMMY-DATEN (werden durch echte API ersetzt)
  await new Promise((r) => setTimeout(r, 800));

  return NextResponse.json({
    breachCountDomain: Math.floor(Math.random() * 25) + 5,
    emailsDiscovered: Math.floor(Math.random() * 200) + 50,
    breachCountEmail: email ? Math.floor(Math.random() * 10) + 1 : 0,
  });
}