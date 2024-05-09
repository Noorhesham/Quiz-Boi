"use server";
import { API_URL } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export const getMyLikedQuizzes = async (page:number=1) => {
  try {
    const token = cookies().get("jwt")?.value;
    if (!token) return null;
    const res = await fetch(`${API_URL}/users/me-liked?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    console.log(data);
    return data.data.likedQuizzes;
  } catch (err: any) {
    console.log(err);
    if (err.message === "Failed to fetch") {
      throw new Error(`Unable to reach the server. Please check your internet connection...`);
    } else {
      throw err;
    }
  }
};

export const getLikedQuizzes = async (id: string,page:number=1) => {
  try {
    const res = await fetch(`${API_URL}/users/${id}/liked?page=${page}`);
    const data = await res.json();
    console.log(data);
    return data.likedQuizzes;
  } catch (err: any) {
    console.log(err);
    if (err?.message === "Failed to fetch") {
      throw new Error(`Unable to reach the server. Please check your internet connection...`);
    }
    throw err;
  }
};
