"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function InstitutionOnboardingPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Institution Onboarding</CardTitle>
          <CardDescription>Register your institution to access advanced features.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="institutionName" className="sr-only">Institution Name</label>
              <Input id="institutionName" placeholder="Institution Name" className="w-full" />
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
              <label htmlFor="website" className="sr-only">Website</label>
              <Input id="website" placeholder="Website (Optional)" className="w-full" />
            </div>
            <div>
              <label htmlFor="description" className="sr-only">Description</label>
              <Textarea id="description" placeholder="Tell us about your institution and needs" className="w-full" rows={5} />
            </div>
            <Button type="submit" className="w-full">Submit Application</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
