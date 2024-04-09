"use client";
import React, { useState, useTransition } from "react";
import { Form,  } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdatePasswordSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import PasswordInput from "./PasswordInput";
import { UpdateMyPassword } from "@/actions/UpdateMe";
const UpdatePasswordForm = () => {
  const [error, setFormError] = useState<string | undefined>("");
  const [success, setFormSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
      passwordCurrent: "",
    },
  });
  const { handleSubmit, control, reset } = form;
  const onSubmit = (values: z.infer<typeof UpdatePasswordSchema>) => {
    setFormError("");
    setFormSuccess("");
    startTransition(async () => {
      await UpdateMyPassword(values)
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
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4 md:p-16 md:pb-0 md:pt-5">
        <div>
          <PasswordInput name="passwordCurrent" text="Current Password" control={control} disabled={isPending} />
          <PasswordInput name="password" text="New Password" control={control} disabled={isPending} />
          <PasswordInput name="passwordConfirm" text="Confirm New Password" control={control} disabled={isPending} />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className=" flex flex-col gap-2 items-start">
          <Button
            disabled={isPending}
            type="submit"
            className="w-fit hover:text-white duration-150   text-gray-100 text-xl  background py-5 px-10 rounded-full shadow-md"
          >
            Update Password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
