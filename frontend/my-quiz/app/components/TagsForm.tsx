import React, { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { IoCloseCircle } from "react-icons/io5";
import { useColor } from "../context/ColorContext";
const TagsForm = ({ control, isPending }: { control: any; isPending: boolean }) => {
  const [inputValue, setInputValue] = useState("");
  const { color } = useColor();
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="tags"
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel className="text-gray-900 font-bold text-sm md:text-base">
              Quiz Topics <span className="  font-normal text-red-600">*</span>
            </FormLabel>
            <FormControl>
              <div
                className=" min-h-[48px] gap-2 items-center flex-wrap  relative  flex-1 rounded-lg text-black
              flex h-9 w-full capitalize font-[500]  bg-[#fcedea]  border border-input  px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ul className="flex flex-wrap gap-2 items-center">
                  {field.value &&
                    field.value.map((tag: string, index: number) => (
                      <li
                        className={`flex cursor-pointer items-center text-gray-100 py-1 px-2 rounded-full justify-center ${color} `}
                        key={index}
                      >
                        <IoCloseCircle
                          onClick={() => field.onChange(field.value.filter((_: any, i: number) => i !== index))}
                        />
                        {tag}
                      </li>
                    ))}
                </ul>
                <input
                  className=" h-[48px] bg-[#fcedea]  mt-[-3px] selection:outline-none focus:outline-none border-none outline-none text-black relative flex-1 "
                  disabled={isPending}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter" && inputValue.trim() !== "") {
                      console.log(e.key);
                      e.stopPropagation();
                      field.onChange([...(Array.isArray(field.value) ? field.value : []), inputValue]);
                      return setInputValue("");
                    }
                  }}
                  placeholder="React-js"
                  type="text"
                />
                <button
                  type="button"
                  className={`${color} background text-gray-50 font-semibold py-2 px-4 rounded-full`}
                  onClick={() => {
                    inputValue !== "" &&
                      field.onChange([...(Array.isArray(field.value) ? field.value : []), inputValue]);
                    setInputValue("");
                  }}
                >
                  Add
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TagsForm;
