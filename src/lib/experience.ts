import type { Experience } from '../content/schemas';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatMonth(yearMonth: string): string {
  const [year, month] = yearMonth.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/**
 * Build month as YYYY-MM. PORTFOLIO_NOW pins it so tests do not change
 * outcome as the calendar moves (e.g. after the Clio term ends).
 */
export function buildMonth(): string {
  const pinned = process.env.PORTFOLIO_NOW;
  if (pinned) return pinned;
  return new Date().toISOString().slice(0, 7);
}

/** The active work role for the hero. Founder and leadership roles are listed elsewhere. */
export function currentRole(entries: Experience[], now: string): Experience | undefined {
  return entries
    .filter((e) => e.kind === 'work' && e.start <= now && (e.end === 'present' || e.end >= now))
    .sort((a, b) => b.start.localeCompare(a.start))[0];
}

export interface CompanyGroup {
  company: string;
  roles: Experience[];
}

/** Companies by most recent start; a company's roles newest first. */
export function groupByCompany(entries: Experience[]): CompanyGroup[] {
  const sorted = [...entries].sort((a, b) => b.start.localeCompare(a.start));
  const groups = new Map<string, Experience[]>();
  for (const e of sorted) {
    groups.set(e.company, [...(groups.get(e.company) ?? []), e]);
  }
  return [...groups].map(([company, roles]) => ({ company, roles }));
}
