import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Google_Client } from "@/constants";
import { ColorProvider } from "./context/ColorContext";
const inter = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz Boi",
  description: "Your biggest plattform to solve quizzes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={Google_Client}>
        <ColorProvider>
          <body className={inter.className}>{children}</body>
        </ColorProvider>
      </GoogleOAuthProvider>
    </html>
  );
}
