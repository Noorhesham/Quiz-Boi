import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Google_Client } from "@/constants";
import { ColorProvider } from "./context/ColorContext";
const inter = Roboto({ weight: ["400", "700", "300"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz Boi - Your Biggest Platform for Quizzes",
  description:
    "Quiz Boi is your ultimate destination for solving quizzes, offering a wide range of categories and challenges.",
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={process.env.GOOGLE || Google_Client}>
        <ColorProvider>
          <body className={`${inter.className} relative`}>{children}</body>
        </ColorProvider>
      </GoogleOAuthProvider>
    </html>
  );
}
