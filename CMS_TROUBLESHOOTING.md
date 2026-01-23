# Payload CMS /cms Route Troubleshooting

## Issue: `/cms` route not loading

### What I've Fixed:

1. **Created `/app/cms/[[...segments]]/route.ts`**
   - This catch-all route handles all `/cms/*` requests
   - Forwards requests to Payload's handler

2. **Improved Error Handling**
   - Better error messages if Payload fails to initialize
   - More detailed logging

### Common Issues & Solutions:

#### 1. **Payload Not Initializing**

**Symptoms:** 503 error or "Payload not initialized"

**Check:**
- `PAYLOAD_SECRET` environment variable is set
- `DATABASE_URL` is correct (no `psql '` prefix)
- `PAYLOAD_PUBLIC_SERVER_URL` matches your Vercel URL

**Fix:**
```bash
# In Vercel, ensure these are set:
PAYLOAD_SECRET=your-secret-here
DATABASE_URL=postgresql://... (no psql prefix)
PAYLOAD_PUBLIC_SERVER_URL=https://your-site.vercel.app
```

#### 2. **Database Connection Issues**

**Symptoms:** Timeout or connection errors

**Check:**
- Neon database is running
- `DATABASE_URL` is correct
- Database credentials are valid

**Fix:**
- Verify `DATABASE_URL` in Vercel environment variables
- Test connection in Neon dashboard

#### 3. **Route Not Found (404)**

**Symptoms:** 404 when accessing `/cms`

**Check:**
- Route file exists: `app/cms/[[...segments]]/route.ts`
- Next.js has been rebuilt after adding the route

**Fix:**
- Redeploy on Vercel
- Check Vercel build logs for errors

#### 4. **Build-Time Initialization Error**

**Symptoms:** Build fails with Payload errors

**Check:**
- `lib/payload.ts` has build-time check
- `NEXT_PHASE === 'phase-production-build'` check is present

**Fix:**
- Already handled in code - should not occur

### Testing Steps:

1. **Check Vercel Logs:**
   - Go to Vercel dashboard → Your project → Logs
   - Look for "Payload CMS initialized successfully" or errors

2. **Test API Route:**
   - Visit: `https://your-site.vercel.app/api/payload/users`
   - Should return JSON (even if empty)

3. **Test Admin Route:**
   - Visit: `https://your-site.vercel.app/cms`
   - Should show Payload login page

### Environment Variables Checklist:

- [ ] `PAYLOAD_SECRET` - Random 32+ character string
- [ ] `DATABASE_URL` - PostgreSQL connection string (no `psql '` prefix)
- [ ] `PAYLOAD_PUBLIC_SERVER_URL` - Your Vercel URL (e.g., `https://alassali-jewelry.vercel.app`)
- [ ] `RESEND_API_KEY` - For email notifications
- [ ] `SENDER_EMAIL` - Email for sending notifications
- [ ] `ADMIN_EMAIL` - Email to receive notifications

### Next Steps:

1. **Redeploy:**
   ```bash
   git add -A
   git commit -m "fix: add /cms route handler for Payload admin panel"
   git push origin main
   ```

2. **Check Vercel Logs:**
   - After deployment, check logs for initialization messages

3. **Test `/cms`:**
   - Visit your site + `/cms`
   - Should see Payload login page

4. **If Still Not Working:**
   - Share Vercel build logs
   - Share browser console errors
   - Share network tab (check what `/cms` request returns)
