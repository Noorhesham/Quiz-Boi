"use server";
import { API_URL } from "@/constants";

export const getAuthors = async () => {
  try {
    const res = await fetch(`${API_URL}/users/top-authors`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
    const data = await res.json();
    console.log(data);
    return data.data.topAuthors;
  } catch (err: any) {
    console.log(err);
    if (err?.message === "Failed to fetch") {
      throw new Error(`Unable to reach the server. Please check your internet connection...`);
    }
    throw err;
  }
};
