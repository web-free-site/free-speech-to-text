import { homepageSeoAndFaqHtml } from "../seo/homepageCrawl.mjs";

export default function SeoContent() {
  return (
    <div
      className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 dark:[&_h2]:text-gray-100 [&_h2]:mt-6 [&_section:first-child]:border-t [&_section:first-child]:pt-8 [&_section:first-child]:mt-8 [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline [&_dl]:space-y-4 [&_dl]:text-sm [&_dl]:text-gray-600 dark:[&_dl]:text-gray-400 [&_dt]:font-medium [&_dt]:text-gray-800 dark:[&_dt]:text-gray-200 [&_section:last-child]:border-t [&_section:last-child]:pt-6 [&_section:last-child]:mt-8"
      dangerouslySetInnerHTML={{ __html: homepageSeoAndFaqHtml() }}
    />
  );
}