# Digital Evidence Vault

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

A secure, privacy-focused web application designed to help victims of Gender-Based Violence (GBV) safely store, manage, and verify digital evidence. This platform leverages local cryptographic hashing to ensure evidence integrity while maintaining user privacy.
vercel link - https://vercel.com/captain-byus-projects/v0-digital-evidence-vault

## 🚀 Overview

The **Digital Evidence Vault** serves as a secure repository where users can:
- **Upload Evidence**: Store photos, videos, audio, and documents.
- **Verify Integrity**: Automatically generate SHA-256 hashes locally to prove file authenticity without exposing the raw file content.
- **Manage Cases**: Organize evidence into specific cases (e.g., Domestic Violence, Harassment).
- **Simulate Blockchain Verification**: Experience a mocked integration with the Hedera blockchain for immutable timestamping.

## ✨ Key Features

- **🛡️ Privacy-First Architecture**: Files are processed locally in the browser. Only cryptographic hashes are sent to the server (simulated).
- **📂 Case Management**: Create and organize multiple cases with categories and descriptions.
- **📊 Interactive Dashboard**: Get a high-level view of your evidence, recent activities, and verification status.
- **⚡ Modern UI/UX**: Built with Radix UI and Tailwind CSS for a responsive, accessible, and beautiful interface.
- **🔒 Secure Verification**: Simulates blockchain-based evidence verification for legal admissibility.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React Hooks

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ installed
- npm or pnpm installed

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/digital-evidence-vault.git
    cd digital-evidence-vault
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    # or
    pnpm dev
    ```

4.  **Open the app**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── dashboard/        # Dashboard routes (cases, upload, etc.)
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
│   ├── dashboard/        # Dashboard-specific components
│   ├── landing/          # Landing page components
│   └── ui/               # Generic UI components (buttons, inputs, etc.)
├── lib/                  # Utility functions and types
└── public/               # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
