import { emitWarning } from "process";
import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, "Username must be atleast 3 characters long."),
  email: z.string().email("Invalid email format."),
  password: z.string().min(6, "Password must be atlease 6 characters long."),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
