'use server';

import { StreamChat } from 'stream-chat';
import { auth } from '@clerk/nextjs/server'; // Assuming Clerk integration

const STREAM_API_KEY = process.env.STREAM_API_KEY!;
const STREAM_SECRET = process.env.STREAM_SECRECT!;

const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_SECRET);

export async function generateStreamToken() {
  const { userId } = auth();

  if (!userId) {
    throw new Error('User not authenticated');
  }

  // In a real application, you would fetch more user details from your database
  // and pass them to Stream, e.g., name, image.
  // For now, we'll use a placeholder.
  const user = {
    id: userId,
    name: userId, // Using userId as a placeholder name
    image: `https://getstream.io/random_png/?id=${userId}&name=${userId}`,
  };

  const token = serverClient.createToken(userId);

  return { token, user };
}
