import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/util";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/UserContext";
import 'simplebar-react/dist/simplebar.min.css'
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "devecta",
  description: "I project were it comes for data vectorisation to Make the data more accurately understandable for Artificial intelligence and proccess the data and get responses",
  keywords:'nizamudheen,Muhammed Nizamudheen,web developer,web development,software,software engineer,devecta,AI,ai,document,pdf ai,summarize document',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className=";ight">
         <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content='devecta | ask to PDF AI' />
        <meta property="og:description" content='I project were it comes for data vectorisation to Make the data more accurately understandable for Artificial intelligence and proccess the data and get responses' />
        <meta property="og:image" content='https://devecta.vercel.app/opengraph-image.png' />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devecta.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content='devecta | ask to PDF AI' />
        <meta name="twitter:description" content='I project were it comes for data vectorisation to Make the data more accurately understandable for Artificial intelligence and proccess the data and get responses' />
        <meta name="twitter:image" content='https://devecta.vercel.app/opengraph-image.png' />
      </head>
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
