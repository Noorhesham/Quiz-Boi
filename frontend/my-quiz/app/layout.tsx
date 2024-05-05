import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Google_Client } from "@/constants";
import { ColorProvider } from "./context/ColorContext";
import Head from "next/head";
const inter = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz Boi",
  description: "Your biggest plattform to solve quizzes",
  icons:{icon:'/favicon.ico'}
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GoogleOAuthProvider clientId={process.env.GOOGLE||Google_Client}>
        <ColorProvider>
          <body className={inter.className}>{children}</body>
        </ColorProvider>
      </GoogleOAuthProvider>
    </html>
  );
}
