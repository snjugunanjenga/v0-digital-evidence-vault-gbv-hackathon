# Project Summary

This document provides a summary of the project, including its directory structure, dependencies, and overall architecture.

## Directory Structure

```
/workspaces/v0-digital-evidence-vault-gbv-hackathon/
├───.env.example
├───.gitignore
├───components.json
├───next-env.d.ts
├───next.config.mjs
├───package.json
├───postcss.config.mjs
├───PRD.md
├───PROJECT_SUMMARY.md
├───prompts.md
├───proxy.ts
├───README.md
├───tsconfig.json
├───.gemini/
│   ├───clerkrules.md
│   ├───GEMINI.md
│   ├───hederaRules.md
│   ├───neonRules.md
│   ├───nextjsRules.md
│   └───prismaRules.md
├───app/
│   ├───globals.css
│   ├───layout.tsx
│   ├───page.tsx
│   ├───about/
│   │   └───page.tsx
│   ├───auth/
│   │   └───page.tsx
│   ├───contact/
│   │   └───page.tsx
│   ├───dashboard/
│   │   ├───layout.tsx
│   │   ├───page.tsx
│   │   ├───cases/
│   │   │   ├───page.tsx
│   │   │   ├───[id]/
│   │   │   │   └───page.tsx
│   │   │   └───new/
│   │   │       └───page.tsx
│   │   ├───evidence/
│   │   │   └───[id]/
│   │   │       └───page.tsx
│   │   ├───search/
│   │   │   └───page.tsx
│   │   ├───settings/
│   │   │   └───page.tsx
│   │   └───upload/
│   │       └───page.tsx
│   ├───help/
│   │   └───page.tsx
│   ├───legal-guide/
│   │   └───page.tsx
│   ├───login/
│   │   └───page.tsx
│   ├───partners/
│   │   └───page.tsx
│   ├───privacy/
│   │   └───page.tsx
│   ├───security/
│   │   └───page.tsx
│   ├───signup/
│   │   └───page.tsx
│   └───terms/
│       └───page.tsx
├───components/
│   ├───theme-provider.tsx
│   ├───contact/
│   │   ├───contact-form.tsx
│   │   ├───emergency-resources.tsx
│   │   └───partner-organizations.tsx
│   ├───dashboard/
│   │   ├───case-card.tsx
│   │   ├───case-detail-page.tsx
│   │   ├───cases-page.tsx
│   │   ├───evidence-card.tsx
│   │   ├───evidence-search-page.tsx
│   │   ├───evidence-upload-page.tsx
│   │   ├───export-evidence-button.tsx
│   │   ├───export-single-evidence-button.tsx
│   │   ├───header.tsx
│   │   ├───overview.tsx
│   │   ├───settings-page.tsx
│   │   └───sidebar.tsx
│   ├───landing/
│   │   ├───features-section.tsx
│   │   ├───footer.tsx
│   │   ├───hero-section.tsx
│   │   ├───how-it-works-section.tsx
│   │   ├───impact-section.tsx
│   │   ├───navbar.tsx
│   │   └───testimonials-section.tsx
│   └───ui/
│       ├───accordion.tsx
│       ├───badge.tsx
│       ├───button.tsx
│       ├───card.tsx
│       ├───checkbox.tsx
│       ├───dialog.tsx
│       ├───dropdown-menu.tsx
│       ├───input.tsx
│       ├───label.tsx
│       ├───progress.tsx
│       ├───select.tsx
│       ├───sheet.tsx
│       ├───switch.tsx
│       ├───tabs.tsx
│       └───textarea.tsx
├───lib/
│   ├───prisma.ts
│   ├───types.ts
│   ├───utils.ts
│   └───actions/
│       ├───case.ts
│       └───evidence.ts
├───prisma/
│   ├───prisma.config.ts
│   └───schema.prisma
├───public/
│   ├───apple-icon.png
│   ├───blockchain-network-visualization-with-timestamp-da.jpg
│   ├───digital-fingerprint-hash-visualization-cybersecuri.jpg
│   ├───icon-dark-32x32.png
│   ├───icon-light-32x32.png
│   ├───icon.svg
│   ├───kenya-map-with-glowing-dots-showing-coverage-dark-.jpg
│   ├───placeholder-logo.png
│   ├───placeholder-logo.svg
│   ├───placeholder-user.jpg
│   ├───placeholder.jpg
│   ├───placeholder.svg
│   ├───professional-woman-silhouette-lawyer-dark-backgrou.jpg
│   ├───silhouette-woman-portrait-hope-dark-background.jpg
│   ├───silhouette-woman-strength-dark-background.jpg
│   ├───woman-selecting-files-on-phone-dark-interface-with.jpg
│   ├───woman-using-secure-digital-vault-app-on-laptop-wit.jpg
│   └───images/
│       ├───gemini-generated-image-g1db6sg1db6sg1db.jpeg
│       ├───gemini-generated-image-u9b4gku9b4gku9b4.jpeg
│       ├───image.png
│       └───injured-20and-20vulnerable-20in-20hospital-20bed.png
└───styles/
    └───globals.css
```

