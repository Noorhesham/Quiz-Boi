"use  client";
import { useGetTags } from "@/utils/queryFunctions";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Spinner from "./Spinner";
import { useColor } from "../context/ColorContext";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const TaggingComponent = ({ control, defaultVal }: { control: any; defaultVal?: [any] }) => {
  const { color } = useColor();
  const [selected, setSelected] = useState([]);
  const { tags, isLoading } = useGetTags();
  console.log(tags)
  //@ts-ignore
  const formattedTags = tags?.map((tag: string) => ({ label: tag.tag, value: tag.tag }));
  useEffect(() => {
    if (defaultVal) {
      //@ts-ignore
      setSelected(defaultVal?.map((tag: string) => ({ label: tag.tag, value: tag.tag })));
    }
  }, [defaultVal]);
  return (
    <FormField
      control={control}
      name="tags"
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel className="text-gray-900 font-bold text-sm md:text-base">
            Quiz Topics <span className="font-normal text-red-600">*</span>
          </FormLabel>
          <FormControl>
            <div className="flex flex-col gap-4">
              <ul className="flex flex-wrap gap-2 items-center">
                {selected.map((tag: any, index: number) => (
                  <li
                    className={`flex text-sm cursor-pointer items-center text-gray-100 py-1 px-2 rounded-full justify-center ${color}`}
                    key={index}
                    onClick={() => {
                      const updatedSelected = selected.filter((_, i) => i !== index);
                      setSelected(updatedSelected);
                      field.onChange(updatedSelected.map((item: any) => item.value));
                    }}
                  >
                    {tag.label}
                  </li>
                ))}
              </ul>
              {isLoading ? (
                <Spinner />
              ) : (
                <MultiSelect
                  options={formattedTags}
                  isLoading={isLoading}
                  value={selected}
                  onChange={(selectedOptions: any) => {
                    setSelected(selectedOptions);
                    field.onChange(selectedOptions.map((item: any) => item.value));
                  }}
                  labelledBy="Select"
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TaggingComponent;
