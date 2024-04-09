"use server";
import { API_URL } from "@/constants";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export const Follow = async (id: string) => {
  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.post(
      `${API_URL}/users/${id}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath("/");
    console.log(res);
    return res.data;
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
export const UnFollow = async (id: string) => {
  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.post(
      `${API_URL}/users/${id}/unfollow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath("/");
    return res.data;
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
