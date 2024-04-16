import * as z from "zod";

export const SignupValidation = z.object({
  first_name:z.string().min(2,{message: "Name too short"}),
  last_name:z.string().min(2,{message: "Name too short"}),
  username: z.string().min(5, {message: "Username too short"}),
  email: z.string().email(),
  password: z.string().min(8, {message: "Password must be at least 8 characters"}),
  reenter_password: z.string().min(8, { message: "Password must be at least 8 characters" })
    .refine((reenterPassword, data) => reenterPassword === data.password, {
      message: "Passwords do not match",
      path: ["reenter_password"]
    })
})

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: "Password must be at least 8 characters"}),
})

export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),

})