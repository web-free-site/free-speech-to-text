function padSrt(n) {
  return String(n).padStart(2, "0");
}

export function formatSrtTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 1000);
  return `${padSrt(h)}:${padSrt(m)}:${padSrt(s)},${String(ms).padStart(3, "0")}`;
}

export function transcriptToPlainText(transcript) {
  if (!transcript?.chunks?.length) return "";
  return transcript.chunks.map((c) => c.text.trim()).join(" ").replace(/\s+/g, " ").trim();
}

/** Group words into SRT cues (max ~42 chars per line, ~5s per cue). */
export function transcriptToSrt(transcript) {
  if (!transcript?.chunks?.length) return "";

  const cues = [];
  let index = 1;
  let lineWords = [];
  let cueStart = null;
  let cueEnd = null;

  const flush = () => {
    if (!lineWords.length || cueStart === null) return;
    const text = lineWords.join(" ").trim();
    cues.push(
      `${index++}\n${formatSrtTime(cueStart)} --> ${formatSrtTime(cueEnd)}\n${text}\n`,
    );
    lineWords = [];
    cueStart = null;
    cueEnd = null;
  };

  for (const chunk of transcript.chunks) {
    const [start, end] = chunk.timestamp;
    const word = chunk.text.trim();
    if (!word) continue;

    if (cueStart === null) cueStart = start;
    cueEnd = end;
    lineWords.push(word);

    const duration = cueEnd - cueStart;
    const lineLen = lineWords.join(" ").length;
    if (lineWords.length >= 8 || duration >= 5 || lineLen >= 42) {
      flush();
    }
  }
  flush();

  return cues.join("\n");
}

export function downloadTextFile(filename, content, mime = "text/plain") {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function timestampsOverflowChunk(transcript, chunkLengthS = 30) {
  if (!transcript?.chunks?.length) return false;
  const limit = chunkLengthS - 0.01;
  for (const { timestamp } of transcript.chunks) {
    const [start, end] = timestamp;
    if (end - start > limit || end > limit) return true;
  }
  return false;
}