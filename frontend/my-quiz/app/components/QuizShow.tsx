import React from "react";
import Author from "./Author";
import Topic from "./Topic";
import CommentsForm from "./CommentsForm";
import Comments from "./Comments";
import { QuizProps } from "@/types";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { CommentProvider } from "../context/CommentContext";
import YouAreNotAuth from "./YouAreNotAuth";
import { useGetUser } from "@/utils/queryFunctions";
import Share from "./Share";

const QuizShow = ({ quiz }: { quiz: QuizProps }) => {
  const { user } = useGetUser();
  return (
    <section className="flex min-w-fit w-[60%] m-auto gap-3 flex-col">
      <h2 className="text-gray-800 font-semibold text-3xl p-3">{quiz.title}</h2>
      <Author hover={false} quiz={quiz} author={quiz.author} />
      <div className="flex gap-2 items-center">
        {quiz.tags.map((tag) => (
          <Topic key={tag} tag={tag} />
        ))}
      </div>
      <div className="relative  h-[24rem] w-full p-2">
        <img
          loading="lazy"
          src={`${quiz.coverImage}` || "/quiz3.png"}
          alt={quiz.title}
          className="w-full top-0 left-0 h-full absolute  object-contain  aspect-auto mx-auto self-center rounded-lg"
        />
        <div className="absolute  flex-col cursor-pointer text-4xl group inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-70 bg-black bg-opacity-50 rounded-lg">
          <div className="flex items-center gap-2">
            <FaPlay className="text-white group-hover:text-red-400 duration-200 " />
            <Link href={`/quiz/${quiz._id}`} className="text-white font-semibold group-hover:text-red-400 duration-150">
              Attempt Quiz
            </Link>
          </div>
            <Share link={`https://quiz-boi.vercel.app/quiz/${quiz._id}`}/>
        </div>
      </div>
      <div className="flex flex-col">
        <p>{quiz.description}</p>
        <CommentProvider>
          <h2 className="text-gray-800 font-semibold text-3xl p-3">Comments</h2>
          <Comments quiz={quiz} />
          {user ? (
            <CommentsForm text={`Write a comment for the quiz author! ${quiz.author.name}`} id={quiz._id} />
          ) : (
            <YouAreNotAuth text="To add a comment" />
          )}
        </CommentProvider>
      </div>
    </section>
  );
};

export default QuizShow;
