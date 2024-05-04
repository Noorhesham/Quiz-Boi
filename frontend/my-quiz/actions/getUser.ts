"use server";
import { API_URL } from "@/constants";
import { cookies } from "next/headers";
import { GetQuizPublic } from "./GetQuiz";

export const getUser = async () => {
  const token = cookies().get("jwt")?.value;
  try {
    if (!token) return null;
    const user = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    }).then((res) => res.json());
    // const likedQuizzes=user.data.user.likedQuizzes.slice(10).map(async(quiz:any)=>await GetQuizPublic(quiz._id))
    if (user.data?.user) {
      return {
        ...user.data.user,
      };
    }
  } catch (err: any) {
    console.log(err);
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
export const getUserDetails = async () => {
  const token = cookies().get("jwt")?.value;
  try {
    if (!token) return null;
    const user = await fetch(`${API_URL}/users/me-details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
    }).then((res) => res.json());
    const photo = user?.data?.user?.photo;
    const likedQuizzes = await Promise.all(
      user.data?.user.likedQuizzes.map((q: any) => GetQuizPublic(q.quiz))
    );
    console.log(likedQuizzes)
    if (user.data?.user) {
      return {
        ...user.data.user,
        photo: photo,
        likedQuizzes: likedQuizzes.map(quiz=>quiz?.data?.quiz),
      };
    }
  } catch (err: any) {
    console.log(err);
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
export const getPublicUser = async (id: String) => {
  try {
    const user = await fetch(`${API_URL}/users/public/${id}`, { next: { revalidate: 1 } }).then((res) => res.json());
    const likedQuizzes = await Promise.all(
      user.data?.user.likedQuizzes.map((q: any) => GetQuizPublic(q.quiz).then((d) => d.data.quiz))
    );

    if (user.data?.user) {
      return {
        ...user.data.user,
        likedQuizzes: likedQuizzes,
      };
    }
  } catch (err: any) {
    console.log(err);
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
export const getPublicUserMini = async (id: String) => {
  try {
    const user = await fetch(`${API_URL}/users/public-mini/${id}`).then((res) => res.json());
    if (user.data?.user) {
      return {
        ...user.data.user,
      };
    }
  } catch (err: any) {
    console.log(err);
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
