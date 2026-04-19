import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Have We Been Breached? | Free Business Data Breach Check",
  description:
    "Check if your business email or company domain has been exposed in a data breach. Free instant check powered by apasec.",
  keywords: "data breach, business email check, domain breach, cybersecurity, darkscope",
  openGraph: {
    title: "Have We Been Breached? | Free Business Data Breach Check",
    description:
      "Check if your business email or company domain has been exposed in a data breach. Free instant check powered by apasec.",
    url: "https://breachfinder.com",
    siteName: "BreachFinder",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
