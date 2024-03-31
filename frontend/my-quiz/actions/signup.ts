"use server";
import { API_URL } from "@/constants";
import { SignupSchema } from "@/schemas";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";
export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validateFields = SignupSchema.safeParse(values);
  if (!validateFields.success) return { error: "invalid fields!" };
  const { email, password, passwordConfirm, name } = validateFields.data;
  try {
    const res = await axios.post(`${API_URL}/users/signup`, { email, password, passwordConfirm, name });
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
