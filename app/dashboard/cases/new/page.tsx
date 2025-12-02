import { createCase } from '@/lib/actions/case';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function NewCasePage() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a New Case</CardTitle>
        <CardDescription>
          Provide a title and an optional description for your new evidence case.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createCase} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Case Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Evidence for Incident on Dec 1st"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Case Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="e.g., Details of the incident, people involved, etc."
              rows={5}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Create Case</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
