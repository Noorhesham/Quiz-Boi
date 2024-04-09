import { API_URL } from "@/constants";
import axios from "axios";

export const GetTags = async () => {
    try {
      const res = await axios.get(`${API_URL}/tags`);
      console.log(res)
      return res.data.data.tags;
    } catch (err: any) {
      console.log(err);
      if (err.response.data) return err.response.data;
      if (err.message === "Failed to fetch")
        err.message = `Unable to reach the server. Please check your internet connection...`;
      throw err;
    }
  };
  