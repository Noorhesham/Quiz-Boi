import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
const Description = ({ control, isPending }: { control: any; isPending: boolean }) => {
  return (
    <div className=" space-y-4">
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className=" relative flex flex-col">
            <FormLabel className=" text-gray-900 font-bold text-sm md:text-base">
              Quiz Description <span className=" text-gray-600 font-normal"></span>
            </FormLabel>
            <FormControl>
              <textarea
                draggable={false}
                className=" py-3 px-3 resize-none pb-6 bg-[#fcedea]  rounded-lg text-black"
                disabled={isPending}
                {...field}
                placeholder="react quiz"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Description;
