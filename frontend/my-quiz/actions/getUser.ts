"use server";
import { API_URL } from "@/constants";
import { cookies } from "next/headers";
export const getUser = async () => {
  const token=cookies().get('jwt')?.value
  if(!token) return null
  const user = await fetch(`${API_URL}/users/me`,{headers: {
    'Authorization': `Bearer ${token}`
  }}).then((res) => res.json());
  if(user.data.user) return user.data.user
  return user
};
