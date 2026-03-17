#!/usr/bin/env node

/**
 * Obsidian -> Astro Parser for Advanced Algorithms Course
 *
 * Reads markdown files from the Obsidian vault and generates
 * Astro-compatible MDX files for the documentation site.
 *
 * Usage:
 *   node parse.mjs [--vault <path>] [--out <path>] [--dry-run]
 *
 * Defaults:
 *   --vault  /Users/neeldhara/repos/nm-obsidian/teaching/perpetual/iitgn-elective-advanced-algorithms/public
 *   --out    ./src/docs/data/docs/en
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── CLI args ──
const args = process.argv.slice(2);
function flag(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
const dryRun = args.includes("--dry-run");

const DEFAULT_VAULT = "/Users/neeldhara/repos/nm-obsidian/teaching/perpetual/iitgn-elective-advanced-algorithms/public";
const EDITIONS_VAULT = "/Users/neeldhara/repos/nm-obsidian/teaching/courses";
const PROBLEMS_VAULT = "/Users/neeldhara/repos/nm-obsidian/teaching/problems";
const VAULT = flag("vault", DEFAULT_VAULT);
const OUT = path.resolve(__dirname, flag("out", "./src/docs/data/docs/en"));
const EDITIONS_OUT = path.resolve(OUT, "editions");
const PROBLEMS_OUT = path.resolve(OUT, "problems");
const INTERACTIVES_OUT = path.resolve(__dirname, "./src/docs/components/interactives/interactives.json");
const COURSE_SLUG = "advalgo";

// Global registry of interactives (id -> description)
const interactiveRegistry = {};

// ── Helpers ──
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Clean output directory of section folders (preserves editions, problems, getting-started)
function cleanSectionFolders(outDir, preserveFolders = ["editions", "problems", "getting-started"]) {
  if (!fs.existsSync(outDir)) return;

  const entries = fs.readdirSync(outDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && !preserveFolders.includes(entry.name)) {
      const folderPath = path.join(outDir, entry.name);
      fs.rmSync(folderPath, { recursive: true, force: true });
    }
  }
}

// Extract order number from title like "2. Subset Sum" → 2
function extractOrderFromTitle(title) {
  const match = title.match(/^(\d+)\.\s*/);
  return match ? parseInt(match[1], 10) : null;
}

// ── Inline markdown for titles ──
// Converts basic inline markdown (bold, italic) to HTML
function inlineMarkdownTitle(text) {
  let result = text;
  // Bold: **text** or __text__
  result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  // Italic: *text* or _text_
  result = result.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  result = result.replace(/(?<![a-zA-Z0-9])_([^_]+)_(?![a-zA-Z0-9])/g, "<em>$1</em>");
  return result;
}

// ── Callout transformer ──
// Converts Obsidian callouts to HTML elements
// Supports collapsible syntax: [!note]- (collapsed), [!note]+ (expanded), [!note] (non-collapsible)
function transformCallouts(md) {
  const lines = md.split("\n");
  const out = [];
  let inCallout = false;
  let calloutType = "";
  let calloutTitle = "";
  let calloutBody = [];
  let calloutCollapsible = false; // null = not collapsible, 'closed' = collapsed, 'open' = expanded
  let calloutDefaultOpen = false;

  const typeMap = {
    note: "note",
    tip: "tip",
    warning: "caution",
    caution: "caution",
    danger: "danger",
    important: "tip",
    example: "note",
    question: "note",
    info: "note",
  };

  function flushCallout() {
    if (!inCallout) return;
    const body = calloutBody.join("\n").trim();
    const cssType = typeMap[calloutType] || "note";
    const rawTitle = calloutTitle || (calloutType.charAt(0).toUpperCase() + calloutType.slice(1));
    const titleText = inlineMarkdownTitle(rawTitle);

    if (calloutCollapsible) {
      // Use <details> for collapsible callouts
      const openAttr = calloutDefaultOpen ? " open" : "";
      out.push(`<details class="callout callout-${cssType}"${openAttr}>`);
      out.push(`<summary class="callout-title">${titleText}</summary>`);
      out.push(`<div class="callout-body">\n\n${body}\n\n</div>`);
      out.push(`</details>\n`);
    } else {
      // Use <div> for non-collapsible callouts
      out.push(`<div class="callout callout-${cssType}">`);
      out.push(`<div class="callout-title">${titleText}</div>`);
      out.push(`<div class="callout-body">\n\n${body}\n\n</div>`);
      out.push(`</div>\n`);
    }

    inCallout = false;
    calloutType = "";
    calloutTitle = "";
    calloutBody = [];
    calloutCollapsible = false;
    calloutDefaultOpen = false;
  }

  for (const line of lines) {
    // Match callout with optional +/- for collapsible state: [!type], [!type]+, [!type]-
    const calloutStart = line.match(/^>\s*\[!(\w+)\]([+-])?\s*(.*)/);
    if (calloutStart) {
      flushCallout();
      inCallout = true;
      calloutType = calloutStart[1].toLowerCase();
      const collapseMark = calloutStart[2]; // '+', '-', or undefined
      calloutTitle = calloutStart[3].trim();

      // Determine collapsibility
      if (collapseMark === '-') {
        calloutCollapsible = true;
        calloutDefaultOpen = false;
      } else if (collapseMark === '+') {
        calloutCollapsible = true;
        calloutDefaultOpen = true;
      } else {
        calloutCollapsible = false;
        calloutDefaultOpen = false;
      }
      continue;
    }

    if (inCallout && line.startsWith("> ")) {
      calloutBody.push(line.slice(2));
      continue;
    }
    if (inCallout && line === ">") {
      calloutBody.push("");
      continue;
    }

    if (inCallout) {
      flushCallout();
    }

    out.push(line);
  }

  flushCallout();
  return out.join("\n");
}

