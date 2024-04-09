import * as z from "zod";
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];
export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required 😿" }),
});
export const SignupSchema = z
  .object({
    name: z.string().min(3, { message: "You must add a name of at least 3 characters 😿!" }),
    email: z.string().email({ message: "Email is required 😿" }),
    password: z.string().min(1, { message: "Password is required 😿" }),
    passwordConfirm: z.string().min(1, { message: "You must confirm your password 😿" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must be the same ! 😿",
    path: ["passwordConfirm"],
  });
// 😺🐼🐬🐳🐋🐟🐡🪼🐧🐥

export const QuestionSchema = z.object({
  question: z.string().nonempty({ message: "Question text is required" }),
  answers: z.array(z.string().nonempty({ message: "Answer text is required" })),
  correctAnswerIndex: z.number(),
  explain: z.string().optional(),
  coverImage: z
    .any()
    .optional()
    .refine((files) => {
      // Check if files are provided and meet size criteria
      return !files || !files[0] || files[0].size <= MAX_FILE_SIZE;
    }, `Max image size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`)
    .refine((files) => {
      // Check if files are provided and meet type criteria
      return !files || !files[0] || ACCEPTED_IMAGE_MIME_TYPES.includes(files[0].type);
    }, "Only .jpg, .jpeg, .png, and .webp formats are supported."),
});

export const QuizSchema = z.object({
  title: z.string().nonempty({ message: "You must add a title to your quiz" }),
  description: z.string().optional(),
  questionNum: z.any(),
  tags: z
    .array(z.string())
    .min(1, { message: "At least one tag is required" })
    .max(3, { message: " 3 tags is the max" }),
  duration: z.any(),
  coverImage: z
    .any()
    .optional()
    .refine((files) => {
      // Check if files are provided and meet size criteria
      return !files || !files[0] || files[0].size <= MAX_FILE_SIZE;
    }, `Max image size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`)
    .refine((files) => {
      // Check if files are provided and meet type criteria
      return !files || !files[0] || ACCEPTED_IMAGE_MIME_TYPES.includes(files[0].type);
    }, "Only .jpg, .jpeg, .png, and .webp formats are supported."),
});
export const UpdateSchema = z
  .object({
    name: z.string().min(3, { message: "You must add a name of at least 3 characters 😿!" }),
    email: z.string().email({ message: "Email is required 😿" }),
    photo: z
    .any()
    .optional()
  })
 ;
 export const UpdatePasswordSchema = z
  .object({
    passwordCurrent: z.string().min(1, { message: "Password is required 😿" }),
    password: z.string().min(6, { message: "Enter At Least 6 Characters 😿" }),
    passwordConfirm: z.string().min(1, { message: "You must confirm your password 😿" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must be the same ! 😿",
    path: ["passwordConfirm"],
  });