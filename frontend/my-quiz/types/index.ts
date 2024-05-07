export interface UserProps {
  name: string;
  email: string;
  photo: string;
  role: "user" | "admin";
  quizzes: Array<any>;
  likedQuizzes: Array<any>;
  attemptedQuizzes: Array<any>;
  followers:Array<any>
  following:Array<any>
  followingCount:number
  followersCount:number
  _id:string
}
export interface QuizProps {
  title: string;
  questionNum: number | undefined;
  tags: string[];
  questions: QuestionProps[];
  duration: any;
  coverImage?: string;
  published: boolean;
  _id: string;
  color: string;
  description: string;
  author: UserProps;
  likes: [number];
  usersAttempted: [string];
  comments:[any]
  attemptsNum:number
  createdAt:any
}

export interface QuestionProps {
  question: string;
  answers: Array<string>;
  correctAnswerIndex: number;
  _id: string;
  coverImage?: string;
  explain?: string;
  points:number
  hint:{text:string,coverImage:string}
}
