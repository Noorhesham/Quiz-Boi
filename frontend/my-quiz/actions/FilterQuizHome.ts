import { API_URL } from "@/constants";

export const FilterQuizzesHome = async (filter: string, page?: number) => {
  try {
    if (!filter) {
      const res = await fetch(`${API_URL}/quiz`);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      const data = await res.json();
      return data.quizzes;
    }
    const res = await fetch(`${API_URL}/quiz?tags=${filter}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const data = await res.json();
    return data.quizzes;
  } catch (err) {
    console.log(err);
    if (err.message === "Failed to fetch") {
      err.message = `Unable to reach the server. Please check your internet connection...`;
    }
    throw err;
  }
};

  
