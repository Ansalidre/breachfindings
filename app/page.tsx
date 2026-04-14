const metrics = [
  {
    label: "Business email breaches",
    value: "6",
    description: "How many known breach events included the submitted business email.",
  },
  {
    label: "Domain breaches",
    value: "18",
    description: "How many known breach datasets included the submitted company domain.",
  },
  {
    label: "Emails discovered",
    value: "137",
    description: "How many email addresses related to the domain were found in indexed sources.",
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
  return (
    <main className="page-shell">
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

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Exposure snapshot for companies</p>
          <h1>Find out whether your business email and company domain appear in known breaches</h1>
          <p className="hero-text">
            Enter your business email and your company domain. BreachFindings shows a fast
            risk snapshot designed as a lead magnet for report requests and sales conversations.
          </p>
        </div>

        <div className="hero-card">
          <div className="form-grid">
            <div className="field">
  <label htmlFor="businessEmail">Business email</label>
  <input id="businessEmail" type="email" placeholder="name@company.com" />
</div>

<div className="or-divider">OR</div>

<div className="field">
  <label htmlFor="companyDomain">Company domain</label>
  <input id="companyDomain" type="text" placeholder="company.com" />
</div>
            <div className="field field-wide">
              <button type="button">Run free exposure check</button>
            </div>
          </div>
          <p className="form-note">
            Later, this form will connect to Apascope via your own backend and store leads in
            Supabase.
          </p>
        </div>
      </section>

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
            Need the full details behind these findings? Order a complete report with the relevant
            breach sources, affected identities, and recommended actions.
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
            The landing page shows only the top-line numbers. Full details stay behind the paid
            report funnel.
          </p>
        </article>
        <article className="trust-card">
          <h3>Built for business users</h3>
          <p>
            The form uses business email plus domain to frame the result around the company, not
            just a single mailbox.
          </p>
        </article>
        <article className="trust-card">
          <h3>Ready for Apascope</h3>
          <p>
            The structure is designed so your own backend can query Apscope securely and return a
            normalized summary.
          </p>
        </article>
      </section>

      <section id="reports" className="reports-section">
        <div className="section-copy">
          <p className="eyebrow">Paid conversion step</p>
          <h2>Request a full report</h2>
          <p>
            The next screen can route users into Stripe Checkout and trigger report delivery after
            payment.
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
    </main>
  );
}
