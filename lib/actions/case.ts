'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { CaseCategory, CaseStatus } from '@/lib/types';

// Define the schema for the case form using Zod
const CaseSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  description: z.string().nullable().optional(),
  category: z.nativeEnum(CaseCategory, { invalid_type_error: "Invalid case category" }),
  status: z.nativeEnum(CaseStatus).default(CaseStatus.Active), // Assuming default status
});

export async function createCase(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const validatedFields = CaseSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    status: CaseStatus.Active, // Set default status for validation
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    // In a real app, you'd return these errors to the form to display to the user.
    console.error("Case creation validation errors:", fieldErrors);
    throw new Error('Invalid form data.');
  }

  const { title, description, category } = validatedFields.data;

  try {
    const newCase = await prisma.case.create({
      data: {
        userId,
        title,
        description,
        category,
        status: CaseStatus.Active, // Default to active
      },
    });
    revalidatePath('/dashboard'); // Revalidate dashboard to show new case in overview
    revalidatePath('/dashboard/cases'); // Revalidate cases page
    return newCase;
  } catch (error) {
    console.error("Database error creating case:", error);
    throw new Error('Failed to create the case.');
  }
}

export async function getCases() {
  const { userId } = auth();

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
  const { userId } = auth();

  if (!userId) {
    redirect('/signin');
  }

  try {
    const caseItem = await prisma.case.findUnique({
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
