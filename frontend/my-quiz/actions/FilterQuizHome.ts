import { API_URL } from "@/constants";

export const FilterQuizzesHome = async (filter:string,page?:number,) => {
    try {
      if(!filter){
        const res = await fetch(`${API_URL}/quiz?page=${page||1}&limit=10`);

        const data=await res.json()
        console.log(data)
      return data;
      }
      const res = await fetch(`${API_URL}/quiz?tags=${filter}&page=${page||1}&limit=10`);

      const data=await res.json()
      console.log(data)
      return data;
    } catch (err: any) {
      console.log(err);
      if (err.response) return err.response;
      if (err.message === "Failed to fetch")
        err.message = `Unable to reach the server. Please check your internet connection...`;
      throw err;
    }
  };
  