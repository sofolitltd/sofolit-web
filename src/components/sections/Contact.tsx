
"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Mail, Phone, MessageCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { saveInquiry } from "@/lib/actions/inquiries";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Tell us a bit more about your project"),
});

export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    startTransition(async () => {
      const result = await saveInquiry(data);
      if (result.success) {
        toast({
          title: "Inquiry Sent",
          description: "Our experts will get back to you within 24 hours.",
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Submission Error",
          description: result.error || "We couldn't reach the database.",
        });
      }
    });
  };

  const contactMethods = [
    {
      id: "email",
      label: "Email",
      value: "sofolitltd@gmail.com",
      href: "mailto:sofolitltd@gmail.com",
      icon: <Mail className="w-6 h-6 text-primary" />,
      bg: "bg-primary/10",
      border: "border-primary/20",
      hover: "group-hover:bg-primary/20"
    },
    {
      id: "call",
      label: "Call",
      value: "+880 1704340860",
      href: "tel:+8801704340860",
      icon: <Phone className="w-6 h-6 text-secondary" />,
      bg: "bg-secondary/10",
      border: "border-secondary/20",
      hover: "group-hover:bg-secondary/20"
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      value: "+880 1704340860",
      href: "https://wa.me/8801704340860",
      icon: <MessageCircle className="w-6 h-6 text-green-500" />,
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      hover: "group-hover:bg-green-500/20"
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className={cn(
            "space-y-12 opacity-0",
            isVisible && "animate-slide-in-left"
          )}>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                Let's Build <br />
                <span className="text-gradient">Something Iconic.</span>
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-md leading-relaxed">
                Ready to transform your idea into a market-leading product? Reach out and start the conversation.
              </p>
            </div>

            <div className="space-y-8">
              {contactMethods.map((method) => (
                <div key={method.id} className="flex items-center gap-6 group">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors",
                    method.bg, method.border, method.hover
                  )}>
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">{method.label}</p>
                    <a 
                      href={method.href} 
                      target={method.id === 'whatsapp' ? "_blank" : undefined}
                      rel={method.id === 'whatsapp' ? "noopener noreferrer" : undefined}
                      className="text-xl font-bold no-underline hover:text-primary transition-colors inline-block"
                    >
                      {method.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cn(
            "glass-card p-10 md:p-12 rounded-[3rem] border-border bg-card relative opacity-0",
            isVisible && "animate-slide-in-right"
          )} style={{ animationDelay: '0.2s' }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-background border-border h-12 rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="bg-background border-border h-12 rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Service Required</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background border-border h-12 rounded-xl">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-border rounded-xl">
                          <SelectItem value="mobile-app">Custom Mobile App Development</SelectItem>
                          <SelectItem value="web-platform">High-Performance Web Development</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your goals, timelines, and requirements..." 
                          {...field} 
                          className="bg-background border-border h-32 resize-none rounded-xl p-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-black text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(51,150,230,0.4)] transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Send Inquiry <Send className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};
