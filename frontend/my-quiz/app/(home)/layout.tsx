import type { Metadata } from "next";
import "../globals.css";
import NavBar from "../components/NavBar";
import Provider from "@/utils/Provider";
import { ColorProvider } from "../context/ColorContext";
import ColorWrapper from "../components/ColorWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import PhoneNav from "../components/PhoneNav";

export const metadata: Metadata = {
  title: { template: "%s / Quiz Boi", default: "Welcome / Quiz Boi" },
  description: "Best Plattform to Solve,Upload Your desired quizzes",
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/favicon.ico" />
      </Head>
      <ColorProvider>
        <ColorWrapper>
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            pauseOnHover={false}
            theme="light"
          />
          <section className=" lg:pb-0 pb-16">
            {" "}
            <NavBar />
            {children}
            <PhoneNav />
          </section>
          {/* <Footer/> */}
        </ColorWrapper>
      </ColorProvider>
    </Provider>
  );
}