// ── Sidenote transformer ──
// Converts {sn: content} to numbered sidenotes and {mn: content} to margin notes
// On desktop these appear in the right margin, on mobile they collapse to footnotes
function transformSidenotes(md) {
  let sidenoteCounter = 0;
  let marginnoteCounter = 0;

  // Transform numbered sidenotes: {sn: content}
  let result = md.replace(/\{sn:\s*([^}]+)\}/g, (match, content) => {
    sidenoteCounter++;
    const id = `sn-${sidenoteCounter}`;
    return `<label for="${id}" class="sidenote-number"></label><input type="checkbox" id="${id}" class="sidenote-toggle"/><span class="sidenote">${content.trim()}</span>`;
  });

  // Transform margin notes (unnumbered but with toggle): {mn: content}
  result = result.replace(/\{mn:\s*([^}]+)\}/g, (match, content) => {
    marginnoteCounter++;
    const id = `mn-${marginnoteCounter}`;
    return `<label for="${id}" class="marginnote-number"></label><input type="checkbox" id="${id}" class="marginnote-toggle"/><span class="marginnote">${content.trim()}</span>`;
  });

  return result;
}

// ── Wikilink transformer ──
function transformWikilinks(md, currentSection) {
  return md.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (match, file, display) => {
    const text = display || file;
    const slug = file.replace(/\.md$/, "").split("/").pop();
    return `[${text}](./${slug}/)`;
  });
}

// ── Interactive transformer ──
// Replaces <<<ID>>> with a placeholder div that will be hydrated
function transformInteractives(md) {
  return md.replace(/<<<([a-zA-Z0-9_-]+)>>>/g, (match, id) => {
    return `<div class="interactive-embed" data-interactive-id="${id}"></div>`;
  });
}

// Check if content has interactives
function hasInteractives(md) {
  return /<<<[a-zA-Z0-9_-]+>>>/.test(md);
}

// ── Scan interactives folder ──
function scanInteractives(sectionDir) {
  const interactivesDir = path.join(sectionDir, "interactives");
  if (!fs.existsSync(interactivesDir)) return [];

  const files = fs.readdirSync(interactivesDir).filter(f => f.endsWith(".md"));
  const interactives = [];

  for (const file of files) {
    const filePath = path.join(interactivesDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const { frontmatter, body } = extractFrontmatter(content);

    if (frontmatter.id) {
      interactives.push({
        id: frontmatter.id,
        description: body.trim(),
        file: file,
      });
      // Add to global registry
      interactiveRegistry[frontmatter.id] = body.trim();
    }
  }

  return interactives;
}

// Note: We output .md files (not .md) to avoid JSX parsing issues with math expressions

// ── Footnote to Modal transformer ──
// Converts markdown footnotes to clickable modal triggers
function transformFootnotesToModals(md) {
  const footnotes = new Map();
  const lines = md.split('\n');
  const outputLines = [];
  let currentFootnoteId = null;
  let currentFootnoteContent = [];
  let inFootnoteSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for footnote definition start: [^id]: content
    const defMatch = line.match(/^\[\^([^\]]+)\]:\s*(.*)$/);

    if (defMatch) {
      // Save previous footnote if exists
      if (currentFootnoteId) {
        footnotes.set(currentFootnoteId, currentFootnoteContent.join('\n').trim());
      }

      currentFootnoteId = defMatch[1];
      currentFootnoteContent = defMatch[2] ? [defMatch[2]] : [];
      inFootnoteSection = true;
      continue;
    }

    // Check for continuation lines (indented with 4 spaces or tab)
    if (inFootnoteSection && (line.startsWith('    ') || line.startsWith('\t'))) {
      currentFootnoteContent.push(line.replace(/^(?:    |\t)/, ''));
      continue;
    }

    // Empty line might continue footnote or end it
    if (inFootnoteSection && line.trim() === '') {
      // Check if next line is indented (footnote continues) or new footnote
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (nextLine.startsWith('    ') || nextLine.startsWith('\t') || nextLine.match(/^\[\^/)) {
          currentFootnoteContent.push('');
          continue;
        }
      }
      // End of footnote section
      if (currentFootnoteId) {
        footnotes.set(currentFootnoteId, currentFootnoteContent.join('\n').trim());
        currentFootnoteId = null;
        currentFootnoteContent = [];
      }
      inFootnoteSection = false;
    }

    // Regular line - not part of footnote
    if (!inFootnoteSection) {
      outputLines.push(line);
    }
  }

  // Save last footnote if exists
  if (currentFootnoteId) {
    footnotes.set(currentFootnoteId, currentFootnoteContent.join('\n').trim());
  }

  if (footnotes.size === 0) return md;

  // Join output lines (footnote definitions removed)
  let result = outputLines.join('\n');

  // Replace footnote references with modal triggers
  result = result.replace(/\[\^([^\]]+)\]/g, (match, id) => {
    if (footnotes.has(id)) {
      return `<button class="footnote-modal-trigger" data-modal-id="${id}" aria-label="View details">ⓘ</button>`;
    }
    return match;
  });

  // Add modal containers at the end
  let modalsHtml = '\n\n<div class="footnote-modals">\n';
  for (const [id, content] of footnotes) {
    // Convert markdown content to simple HTML (basic conversion)
    let htmlContent = content
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\n/g, '<br>');

    modalsHtml += `<div class="footnote-modal" id="modal-${id}" role="dialog" aria-modal="true" aria-labelledby="modal-title-${id}">
  <div class="footnote-modal-content">
    <button class="footnote-modal-close" aria-label="Close">&times;</button>
    <div class="footnote-modal-body">${htmlContent}</div>
  </div>
</div>\n`;
  }
  modalsHtml += '</div>';

  // Clean up extra whitespace
  result = result.replace(/\n{3,}/g, '\n\n').trim();

  return result + modalsHtml;
}

// ── Main transformer pipeline ──
function transformMarkdown(md, currentSection) {
  let result = md;
  result = transformCallouts(result);
  result = transformWikilinks(result, currentSection);
  result = transformInteractives(result);
  result = transformSidenotes(result);
  result = result.replace(/\n{3,}/g, "\n\n");
  return result;
}

// ── Frontmatter extraction and generation ──
function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const fm = {};
  const lines = match[1].split("\n");
  for (const line of lines) {
    const kvMatch = line.match(/^(\w+):\s*"?([^"]*)"?$/);
    if (kvMatch) {
      fm[kvMatch[1]] = kvMatch[2];
    }
  }

  return { frontmatter: fm, body: match[2] };
}

// ── Extract frontmatter preserving all fields (for editions) ──
function extractFrontmatterRaw(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const fm = {};
  const lines = match[1].split("\n");
  for (const line of lines) {
    // Match key: value or key: "value"
    const kvMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (kvMatch) {
      let value = kvMatch[2].trim();
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      fm[kvMatch[1]] = value;
    }
  }

  return { frontmatter: fm, body: match[2] };
}

