import { describe, expect, it } from 'vitest';
import { filterCommands, type CommandMatchable } from '../../src/lib/commands';

const commands: CommandMatchable[] = [
  { id: 'experience', label: 'Experience', keywords: 'work jobs clio thescore' },
  { id: 'projects', label: 'Projects', keywords: '' },
  { id: 'home-lab', label: 'home-lab', keywords: 'k3s kubernetes cluster' },
  { id: 'github', label: 'Open GitHub', keywords: 'code repos' },
  { id: 'theme', label: 'Toggle theme', keywords: 'dark light mode' },
];
const ids = (q: string) => filterCommands(commands, q).map((c) => c.id);

describe('filterCommands', () => {
  it('returns everything in original order for an empty or blank query', () => {
    expect(ids('')).toEqual(['experience', 'projects', 'home-lab', 'github', 'theme']);
    expect(ids('   ')).toEqual(['experience', 'projects', 'home-lab', 'github', 'theme']);
  });

  it('matches labels case-insensitively', () => {
    expect(ids('GITHUB')).toEqual(['github']);
  });

  it('matches keywords', () => {
    expect(ids('kubernetes')).toEqual(['home-lab']);
    expect(ids('dark')).toEqual(['theme']);
  });

  it('ranks label prefix matches above other matches', () => {
    // "pro" prefixes "Projects" and appears inside nothing else.
    expect(ids('pro')).toEqual(['projects']);
    // "e" prefixes "Experience" and is inside many others; prefix first, rest in original order.
    expect(ids('e')[0]).toBe('experience');
  });

  it('returns nothing when nothing matches', () => {
    expect(ids('zzz')).toEqual([]);
  });
});
