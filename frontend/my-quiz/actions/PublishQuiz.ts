"use server";
import { API_URL } from "@/constants";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const PublishQuiz = async (id: string) => {
  try {
    const token = cookies().get("jwt")?.value;
    if (!token) return null;
    const res = await axios.patch(`${API_URL}/quiz/${id}/publish`, "", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    revalidatePath('/')
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