// ── Transform flat frontmatter to nested (for editions) ──
function transformEditionsFrontmatter(fm) {
  const result = {};

  // Direct copy fields
  if (fm.title) result.title = fm.title;
  if (fm.description) result.description = fm.description;
  if (fm.tab) result.section = fm.tab; // tab becomes section

  // Summary nested object
  if (fm["summary-title"] || fm["summary-content"] || fm["summary-variant"]) {
    result.summary = {};
    if (fm["summary-title"]) result.summary.title = fm["summary-title"];
    if (fm["summary-content"]) result.summary.content = fm["summary-content"];
    if (fm["summary-variant"]) result.summary.variant = fm["summary-variant"];
  }

  // Sidebar nested object
  if (fm["sidebar-order"] || fm["sidebar-badge-text"] || fm["sidebar-label"]) {
    result.sidebar = {};
    if (fm["sidebar-order"]) result.sidebar.order = parseInt(fm["sidebar-order"], 10);
    if (fm["sidebar-label"]) result.sidebar.label = fm["sidebar-label"];
    if (fm["sidebar-badge-text"] || fm["sidebar-badge-variant"]) {
      result.sidebar.badge = {};
      if (fm["sidebar-badge-text"]) result.sidebar.badge.text = fm["sidebar-badge-text"];
      if (fm["sidebar-badge-variant"]) result.sidebar.badge.variant = fm["sidebar-badge-variant"];
    }
  }

  // TableOfContents nested object
  if (fm["tableOfContents-minHeadingLevel"] || fm["tableOfContents-maxHeadingLevel"]) {
    result.tableOfContents = {};
    if (fm["tableOfContents-minHeadingLevel"]) {
      result.tableOfContents.minHeadingLevel = parseInt(fm["tableOfContents-minHeadingLevel"], 10);
    }
    if (fm["tableOfContents-maxHeadingLevel"]) {
      result.tableOfContents.maxHeadingLevel = parseInt(fm["tableOfContents-maxHeadingLevel"], 10);
    }
  }

  return result;
}

// ── Generate nested YAML frontmatter ──
function generateNestedFrontmatter(fm, opts = {}) {
  const lines = ["---"];

  if (fm.title) lines.push(`title: "${fm.title}"`);
  if (fm.description) lines.push(`description: "${fm.description}"`);
  if (fm.section) lines.push(`section: ${fm.section}`);
  if (opts.hideTitle) lines.push(`hideTitle: true`);

  if (fm.summary) {
    lines.push("summary:");
    if (fm.summary.title) lines.push(`  title: "${fm.summary.title}"`);
    if (fm.summary.content) lines.push(`  content: "${fm.summary.content}"`);
    if (fm.summary.variant) lines.push(`  variant: "${fm.summary.variant}"`);
  }

  if (fm.sidebar) {
    lines.push("sidebar:");
    if (fm.sidebar.order !== undefined) lines.push(`  order: ${fm.sidebar.order}`);
    if (fm.sidebar.label) lines.push(`  label: "${fm.sidebar.label}"`);
    if (fm.sidebar.badge) {
      lines.push("  badge:");
      if (fm.sidebar.badge.text) lines.push(`    text: "${fm.sidebar.badge.text}"`);
      if (fm.sidebar.badge.variant) lines.push(`    variant: "${fm.sidebar.badge.variant}"`);
    }
  }

  // Handle tableOfContents:
  // - Skip if set to level 6 (which hides it)
  // - Use sensible defaults for editions
  if (fm.tableOfContents && !opts.skipTableOfContents) {
    const min = fm.tableOfContents.minHeadingLevel;
    const max = fm.tableOfContents.maxHeadingLevel;
    // Only include if not set to hide (level 6)
    if (!(min === 6 && max === 6)) {
      lines.push("tableOfContents:");
      if (min !== undefined) {
        lines.push(`  minHeadingLevel: ${min}`);
      }
      if (max !== undefined) {
        lines.push(`  maxHeadingLevel: ${max}`);
      }
    }
    // If both are 6 (hidden), we skip the tableOfContents entirely
    // so the default TOC behavior applies (which shows headings 2-3)
  }

  lines.push("---");
  return lines.join("\n");
}

// ── Recursively find public.md files with course-slug ──
function findEditionsFiles(dir, courseSlug) {
  const results = [];

  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) return;

    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name === "public.md") {
        // Check if this file has the matching course-slug
        const content = fs.readFileSync(fullPath, "utf-8");
        const { frontmatter } = extractFrontmatterRaw(content);

        if (frontmatter["course-slug"] === courseSlug) {
          // Get the parent directory name (course ID) and grandparent (year) for unique slug
          const parentDir = path.basename(path.dirname(fullPath));
          const grandparentDir = path.basename(path.dirname(path.dirname(fullPath)));
          // Create slug like "2019-01-CS614" to avoid collisions
          const editionSlug = `${grandparentDir}-${parentDir}`;
          // Extract year for automatic ordering (newer years = lower order = appear first)
          const year = parseInt(grandparentDir, 10) || 0;
          results.push({
            path: fullPath,
            editionSlug,
            year,
            content,
            frontmatter
          });
        }
      }
    }
  }

  walk(dir);
  return results;
}

function generateFrontmatter(fm, opts = {}) {
  const lines = ["---"];

  if (fm.title) lines.push(`title: "${fm.title}"`);
  if (fm.description) lines.push(`description: "${fm.description}"`);

  // Add section for tab association
  lines.push(`section: main`);

  // Add sidebar configuration
  if (opts.sidebarOrder !== undefined) {
    lines.push(`sidebar:`);
    lines.push(`  order: ${opts.sidebarOrder}`);
    if (opts.sidebarLabel) {
      lines.push(`  label: "${opts.sidebarLabel}"`);
    }
  }

  lines.push("---");
  return lines.join("\n");
}

// ── Walk the vault ──
function findSections(vaultDir) {
  const sections = [];

  const dirs = fs.readdirSync(vaultDir).filter((d) => {
    const fullPath = path.join(vaultDir, d);
    return fs.statSync(fullPath).isDirectory() && /^\d{2}-/.test(d);
  });

  dirs.sort((a, b) => {
    const numA = parseInt(a.split("-")[0], 10);
    const numB = parseInt(b.split("-")[0], 10);
    return numA - numB;
  });

  for (const dir of dirs) {
    const sectionDir = path.join(vaultDir, dir);
    const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith(".md"));

    const match = dir.match(/^(\d{2})-(.+)$/);
    if (!match) continue;

    const sectionNum = parseInt(match[1], 10);
    const sectionSlug = match[2];

    sections.push({
      dir,
      sectionDir,
      sectionNum,
      sectionSlug,
      files,
    });
  }

  return sections;
}

