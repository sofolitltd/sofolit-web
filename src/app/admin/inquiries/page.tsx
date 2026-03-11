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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
        toast({ title: "Inquiry Updated", description: `Status changed to ${nextStatus}.` });
      }
    });
  };

  const filteredInquiries = inquiries.filter(inq => 
    inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inq.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Project Inquiries</h1>
        <p className="text-muted-foreground">Manage and track your agency leads.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search leads..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sender</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading inquiries...
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No inquiries found.
                  </TableCell>
                </TableRow>
              ) : filteredInquiries.map((inq) => (
                <TableRow key={inq.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{inq.name}</span>
                      <span className="text-xs text-muted-foreground">{inq.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {inq.service?.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                    {inq.message}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto p-0"
                      onClick={() => handleStatusChange(inq.id, inq.status || "new")}
                      disabled={isPending}
                    >
                      {inq.status === 'contacted' ? (
                        <Badge variant="default" className="bg-green-600 hover:bg-green-700 gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Contacted
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <Clock className="h-3 w-3" /> New
                        </Badge>
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`mailto:${inq.email}`}>
                        <ExternalLink className="h-4 w-4" />
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
