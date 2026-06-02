import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  // Resolves relative OG/Twitter image URLs to absolute links.
  metadataBase: siteUrl,
  title: "Third Mind — A collective brain for your circle",
  description:
    "A private desktop app for masterminds. Every link, video, podcast, and article shared in your circle becomes part of a living, AI-curated knowledge base.",
  openGraph: {
    title: "Third Mind — Your circle remembers together",
    description:
      "A private collective brain for masterminds. Curation, summaries, and weekly digests for the circles that think together.",
    siteName: "Third Mind",
    url: siteUrl,
    type: "website",
    // og:image is supplied automatically by app/opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
    title: "Third Mind — Your circle remembers together",
    description:
      "A private collective brain for masterminds. Curation, summaries, and weekly digests for the circles that think together.",
    // twitter:image is supplied automatically by app/opengraph-image.tsx.
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
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
