import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { signupSchema } from "../../utils/validate";

export const signup = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        status: false,
        message: "Validation failed"
      });
    }

    const data = parsed.data;

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Save user in DB here (for now return success response)
    const user = {
      ...data,
      password: hashedPassword,
    };

    return res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: user, // remove password in production response
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
