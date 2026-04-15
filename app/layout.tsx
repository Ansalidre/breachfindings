import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Have I Been Breached? | Free Business Data Breach Check",
  description:
    "Check if your business email or company domain has been exposed in a data breach. Free instant check powered by Darkscope intelligence.",
  keywords: "data breach, business email check, domain breach, cybersecurity, darkscope",
  openGraph: {
    title: "Have I Been Breached? | Free Business Data Breach Check",
    description:
      "Check if your business email or company domain has been exposed in a data breach. Free instant check powered by Darkscope intelligence.",
    url: "https://breachfinder.com",
    siteName: "BreachFinder",
    locale: "en_US",
    type: "website",
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