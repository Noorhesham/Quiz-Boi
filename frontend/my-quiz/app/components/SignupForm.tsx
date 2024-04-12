"use client";
import React, { useState, useTransition } from "react";
import CardWrapper from "./CardWrapper";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignupSchema } from "@/schemas";
import Social from "./Social";
import { signup } from "@/actions/signup";
import { useRouter } from "next/navigation";
import PasswordInput from "./PasswordInput";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [error, setFormError] = useState<string | undefined>("");
  const [success, setFormSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    },
  });
  const { handleSubmit, control, reset, getValues } = form;
  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    setFormError("");
    setFormSuccess("");
    startTransition(async () => {
      await signup(values)
        .then((res) => {
          console.log(res);
          if (res.error) {
            setFormError(res.message);
            reset();
          } else{ 
            toast.success('Hey!Welcome to quiz boi.. Get ready to start your knowledge and entertainment journey!😺🚀🌌 ')
            router.push("/");}
        })
        .catch(() => setFormError("something went wrong !"));
    });
  };
  return (
    <section className="flex flex-col items-center justify-center p-5 py-3 w-full ">
      <CardWrapper heading="" headerLabel="" backButtonHref="#" backButtonLabel="back">
        {isPending&&<Spinner/>}
        
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4 md:p-16 md:pb-0 md:pt-5">
            <div>
              <div className=" space-y-5">
                <PasswordInput
                  name="name"
                  text="Name"
                  placeholder="spider-man"
                  type="text"
                  control={control}
                  disabled={isPending}
                />
                <PasswordInput
                  name="email"
                  text="Email"
                  placeholder="meow@gmail.com"
                  type="email"
                  control={control}
                  disabled={isPending}
                />
                <PasswordInput name="password" control={control} disabled={isPending} />
                <PasswordInput name="passwordConfirm" control={control} disabled={isPending} />
              </div>
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <div>
              <Link className="px-0 font-normal text-gray-500 pt-3 text-sm cursor-default" href="/login">
                Already have an account ?{" "}
                <span className=" hover:underline cursor-pointer text-red-500">Log In now</span>
              </Link>
            </div>
            <div className=" flex flex-col gap-2 items-start">
              <Button
                disabled={isPending}
                type="submit"
                className="w-fit hover:text-white duration-150   text-gray-100 text-xl  background py-5 px-10 rounded-full shadow-md"
              >
                Sign Up
              </Button>
            </div>
            <Social action="signup" />
          </form>
        </Form>
      </CardWrapper>
    </section>
  );
};

export default SignupForm;
