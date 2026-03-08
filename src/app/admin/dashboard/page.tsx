
"use client";

import React from "react";
import { 
  FileText, 
  MousePointer2, 
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
        <h1 className="text-3xl font-black tracking-tight text-slate-900">System Overview</h1>
        <p className="text-slate-500">Monitor your project growth and blog performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="bg-white border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2 rounded-lg", stat.bg, stat.color)}>
                  {stat.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900">Traffic Performance</h2>
              <select className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold px-3 py-1 outline-none text-slate-600">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3396E6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3396E6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}}
                    dy={10}
                  />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#3396E6" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorVisitors)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-6 text-slate-900">Recent Activities</h2>
            <div className="space-y-6">
              {[
                { type: "Post", title: "Launching MVP...", time: "2h ago", color: "bg-blue-500" },
                { type: "Lead", title: "New Inquiry from Alex", time: "5h ago", color: "bg-purple-500" },
                { type: "Update", title: "Site Optimization", time: "Yesterday", color: "bg-green-500" },
              ].map((act, i) => (
                <div key={i} className="flex gap-4 items-start border-l-2 border-slate-100 pl-4">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 leading-none">{act.title}</p>
                    <p className="text-xs text-slate-400 font-medium">{act.type} • {act.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              View All Logs
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
