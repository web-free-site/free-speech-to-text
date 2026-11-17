const BANNER_SRC = "https://bauval.org/22";

/**
 * Isolated iframe banner — atOptions pattern per Adsterra integration.
 */
export default function AdBanner({ adKey, width, height, className = "" }) {
  if (!adKey) return null;
  const iframeId = `ad-${adKey}-${width}x${height}`;

  return (
    <div
      className={`ad-slot overflow-hidden flex justify-center items-center ${className}`}
      aria-hidden="true"
    >
      <iframe
        title="Advertisement"
        id={iframeId}
        width={width}
        height={height}
        scrolling="no"
        frameBorder="0"
        marginWidth={0}
        marginHeight={0}
        style={{ border: 0, maxWidth: "100%" }}
        srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="referrer" content="no-referrer-when-downgrade"></head><body style="margin:0;padding:0;overflow:hidden"><script>
atOptions = { key: '${adKey}', format: 'iframe', height: ${height}, width: ${width}, params: {} };
</script><script src="${BANNER_SRC}/${adKey}"></script></body></html>`}
      />
    </div>
  );
}