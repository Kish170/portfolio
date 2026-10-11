import { describe, expect, it } from 'vitest';
import { experienceSchema, projectSchema } from '../../src/content/schemas';

const experience = {
  company: 'Clio',
  role: 'Data Engineering Intern',
  location: 'Toronto, ON',
  start: '2026-05',
  end: '2026-12',
  kind: 'work',
  summary: 'Pipelines.',
  highlights: ['Built things.'],
};

const diagram = {
  nodes: [
    { id: 'a', label: 'A', role: 'Source', col: 0 },
    { id: 'b', label: 'B', role: 'Sink', col: 1 },
  ],
  edges: [{ from: 'a', to: 'b' }],
};

const project = {
  title: 'Thing',
  tagline: 'Does a thing.',
  status: 'shipped',
  order: 1,
  problem: 'A problem.',
  stack: ['TypeScript'],
  diagram,
};

describe('experienceSchema', () => {
  it('accepts a valid entry', () => {
    expect(experienceSchema.safeParse(experience).success).toBe(true);
  });

  it('accepts present as an end date', () => {
    expect(experienceSchema.safeParse({ ...experience, end: 'present' }).success).toBe(true);
  });

  it('rejects malformed dates', () => {
    expect(experienceSchema.safeParse({ ...experience, start: '2026-5' }).success).toBe(false);
    expect(experienceSchema.safeParse({ ...experience, start: '2026-13' }).success).toBe(false);
  });

  it('rejects an end before the start', () => {
    expect(experienceSchema.safeParse({ ...experience, end: '2026-01' }).success).toBe(false);
  });

  it('caps highlights at 4 to keep entries skimmable', () => {
    const highlights = ['1', '2', '3', '4', '5'];
    expect(experienceSchema.safeParse({ ...experience, highlights }).success).toBe(false);
  });
});

describe('projectSchema', () => {
  it('accepts a valid shipped project', () => {
    expect(projectSchema.safeParse(project).success).toBe(true);
  });

  it('requires both worksToday and planned for building projects', () => {
    const building = { ...project, status: 'building' };
    expect(projectSchema.safeParse(building).success).toBe(false);
    expect(projectSchema.safeParse({ ...building, worksToday: ['x'] }).success).toBe(false);
    expect(projectSchema.safeParse({ ...building, worksToday: ['x'], planned: ['y'] }).success).toBe(true);
  });

  it('requires a diagram for featured projects but not foundations', () => {
    const { diagram: _, ...noDiagram } = project;
    expect(projectSchema.safeParse(noDiagram).success).toBe(false);
    expect(projectSchema.safeParse({ ...noDiagram, status: 'foundations' }).success).toBe(true);
  });

  it('rejects edges pointing at unknown nodes', () => {
    const bad = { ...diagram, edges: [{ from: 'a', to: 'missing' }] };
    expect(projectSchema.safeParse({ ...project, diagram: bad }).success).toBe(false);
  });

  it('rejects duplicate node ids', () => {
    const bad = { ...diagram, nodes: [...diagram.nodes, { id: 'a', label: 'A2', role: 'Dup', col: 2 }] };
    expect(projectSchema.safeParse({ ...project, diagram: bad }).success).toBe(false);
  });

  it('rejects non-URL links', () => {
    expect(projectSchema.safeParse({ ...project, links: { repo: 'not a url' } }).success).toBe(false);
  });
});
