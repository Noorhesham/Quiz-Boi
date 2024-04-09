import { API_URL } from "@/constants";
import axios from "axios";

export const GetQuestions = async (id: string) => {
    try {
      const res = await axios.get(`${API_URL}/question/${id}`);
      return res.data.data.question;
    } catch (err: any) {
      console.log(err);
      if (err.response.data) return err.response.data;
      if (err.message === "Failed to fetch")
        err.message = `Unable to reach the server. Please check your internet connection...`;
      throw err;
    }
  };
  