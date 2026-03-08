'use server';
/**
 * @fileOverview An AI-powered project ideation tool that provides initial project insights and suggestions.
 *
 * - projectIdeation - A function that handles the project ideation process.
 * - ProjectIdeationInput - The input type for the projectIdeation function.
 * - ProjectIdeationOutput - The return type for the projectIdeation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectIdeationInputSchema = z.object({
  description: z
    .string()
    .describe('A detailed description of the client\'s project idea or needs.'),
});
export type ProjectIdeationInput = z.infer<typeof ProjectIdeationInputSchema>;

const ProjectIdeationOutputSchema = z.object({
  projectName: z.string().describe('A suggested name for the project.'),
  overview: z
    .string()
    .describe('A brief overview and mission statement for the project.'),
  keyFeatures: z
    .array(z.string())
    .describe('A list of core functionalities and features for the project.'),
  suggestedTechStack: z
    .array(z.string())
    .describe('A list of recommended technologies and frameworks for the project.'),
  estimatedComplexity: z
    .enum(['Low', 'Medium', 'High', 'Very High'])
    .describe('An estimate of the project\'s overall complexity.'),
  potentialTimeline: z
    .string()
    .describe('An estimated timeline for the project (e.g., "3-6 months").'),
});
export type ProjectIdeationOutput = z.infer<typeof ProjectIdeationOutputSchema>;

export async function projectIdeation(
  input: ProjectIdeationInput
): Promise<ProjectIdeationOutput> {
  return projectIdeationFlow(input);
}

const projectIdeationPrompt = ai.definePrompt({
  name: 'projectIdeationPrompt',
  input: {schema: ProjectIdeationInputSchema},
  output: {schema: ProjectIdeationOutputSchema},
  prompt: `You are an AI-powered project ideation assistant for Sofol IT, a premium software development agency.
Your goal is to help potential clients refine their initial ideas and provide concrete insights and suggestions.

Based on the client's description, generate a detailed project idea including:
- A suggested project name.
- A brief overview and mission statement.
- A list of key features.
- A suggested technology stack.
- An estimated complexity level (Low, Medium, High, Very High).
- An estimated timeline for completion.

Client's Project Idea/Needs: {{{description}}}`,
});

const projectIdeationFlow = ai.defineFlow(
  {
    name: 'projectIdeationFlow',
    inputSchema: ProjectIdeationInputSchema,
    outputSchema: ProjectIdeationOutputSchema,
  },
  async input => {
    const {output} = await projectIdeationPrompt(input);
    return output!;
  }
);
