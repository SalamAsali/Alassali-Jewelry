/**
 * Site-wide feature flags.
 *
 * CHAINS_ENABLED — master switch for everything chain-related: the ready-made
 * catalog (/chains, /chain/[slug], its APIs) and the bespoke custom-chains
 * service (/custom-chains-toronto, the "Chain" option in the inquiry form,
 * and every nav/footer/homepage/blog link into either surface).
 *
 * The business has paused selling chains but expects to bring them back.
 * Nothing chain-related is deleted — it is all gated on this flag.
 *
 * To restore chains:
 *   1. Flip CHAINS_ENABLED to true here.
 *   2. Flip the matching CHAINS_ENABLED const in next.config.mjs (it cannot
 *      import TS, so the flag is duplicated there for the redirect rules).
 *   3. Restore the chain lines in public/llms.txt (static file — see the
 *      "chains paused" note at the bottom of that file for what to re-add).
 *   4. Redeploy (npx vercel --prod --yes --scope dreams3).
 */
export const CHAINS_ENABLED = false
