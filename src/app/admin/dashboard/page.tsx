"use client";

import React from "react";
import { 
  FileText, 
  MousePointer2, 
  TrendingUp,
  MessageSquare,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const chartData = [
  { name: "Mon", visitors: 400 },
  { name: "Tue", visitors: 700 },
  { name: "Wed", visitors: 1200 },
  { name: "Thu", visitors: 900 },
  { name: "Fri", visitors: 1500 },
  { name: "Sat", visitors: 1800 },
  { name: "Sun", visitors: 2100 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--primary))",
  },
};

export default function AdminDashboard() {
  const stats = [
    { label: "Total Views", value: "24,500", change: "+12.5%", icon: <TrendingUp className="h-4 w-4" /> },
    { label: "Active Blogs", value: "12", change: "+2", icon: <FileText className="h-4 w-4" /> },
    { label: "Lead Inquiries", value: "48", change: "+8", icon: <MessageSquare className="h-4 w-4" /> },
    { label: "Conversion Rate", value: "3.2%", change: "+0.4%", icon: <MousePointer2 className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your digital agency's key performance metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <div className="text-muted-foreground">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-medium">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Daily visitor performance over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={chartData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="var(--color-visitors)" 
                  fill="var(--color-visitors)" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events from your platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { type: "Blog", title: "Launching MVP Strategy", time: "2h ago", color: "bg-blue-500" },
                { type: "Lead", title: "Inquiry from Sarah J.", time: "5h ago", color: "bg-purple-500" },
                { type: "Update", title: "Asset Optimization", time: "Yesterday", color: "bg-green-500" },
                { type: "Lead", title: "New Lead: Fintech App", time: "1d ago", color: "bg-primary" },
              ].map((act, i) => (
                <div key={i} className="flex items-center">
                  <div className={cn("h-2 w-2 rounded-full", act.color)} />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{act.title}</p>
                    <p className="text-sm text-muted-foreground">{act.type} • {act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
