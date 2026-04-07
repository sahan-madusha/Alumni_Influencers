import { z } from "zod";

export const createProfileSchema = z.object({
  body: z.object({
    userId: z.string().uuid({ message: "Invalid user ID format" }),
    name: z.string().min(1, { message: "First name is required" }),
  }),
});


const trimUrlSchema = z
  .string()
  .url("Invalid URL format")
  .refine(
    (val) => !val || val.startsWith("http://") || val.startsWith("https://"),
    { message: "Only HTTP and HTTPS URLs are allowed for security" }
  )
  .optional()
  .or(z.literal(""));

export const updateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, "First name must be at least 1 character long").optional(),
    lastName: z.string().optional(),
    bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    position: z.string().optional(),
    linkedin: trimUrlSchema,
    twitter: trimUrlSchema,
    github: trimUrlSchema,
    profilePicture: trimUrlSchema,
  }),
});

export type CreateProfileDTO = z.infer<typeof createProfileSchema>["body"];
export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>["body"];