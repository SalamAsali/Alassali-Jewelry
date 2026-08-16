/**
 * Site-wide feature flags.
 *
 * CHAIN_CATALOG_ENABLED — switch for the READY-MADE chain catalog only:
 * the /chains, /chains/[metal], /chains/[metal]/[chainType] and
 * /chain/[slug] routes, their JSON APIs (/api/chains, /api/chains/[slug],
 * /api/inquiries/chain), and the "Chains" dropdown in the header nav.
 *
 * The BESPOKE custom-chains service (/custom-chains-toronto,
 * /custom-chains-oakville, the "Chain" option in the inquiry form) is NOT
 * covered by this flag and stays live.
 *
 * The business has paused selling ready-made chains but expects to bring
 * them back. Nothing is deleted — it is all gated on this flag.
 *
 * To restore the catalog:
 *   1. Flip CHAIN_CATALOG_ENABLED to true here.
 *   2. Flip the matching CHAIN_CATALOG_ENABLED const in next.config.mjs
 *      (it cannot import TS, so the flag is duplicated there for the
 *      temporary redirect rules).
 *   3. Redeploy (npx vercel --prod --yes --scope dreams3).
 */
export const CHAIN_CATALOG_ENABLED = false
