# Clerk Authentication Cheat Sheet for Next.js

A concise guide for integrating `@clerk/nextjs` using the latest patterns.

**Reference:** [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)

## 1. Environment Variables
Create a `.env.local` file and add the following keys from your Clerk dashboard:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## 2. Root Layout (`app/layout.tsx`)
Wrap the entire application with the `ClerkProvider` to manage the active session.

```tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: { 
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

## 3. clerkMiddleware() (`proxy.ts`)
Create a `proxy.ts` file in the project's root to protect your application. This uses the **new** `clerkMiddleware`, not the deprecated `authMiddleware`.

The matcher pattern below protects all routes, including API and TRPC routes, while making marketing/public pages accessible.

```typescript
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
```
