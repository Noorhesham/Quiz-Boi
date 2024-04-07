"use server";
import { API_URL } from "@/constants";
import axios from "axios";
export const CompleteQuiz = async (values: any, id: string) => {
  try {
    const res = await axios.post(`${API_URL}/quiz/${id}/completed`, values);
    console.log(res)
    return res.data;
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};