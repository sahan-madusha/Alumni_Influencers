import { z } from "zod";

export const createProfileSchema = z.object({
    body: z.object({
        userId: z.string(),
        name: z.string(),
    }),
});

export type CreateProfileDTO = z.infer<typeof createProfileSchema>["body"];