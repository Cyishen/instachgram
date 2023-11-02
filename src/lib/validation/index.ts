import * as z from "zod"

export const formSchema = z.object({
    name: z.string().min(2),
    username: z.string().min(2),
    email: z.string().min(2),
    password: z.string().min(8),
})

export const SigninSchema = z.object({
  email: z.string().min(2),
  password: z.string().min(8),
})

export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
})