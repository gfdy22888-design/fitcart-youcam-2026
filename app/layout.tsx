import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitCart — Your style. Before you buy.",
  description: "Try on your next favorite with YouCam AI, compare looks, and build a considered shopping list that fits your budget.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
