import { API_URL } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export const GetSuggesstions = async () => {
  try {
    const token = cookies().get("jwt")?.value;
    if (!token) return null;
    const res = await axios.get(`${API_URL}/users/suggessions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data.suggestedQuizzes;
  } catch (err: any) {
    console.log(err);
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};