"use server";
import { API_URL } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export const GetusersforAttempt = async (id: string, page: number) => {
  try {
    const response = await fetch(`${API_URL}/quiz/${id}/attempts?sort=-points&limit=10&page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data.data.attempt;
  } catch (err: any) {
    console.log(err);
    if (err.message === "Failed to fetch") {
      throw new Error(`Unable to reach the server. Please check your internet connection...`);
    }
    throw err;
  }
};
export const GetAttempt = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/attempts/${id}`, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data.data.attempt;
  } catch (err: any) {
    console.log(err);
    if (err.message === "Failed to fetch") {
      throw new Error(`Unable to reach the server. Please check your internet connection...`);
    }
    throw err;
  }
};
export const GetAttemptStats = async () => {
  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.get(`${API_URL}/attempts/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (err: any) {
    console.log(err);
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
