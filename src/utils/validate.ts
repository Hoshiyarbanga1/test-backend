import { z } from "zod";

export const signupSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  dob: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Invalid DOB",
  }),
  email: z.string().email("Invalid email"),
  mobile: z.string().min(10, "Invalid mobile number"),
  gender: z.enum(["male", "female", "other"]),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

export type SignupInput = z.infer<typeof signupSchema>;