// ── Process ──
console.log(`📖 Reading vault: ${VAULT}`);
console.log(`📝 Output to:     ${OUT}`);
if (dryRun) console.log("🔍 Dry run mode — no files will be written.\n");

const sections = findSections(VAULT);
console.log(`Found ${sections.length} sections.\n`);

// Clean old section folders before processing (prevents stale content from renamed folders)
if (!dryRun) {
  cleanSectionFolders(OUT);
}

let successCount = 0;
let errorCount = 0;
const sectionSummary = [];

for (const section of sections) {
  console.log(`\n📁 Section ${section.sectionNum}: ${section.sectionSlug}`);

  // Scan interactives folder
  const interactives = scanInteractives(section.sectionDir);
  if (interactives.length > 0) {
    console.log(`  🎮 Found ${interactives.length} interactive(s): ${interactives.map(i => i.id).join(", ")}`);
  }

  // Output directly to docs/en/<section-folder>/ (not under lecture-notes)
  const outDir = path.join(OUT, section.dir);

  if (!dryRun) {
    ensureDir(outDir);
  }

  const sectionFile = section.files.find((f) => f === "section.md");
  const topicFiles = section.files.filter((f) => f !== "section.md");

  let sectionTitle = section.sectionSlug;

  // Process section.md as index.md
  if (sectionFile) {
    const inputPath = path.join(section.sectionDir, sectionFile);
    const raw = fs.readFileSync(inputPath, "utf-8");
    const { frontmatter: fm, body } = extractFrontmatter(raw);

    sectionTitle = fm.title || section.sectionSlug;

    const transformed = transformMarkdown(body, section.sectionSlug);

    // Use "Overview" as the label for section index pages
    const newFm = generateFrontmatter(
      {
        title: fm.title || section.sectionSlug,
        description: `${fm.title || section.sectionSlug} - Advanced Algorithms`
      },
      {
        sidebarOrder: 0,
        sidebarLabel: "Overview"
      }
    );

    const output = `${newFm}\n\n${transformed}`;
    const outPath = path.join(outDir, "index.md");

    if (dryRun) {
      console.log(`  Would write: index.md (${output.length} bytes)`);
    } else {
      fs.writeFileSync(outPath, output);
      console.log(`  ✓ index.md`);
    }
    successCount++;
  }

  // Process topic files
  let fallbackOrder = 1;
  for (const file of topicFiles) {
    const inputPath = path.join(section.sectionDir, file);
    const raw = fs.readFileSync(inputPath, "utf-8");
    const { frontmatter: fm, body } = extractFrontmatter(raw);

    if (!fm.title) {
      console.warn(`  ⚠️  Skipping ${file} — no title in frontmatter`);
      errorCount++;
      continue;
    }

    const transformed = transformMarkdown(body, section.sectionSlug);

    // Extract order from title (e.g., "2. Subset Sum" → 2), fallback to sequential
    const titleOrder = extractOrderFromTitle(fm.title);
    const sidebarOrder = titleOrder !== null ? titleOrder : fallbackOrder;

    const newFm = generateFrontmatter(
      {
        title: fm.title,
        description: `${fm.title} - Advanced Algorithms`,
      },
      {
        sidebarOrder: sidebarOrder,
        sidebarLabel: fm.title
      }
    );

    const output = `${newFm}\n\n${transformed}`;
    const basename = path.basename(file, ".md");
    const outPath = path.join(outDir, `${basename}.md`);

    if (dryRun) {
      console.log(`  Would write: ${basename}.md (${output.length} bytes, order: ${sidebarOrder})`);
    } else {
      fs.writeFileSync(outPath, output);
      console.log(`  ✓ ${basename}.md (order: ${sidebarOrder})`);
    }
    successCount++;
    fallbackOrder++;
  }

  sectionSummary.push({
    num: section.sectionNum,
    slug: section.sectionSlug,
    dir: section.dir,
    title: sectionTitle,
    topics: topicFiles.length
  });
}

// Print summary
console.log(`\n${"─".repeat(50)}`);
console.log(`\n✅ Done: ${successCount} files processed, ${errorCount} errors.\n`);
console.log("Section Summary:");
for (const s of sectionSummary) {
  console.log(`  ${s.num}. ${s.title} (${s.topics} topics) -> ${s.dir}/`);
}

// Print sidebar config helper
console.log(`\n${"─".repeat(50)}`);
console.log("\nSidebar config sections (copy to sidebarNavData.json.ts):\n");
for (const s of sectionSummary) {
  console.log(`        {`);
  console.log(`          id: "${s.dir}",`);
  console.log(`          title: "${s.num}. ${s.title}",`);
  console.log(`        },`);
}

// Output interactives registry
const interactiveCount = Object.keys(interactiveRegistry).length;
if (interactiveCount > 0) {
  console.log(`\n${"─".repeat(50)}`);
  console.log(`\n🎮 Interactives Registry: ${interactiveCount} interactive(s) found\n`);
  for (const [id, desc] of Object.entries(interactiveRegistry)) {
    const shortDesc = desc.length > 60 ? desc.slice(0, 60) + "..." : desc;
    console.log(`  - ${id}: ${shortDesc}`);
  }

  if (!dryRun) {
    fs.writeFileSync(INTERACTIVES_OUT, JSON.stringify(interactiveRegistry, null, 2));
    console.log(`\n  ✓ Written to ${INTERACTIVES_OUT}`);
  }
}

// ── Process Editions ──
console.log(`\n${"─".repeat(50)}`);
console.log(`\n📚 Processing Editions (course-slug: ${COURSE_SLUG})`);
console.log(`   Searching in: ${EDITIONS_VAULT}\n`);

const editionsFiles = findEditionsFiles(EDITIONS_VAULT, COURSE_SLUG);

