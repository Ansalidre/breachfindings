import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const payload = await req.json();
  const lead = payload.record;

  const emailBody = `
    <h2>Neuer Lead auf breachfindings.apasec.de</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${lead.first_name} ${lead.last_name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>E-Mail</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${lead.contact_email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefon</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${lead.phone || "—"}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Business E-Mail</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${lead.business_email || "—"}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Domain</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${lead.company_domain || "—"}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Zeitpunkt</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${new Date(lead.created_at).toLocaleString("de-DE")}</td>
      </tr>
    </table>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
    },
    body: JSON.stringify({
      from: "noreply@apasec.de",
      to: "kontakt@apasec.de",
      subject: `Neuer Lead: ${lead.first_name} ${lead.last_name} (${lead.company_domain || lead.business_email})`,
      html: emailBody,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
});
