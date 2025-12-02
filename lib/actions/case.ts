'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const caseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  description: z.string().optional(),
});

export async function createCase(formData: FormData) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('You must be logged in to create a case.');
  }

  const validatedFields = caseSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    // Handle validation errors - for now, we'll just throw an error
    throw new Error(validatedFields.error.flatten().fieldErrors.title?.[0] || 'Invalid input.');
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
    // Handle potential database errors
    throw new Error('Failed to create case in the database.');
  }

  // Revalidate the dashboard path to show the new case
  revalidatePath('/dashboard');

  // Redirect the user back to the dashboard
  redirect('/dashboard');
}
