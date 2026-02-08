import type { Metadata } from "next";
import "./lab.css";

export const metadata: Metadata = {
  title: "The Lab | Software Design & R&D by Ordinary Company",
  description:
    "Where design meets engineering. The Lab is a software design and R&D group by Ordinary Company Group LLC, based in Cincinnati, Ohio. We design and build beautiful digital products.",
  openGraph: {
    title: "The Lab | Software Design & R&D by Ordinary Company",
    description:
      "Where design meets engineering. A software design and R&D group building beautiful digital products out of Cincinnati, Ohio.",
    type: "website",
    url: "https://lab.ordinarycompany.design",
    images: [{ url: "/lab/preview.png", width: 1200, height: 630, alt: "The Lab by Ordinary Company" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lab | Software Design & R&D by Ordinary Company",
    description:
      "Where design meets engineering. A software design and R&D group building beautiful digital products out of Cincinnati, Ohio.",
    images: ["/lab/preview.png"],
  },
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lab-root bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-200 selection:text-black">
      {children}
    </div>
  );
}
