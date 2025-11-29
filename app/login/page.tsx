
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { Shield } from "lucide-react"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex">
      {/* Left Panel - Form */}
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

          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to access your secure evidence vault.</p>

          <LoginForm />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Create one now
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block lg:flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <img
          src="/silhouette-woman-strength-dark-background.jpg"
          alt="Strength and protection"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-end p-12">
          <div className="glass-card rounded-2xl p-6 max-w-md neon-border">
            <p className="text-foreground font-medium mb-2">
              "Having my evidence securely stored gave me the confidence to finally seek justice."
            </p>
            <p className="text-sm text-muted-foreground">— Survivor, Nairobi County</p>
          </div>
        </div>
      </div>
    </main>
  )
}
