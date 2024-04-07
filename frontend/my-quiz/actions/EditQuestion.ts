"use server";
import { API_URL } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export const EditQuestion = async (values: any, quizId: string, questionId: string) => {
  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.patch(`${API_URL}/quiz/${quizId}/question/${questionId}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
