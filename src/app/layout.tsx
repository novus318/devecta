import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/util";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "devecta",
  description: "I project were it comes for data vectorisation to Make the data more accurately understandable for Artificial intelligence and proccess the data and get responses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="light">
      <body className={cn('min-h-screen font-sans antialiased grainy',inter.className)}>
        <NavBar/>
        {children}
        </body>
    </html>
  );
}
