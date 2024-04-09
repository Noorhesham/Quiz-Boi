"use client";
import React, { useState, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdateSchema } from "@/schemas";
import { UserProps } from "@/types";
import AddPhotoForm from "./AddPhotoForm";
import { UpdateMe } from "@/actions/UpdateMe";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/utils/queryFunctions";

const UpdateUserForm = ({ setOpen, user }: { setOpen?: any; user: UserProps }) => {
  const [error, setFormError] = useState<string | any>("");
  const [success, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { updateUser } = useGetUser();
  const [selectedImage, setSelectedImage] = useState();
  const router = useRouter();
  const form = useForm<z.infer<typeof UpdateSchema>>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });
  const { handleSubmit, control, reset, formState } = form;
  const onSubmit = (values: z.infer<typeof UpdateSchema>) => {
    console.log(values);
    setFormError("");
    setFormSuccess("");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", String(values.email));
      if (values.photo) {
        formData.append("photo", values.photo[0]);
      }
      console.log(formData.get("photo"), selectedImage, values);
      UpdateMe(formData)
        .then((res) => {
          console.log(res);
          if (res.error) {
            setFormError(res.message || res.error.errors);
            reset();
          } else {
            setOpen && setOpen(false);
            router.refresh();
            updateUser();
          }
        })
        .catch(() => setFormError("something went wrong !"));
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4 md:p-16 md:pb-0 md:pt-5">
        <div>
          <AddPhotoForm
            selectedImage={selectedImage}
            user={user}
            name="photo"
            control={control}
            setSelectedImage={setSelectedImage}
          />
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
          </div>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className=" flex flex-col gap-2 items-start">
          <Button
            disabled={isPending}
            type="submit"
            className="w-fit hover:text-white duration-150   text-gray-100 text-xl  background py-5 px-10 rounded-full shadow-md"
          >
            Update My Data
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
