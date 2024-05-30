import * as z from "zod";

export const SignUpValidation = z.object({
  first_name:z.string().min(2,{message: "Name too short"}),
  last_name:z.string().min(2,{message: "Name too short"}),
  username: z.string().min(5, {message: "Username too short"}),
  email: z.string().email(),
  password: z.string().min(8, {message: "Password must be at least 8 characters"}),
  confirm_password: z.string().min(8, { message: "Password must be at least 8 characters" })
  }).superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirm_password"],
        message: "Passwords do not match",
      });
    }
  })



export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: "Password must be at least 8 characters"}),
})

export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),

})