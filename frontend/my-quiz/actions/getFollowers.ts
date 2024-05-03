"use server"
import { API_URL } from "@/constants";

export const getFollowing = async (id:string,page:number=1) => {
    try {
      const res = await fetch(`${API_URL}/users/public/${id}/following?page=${page}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      const data = await res.json();
      console.log(data)
      return data.data.following;
    } catch (err:any) {
      console.log(err);
      if (err?.message === "Failed to fetch") {
        throw new Error(`Unable to reach the server. Please check your internet connection...`);
      }
      throw err;
    }
  };
export const getFollowers = async (id:string,page:number=1) => {
    try {
      const res = await fetch(`${API_URL}/users/public/${id}/followers?page=${page}`);
      console.log(id,page,res)
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      const data = await res.json();
      console.log(res,data)
      return data.data.followers;
    } catch (err:any) {
      console.log(err);
      if (err?.message === "Failed to fetch") {
        throw new Error(`Unable to reach the server. Please check your internet connection...`);
      }
      throw err;
    }
  };