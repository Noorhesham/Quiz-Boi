"use server";
import { API_URL } from "@/constants";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export const AddLike = async (id: string) => {
  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.post(`${API_URL}/quiz/${id}/like`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/");
    return res.data;
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
