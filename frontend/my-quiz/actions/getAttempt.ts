"use server";
import { API_URL } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export const GetAttempt = async (id: string) => {
  try {
    const res = await axios.get(`${API_URL}/attempts/${id}`, {

    });
    return res.data.data.attempt;
  } catch (err: any) {
    console.log(err);
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
export const GetAttemptStats = async () => {
  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.get(`${API_URL}/attempts/stats`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }});
    return res.data.data;
  } catch (err: any) {
    console.log(err);
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
