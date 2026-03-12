"use client";

import React, { useState, useEffect, useTransition } from "react";
import { 
  Save, 
  Settings2, 
  Globe, 
  Link as LinkIcon, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Loader2,
  Bell
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { getSettings, saveSettings } from "@/lib/actions/settings";

export default function SettingsPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({
    siteName: "Sofol IT",
    siteDescription: "The Technical Powerhouse for Founders",
    contactEmail: "hello@sofolit.com",
    contactPhone: "",
    calendlyUrl: "https://calendly.com/sofolitltd/30min",
    linkedinUrl: "",
    githubUrl: "",
    metaTitle: "",
    metaDescription: "",
    enableNewsletter: "true",
    maintenanceMode: "false",
  });

  useEffect(() => {
    async function load() {
      const data = await getSettings();
      if (Object.keys(data).length > 0) {
        setConfig(prev => ({ ...prev, ...data }));
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleChange = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    startTransition(async () => {
      const result = await saveSettings(config);
      if (result.success) {
        toast({
          title: "Settings Updated",
          description: "Your configurations have been saved successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to save settings.",
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your site configuration and presence.</p>
        </div>
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-card/50 backdrop-blur-md p-1 border">
          <TabsTrigger value="general" className="gap-2">
            <Settings2 className="w-4 h-4" /> General
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Globe className="w-4 h-4" /> SEO & Social
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <LinkIcon className="w-4 h-4" /> Integrations
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <ShieldCheck className="w-4 h-4" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Identity</CardTitle>
              <CardDescription>Core details about your digital presence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input 
                    id="siteName" 
                    value={config.siteName} 
                    onChange={(e) => handleChange("siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="contactEmail" 
                      className="pl-10"
                      value={config.contactEmail} 
                      onChange={(e) => handleChange("contactEmail", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Tagline</Label>
                <Input 
                  id="siteDescription" 
                  value={config.siteDescription} 
                  onChange={(e) => handleChange("siteDescription", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Control the operational state of the public site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-xs text-muted-foreground">Redirect all traffic to a maintenance page.</p>
                </div>
                <Switch 
                  checked={config.maintenanceMode === "true"} 
                  onCheckedChange={(checked) => handleChange("maintenanceMode", checked ? "true" : "false")} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Inquiry Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive email alerts for new leads.</p>
                </div>
                <Switch 
                  checked={config.enableNewsletter === "true"} 
                  onCheckedChange={(checked) => handleChange("enableNewsletter", checked ? "true" : "false")} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Optimization</CardTitle>
              <CardDescription>How your site appears in Google search results.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Default Meta Title</Label>
                <Input 
                  id="metaTitle" 
                  placeholder="e.g. Sofol IT | Elite Software Partner"
                  value={config.metaTitle} 
                  onChange={(e) => handleChange("metaTitle", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Default Meta Description</Label>
                <Input 
                  id="metaDescription" 
                  placeholder="The description shown in search snippets..."
                  value={config.metaDescription} 
                  onChange={(e) => handleChange("metaDescription", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Presence</CardTitle>
              <CardDescription>Links to your professional social galleries.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="linkedin" className="pl-10" value={config.linkedinUrl} onChange={(e) => handleChange("linkedinUrl", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Organization</Label>
                  <div className="relative">
                    <Github className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="github" className="pl-10" value={config.githubUrl} onChange={(e) => handleChange("githubUrl", e.target.value)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduling & Meetings</CardTitle>
              <CardDescription>Connect with third-party tools for client booking.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="calendly">Calendly Booking Link</Label>
                <Input 
                  id="calendly" 
                  value={config.calendlyUrl} 
                  onChange={(e) => handleChange("calendlyUrl", e.target.value)}
                  placeholder="https://calendly.com/your-username"
                />
                <p className="text-[10px] text-muted-foreground mt-1 px-1 italic">
                  * This link will be used across the site for "Book a Call" buttons.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>Update your administrative credentials.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-w-md space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPass">Current Password</Label>
                  <Input id="currentPass" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPass">New Password</Label>
                  <Input id="newPass" type="password" />
                </div>
                <Button variant="outline">Update Credentials</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
