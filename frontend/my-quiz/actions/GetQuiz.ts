"use server"
import { API_URL } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export const GetQuiz = async (id: string) => {
  try {
    const token = cookies().get("jwt")?.value;
    if (!token) return null;
    const res = await axios.get(`${API_URL}/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(!res.data.data) return null
    return res.data.data;
  } catch (err: any) {
    console.log(err);
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
export const GetQuizPublic = async (id:string) => {
  try {
    const res = await fetch(`${API_URL}/quiz/${id}/public`);

    const data = await res.json();
    if (!data)return null
    return data;
  } catch (err:any) {
    console.log(err);
    if (err?.message === "Failed to fetch") {
      throw new Error(`Unable to reach the server. Please check your internet connection...`);
    }
    throw err;
  }
};