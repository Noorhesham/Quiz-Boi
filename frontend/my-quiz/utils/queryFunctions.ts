import { AddComment, EditComment, RemoveComment } from "@/actions/AddComment";
import { Follow, UnFollow } from "@/actions/AddFollow";
import { AddLike, RemoveLike } from "@/actions/AddLike";
import { CompleteQuiz } from "@/actions/CompleteQuiz";
import { DeleteQuestion as DeleteQuestionApi } from "@/actions/DeleteQuestion";
import { FilterQuizzesHome } from "@/actions/FilterQuizHome";
import { getLikedQuizzes, getMyLikedQuizzes } from "@/actions/GetLikedQuizzes";
import { GetQuestions } from "@/actions/GetQuestion";
import { GetStats } from "@/actions/GetStats";
import { GetTags } from "@/actions/GetTags";
import { PublishQuiz as PublishQuizApi } from "@/actions/PublishQuiz";
import { RemoveQuiz } from "@/actions/RemoveQuiz";
import { SolveQuiz } from "@/actions/SolveQuestion";
import { GetAttempt } from "@/actions/getAttempt";
import { getFollowers, getFollowing } from "@/actions/getFollowers";
import { getPublicUser, getPublicUserMini, getUser, getUserDetails } from "@/actions/getUser";
import { logout as logoutAPI } from "@/actions/logout";
import { useQuiz } from "@/app/context/QuizContext";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useGetUser = () => {
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
  });
  const updateUser = () => {
    //@ts-ignore
    queryClient.invalidateQueries("user");
  };
  return { user, isLoading, error, updateUser };
};


