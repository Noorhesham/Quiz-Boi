export interface UserProps {
  name: string;
  email: string;
  photo: string;
  role: "user" | "admin";
  quizzes: Array<any>;
  likedQuizzes: Array<any>;
  attemptedQuizzes: Array<any>;
  followers:Array<any>
  username:string
  following:Array<any>
  isthirdParty:boolean
  followingCount:number
  followersCount:number
  _id:string
}
export interface QuizProps {
  title: string;
  likesCount:number
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
