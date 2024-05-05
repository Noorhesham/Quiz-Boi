import type { Metadata } from "next";
import "../globals.css";
import NavBar from "../components/NavBar";
import Provider from "@/utils/Provider";
import { ColorProvider } from "../context/ColorContext";
import ColorWrapper from "../components/ColorWrapper";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const metadata: Metadata = {
  title: "Quiz Boi",
  description: "Best Plattform to Solve,Upload Your desired quizzes",
  icons:'/favicon.ico'
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
          <NavBar />
          {children}
          {/* <Footer/> */}
        </ColorWrapper>
      </ColorProvider>
    </Provider>
  );
}
