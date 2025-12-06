
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function PartnerOnboardingPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
      <Card className="w-full max-w-lg glass-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Partner Onboarding</CardTitle>
          <CardDescription>Join our network to support survivors and access resources.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="organizationName">Organization Name</Label>
            <Input id="organizationName" placeholder="Your Organization's Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person Name</Label>
            <Input id="contactPerson" placeholder="Full Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input id="contactEmail" type="email" placeholder="email@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input id="contactPhone" type="tel" placeholder="+XXX XXXXXXXXX" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organizationType">Type of Organization</Label>
            <Input id="organizationType" placeholder="e.g., NGO, Legal Firm, HR Department" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mission">Organization Mission/Description</Label>
            <Textarea
              id="mission"
              placeholder="Briefly describe your organization's mission and how you support GBV survivors."
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Submit Application
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
