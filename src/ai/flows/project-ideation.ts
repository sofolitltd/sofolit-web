'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/**
 * @fileOverview AI Flow for Project Ideation.
 * Generates technical roadmaps and project outlines for solo founders.
 */

const ProjectIdeationInputSchema = z.object({
  description: z.string().describe('The project idea described by the founder.'),
});
export type ProjectIdeationInput = z.infer<typeof ProjectIdeationInputSchema>;

const ProjectIdeationOutputSchema = z.object({
  projectName: z.string().describe('A catchy, professional name for the project.'),
  overview: z.string().describe('A high-level strategic overview of the product.'),
  keyFeatures: z.array(z.string()).describe('Core features for the MVP.'),
  suggestedTechStack: z.array(z.string()).describe('Recommended modern tech stack.'),
  estimatedComplexity: z.enum(['Low', 'Medium', 'High', 'Enterprise']).describe('Technical complexity level.'),
  potentialTimeline: z.string().describe('Estimated time to launch the MVP.'),
});
export type ProjectIdeationOutput = z.infer<typeof ProjectIdeationOutputSchema>;

const projectIdeationPrompt = ai.definePrompt({
  name: 'projectIdeationPrompt',
  input: { schema: ProjectIdeationInputSchema },
  output: { schema: ProjectIdeationOutputSchema },
  prompt: `You are an expert CTO and Product Strategist for solo founders.
  
  Given the following project description, generate a professional project outline.
  Focus on building a high-fidelity MVP that is scalable yet manageable for a small team or solo founder.
  
  Description: {{{description}}}`,
});

export async function projectIdeation(input: ProjectIdeationInput): Promise<ProjectIdeationOutput> {
  const { output } = await projectIdeationPrompt(input);
  if (!output) throw new Error('AI failed to generate a response.');
  return output;
}