if (editionsFiles.length > 0) {
  if (!dryRun) {
    ensureDir(EDITIONS_OUT);
  }

  console.log(`   Found ${editionsFiles.length} edition(s):\n`);

  // Sort editions by year descending (newest first) for consistent output
  editionsFiles.sort((a, b) => b.year - a.year);

  for (const edition of editionsFiles) {
    const { frontmatter: rawFm, body } = extractFrontmatterRaw(edition.content);

    // Transform flat frontmatter to nested
    const nestedFm = transformEditionsFrontmatter(rawFm);

    // Auto-compute sidebar order from year (newer years = lower order = appear first)
    // Using 3000 - year so 2026 → 974, 2019 → 981, 2027 → 973
    if (!nestedFm.sidebar) nestedFm.sidebar = {};
    nestedFm.sidebar.order = 3000 - edition.year;

    // Transform content (including footnotes to modals)
    let transformed = transformMarkdown(body, "editions");
    transformed = transformFootnotesToModals(transformed);

    // Generate new frontmatter
    const newFm = generateNestedFrontmatter(nestedFm, { hideTitle: true });

    const output = `${newFm}\n\n${transformed}`;
    const outPath = path.join(EDITIONS_OUT, `${edition.editionSlug}.md`);

    if (dryRun) {
      console.log(`   Would write: ${edition.editionSlug}.md`);
      console.log(`     From: ${edition.path}`);
    } else {
      fs.writeFileSync(outPath, output);
      console.log(`   ✓ ${edition.editionSlug}.md`);
      console.log(`     Title: ${nestedFm.title || "(no title)"}`);
    }
    successCount++;
  }
} else {
  console.log(`   No editions found with course-slug: ${COURSE_SLUG}`);
}

// ══════════════════════════════════════════════════════════════════════════════
// QUIZVAULT QUESTION PARSER (adapted from quizvault/packages/shared)
// ══════════════════════════════════════════════════════════════════════════════

