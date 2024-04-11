import * as z from "zod";

export const SignupValidation = z.object({
  first_name:z.string().min(2,{message: "Name too short"}),
  last_name:z.string().min(2,{message: "Name too short"}),
  username: z.string().min(5, {message: "Username too short"}),
  email: z.string().email(),
  password: z.string().min(8, {message: "Password must be at least 8 characters"}),
})

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: "Password must be at least 8 characters"}),
})