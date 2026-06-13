/**
 * Format a raw Tecimer chain name into a clean display name.
 * "N209 FLAT BEVELED CURB" → "Flat Beveled Curb Chain 4mm"
 * "N612 - YELLOW GOLD SOLID DIAMOND CUT ROPE LINK" → "Diamond Cut Rope Chain 2.5mm"
 */

const STRIP_PREFIXES = /^[A-Z0-9]+-?\s*[-–]\s*/  // "N209 - ", "FRANCO-YG - "
const STRIP_SKU = /^[A-Z0-9]{2,}[-/]?[A-Z0-9]*\s+/  // "N209 ", "FRANCO-YG-1.5 "
const STRIP_NOISE = /\b(YELLOW GOLD|WHITE GOLD|PINK GOLD|TWO TONE|SOLID|HOLLOW|LIGHTLY PLATED|NECKLACE)\b/gi
const STRIP_LINK_SUFFIX = /\s+LINK\s*$/i
const STRIP_CHAIN_SUFFIX = /\s+CHAIN\s*$/i

function titleCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\b(Of|And|The|In|On|At|To|For|A|An)\b/g, w => w.toLowerCase())
    .replace(/^./, c => c.toUpperCase())
}

export function formatChainName(rawName: string, widthMm: number): string {
  let name = rawName

  // Strip leading SKU pattern
  name = name.replace(STRIP_PREFIXES, '')
  name = name.replace(STRIP_SKU, '')

  // Strip color/construction noise words
  name = name.replace(STRIP_NOISE, '')

  // Strip trailing "LINK" or "CHAIN"
  name = name.replace(STRIP_LINK_SUFFIX, '')
  name = name.replace(STRIP_CHAIN_SUFFIX, '')

  // Clean up extra spaces and dashes
  name = name.replace(/\s+/g, ' ').replace(/^\s*[-–]\s*/, '').trim()

  // Strip width if already in the name (we'll add it ourselves)
  name = name.replace(/\d+\.?\d*\s*mm/i, '').trim()

  // If nothing left, use raw name
  if (!name || name.length < 3) {
    name = rawName.replace(STRIP_SKU, '').trim()
  }

  // Title case
  name = titleCase(name)

  // Append "Chain" and width
  if (!name.toLowerCase().includes('chain')) {
    name = `${name} Chain`
  }

  // Add width
  name = `${name} ${widthMm}mm`

  return name
}
