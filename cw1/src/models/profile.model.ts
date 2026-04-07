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

export const degreeSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
  }),
});

export const updateDegreeSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  }),
});

export const employmentSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
  }),
});

export const updateEmploymentSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  }),
});

export const certificationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    untilValide: z.coerce.date().optional(),
  }),
});

export const updateCertificationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    untilValide: z.coerce.date().optional(),
  }),
});

export const licenseSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    untilValide: z.coerce.date().optional(),
  }),
});

export const updateLicenseSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    untilValide: z.coerce.date().optional(),
  }),
});

export type CreateProfileDTO = z.infer<typeof createProfileSchema>["body"];
export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>["body"];
export type DegreeDTO = z.infer<typeof degreeSchema>["body"];
export type EmploymentDTO = z.infer<typeof employmentSchema>["body"];
export type CertificationDTO = z.infer<typeof certificationSchema>["body"];
export type LicenseDTO = z.infer<typeof licenseSchema>["body"];
