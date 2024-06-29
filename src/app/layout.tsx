import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/util";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/UserContext";
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

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
      <body className={cn('min-h-screen font-sans antialiased grainy',ubuntu.className)}>
      <UserProvider>
        <NavBar/>
        {children}
        <Toaster />
        </UserProvider>
        </body>
    </html>
  );
}
