import { redirect } from "next/navigation";
import Slider from "../components/Slider";
import "../globals.css";
import { getUser } from "@/actions/getUser";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user=await getUser()
  if(user)  return redirect("/");
  return (
    <main className="flex h-[100vh] items-stretch justify-center">
      {children}
      <Slider />
    </main>
  );
}
