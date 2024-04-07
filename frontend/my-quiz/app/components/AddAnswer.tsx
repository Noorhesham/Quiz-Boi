import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import BackButton from "./BackButton";

const AddAnswer = ({
  control,
  isPending,
  addAnswer,
  setIsAddingAnswers,
}: {
  control: any;
  isPending: boolean;
  addAnswer: any;
  setIsAddingAnswers: any;
}) => {
  const [answer, setAnswer] = useState<{ answer: string; photo: string }>();
  return (
    <div className=" space-y-4">
      <BackButton label="Back to Question" onClick={() => setIsAddingAnswers(false)} />
      <FormField
        control={control}
        name="answer"
        render={({ field }) => (
          <FormItem className="relative self-stretch">
            <FormLabel className="text-gray-900 font-bold text-sm md:text-base md:py-3">
              Add Answer <span className="text-gray-600 font-normal">*</span>
            </FormLabel>
            <FormControl>
              <div>
                <Input
                  className="md:py-6 md:px-3 rounded-lg text-black"
                  disabled={isPending}
                  {...field}
                  placeholder="Add Your Answer"
                  type="text"
                  onChange={(e) => setAnswer({ answer: e.target.value, photo: "" })}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="space-y-4">
        <Button
          onClick={() => {
            console.log("answer", answer);
            addAnswer(answer);
            setIsAddingAnswers(false);
          }}
          size="lg"
          disabled={answer?.answer === "" || !answer?.answer}
          className=" my-4 w-full py-5 background text-white"
          type="button"
        >
          Add Answer
        </Button>
      </div>
    </div>
  );
};

export default AddAnswer;
