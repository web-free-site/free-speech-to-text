const FAQ_ITEMS = [
  {
    question: "Does my audio leave the device?",
    answer:
      "No. After the Whisper model is cached in your browser, transcription runs entirely on your device. Audio files, microphone recordings, and video soundtracks are not uploaded to our servers for processing.",
  },
  {
    question: "Which languages does this free speech to text tool support?",
    answer:
      "The underlying Whisper model is multilingual. This interface lets you pick English, French, or Swahili for faster setup; Whisper can still recognize many other languages when speech is clear.",
  },
  {
    question: "Can I export subtitles or a transcript file?",
    answer:
      "Yes. After transcription finishes, copy the plain text or download TXT and SRT files. SRT uses word-level timestamps from the timestamped Whisper model so you can edit captions in any video editor.",
  },
  {
    question: "Do I need an account or API key?",
    answer:
      "No sign-up and no API key are required. Open the page, load the model once (a one-time download that browsers cache), then transcribe as often as you like at no charge.",
  },
  {
    question: "What audio and video formats can I use?",
    answer:
      "You can record from your microphone in the page or upload common audio and video files from your device. The tool extracts audio at 16 kHz for Whisper; for long clips, use a desktop browser with enough memory and WebGPU when available for faster inference.",
  },
];

export default function SeoContent() {
  return (
    <>
      <section
        className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 border-t pt-8 mt-8"
        aria-labelledby="seo-about-heading"
      >
        <h2 id="seo-about-heading" className="text-xl font-bold text-gray-900 dark:text-gray-100">
          What this free speech to text tool does
        </h2>
        <p>
          Free Speech to Text turns spoken words into editable text using OpenAI Whisper, running
          fully inside your web browser. Upload a voice memo, meeting recording, podcast episode, or
          video file—or speak into your microphone—and get a transcript with word-level timestamps.
          There is no cloud upload step for transcription itself: decoding happens locally with{" "}
          <a
            href="https://huggingface.co/docs/transformers.js"
            className="text-blue-600 dark:text-blue-400 underline"
            rel="noreferrer"
            target="_blank"
          >
            Transformers.js
          </a>{" "}
          and the{" "}
          <a
            href="https://huggingface.co/onnx-community/whisper-base_timestamped"
            className="text-blue-600 dark:text-blue-400 underline"
            rel="noreferrer"
            target="_blank"
          >
            whisper-base_timestamped
          </a>{" "}
          ONNX model. That makes it useful when you want speech to text without sending sensitive
          audio to a third-party API.
        </p>
        <p>
          Outputs include plain text you can paste into notes, docs, or email, plus SRT subtitle
          files for YouTube, training videos, and internal comms. Export is available right after
          inference; nothing is stored on our side because we do not run a transcription backend.
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6">
          How to transcribe audio to text in five steps
        </h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Open the tool</strong> on a modern browser (Chrome, Edge, or Firefox). On first
            use, click <strong>Load model</strong> and wait while Whisper downloads once; later
            visits reuse the cached weights.
          </li>
          <li>
            <strong>Choose the spoken language</strong> from English, French, or Swahili so the
            model is steered correctly for your clip.
          </li>
          <li>
            <strong>Provide audio</strong> by starting a microphone recording or by selecting an
            audio or video file from your computer or phone (via the file picker).
          </li>
          <li>
            <strong>Click Transcribe</strong> and let the on-device worker finish. Progress appears
            while weights load; inference time depends on clip length and whether WebGPU is
            available.
          </li>
          <li>
            <strong>Review, copy, or download</strong> the transcript as TXT or SRT. Click words in
            the transcript when a media preview is loaded to jump playback to that moment.
          </li>
        </ol>
        <p>
          For a longer walkthrough with screenshots and troubleshooting tips, see the{" "}
          <a
            href="https://web-free.site/guides/transcribe-audio-to-text-free-in-browser/"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            transcribe audio to text guide
          </a>{" "}
          on Web Free, or the on-site{" "}
          <a
            href="/how-to-transcribe-audio-to-text-in-the-browser/"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            how-to page
          </a>
          .
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6">
          Privacy and in-browser processing
        </h2>
        <p>
          Privacy-first speech to text means your recordings stay on your machine during
          transcription. Model files are fetched from Hugging Face’s CDN and cached by the browser,
          similar to how other progressive web apps cache assets. We do not operate a server that
          receives your audio for decoding. If you clear site data, you may need to download the
          model again. Compare local browser transcription with upload-based services in the{" "}
          <a
            href="https://web-free.site/guides/browser-speech-to-text-vs-cloud-transcription/"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            browser vs cloud speech-to-text comparison
          </a>
          .
        </p>
        <p>
          This page is part of the{" "}
          <a
            href="https://web-free.site/?ref=free-speech-to-text"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Web Free
          </a>{" "}
          collection of free browser utilities—no account wall, optional advertising only. Pair this
          tool with{" "}
          <a
            href="https://free-text-to-speech.web-free.site"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Free Text to Speech
          </a>{" "}
          when you want to hear a draft aloud after editing.
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6">
          Common use cases
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Meetings and interviews:</strong> Turn a recorded Zoom or phone call into
            searchable notes without paying per-minute API fees.
          </li>
          <li>
            <strong>Voice memos:</strong> Dictate on your phone, transfer the file, and get text for
            tasks or documentation.
          </li>
          <li>
            <strong>Accessibility:</strong> Produce captions from video audio as SRT for players
            that support sidecar subtitles.
          </li>
          <li>
            <strong>Students and researchers:</strong> Transcribe lecture clips locally when you
            cannot use a cloud service on campus networks.
          </li>
          <li>
            <strong>Content creators:</strong> Draft blog posts or show notes from podcast audio
            while keeping raw media offline until you choose to publish.
          </li>
        </ul>
        <p>
          The interface uses WebGPU when your browser exposes a compatible GPU adapter, and falls back
          to WebAssembly otherwise. That keeps the same Whisper weights while trading speed for broader
          device support. Desktop laptops typically finish short clips in seconds after the model is
          warm; very long files may need patience on phones or low-memory tabs. Close unused tabs if
          loading stalls, and prefer wired headphones when recording live for cleaner input levels.
        </p>
        <p>
          Accuracy depends on microphone quality, background noise, and accent. Whisper handles many
          accents well, but always proofread legal, medical, or published material. For export
          specifics, see{" "}
          <a
            href="/how-to-export-speech-to-text-as-srt/"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            how to export speech to text as SRT
          </a>{" "}
          and{" "}
          <a
            href="/how-to-transcribe-a-voice-note-to-text/"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            transcribe a voice note
          </a>
          .
        </p>
      </section>

      <section
        className="text-sm text-gray-600 dark:text-gray-400 border-t pt-6 mt-8"
        aria-labelledby="faq-heading"
      >
        <h2 id="faq-heading" className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-base">
          Frequently asked questions
        </h2>
        <dl className="space-y-4">
          {FAQ_ITEMS.map(({ question, answer }) => (
            <div key={question}>
              <dt className="font-medium text-gray-800 dark:text-gray-200">{question}</dt>
              <dd className="mt-1">{answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}