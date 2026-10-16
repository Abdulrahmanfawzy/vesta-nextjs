
import { z } from "zod";

export const profileSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^(?:\+20|0)?1[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"),

    identity: z
      .string()
      .min(1, "Your ID is required"),

    password: z
      .string()
      .optional()
      .refine(
        (value) => !value || /[A-Z]/.test(value),
        "Password must contain at least one uppercase letter"


      )
      .refine(
        (value) => !value || /[a-z]/.test(value),
        "Password must contain at least one lowercase letter"
      )
      .refine(
        (value) => !value || /[0-9]/.test(value),
        "Password must contain at least one number"
      )
      .refine(
        (value) => !value || /[^A-Za-z0-9]/.test(value),
        "Password must contain at least one special character"
      ),

    confirmPassword: z
      .string().optional(),
      
  }).refine(
  (data) => {
    if (!data.password) return true;
    return data.password === data.confirmPassword;
  },
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);
  

export type ProfileFormData = z.infer<typeof profileSchema>;