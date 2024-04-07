"use server";
import { API_URL } from "@/constants";
import { QuizSchema } from "@/schemas";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";
export const UploadQuiz = async (values: any) => {

  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.post(
      `${API_URL}/quiz`,
     values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );
    return res.data;
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
