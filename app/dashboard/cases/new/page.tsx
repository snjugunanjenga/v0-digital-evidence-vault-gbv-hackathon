import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createCase } from "@/lib/actions/case";

export default function NewCasePage() {
  return (
    <div className="flex flex-col space-y-6">
      <DashboardHeader
        heading="Create a New Case"
        text="Fill out the details below to start a new evidence case."
      />
      <Card>
        <CardHeader>
          <CardTitle>Case Details</CardTitle>
          <CardDescription>
            Provide a clear title and an optional description for your case.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCase} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Case Title</Label>
              <Input id="title" name="title" placeholder="e.g., Incident on 2024-10-26" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Add any relevant notes or a summary of the case..."
              />
            </div>
            <Button type="submit">Create Case</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
