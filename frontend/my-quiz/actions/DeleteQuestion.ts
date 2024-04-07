"use server";
import { API_URL } from "@/constants";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export const DeleteQuestion = async (quizId: string, questionId: string) => {
  const token = cookies().get("jwt")?.value;
  const res = await axios.delete(`${API_URL}/quiz/${quizId}/question/${questionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  revalidatePath("/quizUpload");
  console.log(res, questionId, quizId);
  return res.data;
};