export const useGetUsersPublic = (arr: Array<string>) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`users ${arr}`],
    queryFn: async () => await Promise.all(arr.map((ar) => getPublicUser(ar))),
  });
  return { users, isLoading, error };
};
export const useGetUsersMiniPublic = (arr: Array<string>) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`users ${arr}`],
    queryFn: async () => await Promise.all(arr.map((ar) => getPublicUserMini(ar))),
  });
  return { users, isLoading, error };
};
export const useGetMyLikes = () => {
  const {
    data: likedQuizzes,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`likedQuizzes`],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getMyLikedQuizzes(pageParam);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
  return { likedQuizzes, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage };
};
export const useGetLikedQuizzes = (id: string) => {
  const {
    data: likedQuizzes,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`likedQuizzes ${id}`],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getLikedQuizzes(id,pageParam);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
  return { likedQuizzes, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage };
};
export const useGetFollowers = (id: string) => {
  const {
    data: followers,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`followers ${id}`],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getFollowers(id, pageParam);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
  return { followers, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export const useGetFollowing = (id: string) => {
  const {
    data: following,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`following ${id}`],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getFollowing(id, pageParam);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
  return { following, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage };
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
      toast.done("You are logged out ..");
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
      toast.success(`Question deleted Successfully`);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
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
      toast.success(`Quiz published Successfully`);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
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
    queryKey: [`quiz ${id}`],
    queryFn: async () => await SolveQuiz(id),
  });
  return { quiz, isLoading, error };
};
export const useSubmitQuiz = () => {
  const router = useRouter();
  const { handleQuizEnd } = useQuiz();
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
      if (data.status === "success") {
        handleQuizEnd();
        router.push(`/quiz/${data.data.userAttempt._id}/results`);
        toast.success("Quiz successfully submitted .. we are redirecting you to your results page ! 😺");
      }
      if (data.error) {
        throw new Error(data.message);
      }
      return data;
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { SubmitQuiz, isPending, error, isSuccess };
};
export const useLikeQuiz = () => {
  const querClient = useQueryClient();
  const {
    mutate: LikeQuiz,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (id: string) => await AddLike(id),
    onSuccess: (data) => {
      console.log(data);
      if (data.error) throw new Error(data.message);
      toast.success(`Like Added Successfully`);
      //@ts-ignore
      querClient.invalidateQueries("user");
      //@ts-ignore
      querClient.invalidateQueries("likedQuizzes");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { LikeQuiz, isSuccess, isPending, error };
};
export const useUnlikeQuiz = () => {
  const querClient = useQueryClient();
  const {
    mutate: unLikeQuiz,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (id: string) => await RemoveLike(id),
    onSuccess: (data) => {
      console.log(data);
      if (data.error) throw new Error(data.message);
      toast.success(`Like Removed Successfully`);
   //@ts-ignore
   querClient.invalidateQueries("user");
   //@ts-ignore
   querClient.invalidateQueries("likedQuizzes");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { unLikeQuiz, isSuccess, isPending, error };
};

export const useAddComment = () => {
  const {
    mutate: AddCommentToQuiz,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (params: { content: string; quizId: string }) => {
      const { content, quizId } = params;
      return await AddComment(content, quizId);
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.error) throw new Error(data.message);
      toast.success(`Comment is Added successfully Successfully`);
      return data;
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { AddCommentToQuiz, isPending, error, isSuccess };
};
export const useEditComment = () => {
  const {
    mutate: EditCommentFromQuiz,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (params: { content: string; id: string }) => {
      const { content, id } = params;
      return await EditComment(content, id);
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.error) throw new Error(data.message);
      toast.success(`Comment is Edited successfully Successfully`);
      return data;
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { EditCommentFromQuiz, isPending, error, isSuccess };
};
export const usedeleteComment = () => {
  const {
    mutate: RemoveCommentFromQuiz,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (id: string) => {
      return await RemoveComment(id);
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.error) throw new Error(data.message);
      toast.success(`Comment is deleted successfully Successfully`);
      return data;
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { RemoveCommentFromQuiz, isPending, error, isSuccess };
};
export const usedeleteQuiz = () => {
  const queryClient = useQueryClient();
  const {
    mutate: RemoveTheQuiz,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (id: string) => {
      //@ts-ignore
      queryClient.invalidateQueries("user");
      return await RemoveQuiz(id);
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.error) throw new Error(data.message);
      toast.success(`Quiz is deleted successfully !`);
      //@ts-ignore
      queryClient.invalidateQueries("user");
      return data;
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { RemoveTheQuiz, isPending, error, isSuccess };
};

export const useFollow = () => {
  const querClient = useQueryClient();
  const {
    mutate: FollowUser,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (id: string) => await Follow(id),
    onSuccess: (data) => {
      if (data.error) throw new Error(data.message);
      toast.success(`User is followed Successfully`);
      //@ts-ignore
      querClient.invalidateQueries("user");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { FollowUser, isSuccess, isPending, error };
};
export const useUnFollow = () => {
  const querClient = useQueryClient();
  const {
    mutate: UnFollowUser,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (id: string) => await UnFollow(id),
    onSuccess: (data) => {
      console.log(data);
      if (data.error) throw new Error(data.message);
      toast.success("User Unfollowed Successfully");
      //@ts-ignore
      querClient.invalidateQueries("user");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { UnFollowUser, isSuccess, isPending, error };
};

export const useGetQuestions = (arr: Array<string>) => {
  const {
    data: questions,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`question ${arr}`],
    queryFn: async () => await Promise.all(arr.map((ar) => GetQuestions(ar))),
  });
  return { questions, isLoading, error };
};
export const FilterQuizzes = (category: string, page?: number) => {
  const {
    data: quizzes,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`quizzes${category}`],
    queryFn: async () => await FilterQuizzesHome(category, page),
  });
  return { quizzes, isLoading, error };
};

export const useGetStats = () => {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`stats`],
    queryFn: async () => await GetStats(),
  });
  return { stats, isLoading, error };
};

export const useGetTags = () => {
  const {
    data: tags,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`tags`],
    queryFn: async () => await GetTags(),
  });
  return { tags, isLoading, error };
};

export const useGetQuizzes = (catergorey: string, page: number) => {
  const {
    data: quizzes,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`quizzes`],
    queryFn: async () => await FilterQuizzesHome(catergorey, page),
  });
  return { quizzes, isLoading, error };
};
export const useGetAttempts = (arr: Array<string>) => {
  const {
    data: attemptedUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`attempt ${arr}`],
    queryFn: async () => await Promise.all(arr.map((ar) => GetAttempt(ar))),
  });
  return { attemptedUsers, isLoading, error };
};
