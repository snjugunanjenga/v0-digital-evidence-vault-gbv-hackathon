"use server"

import { AuthError } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Import authOptions
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const SignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must contain a number")
    .regex(/[A-Z]/, "Password must contain an uppercase letter"),
});

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function auth() {
  const session = await getServerSession(authOptions);
  return { session, user: session?.user };
}

export async function signup(formData: unknown) {
  const validatedFields = SignupSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { error: "User already exists" };
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return { success: "User created successfully" }
  } catch (error) {
    if (error instanceof AuthError) {
      throw error // Rethrow AuthError
    }
    if (error instanceof Error) {
      console.error('Signup error:', error)
    }
    return { error: "An unexpected error occurred" }
  }
}