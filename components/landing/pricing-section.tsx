
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Free",
    price: "KES 0",
    features: [
      "5 Hedera timestamps per month",
      "Secure client-side hashing",
      "Downloadable evidence reports",
      "Community support",
    ],
    cta: "Get Started for Free",
    href: "/signup",
  },
  {
    name: "Pro",
    price: "KES 1,000",
    features: [
      "50 Hedera timestamps per month",
      "All features from Free tier",
      "Priority email support",
      "Early access to new features",
    ],
    cta: "Upgrade to Pro",
    href: "/signup",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    features: [
      "Unlimited Hedera timestamps",
      "Dedicated support and SLAs",
      "Custom integrations",
      "On-premise deployment options",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Affordable, Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-8 rounded-lg border ${
                tier.featured ? "border-primary neon-border" : "border-border"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">{tier.name}</h3>
              <p className="text-4xl font-bold mb-6">{tier.price}</p>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`w-full ${
                  tier.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                }`}
              >
                <a href={tier.href}>{tier.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
