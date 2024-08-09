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
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "SWOM - Swap your home.",
  description:
    "BE PART OF A HARMONIOUS COOPERATIVE GLOBAL COMMUNITY. Opening your home to others fosters your capacity for trust and generosity.",
  icons: [
    {
      url: "/logo-icons.png",
      rel: "icon",
      href: "/logo-icons.png",
    },
  ],
  keywords: [
    "swom",
    "swap",
    "home",
    "travel",
    "community",
    "cooperative",
    "global",
    "trust",
    "generosity",
  ].join(", "),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: "Travel",
  openGraph: {
    images: [
      {
        url: "/logo-icons.png",
        alt: `Image for SWOM's logo.`,
      },
    ],
    title: "SWOM - Swap your home.",
    description:
      "BE PART OF A HARMONIOUS COOPERATIVE GLOBAL COMMUNITY. Opening your home to others fosters your capacity for trust and generosity.",
    url: `https://swom.travel/`,
    type: "website",
    locale: "en_US",
    siteName: "SWOM - Swap your home.",
  },
  twitter: {
    title: "SWOM - Swap your home.",
    site: "https://swom.travel/",
    card: "summary_large_image",
    description:
      "BE PART OF A HARMONIOUS COOPERATIVE GLOBAL COMMUNITY. Opening your home to others fosters your capacity for trust and generosity.",
    images: [
      {
        url: "/logo-icons.png",
        alt: `Image for SWOM's logo.`,
      },
    ],
  },

  metadataBase: new URL("https://swom.travel/"),
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
