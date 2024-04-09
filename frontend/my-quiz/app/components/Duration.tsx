import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const AnswersNum = ({ control, isPending, }: { control: any; isPending: boolean, }) => {
  return (
    <FormField
      control={control}
      name="duration"
      render={({ field }) => (
        <FormItem className="  relative">
          <FormLabel className=" text-gray-900 font-bold text-sm md:text-base">
          Duration
          </FormLabel>
          <FormControl>
            <Input min={1}
              className="md:py-6 md:px-3  w-fit  rounded-lg text-black"
              disabled={isPending}
              {...field}
              placeholder='1'
              type="number"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AnswersNum;