// ── Markdown to HTML converter ──
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineFormat(text) {
  const placeholders = [];
  let temp = text;

  // Display math: $$...$$
  temp = temp.replace(/\$\$([\s\S]+?)\$\$/g, (_match, inner) => {
    const idx = placeholders.length;
    placeholders.push(`<div class="katex-display">$$${inner}$$</div>`);
    return `\x00PH${idx}\x00`;
  });

  // Inline math: $...$
  temp = temp.replace(/(?<!\$)\$(?!\$)([^$\n]+)\$(?!\$)/g, (_match, inner) => {
    const idx = placeholders.length;
    placeholders.push(`<span class="katex-inline">$${inner}$</span>`);
    return `\x00PH${idx}\x00`;
  });

  // Inline code: `code`
  temp = temp.replace(/`([^`]+)`/g, (_match, inner) => {
    const idx = placeholders.length;
    placeholders.push(`<code>${escapeHtml(inner)}</code>`);
    return `\x00PH${idx}\x00`;
  });

  let result = escapeHtml(temp);

  // Images: ![alt](src)
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // Links: [text](url)
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Bold: **text**
  result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/__([^_]+)__/g, "<strong>$1</strong>");

  // Italic: *text*
  result = result.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  result = result.replace(/(?<!\w)_([^_]+)_(?!\w)/g, "<em>$1</em>");

  // Line breaks
  result = result.replace(/\n/g, "<br />");

  // Restore placeholders
  result = result.replace(/\x00PH(\d+)\x00/g, (_match, idx) => placeholders[parseInt(idx)]);

  return result;
}

function mdToHtml(md) {
  if (!md || !md.trim()) return "";

  const lines = md.split("\n");
  const output = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block (fenced)
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      i++;
      const langAttr = lang ? ` class="language-${lang}"` : "";
      output.push(`<pre><code${langAttr}>${codeLines.join("\n")}</code></pre>`);
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      output.push(`<h${level}>${inlineFormat(headingMatch[2])}</h${level}>`);
      i++;
      continue;
    }

    // Unordered list
    if (line.trim().match(/^[-*]\s+/)) {
      const items = [];
      while (i < lines.length && lines[i].trim().match(/^[-*]\s+/)) {
        items.push(`<li>${inlineFormat(lines[i].trim().replace(/^[-*]\s+/, ""))}</li>`);
        i++;
      }
      output.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    // Ordered list
    if (line.trim().match(/^\d+\.\s+/)) {
      const items = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s+/)) {
        items.push(`<li>${inlineFormat(lines[i].trim().replace(/^\d+\.\s+/, ""))}</li>`);
        i++;
      }
      output.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    // Horizontal rule
    if (line.trim().match(/^(-{3,}|\*{3,}|_{3,})$/)) {
      output.push(`<hr />`);
      i++;
      continue;
    }

    // Blockquote (but skip callouts)
    if (line.trim().startsWith("> ") && !line.trim().match(/^>\s*\[!/)) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith("> ") && !lines[i].trim().match(/^>\s*\[!/)) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      output.push(`<blockquote>${inlineFormat(quoteLines.join("\n"))}</blockquote>`);
      continue;
    }

    // Skip callouts
    if (line.trim().match(/^>\s*\[!/)) {
      i++;
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        i++;
      }
      continue;
    }

    // Paragraph
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().match(/^#{1,6}\s+/) &&
      !lines[i].trim().match(/^[-*]\s+/) &&
      !lines[i].trim().match(/^\d+\.\s+/) &&
      !lines[i].trim().startsWith("> ")
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      output.push(`<p>${inlineFormat(paraLines.join("\n"))}</p>`);
    }
  }

  return output.join("\n");
}

// ── Section Splitting ──
function splitSections(body) {
  const sections = new Map();
  const lines = body.split("\n");
  let currentSection = "_body";
  let lastPartSection = null;
  let buffer = [];

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      sections.set(currentSection, buffer.join("\n"));
      const sectionKey = headingMatch[1].toLowerCase().trim();

      if (/^part\s+[a-z0-9]+$/i.test(sectionKey)) {
        lastPartSection = sectionKey;
        currentSection = sectionKey;
      } else if (sectionKey === "options" && lastPartSection) {
        currentSection = lastPartSection;
        const existing = sections.get(lastPartSection) ?? "";
        buffer = [existing, ""];
        continue;
      } else {
        lastPartSection = null;
        currentSection = sectionKey;
      }
      buffer = [];
    } else {
      buffer.push(line);
    }
  }
  sections.set(currentSection, buffer.join("\n"));
  return sections;
}

// ── Option Parsing ──
function splitOptionFeedback(raw) {
  const sepIdx = raw.indexOf(" >>> ");
  if (sepIdx === -1) return { text: raw.trim() };
  const text = raw.slice(0, sepIdx).trim();
  const feedback = raw.slice(sepIdx + 5).trim();
  return feedback ? { text, feedback } : { text };
}

function parseOptions(optionsRaw) {
  if (!optionsRaw.trim()) return null;

  const lines = optionsRaw.trim().split("\n");
  const structured = [];
  const plain = [];
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let structuredIdx = 0;
  let plainIdx = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.startsWith("-")) continue;

    // Checkbox style: - [x] or - [ ]
    const checkboxMatch = trimmed.match(/^-\s+\[([ xX])\]\s+(.+)$/);
    if (checkboxMatch) {
      const isCorrect = checkboxMatch[1].toLowerCase() === "x";
      const { text, feedback } = splitOptionFeedback(checkboxMatch[2]);
      const opt = {
        label: labels[structuredIdx] || `${structuredIdx + 1}`,
        text,
        isCorrect,
      };
      if (feedback) opt.feedback = feedback;
      structured.push(opt);
      structuredIdx++;
      continue;
    }

    // Letter-label style: - (A) text or - A) text
    const letterMatch = trimmed.match(/^-\s+\(?([A-Za-z])\)?\s+(.+)$/);
    if (letterMatch) {
      const { text, feedback } = splitOptionFeedback(letterMatch[2]);
      const opt = {
        label: letterMatch[1].toUpperCase(),
        text,
        isCorrect: false,
      };
      if (feedback) opt.feedback = feedback;
      structured.push(opt);
      structuredIdx++;
      continue;
    }

    // Plain list item
    const plainMatch = trimmed.match(/^-\s+(.+)$/);
    if (plainMatch) {
      const { text, feedback } = splitOptionFeedback(plainMatch[1]);
      const opt = {
        label: labels[plainIdx] || `${plainIdx + 1}`,
        text,
        isCorrect: false,
      };
      if (feedback) opt.feedback = feedback;
      plain.push(opt);
      plainIdx++;
    }
  }

  if (structured.length > 0) return structured;
  return plain.length > 0 ? plain : null;
}

// ── Callout Extraction ──
function extractAllCallouts(body, calloutType) {
  const results = [];
  const lines = body.split("\n");
  let i = 0;

  while (i < lines.length) {
    const headerMatch = lines[i].match(new RegExp(`^>\\s*\\[!${calloutType}\\](.*)$`, "i"));
    if (headerMatch) {
      const contentLines = [];
      const titleText = headerMatch[1]?.trim();
      if (titleText) contentLines.push(titleText);
      i++;
      while (i < lines.length && lines[i].match(/^>/)) {
        contentLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      const content = contentLines.join("\n").trim();
      if (content) results.push(content);
    } else {
      i++;
    }
  }
  return results;
}

function stripCallouts(body, calloutType) {
  const lines = body.split("\n");
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const headerMatch = lines[i].match(new RegExp(`^>\\s*\\[!${calloutType}\\]`, "i"));
    if (headerMatch) {
      i++;
      while (i < lines.length && lines[i].match(/^>/)) i++;
      if (i < lines.length && lines[i].trim() === "") i++;
    } else {
      result.push(lines[i]);
      i++;
    }
  }
  return result.join("\n");
}

function stripCalloutsOutsideParts(body, calloutType) {
  const lines = body.split("\n");
  const result = [];
  let insidePart = false;
  let i = 0;

  while (i < lines.length) {
    const headingMatch = lines[i].match(/^##\s+(.+)$/);
    if (headingMatch) {
      const sectionKey = headingMatch[1].toLowerCase().trim();
      if (/^part\s+[a-z0-9]+$/i.test(sectionKey)) {
        insidePart = true;
      } else if (sectionKey === "options" && insidePart) {
        // stay inside part
      } else {
        insidePart = false;
      }
      result.push(lines[i]);
      i++;
      continue;
    }

    if (insidePart) {
      result.push(lines[i]);
      i++;
      continue;
    }

    const headerMatch = lines[i].match(new RegExp(`^>\\s*\\[!${calloutType}\\]`, "i"));
    if (headerMatch) {
      i++;
      while (i < lines.length && lines[i].match(/^>/)) i++;
      if (i < lines.length && lines[i].trim() === "") i++;
    } else {
      result.push(lines[i]);
      i++;
    }
  }
  return result.join("\n");
}

// ── Multi-Part Parsing ──
function parseMultiPartSections(sections) {
  const parts = [];
  const partPattern = /^part\s+([a-z0-9]+)$/i;

  for (const [key, content] of sections) {
    const match = key.match(partPattern);
    if (!match) continue;

    const label = match[1].toUpperCase();
    const rawPartBody = content.trim();

    const partSolutionCallouts = extractAllCallouts(rawPartBody, "solution");
    const partExplanation = partSolutionCallouts.length > 0 ? partSolutionCallouts.join("\n\n") : null;

    let partBody = rawPartBody;
    for (const ct of ["solution", "hint", "feedback", "rubric"]) {
      partBody = stripCallouts(partBody, ct);
    }
    // Remove horizontal rule separators between parts
    partBody = partBody
      .split("\n")
      .filter((l) => !l.trim().match(/^(-{3,}|\*{3,}|_{3,})$/))
      .join("\n")
      .trim();

    const partOptions = parseOptions(partBody);
    let partCorrect = null;
    let bodyText = partBody;

    if (partOptions && partOptions.length > 0) {
      bodyText = partBody
        .split("\n")
        .filter((l) => {
          const t = l.trim();
          // Filter out option lines
          if (t.match(/^-\s+\[[ xX]\]\s+/)) return false;
          if (t.match(/^-\s+\(?[A-Za-z]\)?\s+/)) return false;
          // Filter out horizontal rules (separators between parts)
          if (t.match(/^(-{3,}|\*{3,}|_{3,})$/)) return false;
          return true;
        })
        .join("\n")
        .trim();

      if (partOptions.some((o) => o.isCorrect)) {
        partCorrect = partOptions.filter((o) => o.isCorrect).map((o) => o.label).join(",");
      }
    }

    const partType = partOptions ? inferQuestionType(partOptions, partCorrect) : "long_answer";

    parts.push({
      label,
      body: bodyText,
      type: partType,
      options: partOptions,
      correctAnswer: partCorrect,
      explanation: partExplanation,
    });
  }

  return parts.length > 0 ? parts : null;
}

// ── Type Inference ──
function inferQuestionType(options, correctAnswer) {
  if (options && options.length > 0) {
    const correctCount = options.filter((o) => o.isCorrect).length;
    if (correctCount > 1) return "msq";
    return "mcq";
  }
  if (correctAnswer) {
    const num = Number(correctAnswer);
    if (!isNaN(num) && correctAnswer.trim() !== "") return "numeric";
    if (correctAnswer.length < 100) return "short_answer";
  }
  return "long_answer";
}

// ── Parse Question Markdown ──
function parseQuestionMarkdown(fileContent, filePath) {
  const { data: frontmatter, content: rawBody } = matter(fileContent);

  const solutionCallout = extractAllCallouts(rawBody, "solution");
  const hintCallouts = extractAllCallouts(rawBody, "hint");

  let cleanedBody = rawBody;
  for (const ct of ["solution", "hint", "feedback", "rubric"]) {
    cleanedBody = stripCalloutsOutsideParts(cleanedBody, ct);
  }

  // Convert Obsidian wikilink images
  cleanedBody = cleanedBody.replace(/!\[\[([^\]]+)\]\]/g, (_, name) => `![${name.replace(/\.[^.]+$/, "")}](${name})`);

  const sections = splitSections(cleanedBody);
  const parts = parseMultiPartSections(sections);

  // Get main body and filter out horizontal rule separators
  const rawQuestionBody = sections.get("_body") ?? "";
  const questionBody = rawQuestionBody
    .split("\n")
    .filter((l) => !l.trim().match(/^(-{3,}|\*{3,}|_{3,})$/))
    .join("\n");
  const optionsRaw = sections.get("options") ?? "";
  const answerRaw = sections.get("answer") ?? "";
  const explanationRaw = sections.get("explanation") ?? sections.get("solution") ?? "";

  const options = parseOptions(optionsRaw);

  let correctAnswer = null;
  if (options && options.some((o) => o.isCorrect)) {
    correctAnswer = options.filter((o) => o.isCorrect).map((o) => o.label).join(",");
  } else if (answerRaw.trim()) {
    correctAnswer = answerRaw.trim();
  }

  let explanation = explanationRaw.trim() || null;
  if (!explanation && solutionCallout.length > 0) {
    explanation = solutionCallout.join("\n\n");
  }

  let hints = null;
  if (hintCallouts.length > 0) hints = hintCallouts;

  const explicitType = frontmatter.type?.toLowerCase();
  let questionType;
  if (parts && parts.length > 0) {
    questionType = explicitType ?? "multi_part";
  } else {
    questionType = explicitType ?? inferQuestionType(options, correctAnswer);
  }

  const title = frontmatter.title || filePath.split("/").pop()?.replace(/\.md$/, "") || "Untitled";
  const bodyHtml = mdToHtml(questionBody.trim());
  const explanationHtml = explanation ? mdToHtml(explanation) : null;

  return {
    title,
    body: questionBody.trim(),
    bodyHtml,
    questionType,
    options: options && options.length > 0 ? options : null,
    correctAnswer,
    explanation,
    explanationHtml,
    hints,
    parts: parts && parts.length > 0 ? parts : null,
    difficulty: frontmatter.difficulty ?? null,
    topic: frontmatter.topic ?? null,
  };
}

// ── Generate Interactive Problem HTML ──
function generateProblemHtml(parsed, problemId) {
  const parts = [];

  // Question body
  parts.push(`<div class="problem-body">${parsed.bodyHtml}</div>`);

  // Handle multi-part questions
  if (parsed.parts && parsed.parts.length > 0) {
    for (const part of parsed.parts) {
      const partId = `${problemId}-part-${part.label}`;
      parts.push(`<div class="problem-part" id="${partId}">`);
      parts.push(`<h4>Part ${part.label}</h4>`);
      parts.push(`<div class="part-body">${mdToHtml(part.body)}</div>`);

      if (part.options && part.options.length > 0) {
        parts.push(generateOptionsHtml(part.options, partId, part.type, part.correctAnswer));
      }

      if (part.explanation) {
        parts.push(`<div class="solution hidden" data-for="${partId}">`);
        parts.push(`<strong>Solution:</strong> ${mdToHtml(part.explanation)}`);
        parts.push(`</div>`);
      }
      parts.push(`</div>`);
    }
  } else if (parsed.options && parsed.options.length > 0) {
    // Single question with options
    parts.push(generateOptionsHtml(parsed.options, problemId, parsed.questionType, parsed.correctAnswer));
  }

  // Hints
  if (parsed.hints && parsed.hints.length > 0) {
    parts.push(`<details class="problem-hints">`);
    parts.push(`<summary>Hints</summary>`);
    parts.push(`<ol>`);
    for (const hint of parsed.hints) {
      parts.push(`<li>${mdToHtml(hint)}</li>`);
    }
    parts.push(`</ol></details>`);
  }

  // Solution/Explanation (for non-multi-part) - hidden until correct answer
  if (parsed.explanationHtml && !parsed.parts) {
    parts.push(`<div class="solution hidden" data-for="${problemId}">`);
    parts.push(`<strong>Solution:</strong> ${parsed.explanationHtml}`);
    parts.push(`</div>`);
  }

  return parts.join("\n");
}

function generateOptionsHtml(options, questionId, questionType, correctAnswer) {
  const isMultiple = questionType === "msq";
  const inputType = isMultiple ? "checkbox" : "radio";
  const correctSet = new Set((correctAnswer || "").split(",").map(s => s.trim()));

  const parts = [];
  parts.push(`<form class="problem-options" data-question-id="${questionId}" data-correct="${correctAnswer || ""}" data-type="${questionType}">`);
  parts.push(`<div class="options-list">`);

  for (const opt of options) {
    const optId = `${questionId}-opt-${opt.label}`;
    parts.push(`<label class="option-label" data-label="${opt.label}">`);
    parts.push(`<input type="${inputType}" name="${questionId}" value="${opt.label}" />`);
    parts.push(`<span class="option-marker">${opt.label}</span>`);
    parts.push(`<span class="option-text">${mdToHtml(opt.text)}`);
    if (opt.feedback) {
      parts.push(`<span class="option-feedback hidden">${mdToHtml(opt.feedback)}</span>`);
    }
    parts.push(`</span>`);
    parts.push(`</label>`);
  }

  parts.push(`</div>`);
  parts.push(`<div class="problem-actions">`);
  parts.push(`<button type="button" class="check-answer-btn">Check Answer</button>`);
  parts.push(`<span class="answer-feedback"></span>`);
  parts.push(`</div>`);
  parts.push(`</form>`);

  return parts.join("\n");
}

// ── Find problems ──
function findProblems(dir, courseSlug) {
  const results = [];

  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const problemFile = path.join(dir, entry.name, "problem.md");
    if (!fs.existsSync(problemFile)) continue;

    const content = fs.readFileSync(problemFile, "utf-8");
    const { data: fm, content: body } = matter(content);

    // Filter by course-slug frontmatter
    if (fm["course-slug"] === courseSlug) {
      results.push({
        slug: entry.name,
        path: problemFile,
        frontmatter: fm,
        body,
        folder: path.join(dir, entry.name)
      });
    }
  }

  return results;
}

// ── Generate topic slug ──
function topicToSlug(topic) {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ── Process Problems ──
console.log(`\n${"─".repeat(50)}`);
console.log(`\n📝 Processing Problems (course-slug: ${COURSE_SLUG})`);
console.log(`   Searching in: ${PROBLEMS_VAULT}\n`);

const problems = findProblems(PROBLEMS_VAULT, COURSE_SLUG);

// Clean old problem topic folders before processing (preserves index.mdx)
if (!dryRun && fs.existsSync(PROBLEMS_OUT)) {
  const entries = fs.readdirSync(PROBLEMS_OUT, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      fs.rmSync(path.join(PROBLEMS_OUT, entry.name), { recursive: true, force: true });
    }
  }
}

if (problems.length > 0) {
  // Group by topic
  const byTopic = {};
  for (const prob of problems) {
    const topic = prob.frontmatter.topic || "Uncategorized";
    if (!byTopic[topic]) byTopic[topic] = [];
    byTopic[topic].push(prob);
  }

  const topics = Object.keys(byTopic).sort();
  console.log(`   Found ${problems.length} problem(s) across ${topics.length} topic(s):\n`);

  if (!dryRun) {
    ensureDir(PROBLEMS_OUT);
  }

  // Track topic info for sidebar config
  const topicSummary = [];
  let topicOrder = 1;

  for (const topic of topics) {
    const topicSlug = topicToSlug(topic);
    const topicProblems = byTopic[topic];
    const topicDir = path.join(PROBLEMS_OUT, topicSlug);

    if (!dryRun) {
      ensureDir(topicDir);
    }

    console.log(`   📂 ${topic} (${topicProblems.length} problems)`);

    // Generate topic index page with list of problems
    const problemLinks = topicProblems
      .sort((a, b) => (a.frontmatter.title || a.slug).localeCompare(b.frontmatter.title || b.slug))
      .map(p => `- [${p.frontmatter.title || p.slug}](./${p.slug}/)`)
      .join("\n");

    const topicIndexFm = `---
