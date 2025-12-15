"use client"

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Assuming partners data is imported from lib/partners.ts
import { partners } from "@/lib/partners";

export function PartnersSection() {
  return (
    <section id="partners" className="py-20 bg-gradient-to-br from-background to-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Valued Partners
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
          We collaborate with leading organizations dedicated to combating Gender-Based Violence and empowering survivors. Our partners provide crucial support and resources.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {partners.map((partner) => (
            <Card key={partner.name} className="flex flex-col items-center justify-center p-6 border-border bg-background/80 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0 mb-4">
                {/* Placeholder for Logo - ideally, an Image component */}
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                  {/* Assuming partner.name can be used to infer a logo or use a generic icon */}
                  <span className="text-xl font-semibold text-primary">{partner.name.charAt(0)}</span>
                </div>
              </CardHeader>
              <CardContent className="p-0 text-center">
                <CardTitle className="text-lg mb-2">{partner.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground line-clamp-2">{partner.description}</CardDescription>
                <Button
                  asChild
                  variant="link"
                  className="mt-4 text-primary hover:underline"
                >
                  <Link href={partner.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Are you an institution or organization dedicated to fighting GBV? Partner with us to expand our reach and provide critical support to survivors. Explore our onboarding process to learn how you can contribute.
          </p>
          <Button asChild className="text-lg px-8 py-4 neon-border bg-primary/10 hover:bg-primary/20 text-primary">
            <Link href="/onboarding">Get Onboarded</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
