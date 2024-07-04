import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation/Navigation";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Grubby.ai",
  description: "AI for the rest of us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} relative`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
