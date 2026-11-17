import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "..", "dist");
const SITE = "https://free-speech-to-text.web-free.site";

const BANNER = (key, w, h) =>
  `<div style="display:flex;justify-content:center;overflow:hidden;max-width:100%"><script>atOptions={key:'${key}',format:'iframe',height:${h},width:${w},params:{}};</script><script src="https://bauval.org/22/${key}"></script></div>`;

const footer = `
<footer style="margin-top:2rem;padding:1.5rem 1rem;border-top:1px solid #e5e7eb;font-size:.875rem;color:#4b5563">
<p><strong>Free Speech to Text</strong> — Based on <a href="https://github.com/huggingface/transformers.js-examples/tree/main/whisper-word-timestamps">whisper-word-timestamps</a> (Apache-2.0). Uses <a href="https://github.com/openai/whisper">OpenAI Whisper</a>, <a href="https://huggingface.co/docs/transformers.js">Transformers.js</a>, and <a href="https://huggingface.co/onnx-community/whisper-base_timestamped">onnx-community/whisper-base_timestamped</a>. Hub: <a href="https://web-free.site">web-free.site</a> · <a href="https://free-text-to-speech.web-free.site">Free Text to Speech</a></p>
<p><a href="/about/">About</a> · <a href="/contact/">Contact</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/how-to-transcribe-audio-to-text-in-the-browser/">How-to</a> · <a href="/how-to-export-speech-to-text-as-srt/">SRT export</a> · <a href="https://araplhn.org/4/b0bd321d050f36ee3f1b36c02b48f12e" rel="noopener sponsored">Partner link</a></p>
</footer>`;

const headAds = `
<script data-cfasync="false" src="https://abscloud.org/1/895b72aa33f804795001790dbde9c7de"></script>
<script data-cfasync="false" src="https://bauval.org/14/a13ad1a4018e6c4397955e52e985e529"></script>`;

