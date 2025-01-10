"use server";
import { API_URL } from "@/constants";
import { cookies } from "next/headers";

export const getMyPlayedQuizzes = async (page: number = 1) => {
  try {
    const token = cookies().get("jwt")?.value;
    if (!token) return null;
    const res = await fetch(`${API_URL}/users/me-attempted?page=${page}&limit=20`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    console.log(data);
    return data.data;
  } catch (err: any) {
    console.log(err);
    if (err.message === "Failed to fetch") {
      throw new Error(`Unable to reach the server. Please check your internet connection...`);
    } else {
      throw err;
    }
  }
};

export const getPlayedQuizzes = async (id: string, page: number = 1) => {
  try {
    const res = await fetch(`${API_URL}/users/public/${id}/played?page=${page}`);
    const data = await res.json();
    console.log(data);
    return data.data.attemptedQuizzes;
  } catch (err: any) {
    console.log(err);
    if (err?.message === "Failed to fetch") {
      throw new Error(`Unable to reach the server. Please check your internet connection...`);
    }
    throw err;
  }
};
