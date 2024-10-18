import { API_URL } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export const GetSuggesstions = async () => {
  try {
    const token = cookies().get("jwt")?.value;
    if (!token) return null;

    const response = await fetch(`${API_URL}/users/suggessions?limit=6`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Failed to fetch');
    }
    const responseData = await response.json();
    console.log(responseData)
    return responseData.data.suggestedQuizzes;
  } catch (err:any) {
    console.error(err);
    if (err.message === "Failed to fetch") {
      err.message = `Unable to reach the server. Please check your internet connection...`;
    }
    throw err;
  }
};