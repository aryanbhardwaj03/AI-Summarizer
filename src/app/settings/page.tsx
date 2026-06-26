"use client";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Settings, User, Paintbrush, Brain, FolderOpen, Bell, Shield, CreditCard, LogOut, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { useTheme } from "@/components/providers/ThemeProvider";

import { showToast } from "@/components/ui/Toaster";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { theme, setTheme } = useTheme();

  const handleSaveProfile = () => {
    showToast("Profile updated successfully", "success");
  };

  const handleUploadAvatar = () => {
    showToast("Avatar updated successfully", "success");
  };

  const handleChangePassword = () => {
    showToast("Password changed successfully", "success");
  };

  const handleSaveAI = () => {
    showToast("AI preferences saved", "success");
  };

  const handleExportData = () => {
    showToast("Data export started", "info");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to permanently delete your account?")) {
      showToast("Account deleted", "success");
    }
  };

  const handleThemeChange = (t: string) => {
    setTheme(t as any);
    showToast("Theme changed", "success");
  };
  
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Paintbrush },
    { id: "ai", label: "AI Preferences", icon: Brain },
    { id: "documents", label: "Documents", icon: FolderOpen },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <AppLayout>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 text-primary">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 flex flex-col gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-left
                    ${isActive 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
            <div className="my-4 border-t border-border"></div>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-left text-red-500 hover:bg-red-500/10">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 max-w-3xl">
            
            {activeTab === "profile" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Manage your public profile and personal details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-4 border-background shadow-sm text-3xl font-bold text-muted-foreground">
                        A
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleUploadAvatar} variant="outline">Upload Avatar</Button>
                        <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-500/10">Remove</Button>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Display Name</label>
                        <input type="text" className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" defaultValue="Aryan" />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Username</label>
                        <input type="text" className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" defaultValue="@aryan123" />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <input type="email" className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" defaultValue="aryan@example.com" />
                      </div>
                    </div>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Current Password</label>
                      <input type="password" placeholder="••••••••" className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">New Password</label>
                      <input type="password" placeholder="••••••••" className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                    </div>
                    <Button onClick={handleChangePassword} variant="outline">Update Password</Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the application.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {["light", "dark", "system"].map((t) => (
                        <div 
                          key={t}
                          onClick={() => handleThemeChange(t)}
                          className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-3 transition-all ${theme === t ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50"}`}
                        >
                          <div className={`w-full h-24 rounded-md border shadow-sm flex items-center justify-center ${t === "dark" ? "bg-slate-900 border-slate-800" : t === "light" ? "bg-slate-50 border-slate-200" : "bg-gradient-to-br from-slate-50 to-slate-900 border-slate-300"}`}>
                            {theme === t && <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center"><Check className="w-5 h-5" /></div>}
                          </div>
                          <span className="font-medium capitalize">{t}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "ai" && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Preferences</CardTitle>
                  <CardDescription>Configure how the AI responds and processes your documents.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Default Model</label>
                    <select className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      <option>GPT-4o</option>
                      <option>Claude 3.5 Sonnet</option>
                      <option>Ollama (Local)</option>
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium flex justify-between">
                      <span>Creativity / Temperature</span>
                      <span className="text-muted-foreground">Balanced (0.7)</span>
                    </label>
                    <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full accent-primary" />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Summary Length</label>
                    <select className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      <option>Short (1 paragraph)</option>
                      <option>Medium (1 page)</option>
                      <option>Detailed (Comprehensive)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div>
                      <p className="text-sm font-medium">Auto-generate Mind Maps</p>
                      <p className="text-xs text-muted-foreground">Create a mind map automatically upon upload</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <Button onClick={handleSaveAI}>Save AI Settings</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "documents" && (
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Manage how your documents are stored and processed.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div>
                      <p className="text-sm font-medium">Auto-delete after 30 days</p>
                      <p className="text-xs text-muted-foreground">Automatically remove old documents to save space</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div>
                      <p className="text-sm font-medium">High Quality OCR</p>
                      <p className="text-xs text-muted-foreground">Use advanced OCR for images. Processing may take longer.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Choose what we notify you about.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Email Notifications</h4>
                      <p className="text-xs text-muted-foreground">Receive emails about new features and weekly reports.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Browser Notifications</h4>
                      <p className="text-xs text-muted-foreground">Get notified when document processing is complete.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "privacy" && (
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Data</CardTitle>
                  <CardDescription>Manage your data retention and privacy settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2 border p-4 rounded-lg">
                    <h4 className="font-medium text-sm">Export Data</h4>
                    <p className="text-xs text-muted-foreground mb-2">Download a ZIP file containing all your documents, summaries, and chats.</p>
                    <Button variant="outline" className="w-fit">Export All Data</Button>
                  </div>
                  <div className="grid gap-2 border p-4 rounded-lg border-red-500/20 bg-red-500/5">
                    <h4 className="font-medium text-sm text-red-500">Delete All Documents</h4>
                    <p className="text-xs text-red-500/80 mb-2">This will permanently delete all your documents and generated data. This cannot be undone.</p>
                    <Button variant="destructive" className="w-fit">Delete All Documents</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "billing" && (
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>Manage your subscription plan and billing history.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 rounded-xl border-2 border-primary bg-primary/5 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-lg text-primary">Free Plan</h4>
                      <p className="text-sm text-muted-foreground">You are currently on the free tier (local models only).</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-2xl mb-1">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    </div>
                  </div>
                  <Button className="w-full">Upgrade to Pro</Button>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </main>
    </AppLayout>
  );
}
