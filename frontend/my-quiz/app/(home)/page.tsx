import { API_URL } from "@/constants";

export default async function Home() {
  const questions = await fetch(`${API_URL}/quiz`).then((res) => res.json());

  return <main className="flex h-[100vh] items-stretch justify-center"></main>;
}
