"use client";

import { useMemo, useState } from "react";

const metrics = [
  {
    label: "Business email breaches",
    value: "6",
    description:
      "How many known breach events included the submitted business email.",
  },
  {
    label: "Domain breaches",
    value: "18",
    description:
      "How many known breach datasets included the submitted company domain.",
  },
  {
    label: "Emails discovered",
    value: "137",
    description:
      "How many email addresses related to the domain were found in indexed sources.",
  },
];

const reportOptions = [
  {
    title: "Company Report",
    price: "from €99",
    description:
      "Detailed report for your own organization with exposure summary, risk explanation, and next-step recommendations.",
    cta: "Request company report",
  },
  {
    title: "Company + Suppliers Report",
    price: "from €299",
    description:
      "Extended report including your company and relevant supplier exposure intelligence for third-party risk review.",
    cta: "Request supplier report",
  },
];

export default function HomePage() {
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [formError, setFormError] = useState("");

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

  function handleLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    if (!firstName.trim() || !lastName.trim() || !leadEmail.trim()) {
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

    setShowLeadModal(false);
    setShowResults(true);
  }

  return (
    <main className="page-shell">
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
              <label htmlFor="leadEmail">Email</label>
              <input
                id="leadEmail"
                type="email"
                placeholder="name@company.com"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
              />
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
              <button type="submit">Continue</button>
            </div>
          </form>
        </div>
      </div>
    )}

    <header className="topbar">
      <header className="topbar">
        <div className="brand-wrap">
          <img src="/logo.png" alt="Apasec Logo" className="logo-image" />
          <div>
            <div className="brand-title">breachfindings</div>
            <div className="brand-subtitle">by apasec</div>
          </div>
        </div>

        <a className="topbar-link" href="#reports">
          Request full report
        </a>
      </header>

      <section className="hero centered-hero">
        <div className="hero-copy centered-copy">
          <h1>Have I Been Breached?</h1>
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
                <label htmlFor="leadEmail">Email</label>
                <input
                  id="leadEmail"
                  type="email"
                  placeholder="name@company.com"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                />
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
                <button type="submit">Continue</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showResults && (
        <>
          <section className="snapshot-card">
            <div className="snapshot-header">
              <div>
                <p className="eyebrow">Example result</p>
                <h2>Your exposure snapshot</h2>
              </div>
              <div className="risk-badge">High exposure</div>
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
