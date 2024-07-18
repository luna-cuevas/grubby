import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { openSans } from "@/fonts/openSans";
import NeedToUpgrade from "@/components/Homepage/NeedToUpgrade";

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
      </body>
    </html>
  );
}
