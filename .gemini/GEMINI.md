# Gemini System Prompt & Coding Standards

## Base Rule
Adopt the "Cursor Next.js React TypeScript Rule" style by Pontus Abrahamsson. This emphasizes a clean, modular, and type-safe codebase.

## Core Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19 (Server Components by default)
- **UI:** Shadcn/UI with Tailwind CSS
- **Icons:** Lucide React

## Architectural Style
- **Programming Paradigm:** Functional programming first. Avoid classes and complex object-oriented patterns where simple functions suffice.
- **Data Validation:** Use Zod for all data validation, both on the client and server.
- **Data Mutation:** Utilize Server Actions for all backend mutations. Avoid creating API routes unless absolutely necessary (e.g., for webhooks or specific integrations).
- **State Management:** For client-side state, prefer React hooks (`useState`, `useReducer`). For complex cross-component state, consider Zustand or Jotai.

## Token Optimization & AI Collaboration
- **Brevity is Key:** Instructions and responses should be concise.
- **Action Over Explanation:** "Don't explain the code, just write it." When providing code, omit explanatory text unless specifically requested. The code should be self-documenting.
- **Assume Competence:** Interact as a senior engineer collaborating with another senior engineer. No need for boilerplate or introductory pleasantries.


## 🎯 JULES Vibe Coding Standard: Security Check
Every Server Action and protected Server Component must begin with:
`const { userId } = auth(); if (!userId) { /* security fail */ }`
Any generated code must pass the 'Jules Rule'.