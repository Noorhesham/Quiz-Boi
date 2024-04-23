"use client";
import React, { useState, useTransition } from "react";
import CardWrapper from "./CardWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import Social from "./Social";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [error, setFormError] = useState<string | undefined>("");
  const [success, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, control, reset, getValues } = form;
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setFormError("");
    setFormSuccess("");
    startTransition(async () => {
      await login(values)
        .then((res) => {
          console.log(res);
          if (res.error) {
            setFormError(res.message);
            reset();
          } else {
            router.push("/");
            toast.success('You are Logged in successfully !😺🚀🌌 ')
          }
        })
        .catch(() => setFormError("something went wrong !"));
    });
  };
  return (
    <section className="flex  flex-col items-center  justify-center gap-7 w-full ">
      <CardWrapper
        heading="Welcome to QuizBoi"
        headerLabel="You perfect plattform to upload quizzes"
        backButtonHref="#"
        backButtonLabel="back"
      >
        {isPending && <Spinner />}
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6 md:p-16 md:pb-5 md:pt-5">
            <div>
              <div className=" space-y-6">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className=" relative">
                      <FormLabel className=" text-gray-400">Email</FormLabel>
                      <FormControl>
                        <Input
                          className=" py-6 px-3  rounded-lg text-black"
                          disabled={isPending}
                          {...field}
                          placeholder="email@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className=" relative ">
                      <FormLabel className=" text-gray-400">Password</FormLabel>
                      <FormControl>
                        <Input
                          className="py-6 px-3 rounded-lg text-black"
                          disabled={isPending}
                          {...field}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" flex flex-col items-start">
                  <Button
                    size="lg"
                    variant="link"
                    asChild
                    className="text-gray-500 hover:text-red-500 px-0 font-normal "
                  >
                    <Link href="/auth/reset">Forgot password?</Link>
                  </Button>

                  <Link className="px-0 font-normal text-gray-500 pt-3 text-sm cursor-default" href="/signup">
                    Do not have an account ?{" "}
                    <span className=" hover:underline cursor-pointer text-red-500">Sign up now</span>
                  </Link>
                </div>
              </div>
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
              className="w-fit hover:text-white duration-150   text-gray-100 background text-xl  py-5 px-10 rounded-full shadow-md"
            >
              Login
            </Button>
            <Social action="login" />
          </form>
        </Form>
      </CardWrapper>
      {isPending && <Loader />}
    </section>
  );
};

export default LoginForm;
