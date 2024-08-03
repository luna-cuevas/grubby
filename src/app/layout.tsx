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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function generateMetadata() {
  return {
    metadataBase: new URL(`${baseUrl}`),
    title: "GrubbyAI - AI Detection Remover & Humanizer",
    icons: [
      {
        url: "/images/grubby-logo-no-text.webp",
        rel: "icon",
        href: "/images/grubby-logo-no-text.webp",
      },
    ],
    description:
      "Make your AI text 100% undetectable with GrubbyAI - your trusted AI detection remover to create plagiarism-free, human-like text.",
    openGraph: {
      type: "website",
      url: `${baseUrl}`,
      title: "GrubbyAI - AI Detection Remover & Humanizer",
      description:
        "Make your AI text 100% undetectable with GrubbyAI - your trusted AI detection remover to create plagiarism-free, human-like text.",
      siteName: "GrubbyAI",
      images: [
        {
          url: `${baseUrl}/images/grubby-logo-no-text.web`,
          width: 600,
          height: 162,
          alt: "GrubbyAI - AI Detection Remover & Humanizer",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
      nocache: true,
    },
    authors: [{ name: "GrubbyAI Team", url: `${baseUrl}` }],
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: [
      "AI detection remover",
      "AI humanizer",
      "bypass AI detection",
      "GrubbyAI",
      "undetectable AI text",
      "plagiarism-free AI content",
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} relative h-full w-screen`}>
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
