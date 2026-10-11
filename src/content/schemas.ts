// Kept separate from content.config.ts so unit tests can import the schemas
// without Astro's virtual modules.
import { z } from 'astro/zod';

/** Year-month, e.g. "2026-05". Sorting and display both derive from this. */
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Expected YYYY-MM');

export const experienceSchema = z
  .object({
    company: z.string().min(1),
    role: z.string().min(1),
    location: z.string().min(1),
    start: yearMonth,
    end: z.union([yearMonth, z.literal('present')]),
    kind: z.enum(['work', 'founder', 'leadership']),
    summary: z.string().min(1),
    // Resume-level detail only for employers under NDA (see AGENTS.md).
    highlights: z.array(z.string().min(1)).min(1).max(4),
    stack: z.array(z.string().min(1)).default([]),
    url: z.url().optional(),
  })
  .refine((e) => e.end === 'present' || e.end >= e.start, {
    message: 'end must not be before start',
    path: ['end'],
  });

const diagramSchema = z
  .object({
    nodes: z
      .array(
        z.object({
          id: z.string().regex(/^[a-z0-9-]+$/, 'Node ids are kebab-case'),
          // Capped so it fits one line of a fixed-width diagram box (NODE_W).
          label: z.string().min(1).max(18),
          // Shown on hover/focus: what this part does and why it exists.
          role: z.string().min(1),
          // Layout column, left to right, so diagrams read as a flow.
          col: z.number().int().min(0).max(4),
        }),
      )
      .min(2)
      .max(8),
    edges: z
      .array(
        z.object({
          from: z.string(),
          to: z.string(),
          label: z.string().optional(),
        }),
      )
      .min(1),
  })
  .superRefine((d, ctx) => {
    const ids = new Set<string>();
    for (const n of d.nodes) {
      if (ids.has(n.id)) ctx.addIssue({ code: 'custom', message: `Duplicate node id "${n.id}"` });
      ids.add(n.id);
    }
    for (const e of d.edges) {
      for (const end of [e.from, e.to]) {
        if (!ids.has(end)) ctx.addIssue({ code: 'custom', message: `Edge references unknown node "${end}"` });
      }
    }
  });

export const projectSchema = z
  .object({
    title: z.string().min(1),
    tagline: z.string().min(1).max(120),
    // shipped: done; building: live work with an honest worksToday/planned split.
    status: z.enum(['shipped', 'building']),
    order: z.number().int(),
    problem: z.string().min(1),
    results: z.array(z.string().min(1)).default([]),
    worksToday: z.array(z.string().min(1)).default([]),
    planned: z.array(z.string().min(1)).default([]),
    stack: z.array(z.string().min(1)).min(1),
    links: z
      .object({
        repo: z.url().optional(),
        live: z.url().optional(),
      })
      .default({}),
    diagram: diagramSchema,
  })
  .superRefine((p, ctx) => {
    // The "Building" badge is only honest if both halves of the split exist.
    if (p.status === 'building') {
      if (p.worksToday.length === 0)
        ctx.addIssue({ code: 'custom', path: ['worksToday'], message: 'building projects must list worksToday' });
      if (p.planned.length === 0)
        ctx.addIssue({ code: 'custom', path: ['planned'], message: 'building projects must list planned' });
    }
  });

export const skillGroupSchema = z.object({
  group: z.string().min(1),
  order: z.number().int(),
  items: z.array(z.string().min(1)).min(1),
});

export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
