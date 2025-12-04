"use client"

import { UserProfile } from "@clerk/nextjs"
import { Bell, Download, User, Shield, Save } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { exportAllData } from "@/lib/actions/evidence"

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    newFeatures: true,
    securityAlerts: true,
  })

  const handleSaveNotifications = () => {
    // In a real application, you would save these settings to a database.
    console.log("Saving notification settings:", notifications)
    // Here you could show a toast notification to confirm saving.
  }

  const handleExport = async () => {
    const data = await exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'evidence-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security settings.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="glass-card">
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <User className="w-4 h-4 mr-2" />
            Profile & Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Download className="w-4 h-4 mr-2" />
            Data
          </TabsTrigger>
        </TabsList>

        {/* Profile & Security Tab */}
        <TabsContent value="profile">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Profile & Security</CardTitle>
              <CardDescription>Update your personal information and manage your security settings.</CardDescription>
            </CardHeader>
              <CardContent>
                <UserProfile routing="hash" />
              </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-foreground">Email Alerts</p>
                    <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailAlerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-foreground">SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">Get critical alerts via SMS</p>
                  </div>
                  <Switch
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-foreground">Security Alerts</p>
                    <p className="text-sm text-muted-foreground">Be notified of account security events</p>
                  </div>
                  <Switch
                    checked={notifications.securityAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, securityAlerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-foreground">New Features</p>
                    <p className="text-sm text-muted-foreground">Learn about new platform features</p>
                  </div>
                  <Switch
                    checked={notifications.newFeatures}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newFeatures: checked })}
                  />
                </div>
              </div>
              <Button onClick={handleSaveNotifications} className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data">
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Export Your Data</CardTitle>
                <CardDescription>Download all your evidence records and metadata.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleExport} variant="outline" className="neon-border bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export All Data
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-destructive/30">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Delete Account</p>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data. Blockchain records cannot be deleted.
                      </p>
                    </div>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
