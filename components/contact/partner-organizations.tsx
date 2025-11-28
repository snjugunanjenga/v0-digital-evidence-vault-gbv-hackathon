import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

const partners = [
  {
    name: "FIDA Kenya",
    description: "Federation of Women Lawyers providing free legal aid",
    website: "https://fidakenya.org",
  },
  {
    name: "Gender Violence Recovery Centre",
    description: "Medical and psychosocial support at Nairobi Women's Hospital",
    website: "https://gfrck.com",
  },
  {
    name: "CREAW",
    description: "Centre for Rights Education and Awareness",
    website: "https://creaw.org",
  },
  {
    name: "Ujamaa Africa",
    description: "Self-defense and empowerment training for women",
    website: "https://ujamaa-africa.org",
  },
  {
    name: "COVAW",
    description: "Coalition on Violence Against Women Kenya",
    website: "https://covaw.or.ke",
  },
  {
    name: "Wangu Kanja Foundation",
    description: "Advocacy and support for sexual violence survivors",
    website: "https://wangukanjafoundation.org",
  },
]

export function PartnerOrganizations() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Partner <span className="text-primary neon-text">Organizations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We work with trusted organizations across Kenya to provide comprehensive support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <Card key={index} className="glass-card hover:neon-border transition-all group">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {partner.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{partner.description}</p>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  Visit Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
