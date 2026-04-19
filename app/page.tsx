"use client";

import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const FREE_EMAIL_DOMAINS = new Set([
  "web.de", "gmx.de", "gmx.net", "gmx.at", "gmx.ch",
  "freenet.de", "t-online.de", "vodafone.de", "arcor.de",
  "online.de", "email.de", "hotmail.de",
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.de",
  "yahoo.co.uk", "yahoo.fr", "hotmail.com", "hotmail.co.uk",
  "outlook.com", "outlook.de", "live.com", "live.de",
  "msn.com", "icloud.com", "me.com", "mac.com",
  "aol.com", "protonmail.com", "proton.me", "tutanota.com",
  "mailbox.org", "posteo.de", "zoho.com", "yandex.com",
  "yandex.ru", "mail.ru", "inbox.com", "fastmail.com",
]);

export default function HomePage() {
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentDomain, setConsentDomain] = useState(false);
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
      setFormError("Please enter either a business email or a business domain first.");
      return;
    }

    if (businessEmail.trim()) {
      const domain = businessEmail.split("@")[1]?.trim().toLowerCase();
      if (domain && FREE_EMAIL_DOMAINS.has(domain)) {
        setFormError("Please use a business email address. Free email providers are not allowed.");
        return;
      }
    }

    setShowLeadModal(true);
  }

  async function handleLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    if (!firstName.trim() || !lastName.trim() || !leadEmail.trim() || !phone.trim() || !consent || !consentDomain) {
      setFormError("Please complete all fields and accept both checkboxes.");
      return;
    }

    if (!leadEmail.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    // 1. Save lead and get ID back
    const { data: insertedLead, error } = await supabase.from("leads").insert({
      business_email: businessEmail.trim() || null,
      company_domain: companyDomain.trim() || null,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      contact_email: leadEmail.trim(),
      phone: phone.trim(),
      consent: consent,
      consent_domain: consentDomain,
    }).select().single();

    if (error) {
      console.error("Supabase error:", error);
      setFormError("Something went wrong. Please try again.");
      setIsSubmitting(false);
      return;
    }

    // 2. Call API with lead ID — generates token and sends verification email
    await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: leadEmail.trim(),
        domain: expectedDomain,
        leadId: insertedLead.id,
      }),
    });

    setIsSubmitting(false);
    setShowLeadModal(false);
    setShowResults(true);
  }

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
                  placeholder="+1 234 567890"
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

              <div className="field">
                <label className="consent-label">
                  <input
                    type="checkbox"
                    checked={consentDomain}
                    onChange={(e) => setConsentDomain(e.target.checked)}
                  />
                  <span>
                    I confirm that I am the owner of the stated domain or have been
                    authorized to represent the owner. I am aware that false statements
                    may have legal consequences.
                  </span>
                </label>
              </div>

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
                  {isSubmitting ? "Processing..." : "Continue"}
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
                No free mail providers allowed (e.g. gmail.com, yahoo.com)
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

          <p style={{
            color: "var(--muted)",
            fontSize: "0.82rem",
            textAlign: "center",
            margin: "16px 0 0"
          }}>
            For legal reasons, this security check may only be performed for domains you own or have explicit permission to check.
          </p>

          <div className="hero-button-row">
            <button
              type="button"
              onClick={openLeadModal}
              disabled={showResults || isLoading}
              style={{
                opacity: showResults || isLoading ? 0.4 : 1,
                cursor: showResults || isLoading ? "not-allowed" : "pointer"
              }}
            >
              Run free exposure check
            </button>
          </div>

          {formError && !showLeadModal && (
            <p className="form-error">{formError}</p>
          )}
        </div>
      </section>

      {showResults && (
        <section className="snapshot-card loading-card">
          <p className="eyebrow">Almost there</p>
          <h2 style={{ margin: 0 }}>Please check your inbox</h2>
          <p style={{ color: "var(--muted)", maxWidth: 480, textAlign: "center", lineHeight: 1.6 }}>
            We have sent a verification link to your email address.
            Click the link to view your results.
            <br /><br />
            The link is valid for 24 hours and can only be used once.
          </p>
        </section>
      )}

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
