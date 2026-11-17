import { pipeline } from "@huggingface/transformers";

const PER_DEVICE_CONFIG = {
  webgpu: {
    dtype: {
      encoder_model: "fp32",
      decoder_model_merged: "q4",
    },
    device: "webgpu",
  },
  wasm: {
    dtype: "q8",
    device: "wasm",
  },
};

/**
 * This class uses the Singleton pattern to ensure that only one instance of the model is loaded.
 */
class PipelineSingeton {
  static model_id = "onnx-community/whisper-base_timestamped";
  static instance = null;

  static async getInstance(progress_callback = null, device = "webgpu") {
    if (!this.instance) {
      this.instance = pipeline("automatic-speech-recognition", this.model_id, {
        ...PER_DEVICE_CONFIG[device],
        progress_callback,
      });
    }
    return this.instance;
  }
}

function segmentTimingOverflow(result, chunkLengthS) {
  if (!result?.chunks?.length) return false;
  for (const { timestamp } of result.chunks) {
    const [start, end] = timestamp;
    if (end > chunkLengthS + 0.5 || end - start > chunkLengthS) return true;
    if (start < 0 || end < start) return true;
  }
  return false;
}

async function transcribe(transcriber, audio, language, chunk_length_s) {
  return transcriber(audio, {
    language,
    return_timestamps: "word",
    chunk_length_s,
  });
}

async function load({ device }) {
  self.postMessage({
    status: "loading",
    data: `Loading model (${device})...`,
  });

  const transcriber = await PipelineSingeton.getInstance((x) => {
    self.postMessage(x);
  }, device);

  if (device === "webgpu") {
    self.postMessage({
      status: "loading",
      data: "Compiling shaders and warming up model...",
    });

    await transcriber(new Float32Array(16_000), {
      language: "en",
    });
  }

  self.postMessage({ status: "ready" });
}

async function run({ audio, language }) {
  const transcriber = await PipelineSingeton.getInstance();
  const start = performance.now();

  let chunk_length_s = 30;
  let result = await transcribe(transcriber, audio, language, chunk_length_s);

  if (segmentTimingOverflow(result, chunk_length_s)) {
    chunk_length_s = 29;
    result = await transcribe(transcriber, audio, language, chunk_length_s);
  }

  const end = performance.now();
  self.postMessage({ status: "complete", result, time: end - start, chunk_length_s });
}

self.addEventListener("message", async (e) => {
  const { type, data } = e.data;

  switch (type) {
    case "load":
      load(data);
      break;
    case "run":
      run(data);
      break;
  }
});