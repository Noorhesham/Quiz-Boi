import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const QuestionNum = ({ control, isPending, }: { control: any; isPending: boolean }) => {
  return (
    <FormField
      control={control}
      name="questionNum"
      render={({ field }) => (
        <FormItem className=" relative">
          <FormLabel className=" text-gray-900 font-bold text-sm md:text-base">
            Number of Questions
          </FormLabel>
          <FormControl>
            <Input 
              className=" md:py-6 md:px-3 w-fit  rounded-lg text-black"
              disabled={isPending}
              {...field}
              placeholder="react quiz"
              type="number"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default QuestionNum;
