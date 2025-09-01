import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Polymarket Ke - AI-Powered Betting Platform",
  description: "Kenya's premier AI-powered betting platform. Place smart bets with AI assistance and increase your winning chances up to 500%.",
  keywords: "betting, Kenya, AI, polymarket, predictions, sports betting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
