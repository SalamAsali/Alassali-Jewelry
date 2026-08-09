/**
 * Shared normalizer for CMS-sourced display text.
 *
 * Sanity has historically drifted from the approved copy: British spellings
 * ("Jewellery", "Jeweller"), the double-s brand name ("Al-Assali"), and the
 * em/en dashes that were removed from all rendered copy site-wide. Running
 * every CMS text field through this at ingestion means editor drift can't
 * reach the page again.
 *
 * Strings only — never run it on URLs, slugs, ids, or image refs.
 */
export function normalizeCmsText<T extends string | null | undefined>(value: T): T {
  if (value == null) return value
  const fixed = value
    // Numeric ranges keep a plain hyphen: "24–48 hours" -> "24-48 hours".
    .replace(/(\d)\s*[–—]\s*(\d)/g, '$1-$2')
    // Prose dashes read as commas, matching the site-wide dash removal.
    .replace(/\s*[–—]\s*/g, ', ')
    .replace(/Al-Assali/g, 'Al-Asali')
    .replace(/Jewellery/g, 'Jewelry')
    .replace(/jewellery/g, 'jewelry')
    .replace(/Jeweller(?!s)/g, 'Jeweler')
    .replace(/jeweller(?!s)/g, 'jeweler')
    .replace(/  +/g, ' ')
  return fixed as T
}
