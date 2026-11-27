#!/usr/bin/env node
/**
 * Injects crawlable H1, SEO copy, and FAQ into dist/index.html inside #root.
 * React createRoot replaces #root on mount so users see a single H1; bots read the file.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  FAQ_PAGE_JSON_LD,
  homepagePrerenderInnerHtml,
} from "../src/seo/homepageCrawl.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distIndex = path.join(__dirname, "..", "dist", "index.html");
const MARKER = 'data-wf-home-prerender="1"';

if (!fs.existsSync(distIndex)) {
  console.error("inject-homepage-prerender: dist/index.html not found");
  process.exit(1);
}

let html = fs.readFileSync(distIndex, "utf8");

if (!html.includes(MARKER)) {
  const inner = homepagePrerenderInnerHtml().trim();
  const emptyRoot = /<div id="root">\s*<\/div>/;
  const closedRoot = /<div id="root"><\/div>/;
  if (emptyRoot.test(html) || closedRoot.test(html)) {
    html = html.replace(
      /<div id="root">\s*<\/div>/,
      `<div id="root">\n${inner}\n</div>`,
    );
  } else if (html.includes('<div id="root">')) {
    console.error("inject-homepage-prerender: #root is not empty; skip to avoid corrupting build");
    process.exit(1);
  } else {
    console.error("inject-homepage-prerender: #root not found");
    process.exit(1);
  }
}

if (!html.includes('"@type": "FAQPage"') && !html.includes('"@type":"FAQPage"')) {
  const ld = `<script type="application/ld+json">${JSON.stringify(FAQ_PAGE_JSON_LD)}</script>`;
  const headClose = html.indexOf("</head>");
  if (headClose !== -1) {
    html = html.slice(0, headClose) + `\n    ${ld}\n  ` + html.slice(headClose);
  }
}

const h1Count = (html.match(/<h1\b/gi) || []).length;
if (h1Count !== 1) {
  console.error(
    `inject-homepage-prerender: expected exactly 1 <h1> in dist/index.html, found ${h1Count}`,
  );
  process.exit(1);
}

fs.writeFileSync(distIndex, html);
console.log(`inject-homepage-prerender: ok (${h1Count} h1)`);