# Custom Domain Setup Guide

## Prerequisites

Before setting up a custom domain, make sure you have:
1. Deployed your project to Vercel (or Netlify)
2. Purchased a domain name from a registrar

## Recommended Domain Registrars

| Registrar | Price (per year) | Features |
|-----------|------------------|----------|
| Namecheap | $8-12 | Free WhoisGuard privacy |
| Google Domains | $12 | Easy Google integration |
| Cloudflare | $8-10 | At-cost pricing, free CDN |
| GoDaddy | $10-15 | Popular, good support |
| Porkbun | $8-10 | Affordable, free privacy |

---

## Option 1: Vercel (Recommended)

### Step 1: Add Domain to Vercel

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Domains**
4. Enter your domain name (e.g., `smartdesigndigitalpro.com`)
5. Click **Add**

### Step 2: Configure DNS Records

Vercel will show you DNS records to add. Choose one:

#### Option A: A Records (Recommended)

Add these A records at your domain registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| A | www | 76.76.21.21 |

#### Option B: CNAME Record

| Type | Name | Value |
|------|------|-------|
| CNAME | www | cname.vercel-dns.com |

### Step 3: Verify and Wait

1. Click **Verify** in Vercel
2. Wait 5-30 minutes for DNS propagation
3. SSL certificate is automatic (free)

### Step 4: Set as Production Domain

Once verified:
1. In Vercel, go to **Settings** → **Domains**
2. Click the three dots (⋮) next to your domain
3. Select **Set as Production Domain**

---

## Option 2: Netlify

### Step 1: Add Domain to Netlify

1. Go to your site on [Netlify Dashboard](https://app.netlify.com)
2. Go to **Domain settings**
3. Click **Add custom domain**
4. Enter your domain name

### Step 2: Configure DNS

#### Option A: Use Netlify DNS (Recommended)

1. Change your nameservers to:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
2. Add A record:

| Type | Name | Value |
|------|------|-------|
| A | @ | 75.2.60.5 |

#### Option B: External DNS

Add at your registrar:

| Type | Name | Value |
|------|------|-------|
| CNAME | www | your-site.netlify.app |
| A | @ | 75.2.60.5 |

### Step 3: Enable HTTPS

1. In Netlify, go to **Domain settings**
2. Click **Verify DNS configuration**
3. SSL is automatic with Let's Encrypt

---

## DNS Propagation

After updating DNS records:

- **Propagation time:** 5 minutes to 48 hours
- **Average:** 30 minutes to 2 hours
- **Check status:** https://dnschecker.org

### Common DNS Records

| Record | Purpose | Example |
|--------|---------|---------|
| A | Points to IP address | @ → 76.76.21.21 |
| CNAME | Points to another domain | www → cname.vercel-dns.com |
| MX | Email routing | @ → mail.example.com |
| TXT | Text verification | @ → "v=spf1..." |

---

## Subdomains

You can also set up subdomains:

| Subdomain | Purpose | DNS Record |
|-----------|---------|------------|
| www | Main website | CNAME to your app |
| api | API endpoint | A record to your server |
| blog | Blog section | CNAME to your app |
| staging | Staging environment | CNAME to your app |

### Example for Multiple Subdomains

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| A | api | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |
| CNAME | blog | cname.vercel-dns.com |
| CNAME | staging | cname.vercel-dns.com |

---

## SSL/HTTPS Setup

### Vercel
- Automatic with Let's Encrypt
- No configuration needed
- Renewed automatically

### Netlify
- Automatic with Let's Encrypt
- Enable in **Domain settings** → **HTTPS**
- Force HTTPS redirect available

---

## Email Setup (Optional)

To use email with your domain:

### Option 1: Forwarding (Free)

Use Cloudflare Email Routing or similar:
1. Add MX records at your registrar
2. Set up forwarding to your existing email

### Option 2: Google Workspace ($6/month)

1. Sign up at workspace.google.com
2. Add MX records:
   | Type | Priority | Value |
   |------|----------|-------|
   | MX | 1 | ASPMX.L.GOOGLE.COM |
   | MX | 5 | ALT1.ASPMX.L.GOOGLE.COM |
   | MX | 5 | ALT2.ASPMX.L.GOOGLE.COM |
   | MX | 10 | ALT3.ASPMX.L.GOOGLE.COM |
   | MX | 10 | ALT4.ASPMX.L.GOOGLE.COM |

### Option 3: Microsoft 365 ($6/month)

1. Sign up at microsoft.com/365
2. Follow their DNS setup wizard

---

## Troubleshooting

### Domain Not Working

1. **Check DNS propagation:**
   ```
   nslookup yourdomain.com
   ```

2. **Verify DNS records:**
   - Go to https://dnschecker.org
   - Enter your domain
   - Check if records are correct

3. **Wait longer:**
   - DNS propagation can take up to 48 hours
   - Try from different network/device

### SSL Certificate Issues

1. **Wait 24 hours:**
   - SSL provisioning takes time
   - Usually complete within 1 hour

2. **Check domain verification:**
   - In Vercel/Netlify, verify domain is verified
   - Make sure DNS records are correct

3. **Force SSL renewal:**
   - Vercel: Settings → Domains → Refresh
   - Netlify: Domain settings → HTTPS → Verify

### Redirect Issues

1. **www vs non-www:**
   - Set up redirect in Vercel/Netlify settings
   - Or add redirect rules in DNS

2. **HTTP to HTTPS:**
   - Enable "Force HTTPS" in hosting platform
   - Or add redirect in your app

---

## Cost Summary

| Item | Cost |
|------|------|
| Domain name | $8-15/year |
| SSL certificate | Free (Let's Encrypt) |
| Hosting (Vercel/Netlify) | Free tier available |
| Email (optional) | $6/month |
| **Total (basic)** | **~$10/year** |

---

## Next Steps

After setting up your domain:

1. **Update environment variables:**
   ```env
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

2. **Submit to search engines:**
   - Google Search Console: https://search.google.com/search-console
   - Bing Webmaster Tools: https://www.bing.com/webmasters

3. **Set up analytics:**
   - Google Analytics: https://analytics.google.com
   - Vercel Analytics: Built into Vercel dashboard

4. **Configure social media:**
   - Update social media profiles with new domain
   - Set up Open Graph images for social sharing

---

Need help with a specific step? Let me know which registrar you're using and I can provide more specific instructions!
