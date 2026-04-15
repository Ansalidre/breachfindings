"use client";

import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://polxpjuoekicvryiuygf.supabase.co",
  "sb_publishable_Jon0OJ8qtBXsTemjiGoUdg_Lry5sSUj"
);

const reportOptions = [
  {
    title: "Company Report",
    price: "from €199",
    description:
      "Detailed report for your own organization with exposure summary, risk explanation, and next-step recommendations.",
    cta: "Request company report",
  },
  {
    title: "Company + Suppliers Report",
    price: "from €499",
    description:
      "Extended report including your company and relevant supplier exposure intelligence for third-party risk review.",
    cta: "Request supplier report",
  },
];

interface Results {
  breachCountEmail: number | null;
  breachCountDomain: number;
  emailsDiscovered: number;
}

export default function HomePage() {
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expectedDomain = useMemo(() => {
    if (businessEmail.includes("@")) {
      return businessEmail.split("@")[1].trim().toLowerCase();
    }
    return companyDomain.trim().toLowerCase().replace(/^www\./, "");
  }, [businessEmail, companyDomain]);

  function openLeadModal() {
    setFormError("");
    if (!businessEmail.trim() && !companyDomain.trim()) {
      setFormError(
        "Please enter either a business email or a business domain first."
      );
      return;
    }
    setShowLeadModal(true);
  }

  async function handleLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    if (!firstName.trim() || !lastName.trim() || !leadEmail.trim() || !phone.trim() || !consent) {
  setFormError("Please complete all fields and accept the consent.");
  return;
}
    if (!firstName.trim() || !lastName.trim() || !leadEmail.trim() || !phone.trim()) {
      setFormError("Please complete all fields.");
      return;
    }

    if (!leadEmail.includes("@")) {
      setFormError("Please enter a valid business email address.");
      return;
    }

    const enteredDomain = leadEmail.split("@")[1].trim().toLowerCase();

    if (!expectedDomain) {
      setFormError("Please enter a business email or business domain above.");
      return;
    }

    if (enteredDomain !== expectedDomain) {
      setFormError(`The email domain must match ${expectedDomain}.`);
      return;
    }

    setIsSubmitting(true);

    // 1. API abfragen
    const apiRes = await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: businessEmail.trim() || null,
        domain: expectedDomain,
      }),
    });

    const apiData = await apiRes.json();

    // 2. Lead in Supabase speichern inkl. Ergebnisse
   const { error } = await supabase.from("leads").insert({
  business_email: businessEmail.trim() || null,
  company_domain: companyDomain.trim() || null,
  first_name: firstName.trim(),
  last_name: lastName.trim(),
  contact_email: leadEmail.trim(),
  phone: phone.trim(),
  consent: consent,
  breach_count_email: apiData.breachCountEmail,
  breach_count_domain: apiData.breachCountDomain,
  emails_discovered: apiData.emailsDiscovered,
});

    setIsSubmitting(false);

    if (error) {
      console.error("Supabase error:", error);
      setFormError("Something went wrong. Please try again.");
      return;
    }

    setResults(apiData);
    setShowLeadModal(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 800);
  }

  const riskLevel =
    results &&
    (results.breachCountDomain > 15 || (results.breachCountEmail ?? 0) > 5)
      ? "High exposure"
      : "Medium exposure";

  const metrics = results
    ? [
        {
          label: "Business email breaches",
          value: results.breachCountEmail !== null ? String(results.breachCountEmail) : "—",
          description:
            "How many known breach events included the submitted business email.",
        },
        {
          label: "Domain breaches",
          value: String(results.breachCountDomain),
          description:
            "How many known breach datasets included the submitted company domain.",
        },
        {
          label: "Emails discovered",
          value: String(results.emailsDiscovered),
          description:
            "How many email addresses related to the domain were found in indexed sources.",
        },
      ]
    : [];

  return (
    <main className="page-shell">
      {showLeadModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Complete your free check</h2>
              <button
                type="button"
                className="modal-close"
                onClick={() => {
                  setShowLeadModal(false);
                  setFormError("");
                }}
              >
                ×
              </button>
            </div>

            <form className="modal-form" onSubmit={handleLeadSubmit}>
              <div className="field">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="leadEmail">Business email</label>
                <input
                  id="leadEmail"
                  type="email"
                  placeholder="name@company.com"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+49 123 456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
               <div className="field">
  <label className="consent-label">
    <input
      type="checkbox"
      checked={consent}
      onChange={(e) => setConsent(e.target.checked)}
    />
    <span>
      I consent to the processing and use of my personal data provided in this 
      contact form, as well as any additional information submitted by me, for 
      the purposes of responding to my inquiry, presenting products, and, where 
      applicable, initiating and carrying out product-related sales activities. 
      I may withdraw my consent at any time with future effect.
    </span>
  </label>
</div>   
              <p className="match-info">
                Your email must match this domain:
                <strong> {expectedDomain || "—"}</strong>
              </p>

              {formError && <p className="form-error">{formError}</p>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setShowLeadModal(false);
                    setFormError("");
                  }}
                >
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Checking..." : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <header className="topbar">
        <div className="brand-wrap">
          <img src="/logo.png" alt="Apasec Logo" className="logo-image" />
          <div>
            <div className="brand-title">breachfinder</div>
            <div className="brand-subtitle">by apasec</div>
          </div>
        </div>

        <a className="topbar-link" href="https://apascope.de" target="_blank" rel="noopener noreferrer">
          Request full report
        </a>
      </header>

      <section className="hero centered-hero">
        <div className="hero-copy centered-copy">
          <h1>Have We Been Breached?</h1>
        </div>

        <div className="hero-card wide-card">
          <div className="dual-form-layout">
            <div className="field-block">
              <label htmlFor="businessEmail">Business Email</label>
              <p className="field-hint">
                No free mail providers allowed (e.g. web.de, gmx.de, gmail.com)
              </p>
              <input
                id="businessEmail"
                type="email"
                placeholder="name@company.com"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
              />
            </div>

            <div className="or-divider centered-or">OR</div>

            <div className="field-block">
              <label htmlFor="companyDomain">Business Domain</label>
              <p className="field-hint">
                Please enter the domain without www.
              </p>
              <input
                id="companyDomain"
                type="text"
                placeholder="company.com"
                value={companyDomain}
                onChange={(e) => setCompanyDomain(e.target.value)}
              />
            </div>
          </div>

          <div className="hero-button-row">
            <button type="button" onClick={openLeadModal}>
              Run free exposure check
            </button>
          </div>

          {formError && !showLeadModal && (
            <p className="form-error">{formError}</p>
          )}
        </div>
      </section>

      {isLoading && (
        <section className="snapshot-card" style={{ textAlign: "center", padding: "48px" }}>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
            Scanning for breaches...
          </p>
        </section>
      )}

      {showResults && results && (
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
                Need the full details behind these findings? Order a complete
                report with the relevant breach sources, affected identities,
                and recommended actions.
              </p>
              <a className="primary-link" href="#reports">
                View report options
              </a>
            </div>
          </section>

          <section className="trust-grid">
            <article className="trust-card">
              <h3>Lead magnet first</h3>
              <p>
                The landing page shows only the top-line numbers. Full details
                stay behind the paid report funnel.
              </p>
            </article>
            <article className="trust-card">
              <h3>Built for business users</h3>
              <p>
                The form uses business email plus domain to frame the result
                around the company, not just a single mailbox.
              </p>
            </article>
            <article className="trust-card">
              <h3>Ready for Darkscope</h3>
              <p>
                The structure is designed so your own backend can query
                Darkscope securely and return a normalized summary.
              </p>
            </article>
          </section>

          <section id="reports" className="reports-section">
            <div className="section-copy">
              <p className="eyebrow">Paid conversion step</p>
              <h2>Request a full report</h2>
              <p>
                The next screen can route users into Stripe Checkout and trigger
                report delivery after payment.
              </p>
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
    </main>
  );
}