title: "${topic}"
description: "Problems on ${topic}"
section: problems
sidebar:
  order: ${topicOrder}
  label: "${topic}"
---`;

    const topicIndexContent = `${topicIndexFm}

${problemLinks}
`;

    const topicIndexPath = path.join(topicDir, "index.md");
    if (dryRun) {
      console.log(`      Would write: ${topicSlug}/index.md`);
    } else {
      fs.writeFileSync(topicIndexPath, topicIndexContent);
      console.log(`      ✓ ${topicSlug}/index.md`);
    }

    // Generate individual problem pages (no sidebar entry - only topic pages show in sidebar)
    for (const prob of topicProblems) {
      // Read the full file content for proper parsing
      const fullContent = fs.readFileSync(prob.path, "utf-8");
      const parsed = parseQuestionMarkdown(fullContent, prob.path);
      const problemId = prob.slug;
      const problemHtml = generateProblemHtml(parsed, problemId);

      // Copy images from problem folder to public folder for static serving
      const imageExts = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"];
      const probFolder = prob.folder;
      const publicImagesDir = path.resolve(__dirname, `./public/images/problems/${topicSlug}`);
      if (!dryRun) {
        ensureDir(publicImagesDir);
      }
      if (fs.existsSync(probFolder)) {
        const files = fs.readdirSync(probFolder);
        for (const file of files) {
          const ext = path.extname(file).toLowerCase();
          if (imageExts.includes(ext)) {
            const srcPath = path.join(probFolder, file);
            const destPath = path.join(publicImagesDir, file);
            if (!dryRun) {
              fs.copyFileSync(srcPath, destPath);
            }
          }
        }
      }

      // Rewrite image paths to use absolute URLs from public folder
      const rewrittenHtml = problemHtml.replace(
        /<img src="([^"]+)"/g,
        (match, src) => {
          // Only rewrite relative paths (not absolute or external URLs)
          if (!src.startsWith('/') && !src.startsWith('http')) {
            return `<img src="/images/problems/${topicSlug}/${src}"`;
          }
          return match;
        }
      );

      const problemFm = `---
