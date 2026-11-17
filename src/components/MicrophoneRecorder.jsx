import { useCallback, useRef, useState } from "react";

const SAMPLE_RATE = 16_000;

function mergeToMono(audioBuffer) {
  if (audioBuffer.numberOfChannels === 1) {
    return audioBuffer.getChannelData(0).slice();
  }
  const left = audioBuffer.getChannelData(0);
  const right = audioBuffer.getChannelData(1);
  const scaling = Math.sqrt(2);
  const mono = new Float32Array(left.length);
  for (let i = 0; i < left.length; i++) {
    mono[i] = (scaling * (left[i] + right[i])) / 2;
  }
  return mono;
}

async function decodeBlobToFloat32(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const ctx = new AudioContext({ sampleRate: SAMPLE_RATE });
  try {
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
    return mergeToMono(audioBuffer);
  } finally {
    await ctx.close();
  }
}

export default function MicrophoneRecorder({ onRecordingReady, disabled }) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null);

  const stopTracks = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const stopRecording = useCallback(async () => {
    clearInterval(timerRef.current);
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === "inactive") return;

    await new Promise((resolve) => {
      recorder.addEventListener("stop", resolve, { once: true });
      recorder.stop();
    });

    stopTracks();
    setRecording(false);

    const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
    chunksRef.current = [];
    try {
      const audio = await decodeBlobToFloat32(blob);
      onRecordingReady(audio, `recording-${Date.now()}.webm`);
    } catch (e) {
      alert(`Could not decode recording: ${e.message}`);
    }
  }, [onRecordingReady]);

  const startRecording = useCallback(async () => {
    if (disabled) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.start(250);
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch (e) {
      alert(
        "Microphone access is required for live recording. Check browser permissions and try again.",
      );
    }
  }, [disabled]);

  return (
    <div className="w-full border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center gap-2">
      <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
        Record from your microphone. Audio is processed only in this browser — nothing
        is uploaded.
      </p>
      {recording ? (
        <div className="flex items-center gap-3">
          <span className="text-red-600 font-medium animate-pulse">● Recording {seconds}s</span>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer"
            onClick={stopRecording}
          >
            Stop
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled}
          className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          onClick={startRecording}
        >
          Start microphone
        </button>
      )}
    </div>
  );
}