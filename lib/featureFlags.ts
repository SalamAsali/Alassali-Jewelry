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
 *   3. Restore these lines in public/llms.txt (a static file that cannot
 *      read this flag; llms.txt is served verbatim to AI crawlers, so the
 *      restore notes live here instead of there):
 *        - intro: put "gold chains, " back into the handcrafts list
 *          (after "wedding bands, ")
 *        - Services: "- Custom gold chains — Cuban, rope, franco, figaro ($1,000+)"
 *          (after the custom rings line)
 *        - Key facts timelines: "pendants/earrings 2–4 weeks" back to
 *          "pendants 2–4 weeks, chains/earrings 2–4 weeks"
 *        - Key pages: "- Custom Chains Toronto:
 *          https://www.alasalicustomjewelry.ca/custom-chains-toronto"
 *          (after the custom rings line)
 *      (Or diff llms.txt against the commit that introduced this flag.)
 *   4. Redeploy (npx vercel --prod --yes --scope dreams3).
 */
export const CHAINS_ENABLED = false
