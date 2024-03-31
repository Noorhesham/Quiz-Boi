import * as z from "zod";
export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required 😿" }),
});
export const SignupSchema = z.object({
  name:z.string().min(3,{message:'You must ass a name of at least 3 characters 😿!'}),
  email: z.string().email({ message: "Email is required 😿" }),
  password: z.string().min(1, { message: "Password is required 😿" }),
  passwordConfirm:z.string().min(1,{message:"You must confirm your password 😿"})
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords must be the same ! 😿",
  path: ['passwordConfirm'],
});
// 😺🐼🐬🐳🐋🐟🐡🪼🐧🐥