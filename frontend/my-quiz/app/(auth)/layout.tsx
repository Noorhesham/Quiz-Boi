import Slider from "../components/Slider";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex h-[100vh] items-stretch justify-center">
          {children}
          <Slider />
        </main>
      </body>
    </html>
  );
}
