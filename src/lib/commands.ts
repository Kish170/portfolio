// Shared between the build (rendering the list) and the browser (filtering it).

export interface CommandMatchable {
  id: string;
  label: string;
  /** Extra search terms, space separated, so "kubernetes" finds home-lab. */
  keywords: string;
}

export type CommandAction = 'navigate' | 'external' | 'copy' | 'theme';

export interface Command extends CommandMatchable {
  group: 'Sections' | 'Projects' | 'Actions';
  action: CommandAction;
  href?: string;
  value?: string;
}

/**
 * Case-insensitive substring match on label and keywords. Label-prefix
 * matches rank first; otherwise original order is kept so the list stays
 * predictable as you type.
 */
export function filterCommands<T extends CommandMatchable>(commands: T[], query: string): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return commands;
  const prefix: T[] = [];
  const rest: T[] = [];
  for (const c of commands) {
    const label = c.label.toLowerCase();
    if (label.startsWith(q)) prefix.push(c);
    else if (label.includes(q) || c.keywords.toLowerCase().includes(q)) rest.push(c);
  }
  return [...prefix, ...rest];
}
