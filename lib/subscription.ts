import { auth, clerkClient } from "@clerk/nextjs/server";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { orgId } = await auth(); // Await auth() to get orgId

  if (!orgId) {
    return false;
  }

  const org = await clerkClient.organizations.getOrganization({ organizationId: orgId }); // Correct property name

  if (!org) {
    return false;
  }

  const subscription = org.publicMetadata?.["subscription"];

  if (!subscription || typeof subscription !== "object" || subscription === null) {
    return false;
  }
  
  const { plan, endDate } = subscription as { plan?: string; endDate?: number };


  if (!plan || !endDate) {
    return false;
  }

  const isActive =
    plan && endDate ? Date.now() < new Date(endDate).getTime() + DAY_IN_MS : false;

  return {isActive, plan};
};