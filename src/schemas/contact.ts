import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name needs at least 2 characters.")
    .max(100, "Name must be under 100 characters."),
  email: z
    .string()
    .email("Enter a valid email address.")
    .max(100, "Email must be under 100 characters."),
  message: z
    .string()
    .min(10, "Message needs at least 10 characters.")
    .max(1000, "Message must be under 1000 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
