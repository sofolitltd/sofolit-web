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
  Trash2,
  ExternalLink
} from "lucide-react";
import { getInquiries, updateInquiryStatus } from "@/lib/actions/inquiries";
import { useToast } from "@/hooks/use-toast";
import type { Inquiry } from "@/lib/db/schema";
import { Badge } from "@/components/ui/badge";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

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

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">
          <MessageSquare className="w-3 h-3" /> Lead Management
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Project Inquiries</h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Filter leads..." 
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-[10px] font-bold py-1 px-3 rounded-full bg-white border-slate-200 text-slate-500 uppercase">
              Total: {inquiries.length}
            </Badge>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] uppercase font-black tracking-widest text-slate-400">
                <th className="px-8 py-4">Founder</th>
                <th className="px-8 py-4">Service Required</th>
                <th className="px-8 py-4">Inquiry Message</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-200 mx-auto" />
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
                    No inquiries yet. Your pipeline is waiting!
                  </td>
                </tr>
              ) : inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-blue-50/20 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-400" /> {inq.name}
                      </p>
                      <a href={`mailto:${inq.email}`} className="text-[10px] font-medium text-blue-600 hover:underline flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {inq.email}
                      </a>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge className="bg-slate-100 text-slate-600 border-slate-200 font-bold text-[10px] uppercase tracking-wider">
                      {inq.service?.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xs line-clamp-2">
                      {inq.message}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => handleStatusChange(inq.id, inq.status || "new")}
                      className="cursor-pointer"
                    >
                      {inq.status === 'contacted' ? (
                        <div className="flex items-center gap-1.5 text-green-600 font-bold text-[10px] uppercase tracking-widest">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Contacted
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-blue-600 font-bold text-[10px] uppercase tracking-widest animate-pulse">
                          <Clock className="w-3.5 h-3.5" /> New Lead
                        </div>
                      )}
                    </button>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs text-slate-400 font-medium">
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Just now'}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a 
                        href={`mailto:${inq.email}`}
                        className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-blue-600 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
