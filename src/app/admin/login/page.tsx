
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Rocket, ShieldCheck, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      localStorage.setItem("admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <Rocket className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Admin Portal</h1>
          <p className="text-muted-foreground">Secure access to Sofol IT management</p>
        </div>

        <div className="glass-card p-8 rounded-[2rem] border-border bg-card shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">Username</label>
              <Input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="bg-background border-border h-12"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">Password</label>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-background border-border h-12"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20 py-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs font-bold">{error}</AlertDescription>
              </Alert>
            )}

            <button 
              type="submit"
              className="w-full py-4 rounded-xl bg-primary text-white font-black hover:shadow-[0_0_30px_rgba(51,150,230,0.3)] transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
