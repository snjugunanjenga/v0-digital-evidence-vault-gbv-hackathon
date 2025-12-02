'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

const CaseSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().optional(),
});

export async function createCase(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('You must be logged in to create a case.');
  }

  const validatedFields = CaseSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    // Handle validation errors
    // For now, we'll just throw an error
    throw new Error('Invalid form data.');
  }

  const { title, description } = validatedFields.data;

  try {
    await prisma.case.create({
      data: {
        userId,
        title,
        description,
      },
    });
  } catch (error) {
    // Handle database errors
    throw new Error('Failed to create case.');
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}