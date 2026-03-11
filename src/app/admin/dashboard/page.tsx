"use client";

import React from "react";
import { 
  FileText, 
  MousePointer2, 
  TrendingUp,
  MessageSquare,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Area, AreaChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";
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
    { label: "Total Views", value: "24.5k", change: "+12.5%", icon: <TrendingUp className="w-5 h-5" />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Blogs", value: "12", change: "+2 this month", icon: <FileText className="w-5 h-5" />, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Lead Inquiries", value: "48", change: "+8 today", icon: <MessageSquare className="w-5 h-5" />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Conversion Rate", value: "3.2%", change: "+0.4%", icon: <MousePointer2 className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">
          <Activity className="w-3 h-3" /> System Intelligence
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Monitor your project growth and content performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="bg-white border-slate-200 shadow-sm overflow-hidden rounded-2xl group hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl transition-colors", stat.bg, stat.color, "group-hover:bg-primary group-hover:text-white")}>
                  {stat.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold text-slate-900">Traffic Performance</CardTitle>
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest">
              Last 7 Days
            </Button>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}}
                    dy={10}
                  />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
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

        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-lg font-bold text-slate-900">Recent Pulse</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            <div className="space-y-6">
              {[
                { type: "Post", title: "Launching MVP Strategy", time: "2h ago", color: "bg-blue-500" },
                { type: "Lead", title: "Inquiry from Sarah J.", time: "5h ago", color: "bg-purple-500" },
                { type: "Update", title: "Asset Optimization", time: "Yesterday", color: "bg-green-500" },
                { type: "Lead", title: "New Lead: Fintech App", time: "1d ago", color: "bg-indigo-500" },
              ].map((act, i) => (
                <div key={i} className="flex gap-4 items-start relative pb-6 last:pb-0">
                  <div className={cn("absolute left-[7px] top-6 bottom-0 w-px bg-slate-100 last:hidden")} />
                  <div className={cn("w-3.5 h-3.5 rounded-full mt-1 shrink-0 border-4 border-white shadow-sm ring-1 ring-slate-100", act.color)} />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 leading-none">{act.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{act.type} • {act.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 h-11 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 border-slate-200">
              View Audit Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