### File Descriptions

*   **.env.example**: Example environment variables.
*   **.gitignore**: Files and directories to be ignored by Git.
*   **components.json**: Configuration for UI components.
*   **next-env.d.ts**: TypeScript declaration file for Next.js.
*   **next.config.mjs**: Configuration file for Next.js.
*   **package.json**: Project dependencies and scripts.
*   **postcss.config.mjs**: Configuration for PostCSS.
*   **PRD.md**: Product Requirements Document.
*   **PROJECT_SUMMARY.md**: This file.
*   **prompts.md**: Prompts for AI models.
*   **proxy.ts**: Proxy server configuration.
*   **README.md**: Project README file.
*   **tsconfig.json**: TypeScript configuration file.
*   **.gemini/**: Gemini-related configuration and rules.
*   **app/**: Main application directory, following the Next.js App Router structure.
    *   **globals.css**: Global CSS styles.
    *   **layout.tsx**: Root layout for the application.
    *   **page.tsx**: Main landing page.
    *   **[folder]/**: Subdirectories for different pages/routes.
*   **components/**: Reusable React components.
    *   **ui/**: Basic UI components (e.g., Button, Card).
*   **lib/**: Utility functions and libraries.
    *   **actions/**: Server-side actions.
*   **prisma/**: Prisma schema and configuration for database access.
*   **public/**: Static assets (images, fonts, etc.).
*   **styles/**: CSS styles.

## Dependencies and Purposes

*   **@clerk/nextjs**: User authentication, management, and subscription billing.
*   **@hashgraph/sdk**: The official SDK for interacting with the Hedera network, used for submitting evidence hashes to the Hedera Consensus Service (HCS).
*   **@prisma/client**: Prisma client for database access.
*   **@radix-ui/react-***: UI components for building accessible and customizable UIs.
*   **next**: The React framework for building server-side rendered and static websites.
*   **react**: A JavaScript library for building user interfaces.
*   **stripe**: (Implicitly via Clerk Billing) For processing subscription payments.
*   **tailwindcss**: A utility-first CSS framework for rapid UI development.
*   **zod**: A TypeScript-first schema declaration and validation library.

## Overall Architecture Pattern

This project follows a modern web application architecture based on the **Next.js App Router**.

*   **Frontend**: The frontend is built with **React** and **TypeScript**, using components from **Shadcn/UI** and styled with **Tailwind CSS**. The application is structured using the Next.js App Router, which allows for a file-based routing system and server-side rendering by default.
*   **Backend**: The backend is built with **Next.js API Routes** and **Server Actions**. **Clerk** is used for user authentication.
*   **Database**: The application uses a **PostgreSQL** database, with **Prisma** as the Object-Relational Mapper (ORM) for database access.
*   **Blockchain & Timestamping**: **Hedera Consensus Service (HCS)** is integrated via the `@hashgraph/sdk` to provide immutable, verifiable timestamps for evidence hashes. This adds a decentralized layer of trust and legal admissibility.
*   **Monetization**: The application is structured as a SaaS product with tiered subscription plans. **Clerk Billing** is used to manage these plans and integrate with **Stripe** for secure payment processing. This model supports the ongoing operational costs of the Hedera service.
*   **Styling**: **Tailwind CSS** is used for styling, with **PostCSS** for processing CSS.
*   **Tooling**: The project uses **pnpm** as the package manager, **ESLint** for linting, and **TypeScript** for static typing.
