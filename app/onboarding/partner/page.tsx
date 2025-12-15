"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PartnerOnboardingPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Partner Onboarding</CardTitle>
          <CardDescription>Join our network of partners to support survivors.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="organizationName" className="sr-only">Organization Name</label>
              <Input id="organizationName" placeholder="Organization Name" className="w-full" />
            </div>
            <div>
              <label htmlFor="contactPerson" className="sr-only">Contact Person</label>
              <Input id="contactPerson" placeholder="Contact Person" className="w-full" />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <Input id="email" type="email" placeholder="Contact Email" className="w-full" />
            </div>
            <div>
              <label htmlFor="focusArea" className="sr-only">Focus Area</label>
              <Input id="focusArea" placeholder="Areas of Focus (e.g., Legal Aid, Counseling)" className="w-full" />
            </div>
            <div>
              <label htmlFor="description" className="sr-only">Description</label>
              <Textarea id="description" placeholder="Tell us about your organization and how you help" className="w-full" rows={5} />
            </div>
            <Button type="submit" className="w-full">Submit Application</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
