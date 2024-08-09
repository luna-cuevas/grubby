import "./globals.css";
import "./textAnimation.scss";
import { Navigation } from "@/components/Navigation/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { openSans } from "@/fonts/openSans";
import NeedToUpgrade from "@/components/Homepage/NeedToUpgrade";
import { Provider } from "jotai";
import Footer from "@/components/Footer";
import SignUpFormModal from "@/components/SignUpAndLogin/SignUpFormModal";
import { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "GrubbyAI - AI Detection Remover & Humanizer",
  description:
    "Make your AI text 100% undetectable with GrubbyAI - your trusted AI detection remover to create plagiarism-free, human-like text.",
  icons: [
    {
      url: "/images/grubby-logo-no-text.png",
      rel: "icon",
      href: "/images/grubby-logo-no-text.png",
    },
  ],
  keywords: [
    "AI detection remover",
    "AI humanizer",
    "bypass AI detection",
    "GrubbyAI",
    "undetectable AI text",
    "plagiarism-free AI content",
  ].join(", "),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: "Technology",
  openGraph: {
    images: [
      {
        url: "/images/grubby-logo-no-text.png",
        alt: `Image for Grubby's logo.`,
      },
    ],
    title: "GrubbyAI - AI Detection Remover & Humanizer",
    description:
      "Make your AI text 100% undetectable with GrubbyAI - your trusted AI detection remover to create plagiarism-free, human-like text.",
    url: `https://grubby.ai/`,
    type: "website",
    locale: "en_US",
    siteName: "GrubbyAI",
  },
  twitter: {
    title: "GrubbyAI - AI Detection Remover & Humanizer",
    site: "https://grubby.ai/",
    card: "summary_large_image",
    description:
      "Make your AI text 100% undetectable with GrubbyAI - your trusted AI detection remover to create plagiarism-free, human-like text.",
    images: [
      {
        url: "/images/grubby-logo-no-text.png",
        alt: `Image for Grubby's logo.`,
      },
    ],
  },

  metadataBase: new URL("https://grubby.ai/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSans.className} relative h-full w-screen`}>
        <GoogleAnalytics gaId="G-Z8J7ZSD74X" />

        <Provider>
          <Navigation />
          <SignUpFormModal />

          {children}

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={true}
            draggable={true}
            pauseOnHover={true}
          />
          <NeedToUpgrade />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
