'use server';

import { auth } from '@clerk/nextjs/server';
import { absoluteUrl } from '@/lib/utils';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

const billingUrl = absoluteUrl("/dashboard/settings/billing");

export async function createBillingSession() {
  const { userId, user } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  // Check if user has a Stripe Customer ID
  const prismaUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { stripeCustomerId: true },
  });

  if (!prismaUser) {
    throw new Error('User not found in database.');
  }

  // If user has a Stripe Customer ID, create a customer portal session
  if (prismaUser.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: prismaUser.stripeCustomerId,
      return_url: billingUrl,
    });
    redirect(stripeSession.url);
  }

  // If user does not have a Stripe Customer ID, create a new customer and a checkout session
  // For simplicity, we are assuming a basic subscription plan. In a real app, you'd manage products/prices.
  const stripeCustomer = await stripe.customers.create({
    email: user?.emailAddresses?.[0]?.emailAddress,
    metadata: { userId: userId },
  });

  // Update Prisma user with Stripe Customer ID
  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: stripeCustomer.id },
  });

  // Create a checkout session (example for a basic plan)
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomer.id,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "kes", // Kenyan Shillings
          product_data: {
            name: "Pro Plan",
            description: "Pro Plan for Digital Evidence Vault",
          },
          unit_amount: 100000, // KES 1,000.00 (in cents)
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    success_url: billingUrl + "?success=true",
    cancel_url: billingUrl + "?cancelled=true",
  });

  if (!checkoutSession.url) {
    throw new Error("Failed to create Stripe checkout session.");
  }

  redirect(checkoutSession.url);
}
