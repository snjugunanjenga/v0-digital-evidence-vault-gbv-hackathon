// examples/auth-usage.tsx

import { auth, currentUser } from "@clerk/nextjs/server";

// This is a React Server Component (RSC), the default in Next.js App Router.
// It can directly access server-side resources and perform async operations.

export default async function AuthUsageExample() {
  // The `auth()` helper provides access to the session claims.
  // It will throw an error if the user is not authenticated, which can be
  // caught by a parent Error Boundary or middleware.
  // If the page is public, you might handle this differently.
  const { userId, sessionClaims } = await auth();

  // The `currentUser()` helper fetches the full user object from Clerk's API.
  // This is useful for accessing user profile information like name, email, or profile image.
  const user = await currentUser();

  return (
    <div className="p-8 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Clerk Auth Example (Server Component)</h1>
      
      <div className="space-y-2">
        <p>
          Welcome,{' '}
          <span className="font-semibold">
            {user?.firstName || user?.emailAddresses[0]?.emailAddress || 'User'}
          </span>
          !
        </p>
        
        <p>
          Your User ID is: <code className="bg-gray-200 p-1 rounded">{userId}</code>
        </p>

        <div>
          <h2 className="text-lg font-semibold mt-4">Session Claims:</h2>
          <pre className="mt-2 p-4 bg-black text-white rounded text-sm overflow-auto">
            {JSON.stringify(sessionClaims, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold mt-4">Full User Object:</h2>
          <pre className="mt-2 p-4 bg-black text-white rounded text-sm overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
