import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { experienceSchema, projectSchema } from './content/schemas';

const experience = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/experience' }),
  schema: experienceSchema,
});

// Markdown so each project can carry a longer write-up for its detail page.
const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: projectSchema,
});

export const collections = { experience, projects };
