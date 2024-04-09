import { API_URL } from "@/constants";
import axios from "axios";

export const FilterQuizzesHome = async (filter:string,page?:number,) => {
    try {
      if(!filter){
        const res = await axios.get(`${API_URL}/quiz`);
      return res.data.data.quizzes;
      }
      const res = await axios.get(`${API_URL}/quiz?tags=${filter}&page=${page||1}&limit=10`);
      return res.data.data.quizzes;
    } catch (err: any) {
      console.log(err);
      if (err.response.data) return err.response.data;
      if (err.message === "Failed to fetch")
        err.message = `Unable to reach the server. Please check your internet connection...`;
      throw err;
    }
  };
  