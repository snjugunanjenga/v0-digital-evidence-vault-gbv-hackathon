import { DashboardOverview } from "@/components/dashboard/overview";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { sessionClaims } = auth();

  // The session object can be passed to client components for use with next-auth providers
  const session = {
    user: {
      name: sessionClaims?.firstName,
      email: sessionClaims?.email,
      image: sessionClaims?.picture,
    },
    expires: new Date(sessionClaims?.exp as number * 1000).toISOString(),
  };

  return <DashboardOverview session={session} />;
}
