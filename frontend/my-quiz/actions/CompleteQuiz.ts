import { API_URL } from "@/constants";

export const CompleteQuiz = async (values:any, id:string) => {
  try {
    const res = await fetch(`${API_URL}/quiz/${id}/completed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};