title: "${(parsed.title || prob.slug).replace(/"/g, '\\"')}"
description: "${topic} problem"
section: problems
pagefind: true
---`;

      // Use raw HTML in the markdown file
      const problemContent = `${problemFm}

<div class="problem-content" data-problem-id="${problemId}">
${rewrittenHtml}
</div>
`;

      const problemPath = path.join(topicDir, `${prob.slug}.md`);
      if (dryRun) {
        console.log(`      Would write: ${topicSlug}/${prob.slug}.md`);
      } else {
        fs.writeFileSync(problemPath, problemContent);
        console.log(`      ✓ ${topicSlug}/${prob.slug}.md`);
      }
    }

    topicSummary.push({
      id: topicSlug,
      title: topic,
      count: topicProblems.length
    });
    topicOrder++;
  }

  // Print sidebar config helper for problems
  console.log(`\n   Sidebar config sections for problems tab:\n`);
  for (const t of topicSummary) {
    console.log(`        {`);
    console.log(`          id: "problems/${t.id}",`);
    console.log(`          title: "${t.title}",`);
    console.log(`        },`);
  }
} else {
  console.log(`   No problems found with course-slug: ${COURSE_SLUG}`);
}

console.log(`\n${"─".repeat(50)}`);
console.log(`\n✅ All done!`)
