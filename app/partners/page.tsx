"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

// Assuming partners data is imported from lib/partners.ts
import { partners } from "@/lib/partners";

export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our Global <span className="text-primary neon-text">Partners</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We collaborate with a network of dedicated organizations worldwide, committed to supporting survivors of gender-based violence. Engage directly with our partners for advice and support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {partners.map((partner) => (
          <Card key={partner.name} className="glass-card p-6 border-border hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex-row items-center gap-4 p-0 mb-4">
              {/* Placeholder for Logo/Icon */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">{partner.name}</CardTitle>\n      
                <CardDescription className="text-sm text-muted-foreground">
                  {partner.website.replace(/(https?:\/\/)/, '')}
                </CardDescription>              </div>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground mb-4 line-clamp-3">{partner.description}</p>
              <div className="flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link href={partner.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full neon-border bg-transparent hover:bg-primary/10">
                  <Link href="#" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Chat for Advice
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">Become a Partner</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          If your institution or organization is committed to supporting survivors of GBV, we invite you to join our growing network. Partner with us to make a greater impact.
        </p>
        <Button asChild size="lg" className="neon-border bg-primary/10 hover:bg-primary/20 text-primary">
          <Link href="/onboarding/partner">
            Partner Onboarding
          </Link>
        </Button>
      </div>
    </div>
  );
}