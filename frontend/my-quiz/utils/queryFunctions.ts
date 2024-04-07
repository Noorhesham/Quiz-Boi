import { AddLike, RemoveLike } from "@/actions/AddLike";
import { CompleteQuiz } from "@/actions/CompleteQuiz";
import { DeleteQuestion as DeleteQuestionApi } from "@/actions/DeleteQuestion";
import { PublishQuiz as PublishQuizApi } from "@/actions/PublishQuiz";
import { SolveQuiz } from "@/actions/SolveQuestion";
import { getUser } from "@/actions/getUser";
import { logout as logoutAPI } from "@/actions/logout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetUser = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
  });
  return { user, isLoading, error };
};

export const useLogOut = () => {
  const querClient = useQueryClient();
  const {
    mutate: logout,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => await logoutAPI(),
    onSuccess: (user) => {
      querClient.removeQueries();
    },
  });
  return { logout, isPending, error };
};
export const useDeleteQuestion = () => {
  const {
    mutate: DeleteQuestion,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (params: { id: string; questionId: string }) => {
      const { id, questionId } = params;
      console.log(id, questionId);
      return await DeleteQuestionApi(id, questionId);
    },
    onSuccess: (data) => {
      if (data.error) throw new Error(data.message);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { DeleteQuestion, isSuccess, isPending, error };
};
export const usePublishQuiz = () => {
  const {
    mutate: PublishQuiz,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: (id: string) => PublishQuizApi(id),
    onSuccess: (data) => {
      if (data.error) throw new Error(data.message);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { PublishQuiz, isSuccess, isPending, error };
};

export const useStartQuiz = (id: string) => {
  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quiz"],
    queryFn: async () => await SolveQuiz(id),
  });
  return { quiz, isLoading, error };
};
export const useSubmitQuiz = () => {
  const router = useRouter();
  const {
    mutate: SubmitQuiz,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (params: {
      values: { answers: [{ answer: number; id: string }]; username?: string; userId?: string };
      quizId: string;
    }) => {
      const { values, quizId } = params;
      return await CompleteQuiz(values, quizId);
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.success) router.push(`/quiz/${data.data.userAttempt._id}/results`);
      if (data.error) throw new Error(data.message);
      return data;
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { SubmitQuiz, isPending, error, isSuccess };
};
export const useLikeQuiz = () => {
  const {
    mutate: LikeQuiz,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn:async (id: string) =>await  AddLike(id),
    onSuccess: (data) => {
      console.log(data);
      if (data.error) throw new Error(data.message);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { LikeQuiz, isSuccess, isPending, error };
};
export const useUnlikeQuiz = () => {
  const {
    mutate: unLikeQuiz,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn:async (id: string) =>await  RemoveLike(id),
    onSuccess: (data) => {
      console.log(data);
      if (data.error) throw new Error(data.message);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { unLikeQuiz, isSuccess, isPending, error };
};

