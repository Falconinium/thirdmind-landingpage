import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Third Mind — A collective brain for your circle",
  description:
    "A private desktop app for masterminds. Every link, video, podcast, and article shared in your circle becomes part of a living, AI-curated knowledge base.",
  openGraph: {
    title: "Third Mind",
    description:
      "A private collective brain for masterminds. Curation, summaries, and weekly digests for the circles that think together.",
    siteName: "Third Mind",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
