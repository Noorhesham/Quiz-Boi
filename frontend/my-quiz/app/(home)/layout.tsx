import type { Metadata } from "next";
import "../globals.css";
import NavBar from "../components/NavBar";
import Provider from "@/utils/Provider";
import { ColorProvider } from "../context/ColorContext";
import ColorWrapper from "../components/ColorWrapper";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Quiz Boi",
  description: "Best Plattform to Solve,Upload Your desired quizzes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <ColorProvider>
        <ColorWrapper>
          <NavBar />
          {children}
          {/* <Footer/> */}
        </ColorWrapper>
      </ColorProvider>
    </Provider>
  );
}
