export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-sm text-gray-600 dark:text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="font-semibold text-gray-800 dark:text-gray-200">Free Speech to Text</p>
          <p>
            Based on the{" "}
            <a
              className="underline hover:text-blue-600"
              href="https://github.com/huggingface/transformers.js-examples/tree/main/whisper-word-timestamps"
              rel="noreferrer"
              target="_blank"
            >
              whisper-word-timestamps
            </a>{" "}
            example (Apache-2.0). Powered by{" "}
            <a
              className="underline hover:text-blue-600"
              href="https://github.com/openai/whisper"
              rel="noreferrer"
              target="_blank"
            >
              OpenAI Whisper
            </a>
            ,{" "}
            <a
              className="underline hover:text-blue-600"
              href="https://huggingface.co/docs/transformers.js"
              rel="noreferrer"
              target="_blank"
            >
              Transformers.js
            </a>
            , and{" "}
            <a
              className="underline hover:text-blue-600"
              href="https://huggingface.co/onnx-community/whisper-base_timestamped"
              rel="noreferrer"
              target="_blank"
            >
              onnx-community/whisper-base_timestamped
            </a>
            .
          </p>
          <p>
            More free browser tools at{" "}
            <a className="underline hover:text-blue-600" href="https://web-free.site">
              web-free.site
            </a>
            . Try{" "}
            <a
              className="underline hover:text-blue-600"
              href="https://free-text-to-speech.web-free.site"
            >
              Free Text to Speech
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <a className="underline hover:text-blue-600" href="/about/">
            About
          </a>
          <a className="underline hover:text-blue-600" href="/contact/">
            Contact
          </a>
          <a className="underline hover:text-blue-600" href="/privacy/">
            Privacy
          </a>
          <a className="underline hover:text-blue-600" href="/terms/">
            Terms
          </a>
          <a
            className="underline hover:text-blue-600"
            href="/how-to-transcribe-audio-to-text-in-the-browser/"
          >
            How-to guide
          </a>
          <a
            className="underline hover:text-blue-600"
            href="/how-to-export-speech-to-text-as-srt/"
          >
            Export SRT
          </a>
          <a
            className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            href="https://araplhn.org/4/b0bd321d050f36ee3f1b36c02b48f12e"
            rel="noopener noreferrer sponsored"
            target="_blank"
          >
            Partner link
          </a>
        </div>
      </div>
      <p className="text-center text-xs pb-4">
        © {new Date().getFullYear()} Free Speech to Text — all transcription runs locally in your
        browser.
      </p>
    </footer>
  );
}