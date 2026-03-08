
"use client";

import React from "react";
import { 
  Users, 
  FileText, 
  MousePointer2, 
  ArrowUpRight,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

const data = [
  { name: "Mon", visitors: 400 },
  { name: "Tue", visitors: 700 },
  { name: "Wed", visitors: 1200 },
  { name: "Thu", visitors: 900 },
  { name: "Fri", visitors: 1500 },
  { name: "Sat", visitors: 1800 },
  { name: "Sun", visitors: 2100 },
];

export default function AdminDashboard() {
  const stats = [
    { label: "Total Views", value: "24.5k", change: "+12.5%", icon: <TrendingUp className="w-5 h-5" />, color: "text-primary" },
    { label: "Active Blogs", value: "12", change: "+2 this month", icon: <FileText className="w-5 h-5" />, color: "text-secondary" },
    { label: "Lead Inquiries", value: "48", change: "+8 today", icon: <MessageSquare className="w-5 h-5" />, color: "text-indigo-500" },
    { label: "Conversion Rate", value: "3.2%", change: "+0.4%", icon: <MousePointer2 className="w-5 h-5" />, color: "text-green-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">System Overview</h1>
        <p className="text-muted-foreground">Monitor your project growth and blog performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="glass-card border-white/5 bg-card/30">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2 rounded-lg bg-background border border-border", stat.color)}>
                  {stat.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card border-white/5 bg-card/30">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Traffic Performance</h2>
              <select className="bg-background border border-border rounded-lg text-xs font-bold px-3 py-1 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                    dy={10}
                  />
                  <Tooltip 
                    contentStyle={{backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorVisitors)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/5 bg-card/30">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-6">Recent Activities</h2>
            <div className="space-y-6">
              {[
                { type: "Post", title: "Launching MVP...", time: "2h ago", color: "bg-primary" },
                { type: "Lead", title: "New Inquiry from Alex", time: "5h ago", color: "bg-secondary" },
                { type: "Update", title: "Site Optimization", time: "Yesterday", color: "bg-green-500" },
              ].map((act, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={cn("w-2 h-2 rounded-full mt-2 shrink-0", act.color)} />
                  <div className="space-y-1">
                    <p className="text-sm font-bold leading-none">{act.title}</p>
                    <p className="text-xs text-muted-foreground">{act.type} • {act.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl border border-border text-xs font-bold hover:bg-muted transition-colors">
              View All Logs
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
