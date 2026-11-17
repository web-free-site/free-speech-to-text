import AdBanner from "./AdBanner";
import Footer from "./Footer";

const KEYS = {
  leader: "0a8ba6b1720d82454e6317cc2b262f98",
  mid: "0a8ba6b1720d82454e6317cc2b262f98",
  sidebarTall: "42fbe5bb291eaf645559ec6cc55387d4",
  sidebarShort: "9240a2ed749e31d6d4029ceeb904ab85",
  banner468: "b0cd567ddd458a6c3d65cc85ca138d59",
  rect300: "cd517e486c82e16bed70b936ef59f626",
  mobile: "978e4507648f2a5dc22bf680af877a3b",
};

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <a href="/" className="text-xl font-bold text-blue-700 dark:text-blue-400">
            Free Speech to Text
          </a>
          <nav className="flex flex-wrap gap-3 text-sm">
            <a className="hover:underline" href="/about/">
              About
            </a>
            <a
              className="hover:underline"
              href="/how-to-transcribe-audio-to-text-in-the-browser/"
            >
              Guide
            </a>
            <a
              className="hover:underline"
              href="https://free-text-to-speech.web-free.site"
            >
              Text to Speech
            </a>
          </nav>
        </div>
        <div className="hidden sm:flex justify-center py-2 bg-gray-50 dark:bg-gray-950 overflow-x-auto">
          <AdBanner adKey={KEYS.leader} width={728} height={90} />
        </div>
      </header>

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex gap-4">
        <aside className="hidden lg:flex flex-col gap-4 w-40 shrink-0">
          <AdBanner adKey={KEYS.sidebarTall} width={160} height={600} />
          <AdBanner adKey={KEYS.sidebarShort} width={160} height={300} />
        </aside>

        <main className="flex-1 min-w-0">{children}</main>
      </div>

      <section className="max-w-6xl mx-auto px-4 w-full space-y-4 py-4">
        <AdBanner adKey={KEYS.mid} width={728} height={90} className="mx-auto" />
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <AdBanner adKey={KEYS.banner468} width={468} height={60} />
          <div
            id="container-7b80d89c580cd04b2bdb2df7a6406e05"
            className="min-h-[100px] w-full max-w-[400px]"
          />
        </div>
        <AdBanner adKey={KEYS.rect300} width={300} height={250} className="mx-auto" />
      </section>

      <div
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex justify-center bg-white/95 dark:bg-gray-900/95 border-t py-1"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <AdBanner adKey={KEYS.mobile} width={320} height={50} />
      </div>

      <Footer />
    </div>
  );
}