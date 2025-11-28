import Link from "next/link"
import { SignupForm } from "@/components/auth/signup-form"
import { Shield } from "lucide-react"

export default function SignupPage() {
  return (
    <main className="min-h-screen flex">
      {/* Left Panel - Image */}
      <div className="hidden lg:block lg:flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background to-primary/20" />
        <img
          src="/silhouette-woman-portrait-hope-dark-background.jpg"
          alt="Hope and empowerment"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-end p-12">
          <div className="glass-card rounded-2xl p-6 max-w-md neon-border">
            <p className="text-foreground font-medium mb-2">
              "Your files never leave your device. Only cryptographic proof is stored."
            </p>
            <p className="text-sm text-muted-foreground">— Complete Privacy Guaranteed</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">
              GBV <span className="text-primary neon-text">Vault</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">Create your vault</h1>
          <p className="text-muted-foreground mb-8">Start preserving your evidence securely and privately.</p>

          <SignupForm />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
