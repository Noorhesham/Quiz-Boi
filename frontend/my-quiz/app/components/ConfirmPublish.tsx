"use client";
import { Button } from "@/components/ui/button";
import { usePublishQuiz } from "@/utils/queryFunctions";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

const ConfirmPublish = ({
  setOpen,
  text,
  paragraph,
  image,
  disabled = false,
  entity,
}: {
  setOpen?: (b: boolean) => void;
  text: string;
  paragraph: string;
  image: string;
  disabled?: boolean;
  entity?: string;
}) => {
  const { id }: { id: string } = useParams();
  const { isPending, error, PublishQuiz, isSuccess } = usePublishQuiz(entity || "quiz");
  const router = useRouter();
  return (
    <div className="flex flex-col  items-center gap-10">
      <div className="flex flex-col items-center text-center">
        <h2 className=" text-2xl my-5 font-normal text-gray-800 text-center">{text}</h2>
        <p className=" text-gray-600 font-normal">{paragraph}</p>
      </div>
      <div className="">
        {isPending ? (
          <FaSpinner className=" text-4xl animate-spin duration-200 " />
        ) : (
          <Image width={250} height={250} src={`/${image}.png`} alt="remove" />
        )}
      </div>
      {error && <p className=" font-semibold text-red-500">{error?.message}</p>}
      <div className=" self-end flex items-center gap-5">
        {
          <Button onClick={() => setOpen && setOpen(false)} variant="secondary">
            Cancel
          </Button>
        }
        <Button
          disabled={disabled}
          onClick={() => {
            PublishQuiz(id);
            if (isSuccess) {
              if (entitiy === "quiz") router.push(`/quiz/${id}`);
              setOpen && setOpen(false);
            }
          }}
          variant="default"
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default ConfirmPublish;
