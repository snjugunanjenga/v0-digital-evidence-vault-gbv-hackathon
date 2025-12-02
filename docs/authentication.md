# Clerk Authentication & CodeRabbit Review Guide

This document provides a comprehensive checklist for implementing and reviewing Clerk authentication in this Next.js application. It also includes specific instructions for CodeRabbit AI to ensure the authentication flow remains secure and robust.

## Clerk Implementation Checklist

### 1. Environment Configuration
- [ ] `CLERK_PUBLISHABLE_KEY` is present in `.env.local` and exposed to the client (prefixed with `NEXT_PUBLIC_`).
- [ ] `CLERK_SECRET_KEY` is present in `.env.local` and kept server-side ONLY.
- [ ] Environment variables are correctly loaded and accessible within the Next.js application.

### 2. Middleware Setup (`middleware.ts`)
- [ ] `clerkMiddleware` is imported from `@clerk/nextjs/server`.
- [ ] All sensitive, user-specific routes (e.g., `/dashboard`, `/dashboard/**`) are defined as protected routes.
- [ ] All public-facing routes (e.g., `/`, `/login`, `/signup`, `/api/webhooks/**`) are explicitly marked as public routes to prevent unintended redirects.
- [ ] The middleware configuration correctly exports the `config` object with a `matcher` if needed to include or exclude routes from processing.

### 3. Frontend Integration
- [ ] The root layout (`app/layout.tsx`) is wrapped in the `<ClerkProvider>` component.
- [ ] Custom sign-in (`/login`) and sign-up (`/signup`) pages are implemented using Clerk's `<SignIn />` and `<SignUp />` components. Redirection URLs (`afterSignInUrl`, `afterSignUpUrl`) are correctly set.
- [ ] The `<UserButton />` or a custom equivalent is implemented in the site header/navbar to provide access to user profile and session management. `afterSignOutUrl` should redirect to the homepage.
- [ ] UI components correctly use Clerk hooks (`useUser`, `useAuth`) to conditionally render content based on the user's authentication state (`isSignedIn`, `isLoaded`). Loading states are handled gracefully to prevent UI flickering.

### 4. Backend & Server-Side Logic
- [ ] All Server Actions and API routes that require authentication use the `auth()` helper from `@clerk/nextjs/server` to retrieve the `userId` and session state.
- [ ] Server-side logic performs authorization checks, ensuring the authenticated user has the necessary permissions to access or modify resources.
- [ ] For database operations, the `userId` from Clerk is used to scope queries, ensuring users can only access their own data.

### 5. Webhooks (Optional but Recommended)
- [ ] A webhook endpoint is created to listen for events from Clerk (e.g., `user.created`, `user.updated`).
- [ ] The webhook handler is secured using Clerk's `Webhook` utility to verify the signature of incoming requests.
- [ ] Logic is in place to synchronize user data from Clerk to the local application database (e.g., creating a new user record in the `User` table when a `user.created` event is received).

---

## Instructions for CodeRabbit AI Review

**Objective:** As an expert in Next.js and Clerk authentication, your primary task is to meticulously analyze the authentication flow. Your goal is to identify potential security vulnerabilities, implementation errors, and deviations from best practices that could compromise the application's integrity.

### **Primary Focus Areas:**

1.  **Security & Access Control:**
    *   **Middleware Enforcement:** Verify that the `authMiddleware` configuration correctly protects all intended routes. Probe for edge cases where a user might be able to access protected content without authenticating.
    *   **Server-Side Validation:** Scrutinize every Server Action and API route. Confirm that the `auth()` helper is called and the `userId` is checked *before* any data is fetched or mutated. There should be **no exceptions**.
    *   **Data Isolation:** Ensure that all database queries are strictly scoped by the `userId` obtained from the authenticated session. Confirm that there is no possibility for one user to access or modify another user's data.
    *   **Secret Exposure:** Scan the codebase to ensure that `CLERK_SECRET_KEY` or any other private credentials are never exposed on the client-side.

2.  **Correctness & Reliability:**
    *   **Provider Scoping:** Confirm that the `<ClerkProvider>` wraps the entire application at the root layout.
    *   **Component Usage:** Review the implementation of `<SignIn>`, `<SignUp>`, and `<UserButton>`. Check for correct configuration of properties, especially redirection URLs.
    *   **State Management:** Analyze the usage of `useUser` and `useAuth`. Ensure that loading states (`isLoaded`) are handled correctly to prevent flashes of unauthenticated content or premature rendering of user-specific UI.

3.  **Best Practices & Conventions:**
    *   **Idiomatic Code:** Ensure the implementation follows the official Clerk documentation and recommended patterns for the Next.js App Router.
    *   **Environment Variables:** Verify that environment variables are correctly prefixed (`NEXT_PUBLIC_`) for client-side exposure.
    *   **Error Handling:** Check for proper error handling in authentication-related logic, such as in webhook handlers or Server Actions.
