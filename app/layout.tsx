// Layout file placeholder
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "ContraMind | The Cognitive Gym",
  description: "Shatter your echo chamber with Socratic AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}>
        {/* Global UI elements like a shared Navbar would go here */}
        {children}
      </body>
    </html>
  );
}