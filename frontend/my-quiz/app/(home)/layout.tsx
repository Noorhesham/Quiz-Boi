import type { Metadata } from "next";
import "../globals.css";
import NavBar from "../components/NavBar";
import Provider from "@/utils/Provider";
import { ColorProvider } from "../context/ColorContext";
import ColorWrapper from "../components/ColorWrapper";
import { QuizProvider } from "../context/QuizContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <ColorProvider>
        <QuizProvider>
          <ColorWrapper>
              <NavBar />
              {children}
          </ColorWrapper>
        </QuizProvider>
      </ColorProvider>
    </Provider>
  );
}
