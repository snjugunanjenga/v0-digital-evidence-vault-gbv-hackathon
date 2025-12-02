import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/evidence(.*)',
]);

export default clerkMiddleware({
  // Define public routes explicitly.
  // Clerk automatically protects any routes not listed here.
  publicRoutes: ['/', '/login(.*)', '/signup(.*)', '/about', '/contact', '/help', '/legal-guide', '/partners', '/privacy', '/security', '/terms'],
  // Optionally ignore routes from Clerk processing, e.g., for static assets.
  ignoredRoutes: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv?|docx?|xlsx?|zip|webmanifest)).*)', '/api/webhooks(.*)'],
});

export const config = {
  matcher: [
    // Match all routes except static files and _next internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv?|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

