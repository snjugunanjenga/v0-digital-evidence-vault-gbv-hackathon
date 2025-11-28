import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink, Building2, Scale, Heart, Shield } from "lucide-react"

const partners = [
  {
    name: "FIDA Kenya",
    type: "Legal Aid",
    description: "Federation of Women Lawyers providing free legal services to women in Kenya.",
    icon: Scale,
  },
  {
    name: "Coalition on Violence Against Women",
    type: "Advocacy",
    description: "Leading organization working to end violence against women in Kenya.",
    icon: Heart,
  },
  {
    name: "Gender Violence Recovery Centre",
    type: "Healthcare",
    description: "Providing medical care and psychosocial support to GBV survivors.",
    icon: Building2,
  },
  {
    name: "Kenya National Commission on Human Rights",
    type: "Government",
    description: "Government body promoting and protecting human rights in Kenya.",
    icon: Shield,
  },
  {
    name: "CREAW",
    type: "Legal Aid",
    description: "Centre for Rights Education and Awareness providing legal support.",
    icon: Scale,
  },
  {
    name: "Wangu Kanja Foundation",
    type: "Survivor Support",
    description: "Survivor-led organization supporting GBV survivors in Kenya.",
    icon: Heart,
  },
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Our Partners</h1>
            <p className="text-muted-foreground">
              We work with leading organizations across Kenya to support survivors of gender-based violence.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {partners.map((partner, i) => (
              <Card key={i} className="glass-card hover:neon-border transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <partner.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                        {partner.type}
                      </span>
                      <h3 className="font-semibold text-foreground mt-2">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Become Partner */}
          <div className="max-w-2xl mx-auto text-center glass-card neon-border rounded-2xl p-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Become a Partner</h2>
            <p className="text-muted-foreground mb-6">
              Are you an organization working to support GBV survivors? Partner with us to provide your clients with
              secure evidence preservation tools.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/contact">
                Contact Us <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
