// Copies the latest resume PDF into public/ so it ships at /resume.pdf.
//
// The PDF is committed rather than copied at build time because its source
// lives in a separate repo (../resume); a build that reached outside this
// repo would break on any other machine or in CI. A unit test fails when
// the two copies drift, prompting a re-run of `npm run sync:resume`.
//
// Override paths with RESUME_PDF (source) and RESUME_TARGET (destination).
import { copyFileSync, existsSync, readFileSync } from 'node:fs';

const source = process.env.RESUME_PDF ?? '../resume/Kishan_Rajagunathas_Resume_SWE.pdf';
const target = process.env.RESUME_TARGET ?? 'public/resume.pdf';

function main() {
  if (!existsSync(source)) {
    console.error(`Resume PDF not found at ${source}. Export it from the resume repo first.`);
    process.exit(1);
  }
  if (readFileSync(source).subarray(0, 5).toString() !== '%PDF-') {
    console.error(`${source} is not a PDF.`);
    process.exit(1);
  }
  copyFileSync(source, target);
  console.log(`Copied ${source} -> ${target}`);
}

main();
