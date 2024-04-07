import { getUser } from "@/actions/getUser";
import DialogCustom from "@/app/components/DialogCustom";
import { Empty } from "@/app/components/Empty";
import Heading from "@/app/components/Heading";
import Quiz from "@/app/components/Quiz";
import Spinner from "@/app/components/Spinner";
import UploadQuizForm from "@/app/components/UploadQuizForm";
import { Button } from "@/components/ui/button";
import { QuizProps } from "@/types";
import React, { Suspense } from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const user = await getUser();
  console.log(searchParams?.upload === "");
  return (
    <section className=" py-10 px-20 bg-gray-100 rounded-md min-h-[80vh] ">
      <Heading dark={true} text="My Quizzes" />
      {user.quizzes.length < 1 && (
        <Empty text="You created no quizzes yet !">
          <DialogCustom
            btn={<Button>Create one now</Button>}
            content={<UploadQuizForm setOpen={searchParams && searchParams?.upload === ""} />}
          />
        </Empty>
      )}
      <Suspense fallback={<Spinner />}>
        <div className=" grid  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5  flex-wrap">
          {user.quizzes.map((quiz: QuizProps, i: number) => (
            <Quiz quiz={quiz} key={i} />
          ))}
        </div>
      </Suspense>
      <div className="flex gap-40 items-center fixed right-10 bottom-5">
        <DialogCustom
          isopen={searchParams && searchParams?.upload === ""}
          btn={<Button>Create one now</Button>}
          content={<UploadQuizForm />}
        />
      </div>
    </section>
  );
};

export default page;
