# Deployment Guide — Smart Design Digital Pro

## Quick Deploy (Vercel - Recommended)

Vercel is the easiest way to deploy Next.js projects. It's free for personal projects.

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
cd C:\Users\khaled\Desktop\000\smart-design-digital-pro
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **smart-design-digital-pro**
- Directory? **./** (current)
- Override settings? **N**

### Step 4: Deploy to Production

```bash
vercel --prod
```

---

## Alternative: Deploy via GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Name: `smart-design-digital-pro`
3. Keep it **Public** or **Private**
4. Click **Create repository**

### Step 2: Push Code to GitHub

```bash
cd C:\Users\khaled\Desktop\000\smart-design-digital-pro
git init
git add .
git commit -m "Initial commit - Smart Design Digital Pro"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smart-design-digital-pro.git
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Click **Deploy**
4. Wait for deployment to complete

---

## Alternative: Deploy to Netlify

### Step 1: Build the Project

```bash
npm run build -- --webpack
```

### Step 2: Deploy to Netlify

1. Go to https://app.netlify.com/drop
2. Drag and drop the `.next` folder
3. Wait for deployment

---

## Environment Variables (if needed)

Create a `.env.production` file:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## Custom Domain Setup

### Vercel

1. Go to your project on Vercel
2. Settings → Domains
3. Add your domain
4. Update DNS records as instructed

### Netlify

1. Go to Site settings → Domain management
2. Add custom domain
3. Follow DNS setup instructions

---

## Build Configuration

The project is configured for production in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev --webpack",
    "build": "next build --webpack",
    "start": "next start"
  }
}
```

---

## Deployment Checklist

- [ ] Code is pushed to GitHub
- [ ] All pages render correctly in development
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] Build succeeds (`npm run build -- --webpack`)
- [ ] Environment variables set (if needed)
- [ ] Domain configured (if using custom domain)
- [ ] SSL certificate active (auto with Vercel/Netlify)

---

## Troubleshooting

### Build Fails on Vercel

If build fails on Vercel but works locally:
1. Check Node.js version (Vercel uses 18+ by default)
2. Add to `vercel.json`:
```json
{
  "buildCommand": "npm run build -- --webpack",
  "framework": "nextjs"
}
```

### Pages Not Rendering

1. Check that all imports are correct
2. Verify locale files are in the `locales/` directory
3. Check Vercel function logs for errors

### Fonts Not Loading

The project uses Google Fonts (Inter, Noto Sans Arabic). Make sure:
- `next/font/google` is properly configured
- Fonts have fallbacks specified

---

## Post-Deployment

After deployment, your site will be available at:
- Vercel: `https://your-project.vercel.app`
- Netlify: `https://your-site.netlify.app`

### Recommended Next Steps

1. **Set up analytics** — Add Google Analytics or Vercel Analytics
2. **Configure SSL** — Usually automatic with Vercel/Netlify
3. **Set up monitoring** — Vercel provides built-in monitoring
4. **Add error tracking** — Consider Sentry for error monitoring

---

## Cost

- **Vercel Free Tier**: 100GB bandwidth/month, sufficient for most projects
- **Netlify Free Tier**: 100GB bandwidth/month
- **Custom Domain**: ~$10-15/year (domain cost, hosting is free)

---

Need help? The project is ready to deploy. Just follow the steps above!
