"use server"
import { API_URL } from "@/constants";

export const getAllAuthors = async (query:string,page:number=1) => {
    try {
      const res = await fetch(`${API_URL}/users/search?page=${page}&q=${query}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      const data = await res.json();
      console.log(data)
      return data.data.users;
    } catch (err:any) {
      console.log(err);
      if (err?.message === "Failed to fetch") {
        throw new Error(`Unable to reach the server. Please check your internet connection...`);
      }
      throw err;
    }
  };