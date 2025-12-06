'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

// Define the schema for the case form using Zod
const CaseSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  description: z.string().nullable().optional(),
});

export async function createCase(formData: FormData) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const validatedFields = CaseSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    // Removed category and status as they are not part of the Case model
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    // In a real app, you'd return these errors to the form to display to the user.
    console.error("Case creation validation errors:", fieldErrors);
    throw new Error('Invalid form data.');
  }

  const { title, description } = validatedFields.data;

  try {
    // Ensure the user exists in the database (upsert to avoid FK constraint violation)
    // Clerk userId is stored as the id, and we use email from session claims
    const userEmail = (sessionClaims?.email as string) || `user-${userId}@clerk.local`;
    
    await prisma.user.upsert({
      where: { id: userId },
      update: {}, // No updates needed if user already exists
      create: {
        id: userId,
        email: userEmail,
      },
    });

    const newCase = await prisma.case.create({
      data: {
        userId,
        title,
        description,
      },
    });
    revalidatePath('/dashboard'); // Revalidate dashboard to show new case in overview
    revalidatePath('/dashboard/cases'); // Revalidate cases page
    // return newCase; // Removed return statement to satisfy server action type
  } catch (error) {
    console.error("Database error creating case:", error instanceof Error ? error.message : error);
    // Surface the original error message to help debugging in dev (still throw a friendly error)
    throw new Error(`Failed to create the case. ${error instanceof Error ? error.message : ''}`);
  }
}

export async function getCases() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/signin'); // Redirect to login if unauthorized
  }

  try {
    const cases = await prisma.case.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { evidence: true },
        },
      },
    });
    return cases;
  } catch (error) {
    console.error("Database error fetching cases:", error);
    throw new Error('Failed to fetch cases.');
  }
}

export async function getCaseById(caseId: string) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/signin');
  }

  try {
    const caseItem = await prisma.case.findFirst({
      where: { id: caseId, userId },
      include: {
        evidence: {
          orderBy: { uploadDate: 'desc' },
        },
      },
    });

    if (!caseItem) {
      throw new Error('Case not found or unauthorized access.');
    }

    return caseItem;
  } catch (error) {
    console.error("Database error fetching case by ID:", error);
    throw new Error('Failed to fetch case details.');
  }
}
