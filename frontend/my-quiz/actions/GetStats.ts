"use server";
import { API_URL } from "@/constants";

export const GetStats = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/attempts/user/stats/${id}`, { cache:'no-cache' });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch data");
    }
    console.log(data);
    return data.data;
  } catch (error: any) {
    console.error(error);
    if (error.message === "Failed to fetch") {
      throw new Error(`Unable to reach the server. Please check your internet connection...`);
    } else {
      throw error;
    }
  }
};
