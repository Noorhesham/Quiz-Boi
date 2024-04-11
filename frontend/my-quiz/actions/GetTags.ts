import { API_URL } from "@/constants";

export const GetTags = async () => {
  try {
    const res = await fetch(`${API_URL}/tags`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const data = await res.json();
    return data.data.tags;
  } catch (err:any) {
    console.log(err);
    if (err.message === "Failed to fetch") {
      err.message = `Unable to reach the server. Please check your internet connection...`;
    }
    throw err;
  }
};
