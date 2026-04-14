import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BreachFindings",
  description: "Lead magnet for business email and domain exposure checks.",
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
