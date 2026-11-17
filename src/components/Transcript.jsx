import { useMemo } from "react";
import {
  transcriptToPlainText,
  transcriptToSrt,
  downloadTextFile,
} from "../utils/exportTranscript";

const Chunk = ({ chunk, currentTime, onClick }) => {
  const { text, timestamp } = chunk;
  const [start, end] = timestamp;
  const bolded = start <= currentTime && currentTime < end;

  return (
    <span>
      {text.startsWith(" ") ? " " : ""}
      <span
        onClick={onClick}
        className="text-md text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-600"
        title={timestamp.map((x) => x.toFixed(2)).join(" → ")}
        style={{
          textDecoration: bolded ? "underline" : "none",
          fontWeight: bolded ? 600 : 400,
        }}
      >
        {text.trim()}
      </span>
    </span>
  );
};

const Transcript = ({ transcript, currentTime, setCurrentTime, ...props }) => {
  const plainText = useMemo(
    () => transcriptToPlainText(transcript),
    [transcript],
  );

  const copyTranscript = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
    } catch {
      downloadTextFile("transcript.txt", plainText);
    }
  };

  return (
    <>
      <div {...props}>
        {transcript.chunks.map((chunk, i) => (
          <Chunk
            key={i}
            chunk={chunk}
            currentTime={currentTime}
            onClick={() => setCurrentTime(chunk.timestamp[0])}
          />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 border-t p-2 text-sm">
        <button
          type="button"
          className="border px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
          onClick={copyTranscript}
        >
          Copy text
        </button>
        <button
          type="button"
          className="border px-3 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer"
          onClick={() => downloadTextFile("transcript.txt", plainText)}
        >
          Download TXT
        </button>
        <button
          type="button"
          className="border px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
          onClick={() =>
            downloadTextFile("transcript.srt", transcriptToSrt(transcript), "application/x-subrip")
          }
        >
          Download SRT
        </button>
      </div>
    </>
  );
};

export default Transcript;