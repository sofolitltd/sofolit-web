"use client";

import React, { useEffect, useState, useTransition } from "react";
import { 
  MessageSquare, 
  Search, 
  Mail, 
  User, 
  Clock, 
  CheckCircle2, 
  Loader2,
  ExternalLink
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getInquiries, updateInquiryStatus } from "@/lib/actions/inquiries";
import { useToast } from "@/hooks/use-toast";
import type { Inquiry } from "@/lib/db/schema";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getInquiries();
      setInquiries(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleStatusChange = (id: number, currentStatus: string) => {
    const nextStatus = currentStatus === "new" ? "contacted" : "new";
    startTransition(async () => {
      const result = await updateInquiryStatus(id, nextStatus);
      if (result.success) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: nextStatus } : inq));
        toast({ title: "Status Updated", description: `Inquiry marked as ${nextStatus}.` });
      }
    });
  };

  const filteredInquiries = inquiries.filter(inq => 
    inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inq.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">
          <MessageSquare className="w-3 h-3" /> Lead Management
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Project Inquiries</h1>
        <p className="text-sm text-slate-500">Track and respond to incoming potential leads.</p>
      </div>

      <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="p-0 border-b border-slate-100">
          <div className="px-8 py-6 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Filter by name, email or service..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-white border-slate-200 rounded-xl text-sm"
              />
            </div>
            <Badge variant="outline" className="text-[10px] font-bold py-1 px-4 rounded-full bg-white border-slate-200 text-slate-500 uppercase tracking-widest">
              Total Leads: {inquiries.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-b border-slate-100 hover:bg-transparent">
                <TableHead className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400">Founder</TableHead>
                <TableHead className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400">Service</TableHead>
                <TableHead className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400">Message</TableHead>
                <TableHead className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400">Status</TableHead>
                <TableHead className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filteredInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
                    No leads in the pipeline
                  </TableCell>
                </TableRow>
              ) : filteredInquiries.map((inq) => (
                <TableRow key={inq.id} className="hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-400" /> {inq.name}
                      </p>
                      <a href={`mailto:${inq.email}`} className="text-[10px] font-medium text-primary hover:underline flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {inq.email}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-6">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200 font-bold text-[10px] uppercase tracking-wider">
                      {inq.service?.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-8 py-6">
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xs line-clamp-2">
                      {inq.message}
                    </p>
                  </TableCell>
                  <TableCell className="px-8 py-6">
                    <button 
                      onClick={() => handleStatusChange(inq.id, inq.status || "new")}
                      className="transition-opacity hover:opacity-80 disabled:opacity-50"
                      disabled={isPending}
                    >
                      {inq.status === 'contacted' ? (
                        <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-green-100 gap-1.5 font-bold text-[10px] uppercase tracking-widest">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Contacted
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 gap-1.5 font-bold text-[10px] uppercase tracking-widest animate-pulse">
                          <Clock className="w-3.5 h-3.5" /> New Lead
                        </Badge>
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="px-8 py-6 text-right">
                    <Button variant="ghost" size="icon" asChild className="h-9 w-9 text-slate-400 hover:text-primary transition-all rounded-lg">
                      <a href={`mailto:${inq.email}`} title="Send Email">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
