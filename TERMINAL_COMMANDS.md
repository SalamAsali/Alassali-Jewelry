# Complete Terminal Commands - Step by Step

## Step 1: Check Current Status

```bash
cd /Users/salamalassali/Alassali-Jewelry
git status
```

## Step 2: Push Changes to Deploy

```bash
# Make sure all changes are committed
git add -A
git commit -m "fix: automatic table creation and improved migration"

# Push to deploy (replace 'main' with your branch if different)
git push origin main
```

**Wait for Vercel to deploy** (check your Vercel dashboard or wait 2-3 minutes)

## Step 3: Create Tables - Choose ONE Method

### Method A: Using curl (Terminal)

```bash
# Replace with your actual Vercel URL
curl -X POST https://alassali-jewelry.vercel.app/api/migrate
```

**Expected output if successful:**
```json
{"success":true,"message":"Database tables created successfully",...}
```

### Method B: Using Browser Console (Easier)

1. **Open your deployed site**: `https://alassali-jewelry.vercel.app/admin`
2. **Press F12** (or right-click → Inspect)
3. **Click "Console" tab**
4. **Paste and press Enter**:
```javascript
fetch('/api/migrate', { method: 'POST' })
  .then(r => r.json())
  .then(d => { 
    console.log('Result:', d)
    if(d.success) {
      alert('✅ Tables created! Refreshing...')
      window.location.reload()
    } else {
      alert('❌ Failed: ' + JSON.stringify(d))
    }
  })
```

### Method C: Create First Item (Auto-Create Tables)

1. Go to: `https://alassali-jewelry.vercel.app/admin`
2. Click "Gallery"
3. Click "Create New"
4. Fill form and save
5. **Tables created automatically!**

## Step 4: Verify Tables Created

```bash
# Check if admin works (should return JSON, not error)
curl https://alassali-jewelry.vercel.app/api/payload/gallery?limit=0
```

**Expected output:**
```json
{"totalDocs":0}
```

(0 is fine - means tables exist, just no items yet)

## Complete Command Sequence (Copy & Paste)

```bash
# Navigate to project
cd /Users/salamalassali/Alassali-Jewelry

# Check status
git status

# Add all changes
git add -A

# Commit
git commit -m "fix: automatic table creation and improved migration"

# Push to deploy
git push origin main

# Wait 2-3 minutes for Vercel deployment...

# Then create tables (replace URL with your actual Vercel URL)
curl -X POST https://alassali-jewelry.vercel.app/api/migrate

# Verify tables exist
curl https://alassali-jewelry.vercel.app/api/payload/gallery?limit=0
```

## Troubleshooting

### If git push fails:
```bash
# Check remote
git remote -v

# If no remote, add it (replace with your repo URL)
git remote add origin https://github.com/yourusername/Alassali-Jewelry.git
```

### If migration fails:
- Check Vercel environment variables: `ENABLE_PUSH_MIGRATIONS=true`
- Check Vercel logs for errors
- Use Method C (create first item) instead

### If you get "command not found: curl":
```bash
# On macOS, curl should be available
# If not, use browser console method (Method B) instead
```
