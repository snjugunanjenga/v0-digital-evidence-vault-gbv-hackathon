"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Onboarding!</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Choose your onboarding path:
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <Button asChild className="text-lg px-8 py-4">
          <Link href="/onboarding/institution">Institution Onboarding</Link>
        </Button>
        <Button asChild className="text-lg px-8 py-4" variant="secondary">
          <Link href="/onboarding/partner">Partner Onboarding</Link>
        </Button>
      </div>
    </div>
  );
}
