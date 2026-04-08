import { z } from "zod";
import { validateEmail } from "../utils";

export const registerUserSchema = z.object({
  body: z.object({
    email: z.string().email().refine(validateEmail, {
      message: "Only IIT emails are allowed",
    }),
    password: z.string().min(6),
    name: z.string(),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const verifyEmailSchema = z.object({
  body: z.object({
    id: z.string().uuid(),
    token: z.string(),
  }),
});

export const requestPasswordResetSchema = z.object({
  body: z.object({
    email: z.string().email().refine(validateEmail, {
      message: "Only IIT emails are allowed",
    }),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    id: z.string().uuid(),
    token: z.string(),
    password: z.string().min(6),
  }),
});

export type CreateUserDTO = z.infer<typeof registerUserSchema>["body"];
export type LoginDTO = z.infer<typeof loginUserSchema>["body"];
export type VerifyEmailDTO = z.infer<typeof verifyEmailSchema>["body"];
export type RequestPasswordResetDTO = z.infer<typeof requestPasswordResetSchema>["body"];
export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>["body"];

export interface UserDTO {
  id: string | number;
  email: string;
  name?: string | null;
  status: string;
  createdAt: Date;
}

export interface LoginResponseDTO {
  user: UserDTO;
  token: string;
}
