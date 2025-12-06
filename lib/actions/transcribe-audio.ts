'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

const TranscribeAudioSchema = z.object({
  evidenceId: z.string(),
  audioFileUrl: z.string().url(),
});

export async function transcribeAudio(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const validatedData = TranscribeAudioSchema.parse({
    evidenceId: formData.get('evidenceId'),
    audioFileUrl: formData.get('audioFileUrl'),
  });

  const { evidenceId, audioFileUrl } = validatedData;

  // Security check: Verify that the evidence belongs to the user
  const evidenceRecord = await prisma.evidence.findUnique({
    where: { id: evidenceId, userId },
  });

  if (!evidenceRecord) {
    throw new Error('Evidence not found or unauthorized access.');
  }

  // 1. Send audio to AssemblyAI for transcription
  let rawTranscript: string | null = null;
  try {
    const response = await axios.post(
      'https://api.assemblyai.com/v2/transcript',
      {
        audio_url: audioFileUrl,
        // Add other AssemblyAI options if needed, e.g., sentiment_analysis, summarization
      },
      {
        headers: {
          authorization: process.env.ASSEMBLYAI_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    const transcriptId = response.data.id;
    let pollingResponse = null;
    let attempts = 0;
    const maxAttempts = 20; // Poll for up to 10 minutes (30 seconds * 20 attempts)

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 30000)); // Poll every 30 seconds
      pollingResponse = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
        {
          headers: {
            authorization: process.env.ASSEMBLYAI_API_KEY,
          },
        }
      );

      if (pollingResponse.data.status === 'completed') {
        rawTranscript = pollingResponse.data.text;
        break;
      } else if (pollingResponse.data.status === 'failed') {
        throw new Error(`AssemblyAI transcription failed: ${pollingResponse.data.error}`);
      }
      attempts++;
    }

    if (!rawTranscript) {
      throw new Error('AssemblyAI transcription timed out or did not complete.');
    }

  } catch (error) {
    console.error("Error during AssemblyAI transcription:", error);
    throw new Error('Failed to transcribe audio. Please check AssemblyAI API key and audio URL.');
  }

  // 2. Summarize rawTranscript using Gemini (Placeholder for future implementation)
  let userApprovedSummary: string | null = null;
  if (rawTranscript) {
    // TODO: Integrate Gemini API call here to summarize the rawTranscript
    // For now, a simple placeholder or initial summary based on raw transcript
    userApprovedSummary = rawTranscript.substring(0, Math.min(rawTranscript.length, 500)) + (rawTranscript.length > 500 ? '...' : '');
  }

  // 3. Store the transcription and summary in TestimonyRecord
  try {
    await prisma.testimonyRecord.upsert({
      where: { evidenceId },
      update: {
        audioFileUrl,
        rawTranscript,
        userApprovedSummary,
        updatedAt: new Date(),
      },
      create: {
        evidenceId,
        audioFileUrl,
        rawTranscript,
        userApprovedSummary,
      },
    });
  } catch (error) {
    console.error("Database error storing testimony record:", error);
    throw new Error('Failed to store testimony record in the database.');
  }

  revalidatePath(`/dashboard/evidence/${evidenceId}`); // Revalidate path for evidence detail or affidavit page
  // Optionally redirect to a review page
  // redirect(`/dashboard/affidavits/${evidenceId}/review`);
}
