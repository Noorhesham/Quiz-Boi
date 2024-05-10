import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Google_Client } from "@/constants";
import { ColorProvider } from "./context/ColorContext";
import Head from "next/head";
const inter = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz Boi - Your Biggest Platform for Quizzes",
  description: "Quiz Boi is your ultimate destination for solving quizzes, offering a wide range of categories and challenges.",
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
        <link rel="apple-touch-icon" href="/apple-icon?<generated>" type="image/<generated>" sizes="<generated>" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <GoogleOAuthProvider clientId={process.env.GOOGLE || Google_Client}>
        <ColorProvider>
          <body className={inter.className}>{children}</body>
        </ColorProvider>
      </GoogleOAuthProvider>
    </html>
  );
}
