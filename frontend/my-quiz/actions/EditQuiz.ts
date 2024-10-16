"use server";
import { API_URL } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export const EditQuiz = async (values: any, id: string) => {
  console.log(values, "mekweme");
  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.patch(`${API_URL}/quiz/${id}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
export const EditMap = async (values: any, id: string) => {
  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.patch(`${API_URL}/map/${id}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
export const editMapPositions = async (values: any, id: string) => {
  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.post(`${API_URL}/map/positions/${id}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
