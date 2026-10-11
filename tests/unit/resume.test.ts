import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const SOURCE = '../resume/Kishan_Rajagunathas_Resume_SWE.pdf';
const TARGET = 'public/resume.pdf';
const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const sync = (env: Record<string, string>) =>
  spawnSync('node', ['scripts/sync-resume.mjs'], { env: { ...process.env, ...env }, encoding: 'utf8' });

describe('public/resume.pdf', () => {
  it('is committed and is a PDF', () => {
    expect(existsSync(TARGET)).toBe(true);
    expect(readFileSync(TARGET).subarray(0, 5).toString()).toBe('%PDF-');
  });

  // Only runs where the resume repo sits next to this one (Kishan's machine).
  it.skipIf(!existsSync(SOURCE))('matches the latest PDF in the resume folder (run npm run sync:resume)', () => {
    expect(sha(TARGET)).toBe(sha(SOURCE));
  });
});

describe('sync-resume script', () => {
  const dir = mkdtempSync(join(tmpdir(), 'resume-sync-'));

  it('copies a valid PDF to the target', () => {
    const src = join(dir, 'ok.pdf');
    const out = join(dir, 'out.pdf');
    writeFileSync(src, '%PDF-1.7\nfake body');
    execFileSync('node', ['scripts/sync-resume.mjs'], { env: { ...process.env, RESUME_PDF: src, RESUME_TARGET: out } });
    expect(readFileSync(out, 'utf8')).toBe('%PDF-1.7\nfake body');
  });

  it('fails loudly when the source is missing', () => {
    const res = sync({ RESUME_PDF: join(dir, 'nope.pdf'), RESUME_TARGET: join(dir, 'x.pdf') });
    expect(res.status).not.toBe(0);
    expect(res.stderr).toContain('not found');
    expect(existsSync(join(dir, 'x.pdf'))).toBe(false);
  });

  it('refuses a file that is not a PDF', () => {
    const src = join(dir, 'notes.txt');
    writeFileSync(src, 'hello');
    const res = sync({ RESUME_PDF: src, RESUME_TARGET: join(dir, 'y.pdf') });
    expect(res.status).not.toBe(0);
    expect(res.stderr).toContain('not a PDF');
    expect(existsSync(join(dir, 'y.pdf'))).toBe(false);
  });
});
