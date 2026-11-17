# Free Speech to Text

Browser-based speech recognition with word-level timestamps, built from the [whisper-word-timestamps](https://github.com/huggingface/transformers.js-examples/tree/main/whisper-word-timestamps) example (Apache-2.0).

- **Model:** [onnx-community/whisper-base_timestamped](https://huggingface.co/onnx-community/whisper-base_timestamped) (loaded at runtime, not vendored)
- **Stack:** Vite, React, @huggingface/transformers 3.7.1, Web Worker, WebGPU + WASM fallback

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output in `dist/` for Cloudflare Workers static assets (`wrangler.toml`).

## License

See [LICENSE](./LICENSE) (Apache-2.0 from transformers.js-examples). Whisper model weights: OpenAI MIT (GitHub).