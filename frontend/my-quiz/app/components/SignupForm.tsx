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
import { SignupSchema } from "@/schemas";
import { login } from "@/actions/login";
import Social from "./Social";
import { signup } from "@/actions/signup";
import { useRouter } from "next/navigation";

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
      name: "Spider-Man",
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
          } else router.push("/");
        })
        .catch(() => setFormError("something went wrong !"));
    });
  };
  return (
    <section className="flex flex-col items-center justify-center p-5 py-3 w-full ">
      <CardWrapper heading="" headerLabel="" backButtonHref="#" backButtonLabel="back">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4 md:p-16 md:pb-0 md:pt-5">
            <div>
              <div className=" space-y-5">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className=" relative">
                      <FormLabel className=" text-gray-400">Name</FormLabel>
                      <FormControl>
                        <Input
                          className=" py-6 px-3  rounded-lg text-black"
                          disabled={isPending}
                          {...field}
                          placeholder="spider-man"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          placeholder="meow@gmail.com"
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
                <FormField
                  control={control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem className=" relative ">
                      <FormLabel className=" text-gray-400">Confirm your Password</FormLabel>
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
