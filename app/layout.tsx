import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
const inter = Inter({
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloud Chef Project",
  description: "This is the project is for Cloud Chef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
