
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <Rocket className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Admin Portal</h1>
          <p className="text-slate-500">Secure access to Sofol IT management</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 uppercase tracking-wider ml-1">Username</label>
              <Input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="bg-slate-50 border-slate-200 text-slate-900 h-12"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 uppercase tracking-wider ml-1">Password</label>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-slate-50 border-slate-200 text-slate-900 h-12"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-50 text-red-600 border-red-100 py-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs font-bold">{error}</AlertDescription>
              </Alert>
            )}

            <button 
              type="submit"
              className="w-full py-4 rounded-xl bg-primary text-white font-black hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
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
