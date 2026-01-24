# Deploy Alassali Jewelry to New Vercel Project (payload-website-starter)

The **payload-website-starter** Vercel project is your new deployment target. Push the current Alassali design there so it deploys on the new link.

## Option 1: Push this repo to payload-website-starter (recommended)

**Run on your machine** (network required). From the project root:

```bash
./scripts/push-to-new-vercel.sh
```

Or manually:

```bash
git push git@github.com:SalamAsali/payload-website-starter.git main --force
```

(Use `https://github.com/SalamAsali/payload-website-starter.git` if you use HTTPS.)

This force-pushes `main` to the payload-website-starter repo. The template there is replaced by our code; Vercel auto-deploys.

**New live URL:** https://payload-website-starter-dreams3.vercel.app

## Option 2: Repoint Vercel project to Alassali-Jewelry repo

1. Vercel → [payload-website-starter](https://vercel.com/dreams3/payload-website-starter) → Settings → Git.
2. Disconnect the current repo (payload-website-starter).
3. Connect **SalamAsali/Alassali-Jewelry** instead.
4. Push to `main` on Alassali-Jewelry → deploys to the same new link.

## Env / secrets

Ensure the **payload-website-starter** project in Vercel has the same env vars as production (e.g. `DATABASE_URL`, `PAYLOAD_SECRET`, `PAYLOAD_PUBLIC_SERVER_URL` = new deployment URL, etc.). Sync via **Vercel → Project → Settings → Environment Variables** or `vercel env pull` after linking.
