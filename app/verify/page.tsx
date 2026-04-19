"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Results {
  breachCountEmail: number | null;
  breachCountDomain: number;
  emailsDiscovered: number;
}

const reportOptions = [
  {
    title: "Company Report",
    price: "€199",
    description: "Detailed report for your own organization with exposure summary, risk explanation, and next-step recommendations.",
    cta: "Order report",
  },
  {
    title: "Company + Suppliers Report",
    price: "€499",
    description: "Extended report including your company and relevant supplier exposure intelligence for third-party risk review.",
    cta: "Order report",
  },
];

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "valid" | "invalid" | "used">("loading");
  const [results, setResults] = useState<Results | null>(null);

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }

    async function verifyToken() {
      const { data, error } = await supabase
        .from("verification_tokens")
        .select("*, leads(*)")
        .eq("token", token)
        .single();

      if (error || !data) { setStatus("invalid"); return; }
      if (data.used) { setStatus("used"); return; }
      if (new Date(data.expires_at) < new Date()) { setStatus("invalid"); return; }

      await supabase.from("verification_tokens").update({ used: true }).eq("token", token);

      setResults({
        breachCountEmail: data.leads.breach_count_email,
        breachCountDomain: data.leads.breach_count_domain,
        emailsDiscovered: data.leads.emails_discovered,
      });
      setStatus("valid");
    }

    verifyToken();
  }, [token]);

  const riskLevel = results &&
    (results.breachCountDomain > 15 || (results.breachCountEmail ?? 0) > 5)
      ? "High exposure" : "Medium exposure";

  const metrics = results ? [
    {
      label: "Business email breaches",
      value: results.breachCountEmail !== null ? String(results.breachCountEmail) : "—",
      description: "How many known breach events included the submitted business email.",
    },
    {
      label: "Domain breaches",
      value: String(results.breachCountDomain),
      description: "How many known breach datasets included the submitted company domain.",
    },
    {
      label: "Emails discovered",
      value: String(results.emailsDiscovered),
      description: "How many email addresses related to the domain were found in indexed sources.",
    },
  ] : [];

  return (
    <>
      {status === "loading" && (
        <section className="snapshot-card loading-card">
          <p className="eyebrow">Please wait</p>
          <h2 style={{ margin: 0 }}>Loading your results...</h2>
          <div className="loading-bar-track">
            <div className="loading-bar-fill" style={{ animationDuration: "3s" }} />
          </div>
        </section>
      )}

      {status === "invalid" && (
        <section className="snapshot-card loading-card">
          <h2 style={{ margin: 0 }}>Link invalid or expired</h2>
          <p style={{ color: "var(--muted)" }}>This link is no longer valid. Please start a new check.</p>
          <Link href="/" className="topbar-link">Start new check</Link>
        </section>
      )}

      {status === "used" && (
        <section className="snapshot-card loading-card">
          <h2 style={{ margin: 0 }}>Link already used</h2>
          <p style={{ color: "var(--muted)" }}>This link has already been used. Please start a new check.</p>
          <Link href="/" className="topbar-link">Start new check</Link>
        </section>
      )}

      {status === "valid" && results && (
        <>
          <section className="snapshot-card">
            <div className="snapshot-header">
              <div>
                <p className="eyebrow">Result</p>
                <h2>Your exposure snapshot</h2>
              </div>
              <div className="risk-badge">{riskLevel}</div>
            </div>

            <div className="metric-grid">
              {metrics.map((metric) => (
                <article key={metric.label} className="metric-card">
                  <div className="metric-value">{metric.value}</div>
                  <h3>{metric.label}</h3>
                  <p>{metric.description}</p>
                </article>
              ))}
            </div>

            <div className="snapshot-footer">
              <p>
                This analysis is based on current data from the dark web and publicly
                available breach databases. Would you like the full details? Order a complete
                report with all relevant sources, affected identities, and concrete recommendations.
                <br /><br />
                This security check was powered by Apascope technology.
                With an Apascope subscription you get access to this and many more features
                to strengthen your company's security.{" "}
                <a href="https://apascope.de" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-strong)", fontWeight: 700 }}>
                  Visit Apascope →
                </a>
              </p>
            </div>
          </section>

          <section id="reports" className="reports-section">
            <div className="section-copy">
              <p className="eyebrow">Next step</p>
              <h2>Order a full report</h2>
            </div>

            <div className="report-grid">
              {reportOptions.map((option) => (
                <article key={option.title} className="report-card">
                  <div className="report-price">{option.price}</div>
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                  <button type="button">{option.cta}</button>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default function VerifyPage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <img src="/logo.png" alt="Apasec Logo" className="logo-image" />
          <div>
            <div className="brand-title">breachfinder</div>
            <div className="brand-subtitle">by apasec</div>
          </div>
        </div>
        <a className="topbar-link" href="https://apascope.de" target="_blank" rel="noopener noreferrer">
          Visit Apascope
        </a>
      </header>

      <Suspense fallback={
        <section className="snapshot-card loading-card">
          <p className="eyebrow">Please wait</p>
          <h2 style={{ margin: 0 }}>Loading...</h2>
          <div className="loading-bar-track">
            <div className="loading-bar-fill" style={{ animationDuration: "3s" }} />
          </div>
        </section>
      }>
        <VerifyContent />
      </Suspense>

      <footer className="site-footer">
        <div className="footer-links">
          <a href="/imprint">Imprint</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <a href="https://apascope.de" target="_blank" rel="noopener noreferrer">
          <img src="/logo-apascope.png" alt="Apascope Logo" className="footer-logo" />
        </a>
        <div className="footer-bottom">
          <span>© 2026 Apasec ApS — More at <a href="https://apasec.de" target="_blank" rel="noopener noreferrer">apasec.de</a></span>
          <span>Apascope is a product of Apasec ApS</span>
        </div>
      </footer>
    </main>
  );
}
