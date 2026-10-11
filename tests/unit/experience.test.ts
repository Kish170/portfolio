import { describe, expect, it } from 'vitest';
import { currentRole, formatMonth, groupByCompany } from '../../src/lib/experience';
import type { Experience } from '../../src/content/schemas';

const entry = (over: Partial<Experience>): Experience => ({
  company: 'Co',
  role: 'Role',
  location: 'Toronto, ON',
  start: '2025-01',
  end: '2025-04',
  kind: 'work',
  summary: 's',
  highlights: ['h'],
  stack: [],
  ...over,
});

describe('formatMonth', () => {
  it('formats year-months as short month names', () => {
    expect(formatMonth('2026-05')).toBe('May 2026');
    expect(formatMonth('2025-12')).toBe('Dec 2025');
  });
});

describe('currentRole', () => {
  const clio = entry({ company: 'Clio', role: 'DE Intern', start: '2026-05', end: '2026-12' });
  const naiber = entry({ company: 'nAIber', role: 'Co-founder', start: '2025-12', end: 'present', kind: 'founder' });
  const blueprint = entry({ company: 'Blueprint', role: 'VP', start: '2026-05', end: 'present', kind: 'leadership' });

  it('picks the active work role, ignoring founder and leadership roles', () => {
    expect(currentRole([naiber, blueprint, clio], '2026-10')?.company).toBe('Clio');
  });

  it('counts the end month as still active', () => {
    expect(currentRole([clio], '2026-12')?.company).toBe('Clio');
  });

  it('returns undefined once the role has ended or before it starts', () => {
    expect(currentRole([clio, naiber], '2027-01')).toBeUndefined();
    expect(currentRole([clio], '2026-04')).toBeUndefined();
  });

  it('prefers the most recently started active work role', () => {
    const older = entry({ company: 'Old', start: '2026-01', end: 'present' });
    expect(currentRole([older, clio], '2026-10')?.company).toBe('Clio');
  });
});

describe('groupByCompany', () => {
  it('orders companies by latest start and roles newest first', () => {
    const groups = groupByCompany([
      entry({ company: 'theScore', role: 'SWE', start: '2025-05', end: '2025-08' }),
      entry({ company: 'Clio', role: 'DE', start: '2026-05', end: '2026-12' }),
      entry({ company: 'theScore', role: 'DS', start: '2025-09', end: '2025-12' }),
    ]);
    expect(groups.map((g) => g.company)).toEqual(['Clio', 'theScore']);
    expect(groups[1]!.roles.map((r) => r.role)).toEqual(['DS', 'SWE']);
  });
});
