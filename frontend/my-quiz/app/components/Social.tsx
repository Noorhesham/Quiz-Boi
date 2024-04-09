"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { loginGoogle, signupGoogle } from "@/lib/axiosInstance";
import { useState } from "react";
import FormError from "./FormError";
import { useRouter } from "next/navigation";

const Social = ({ action }: { action: "signup" | "login" }) => {
  const [error, setFormError] = useState<string | undefined>("");
  const router = useRouter();
  function handleGoogleLoginSuccess(tokenResponse: any) {
    const accessToken = tokenResponse.access_token;
    console.log(accessToken);
    if (action === "signup")
      signupGoogle(accessToken)
        .then((res: any) => {
          console.log(res);
          if (res.error) setFormError(res.message);
          else {

            Cookies.set("jwt", res.data.token);
            router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setFormError("something went wrong !");
        });
    if (action === "login")
      loginGoogle(accessToken)
        .then((res) => {
          console.log(res);
          //@ts-ignore
          if (res.error) setFormError(res.message);
          else {

            Cookies.set("jwt", res.data.token);
            router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setFormError("something went wrong !");
        });
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  return (
    <div className="flex fl justify-between items-center ">
      <div className="flex items-center gap-x-2">
        <h3 className=" text-gray-600  mr-5">{action === "login" ? "Sign in with" : "Sign up with"}</h3>
        <Button type="button" onClick={() => login()} size="lg" className=" rounded-full py-4 px-3" variant="outline">
          <FcGoogle className="h-5 w-5" />
        </Button>
        <Button type="button" onClick={() => ""} size="lg" className=" rounded-full py-4 px-3" variant="outline">
          <FaGithub className="h-5 w-5" />
        </Button>
      </div>
      {error && <FormError message={error} />}
    </div>
  );
};

export default Social;
