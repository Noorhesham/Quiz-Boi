"use server";
import { API_URL } from "@/constants";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export const AddComment = async (content: string , id: string) => {
  try {
    console.log(content)
    const token = cookies().get("jwt")?.value;
    const res = await axios.post(`${API_URL}/quiz/${id}/comments`, {content:content}, {
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
export const EditComment = async ( content: string , id: string) => {
  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.patch(`${API_URL}/comments/${id}`, {content:content}, {
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
export const RemoveComment = async (id: string) => {
  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.delete(`${API_URL}/comments/${id}`, {
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