function pageShell({ title, description, canonical, body, jsonLd = [] }) {
  const ld = jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Free Speech to Text">
${headAds}
${ld}
<style>
body{font-family:system-ui,sans-serif;line-height:1.6;max-width:52rem;margin:0 auto;padding:1rem;color:#111827}
a{color:#1d4ed8} nav{margin:1rem 0;display:flex;flex-wrap:wrap;gap:.75rem} h1{line-height:1.2}
.ad-row{display:flex;justify-content:center;flex-wrap:wrap;gap:1rem;margin:1rem 0}
</style>
</head>
<body>
<header>
<a href="/" style="font-weight:700;font-size:1.25rem;text-decoration:none;color:#1d4ed8">Free Speech to Text</a>
<nav>
<a href="/">Transcribe</a>
<a href="/about/">About</a>
<a href="/how-to-transcribe-audio-to-text-in-the-browser">How-to</a>
<a href="https://free-text-to-speech.web-free.site">Text to Speech</a>
</nav>
</header>
<div class="ad-row">${BANNER("0a8ba6b1720d82454e6317cc2b262f98", 728, 90)}</div>
${body}
<div class="ad-row">${BANNER("b0cd567ddd458a6c3d65cc85ca138d59", 468, 60)}${BANNER("cd517e486c82e16bed70b936ef59f626", 300, 250)}</div>
<div id="container-7b80d89c580cd04b2bdb2df7a6406e05"></div>
<script src="https://bauval.org/21/7b80d89c580cd04b2bdb2df7a6406e05" async></script>
${footer}
</body>
</html>`;
}

const pages = [
  {
    slug: "about",
    title: "About — Free Speech to Text",
    description:
      "Free in-browser speech recognition with Whisper, Transformers.js, and word-level timestamps. Privacy-first, no server uploads.",
    body: `
<h1>About Free Speech to Text</h1>
<p>Free Speech to Text converts audio, video, and live microphone input into text with word-level timestamps. Everything runs locally in your web browser using WebGPU (with WebAssembly fallback).</p>
<h2>Open source base</h2>
<p>This app is derived from the <a href="https://github.com/huggingface/transformers.js-examples/tree/main/whisper-word-timestamps">whisper-word-timestamps</a> example in Hugging Face <em>transformers.js-examples</em> (Apache-2.0). The project LICENSE file is retained in the repository.</p>
<h2>Model</h2>
<p>We use <a href="https://huggingface.co/onnx-community/whisper-base_timestamped">onnx-community/whisper-base_timestamped</a>, a community ONNX conversion of OpenAI's multilingual <code>whisper-base</code>. Whisper weights are published by OpenAI under MIT on GitHub. ONNX weights are loaded from Hugging Face at runtime and cached in your browser — they are not vendored in this repository.</p>
<h2>Credits</h2>
<ul>
<li><a href="https://github.com/openai/whisper">OpenAI Whisper</a></li>
<li><a href="https://huggingface.co/docs/transformers.js">Transformers.js</a> (@huggingface/transformers 3.7.1)</li>
<li><a href="https://huggingface.co/onnx-community">onnx-community</a> model hosts</li>
</ul>
<p>Explore more free tools at <a href="https://web-free.site">web-free.site</a>. Pair transcription with <a href="https://free-text-to-speech.web-free.site">Free Text to Speech</a> for a full read-aloud workflow.</p>
<p><a href="/">← Back to transcribe</a></p>`,
  },
  {
    slug: "contact",
    title: "Contact — Free Speech to Text",
    description: "Contact information and support pointers for Free Speech to Text.",
    body: `
<h1>Contact</h1>
<p>Free Speech to Text is a privacy-oriented browser tool. We do not receive your audio or transcripts because processing is local-only.</p>
<p>For questions about the open-source stack, see the upstream <a href="https://github.com/huggingface/transformers.js-examples">transformers.js-examples</a> repository. For the broader <a href="https://web-free.site">web-free.site</a> tool family, use the contact options listed on the hub.</p>
<p><a href="/">← Back to transcribe</a></p>`,
  },
  {
    slug: "privacy",
    title: "Privacy Policy — Free Speech to Text",
    description:
      "Privacy policy for Free Speech to Text: local transcription, browser cache, and third-party advertising.",
    body: `
<h1>Privacy Policy</h1>
<p><strong>Audio and transcripts:</strong> Speech recognition runs entirely in your browser. We do not operate a transcription API and do not receive uploads of your recordings or files.</p>
<p><strong>Model downloads:</strong> ONNX model files are fetched from Hugging Face CDN endpoints and stored in your browser cache for reuse.</p>
<p><strong>Advertising:</strong> This site displays third-party advertisements (Adsterra). Ad networks may set cookies or collect usage data under their own policies.</p>
<p><strong>Local storage:</strong> Your browser may store cached model weights and preferences. Clear site data to remove them.</p>
<p>Last updated: November 2026.</p>`,
  },
  {
    slug: "terms",
    title: "Terms of Use — Free Speech to Text",
    description: "Terms of use for the Free Speech to Text web application.",
    body: `
<h1>Terms of Use</h1>
<p>Free Speech to Text is provided "as is" without warranty. Transcription accuracy depends on audio quality, accent, and language. Do not rely on output for legal, medical, or safety-critical decisions without human review.</p>
<p>You are responsible for complying with laws when recording or transcribing third-party speech. The software is offered under the licenses of its upstream components (see <a href="/about/">About</a>).</p>
<p>By using this site you accept these terms and our <a href="/privacy">Privacy Policy</a>.</p>`,
  },
  {
    slug: "how-to-transcribe-audio-to-text-in-the-browser",
    title: "How to Transcribe Audio to Text in the Browser",
    description:
      "Step-by-step guide to transcribe audio or video files and microphone input locally with Whisper in the browser.",
    body: `
<h1>How to transcribe audio to text in the browser</h1>
<ol>
<li>Visit <a href="/">Free Speech to Text</a> and click <strong>Load model</strong>. The multilingual Whisper model downloads once and caches locally.</li>
<li>Choose the <strong>spoken language</strong> (English, French, or Swahili).</li>
<li>Upload an audio/video file or use <strong>Start microphone</strong> to record.</li>
<li>Click <strong>Transcribe</strong>. Word-level timestamps appear in the transcript panel.</li>
<li>Copy text or download TXT/SRT exports. Nothing is sent to our servers.</li>
</ol>
<p>Tip: Use headphones when recording to reduce echo. For long files, keep the tab active until transcription completes.</p>`,
  },
  {
    slug: "how-to-export-speech-to-text-as-srt",
    title: "How to Export Speech to Text as SRT",
    description:
      "Export browser transcriptions as SRT subtitle files using Whisper word timestamps.",
    body: `
<h1>How to export speech to text as SRT</h1>
<p>After transcription on <a href="/">Free Speech to Text</a>, click <strong>Download SRT</strong>. Subtitle cues are built from Whisper word timestamps.</p>
<p>If timing spans look too long for a single chunk, the app automatically retries inference with a 29-second chunk length.</p>
<p>Import the <code>.srt</code> file into video editors (DaVinci Resolve, Premiere, etc.) or upload to YouTube as captions.</p>`,
  },
];

if (!fs.existsSync(dist)) {
  console.error("dist/ not found — run vite build first");
  process.exit(1);
}

for (const p of pages) {
  const canonical = `${SITE}/${p.slug}`;
  const dir = path.join(dist, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  const html = pageShell({
    title: p.title,
    description: p.description,
    canonical,
    body: p.body,
  });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

// Enhance root index.html meta if present
const indexPath = path.join(dist, "index.html");
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, "utf8");
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does my audio leave the device?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Transcription runs entirely in your browser after the model is cached.",
        },
      },
      {
        "@type": "Question",
        name: "Which languages are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Whisper is multilingual; the UI highlights English, French, and Swahili.",
        },
      },
      {
        "@type": "Question",
        name: "Can I export subtitles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — download TXT or SRT after transcription.",
        },
      },
    ],
  };
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Speech to Text",
    url: SITE,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free browser-based speech to text with Whisper word timestamps. No uploads.",
  };
  if (!html.includes("FAQPage")) {
    const inject = `<script type="application/ld+json">${JSON.stringify(faqLd)}</script>`;
    html = html.replace("</head>", `${inject}\n</head>`);
    fs.writeFileSync(indexPath, html);
  }
}

console.log(`Generated ${pages.length} static pages in dist/`);