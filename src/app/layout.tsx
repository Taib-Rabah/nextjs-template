import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODO",
  description: "TODO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="grid min-h-dvh grid-rows-[auto_1fr_auto] *:content-grid">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
