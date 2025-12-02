import { SignUp } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// This page component handles the signup route and its sub-routes (catch-all).
// Clerk's SignUp component is configured to use this route as its base.
export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
          <CardDescription>Join us to securely store and manage your digital evidence.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* 
            The 'path' prop tells Clerk the base URL for the sign-up flow. 
            Even though this file is in `signup/[[...rest]]/page.tsx`,
            we set path to "/signup" to ensure Clerk correctly handles routing.
          */}
          <SignUp path="/signup" afterSignUpUrl="/dashboard" />
        </CardContent>
      </Card>
    </div>
  );
}
