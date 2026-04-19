"use client";

import Link from "next/link";

export default function ImprintPage() {
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
        <Link className="topbar-link" href="/">
          Back to home
        </Link>
      </header>

      <div className="legal-page">
        <h1>Legal Notice / Imprint</h1>
        <p>Information pursuant to applicable e-commerce and media laws</p>

        <h2>APASEC ApS</h2>
        <p>
          Vestergade 28<br />
          6440 Augustenborg<br />
          Denmark
        </p>

        <h2>Represented by the Managing Director</h2>
        <p>Henryk Orantek, Founder & Managing Director</p>

        <h2>Contact</h2>
        <p>
          Email: kontakt@apasec.de<br />
        </p>

        <h2>Company details</h2>
        <p>
          Legal form: Private Limited Company (Anpartsselskab, ApS)<br />
          Commercial register: Danish Central Business Register (CVR)<br />
          CVR No.: 46106628
        </p>

        <h2>VAT Identification Number</h2>
        <p>DK46106628</p>

        <h2>Person responsible for editorial content</h2>
        <p>
          Henryk Orantek<br />
          Vestergade 28<br />
          6440 Augustenborg<br />
          Denmark
        </p>

        <h2>Scope of this Legal Notice</h2>
        <p>This Legal Notice applies to the following websites and all associated subpages:</p>
        <ul>
          <li>https://www.apasec.de</li>
          <li>https://www.apascope.de</li>
          <li>https://www.breachfinder.com</li>
          <li>https://www.breachfinder.de</li>
        </ul>
      </div>

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
