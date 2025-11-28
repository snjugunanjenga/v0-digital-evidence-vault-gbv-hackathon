import { Card, CardContent } from "@/components/ui/card"
import { Phone, Shield, Heart, Scale } from "lucide-react"

const resources = [
  {
    icon: Phone,
    title: "National GBV Hotline",
    number: "1195",
    description: "Free 24/7 helpline for survivors of gender-based violence",
    available: "24/7",
  },
  {
    icon: Shield,
    title: "Kenya Police",
    number: "999 / 112",
    description: "Emergency response for immediate threats to safety",
    available: "24/7",
  },
  {
    icon: Heart,
    title: "FIDA Kenya",
    number: "+254 722 509 760",
    description: "Free legal aid and support for women",
    available: "Mon-Fri 8AM-5PM",
  },
  {
    icon: Scale,
    title: "Coalition on Violence Against Women",
    number: "+254 20 273 5900",
    description: "Counseling, shelter, and legal support",
    available: "Mon-Fri 8AM-5PM",
  },
]

export function EmergencyResources() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent via-destructive/5 to-transparent">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Emergency <span className="text-destructive">Resources</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            If you or someone you know needs immediate help, these resources are available.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="glass-card hover:neon-border transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                  <resource.icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{resource.title}</h3>
                <p className="text-2xl font-bold text-primary mb-2">{resource.number}</p>
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">{resource.available}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
