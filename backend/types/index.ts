import mongoose, { Schema,Document } from "mongoose";

export interface UserProps extends Document {
    name: string;
    email: string;
    password: string|undefined;
    passwordConfirm: string | undefined;
    passwordChangeAt: Date | number;
    likedQuizzes:[mongoose.Types.ObjectId]
    photo: string;
    active: boolean;
    _id:string
    role:'user'|'admin'
    bio?:string
    passwordResetToken: String,
    googleAccessToken:String
    passwordResetExpires: Date,
    socials?:{instagram:string,facebook:string,linkedin:string}
  }
  