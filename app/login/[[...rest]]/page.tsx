import { SignIn } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// This page component handles the login route and its sub-routes (catch-all).
// Clerk's SignIn component is configured to use this route as its base.
export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your digital evidence vault.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* 
            The 'path' prop tells Clerk the base URL for the sign-in flow. 
            Even though this file is in `login/[[...rest]]/page.tsx`,
            we set path to "/login" to ensure Clerk correctly handles routing.
          */}
          <SignIn path="/login" />
        </CardContent>
      </Card>
    </div>
  );
}
