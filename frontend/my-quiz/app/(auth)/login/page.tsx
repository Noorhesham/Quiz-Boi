import { getUser } from "@/actions/getUser";
import LoginForm from "../../components/LoginForm";
import { redirect } from "next/navigation";

export default async function  Page() {
  const user=await getUser()
  if(user)  return redirect("/");
  return <LoginForm />;
}
