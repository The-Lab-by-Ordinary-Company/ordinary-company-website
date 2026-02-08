import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ordinary Company",
  description:
    "A creative collective of artists, designers, storytellers, musicians, and creatives chasing joy, meaning, and connection.",
  openGraph: {
    title: "Ordinary Company",
    description:
      "A creative collective of artists, designers, storytellers, musicians, and creatives chasing joy, meaning, and connection.",
    type: "website",
    images: [{ url: "/main/preview.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ordinary Company",
    description:
      "A creative collective of artists, designers, storytellers, musicians, and creatives chasing joy, meaning, and connection.",
    images: ["/main/preview.png"],
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-neutral-900 min-h-screen font-sans">
      {children}
    </div>
  );
}
