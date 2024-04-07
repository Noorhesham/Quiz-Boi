import { Button } from "@/components/ui/button";
import React from "react";
import DialogCustom from "./DialogCustom";
import ConfirmPublish from "./ConfirmPublish";
import { QuizProps } from "@/types";

const PublishQuiz = ({ quiz }: { quiz: QuizProps }) => {
  return (
    <DialogCustom
      content={
        quiz.questions.length>5?<ConfirmPublish
          text="Ready to publish your quiz to the world!?😺🐋"
          image="publish"
          paragraph=" make sure that your questions ,answers , photos ,etc... are correct so others will be able to attempt your quiz!"
        />:<ConfirmPublish
        text="Uncompleted Quiz !? 😿👩‍🚀"
        image="publish2" disabled={true}
        paragraph="Too few questions to publish the quiz ! make sure to add at least 5 questions so that your quiz be great ! 🌌🚀"
      />
      }
      btn={
        <Button className=" text-gray-800 fixed right-10 bottom-5 text-sm md:text-xl hover:bg-gray-200 bg-white rounded-xl self-end">
          Publish Quiz
        </Button>
      }
    />
  );
};

export default PublishQuiz;
