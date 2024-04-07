"use server";
import { API_URL } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";
export const logout = async () => {
  try {
    const res = await axios.post(`${API_URL}/users/logout`);
    console.log("response", res.data);
    cookies().delete("jwt");
    return res.data;
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
