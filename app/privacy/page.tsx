"use client";

import Link from "next/link";

export default function PrivacyPage() {
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
        <h1>Privacy Policy</h1>

        <h2>1. Controller</h2>
        <p>
          APASEC ApS<br />
          Vestergade 28<br />
          6440 Augustenborg<br />
          Denmark<br />
          CVR: 46106628<br /><br />
          Represented by: Henryk Orantek, Founder & Managing Director<br />
          Email: kontakt@apasec.de
        </p>

        <h2>2. Data Protection Officer</h2>
        <p>Henryk Orantek</p>

        <h2>3. General information on data processing</h2>
        <p>We only process personal data of our users insofar as this is necessary to provide a functional website and our content and services. Personal data is processed on the basis of the GDPR and applicable Danish data protection law.</p>

        <h2>4. Provision of the websites and server log files</h2>
        <p>Whenever you visit our websites, our hosting provider automatically collects and stores information in server log files. This may include: IP address, date and time of the request, requested URL, HTTP status code, browser type and version, operating system, and referrer URL.</p>
        <p>Legal basis: Art. 6(1)(f) GDPR (legitimate interests in the secure and stable operation of our websites).</p>

        <h2>5. Cookies and similar technologies</h2>
        <p>Our websites may use cookies and similar technologies to provide certain functions and to improve the user experience. Strictly necessary cookies are required for the basic operation of the site. Legal basis: Art. 6(1)(f) GDPR.</p>

        <h2>6. Contacting us and contact forms</h2>
        <p>If you contact us via email or through a contact form, we process the personal data you provide to handle your request. Typical data categories: name, email address, phone number, message content.</p>
        <p>Legal basis: Art. 6(1)(b) GDPR or Art. 6(1)(f) GDPR.</p>

        <h2>7. Your rights as a data subject</h2>
        <p>Under the GDPR, you have the following rights: right of access (Art. 15), right to rectification (Art. 16), right to erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20), right to object (Art. 21).</p>
        <p>To exercise your rights, you can contact us at any time using the contact details provided above.</p>

        <h2>8. Right to lodge a complaint</h2>
        <p>
          You have the right to lodge a complaint with a data protection supervisory authority.<br /><br />
          Datatilsynet (Danish Data Protection Agency)<br />
          Borgergade 28, 5.<br />
          1300 Copenhagen K<br />
          Denmark<br />
          Website: <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer">www.datatilsynet.dk</a>
        </p>

        <h2>9. SSL/TLS encryption</h2>
        <p>For security reasons and to protect the transmission of confidential content, our websites use TLS/SSL encryption. You can recognise an encrypted connection by the "https://" and the lock symbol in your browser's address bar.</p>

        <h2>10. Changes to this Privacy Policy</h2>
        <p>We may change or update this privacy policy from time to time. The current version is always available on our websites.</p>
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
