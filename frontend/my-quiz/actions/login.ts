"use server";
import { API_URL } from "@/constants";
import { LoginSchema } from "@/schemas";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) return { error: "invalid fields!" };
  const { email, password } = validateFields.data;
  try {
    const res = await axios.post(`${API_URL}/users/login`, { email, password });
    console.log("response", res.data);
    cookies().set("jwt", res.data?.token);
    return res.data;
  } catch (err: any) {
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
