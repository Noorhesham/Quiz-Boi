import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

const DescriptionInput = ({
  control,
  isPending,
  error,
  name,
  text,
  required,placeholder
}: {
  control: any;
  isPending: boolean;
  error: any;
  name: string;
  text: string;
  required: boolean;placeholder?:string
}) => {
  return (
    <div className="flex flex-col items-center">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="relative self-stretch">
            <FormLabel className="text-gray-900 font-bold text-sm md:text-base md:py-3">
              {text} {required && <span className="text-gray-600 font-normal">*</span>}
            </FormLabel>
            <FormControl>
              <div>
              <textarea
                draggable={false}
                className="py-3 px-3 resize-none pb-6 bg-pink-500 w-full rounded-lg text-black"
                disabled={isPending}
                {...field} 
                placeholder={placeholder?placeholder:"What are server components ?"}
              />    
              </div>
            </FormControl>
            {error?.question?.message && <p className=" text-sm text-red-500">{error?.question?.message}</p>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DescriptionInput;
