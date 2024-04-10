"use server";
import { API_URL } from "@/constants";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const UpdateMe = async (values: any) => {
  console.log(values);
  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.patch(`${API_URL}/users/updateMe`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    revalidatePath('/')
    revalidatePath('/user/:id')
    return res.data;
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};

export const UpdateMyPassword = async (values: any) => {
  console.log(values);
  try {
    const token = cookies().get("jwt")?.value;
    const res = await axios.patch(`${API_URL}/users/updateMyPassword`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath('/')
    return res.data;
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
