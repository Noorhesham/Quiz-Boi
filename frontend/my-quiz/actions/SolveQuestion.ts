"use server";
import { API_URL } from "@/constants";
import { shuffle } from "@/utils/shffule";
import axios from "axios";

export const SolveQuiz = async (id: string) => {
  try {
    const res = await axios.get(`${API_URL}/quiz/${id}/solve`);
    const questions=shuffle(res.data.data.quiz.questions)
    const quiz=res.data.data.quiz
    return {...quiz,questions}
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
