import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

const TextInput = ({
  control,
  isPending,
  error,
  name,
  text,
  required,
}: {
  control: any;
  isPending: boolean;
  error: any;
  name: string;
  text: string;
  required: boolean;
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
                <Input
                  autoFocus
                  className="md:py-6 md:px-3 rounded-lg text-black"
                  disabled={isPending}
                  {...field}
                  placeholder="What are server components ?"
                  type="text"
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

export default TextInput;
