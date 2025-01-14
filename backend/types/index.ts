import mongoose, { Schema,Document } from "mongoose";

export interface UserProps extends Document {
    name: string;
    email: string;
    password: string|undefined;
    passwordConfirm: string | undefined;
    passwordChangeAt: Date | number;
    likedQuizzes:[mongoose.Types.ObjectId]
    photo: string;
    receivedRequests:[mongoose.Types.ObjectId]
    followRequests:[mongoose.Types.ObjectId]
    active: boolean;
    _id:string
    role:'user'|'admin'
    bio?:string
    passwordResetToken: String,
    googleAccessToken:String
    public:boolean
    passwordResetExpires: Date,
    following: mongoose.Types.ObjectId[];
    followers: mongoose.Types.ObjectId[];
    likedTopics?:string
    socials?:{instagram:string,facebook:string,linkedin:string}
    isthirdParty?:boolean
    followersCount:number
    followingCount:number
  }
  