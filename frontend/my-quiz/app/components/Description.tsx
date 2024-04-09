import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const Description = ({ control, isPending, text, name, value }: { control: any; isPending: boolean; text?: string; name?: string; value?: string }) => {
  console.log(value);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={name ? name : "description"}
        render={({ field }) => (
          <FormItem className="relative flex flex-col">
            <FormLabel className="text-gray-900 font-bold text-sm md:text-base">{text ? text : "Quiz Description"}</FormLabel>
            <FormControl  onClick={stopPropagation}>
              <textarea
                draggable={false}
                className="py-3 px-3 resize-none pb-6 bg-[#fcedea] rounded-lg text-black"
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
