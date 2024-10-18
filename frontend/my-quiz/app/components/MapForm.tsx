"use client";
import React from "react";
import { EditMap } from "@/actions/EditQuiz";
import { UploadMap } from "@/actions/UploadQuiz";
import AddPhotoForm from "@/app/components/AddPhotoForm";
import FormError from "@/app/components/FormError";
import FormSuccess from "@/app/components/FormSuccess";
import { Header } from "@/app/components/Header";
import Loader from "@/app/components/Loader";
import MyButton from "@/app/components/MyButton";
import TextInput from "@/app/components/QuestionInput";
import { Form } from "@/components/ui/form";
import { MapSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const MapForm = ({ map }: { map?: any }) => {
  const [error, setFormError] = useState<string | any>("");
  const [isPending, startTransition] = useTransition();
  const [success, setFormSuccess] = useState<string | any>("");
  const [selectedImage, setSelectedImage] = useState();
  const router = useRouter();
  const form = useForm<z.infer<typeof MapSchema>>({
    resolver: zodResolver(MapSchema),
    defaultValues: {
      name: map?.name || "",
      mapImage: map?.mapImage || undefined,
    },
  });
  const { control, handleSubmit, formState } = form;
  const onSubmit = (values: z.infer<typeof MapSchema>) => {
    console.log(values, selectedImage);
    setFormError("");
    setFormSuccess("");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.mapImage) {
        formData.append("mapImage", values.mapImage[0]);
      }
      if (map) {
        await EditMap(formData, map._id)
          .then((res) => {
            console.log(res);
            if (res.error) {
              setFormError(res.message || res.error.errors);
            } else {
              router.refresh();
            }
          })
          .catch(() => setFormError("something went wrong !"));
      } else
        await UploadMap(formData)
          .then((res) => {
            console.log(res);
            if (res.error) {
              setFormError(res.message || res.error.errors);
            } else {
              router.refresh();
              router.push(`/map-upload/${res.data.map._id}`);
            }
          })
          .catch(() => setFormError("something went wrong !"));
    });
  };
  return (
    <>
      {" "}
      <Header label={map ? "Edit Map" : "Add Map"} heading="Create a new map" />
      <Form {...form}>
        {isPending && <Loader text={map ? "Editing Map" : "Adding Map"} image="/loading2.png" />}
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-1 md:space-y-4 md:p-16 md:pb-5 md:pt-5">
          <AddPhotoForm
            selectedImage={selectedImage}
            quiz={map}
            name={"mapImage"}
            control={control}
            setSelectedImage={setSelectedImage}
          />
          <TextInput
            name="name"
            required={true}
            text="Add name to your map"
            error={error?.quiz?.message}
            control={control}
            isPending={isPending}
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="space-y-4">
            <MyButton disabled={isPending} text={map ? "Edit map" : "Add map"} />
          </div>
        </form>
      </Form>
    </>
  );
};

export default MapForm;
