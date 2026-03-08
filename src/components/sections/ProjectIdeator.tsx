"use client";

import React, { useState } from "react";
import { projectIdeation, type ProjectIdeationOutput } from "@/ai/flows/project-ideation";
import { Loader2, Sparkles, Send, BrainCircuit, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ProjectIdeator = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProjectIdeationOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    
    setLoading(true);
    try {
      const output = await projectIdeation({ description });
      setResult(output);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ideator" className="py-24 relative mesh-gradient">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">AI Project Starter</h2>
            <p className="text-muted-foreground">
              Have an idea? Describe it briefly and our AI will outline the roadmap, tech stack, and timeline.
            </p>
          </div>

          <Card className="glass-card border-white/10 mb-12">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  className="w-full h-32 bg-transparent border border-white/10 rounded-2xl p-6 text-lg focus:ring-2 focus:ring-primary outline-none resize-none transition-all"
                  placeholder="e.g., A mobile app for sustainable grocery shopping with reward points..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !description}
                  className="w-full py-4 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(51,150,230,0.4)] disabled:opacity-50 transition-all"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <BrainCircuit className="w-5 h-5" />
                      Generate Vision
                    </>
                  )}
                </button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <div className="animate-fade-in-up space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="p-8 rounded-3xl glass-card border-primary/20">
                    <div className="flex items-center gap-2 text-primary mb-4">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm font-bold uppercase tracking-widest">Suggested Name</span>
                    </div>
                    <h3 className="text-3xl font-black">{result.projectName}</h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {result.overview}
                    </p>
                  </div>

                  <div className="p-8 rounded-3xl glass-card">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Complexity</p>
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {result.estimatedComplexity}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Timeline</p>
                        <p className="font-bold text-lg">{result.potentialTimeline}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-8 rounded-3xl glass-card h-full">
                    <h4 className="font-bold text-xl mb-6 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      Key Features
                    </h4>
                    <ul className="space-y-4">
                      {result.keyFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="font-bold text-xl mt-8 mb-6 flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-primary" />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.suggestedTechStack.map((tech, i) => (
                        <Badge key={i} variant="outline" className="border-white/10">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

import { Code2 } from "lucide-react";