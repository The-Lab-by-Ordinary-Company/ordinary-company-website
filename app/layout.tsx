import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Ordinary Company",
  description: "A creative agency based in Cincinnati, Ohio. Full website coming soon.",
  openGraph: {
    title: "Ordinary Company",
    description: "A creative agency based in Cincinnati, Ohio. Full website coming soon.",
    type: "website",
    images: [{ url: "/preview.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ordinary Company",
    description: "A creative agency based in Cincinnati, Ohio. Full website coming soon.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-neutral-950">
      <body
        className={`${inter.variable} ${instrumentSerif.variable} min-h-screen text-white antialiased font-sans`}
        style={{
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
        }}
      >
        {children}
      </body>
    </html>
  );
}
