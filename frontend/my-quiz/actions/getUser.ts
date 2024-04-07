"use server";
import { API_URL, IMAGE_URL } from "@/constants";
import { cookies } from "next/headers";

export const getUser = async () => {
  const token = cookies().get("jwt")?.value;
  try {
    if (!token) return null;
    const user = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    const photo = user?.data?.user?.photo;
    if (user.data?.user)
      return {
        ...user.data.user,
        photo: photo.startsWith("https://lh3.googleusercontent.com") ? photo : `${IMAGE_URL}/users${photo}`,
      };
  } catch (err: any) {
    console.log(err);
    if (err.response.data) return err.response.data;
    if (err.message === "Failed to fetch")
      err.message = `Unable to reach the server. Please check your internet connection...`;
    throw err;
  }
};
