/** Spoken languages surfaced for quick selection (Whisper-supported). */
const FEATURED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "sw", label: "Swahili" },
];

function LanguageSelector({ language, setLanguage, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
        Spoken language
      </span>
      <div className="flex flex-wrap gap-2">
        {FEATURED_LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            className={`px-3 py-1.5 rounded-lg border text-sm transition-colors cursor-pointer ${
              language === code
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <select
        {...props}
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border rounded-lg p-1.5 text-sm dark:bg-gray-800 mt-1 max-w-[200px]"
        aria-label="Spoken language (advanced)"
      >
        {FEATURED_LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;