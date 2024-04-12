import { getUser } from "@/actions/getUser";
import DialogCustom from "@/app/components/DialogCustom";
import { Empty } from "@/app/components/Empty";
import GlobalButton from "@/app/components/GlobalButton";
import Heading from "@/app/components/Heading";
import Quiz from "@/app/components/Quiz";
import UploadQuizForm from "@/app/components/UploadQuizForm";
import { QuizProps } from "@/types";
import { redirect } from "next/navigation";

const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const user = await getUser();
   if(!user)  return redirect("/");

  return (
    <section className=" py-10 pt-32 px-20  rounded-md min-h-[80vh] ">
      <Heading text="My Quizzes" />
      {user.quizzes.length < 1 && (
        <Empty text="You created no quizzes yet !">
          <DialogCustom title="Create New Quiz"
            btn={<GlobalButton text="Create one now" />}
            content={<UploadQuizForm setOpen={searchParams && searchParams?.upload === ""} />}
          />
        </Empty>
      )}
        <div className=" grid  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5  flex-wrap">
          {user.quizzes.map((quiz: QuizProps, i: number) => (
            <Quiz quiz={quiz} key={i} />
          ))}
        </div>
      <div className="flex gap-40 items-center fixed right-10 bottom-5">
        <DialogCustom title="Create New Quiz"
          isopen={searchParams && searchParams?.upload === ""}
          btn={<GlobalButton text="Create one now" />}
          content={<UploadQuizForm />}
        />
      </div>
    </section>
  );
};

export default page;
