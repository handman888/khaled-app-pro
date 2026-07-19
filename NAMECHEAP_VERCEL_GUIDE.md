# Namecheap + Vercel DNS Setup Guide

## Step-by-Step Instructions

---

## Part 1: Deploy to Vercel First

### 1.1 Install Vercel CLI (if not installed)

```bash
npm install -g vercel
```

### 1.2 Login to Vercel

```bash
vercel login
```

This opens a browser. Sign in with your GitHub/Google account.

### 1.3 Deploy Your Project

```bash
cd C:\Users\khaled\Desktop\000\smart-design-digital-pro
vercel
```

Answer the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **smart-design-digital-pro** (or your preferred name)
- Directory? **./**
- Override settings? **N**

### 1.4 Deploy to Production

```bash
vercel --prod
```

**Save the deployment URL** (e.g., `https://smart-design-digital-pro.vercel.app`)

---

## Part 2: Add Domain in Vercel

### 2.1 Go to Vercel Dashboard

1. Open https://vercel.com/dashboard
2. Click on your project (**smart-design-digital-pro**)

### 2.2 Add Your Domain

1. Click **Settings** (top menu)
2. Click **Domains** (left sidebar)
3. Type your domain name: `smartdesigndigitalpro.com`
4. Click **Add**

### 2.3 Note the DNS Instructions

Vercel will show you DNS records. You'll see something like:

```
Required DNS Records:

Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Keep this page open** — you'll need these values for Namecheap.

---

## Part 3: Configure DNS in Namecheap

### 3.1 Login to Namecheap

1. Go to https://www.namecheap.com
2. Click **Sign In** (top right)
3. Enter your username and password

### 3.2 Go to Domain List

1. Click **Dashboard** (top left)
2. Click **Domain List** (left sidebar)
3. Find your domain and click **Manage** (next to it)

### 3.3 Open Advanced DNS

1. Click the **Advanced DNS** tab
2. You'll see a section called **HOST RECORDS**

### 3.4 Add DNS Records

Click **Add New Record** and add each record:

#### Record 1: A Record (for root domain)

| Field | Value |
|-------|-------|
| Type | **A Record** |
| Host | **@** |
| Value | **76.76.21.21** |
| TTL | **Automatic** |

Click the green checkmark to save.

#### Record 2: CNAME Record (for www)

| Field | Value |
|-------|-------|
| Type | **CNAME Record** |
| Host | **www** |
| Value | **cname.vercel-dns.com** |
| TTL | **Automatic** |

Click the green checkmark to save.

### 3.5 Verify Your Records

After adding both records, you should see:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | Automatic |
| CNAME | www | cname.vercel-dns.com | Automatic |

**Delete any existing conflicting records** (like default parking page records).

---

## Part 4: Verify in Vercel

### 4.1 Check DNS Configuration

1. Go back to Vercel Dashboard
2. Your project → **Settings** → **Domains**
3. You should see your domain with a status indicator

### 4.2 Click Verify

1. Click **Verify** next to your domain
2. Wait for verification to complete

### 4.3 Set as Production Domain

Once verified:
1. Click the three dots (⋮) next to your domain
2. Select **Set as Production Domain**

---

## Part 5: Wait for DNS Propagation

### 5.1 Propagation Time

- **Minimum:** 5-30 minutes
- **Average:** 1-2 hours
- **Maximum:** 24-48 hours (rare)

### 5.2 Check Propagation Status

Go to https://dnschecker.org

1. Enter your domain: `smartdesigndigitalpro.com`
2. Click **Search**
3. Check if the A record shows **76.76.21.21**

### 5.3 Test Your Site

Once propagation is complete:

1. Open https://smartdesigndigitalpro.com
2. Your site should load!
3. SSL certificate should be active (lock icon in browser)

---

## Troubleshooting

### Issue: Domain Shows "Invalid Configuration"

**Solution:**
1. Double-check DNS records in Namecheap
2. Make sure Host is `@` for A record (not your domain name)
3. Wait 30 minutes and click **Verify** again

### Issue: Site Shows Parking Page

**Solution:**
1. In Namecheap Advanced DNS, delete any "Parking" or "Redirect" records
2. Make sure only your A and CNAME records exist
3. Clear browser cache and try again

### Issue: SSL Certificate Not Working

**Solution:**
1. Wait up to 24 hours for SSL provisioning
2. In Vercel, go to Settings → Domains → Refresh
3. Make sure DNS is fully propagated

### Issue: www Not Working

**Solution:**
1. Verify CNAME record: Host = `www`, Value = `cname.vercel-dns.com`
2. In Vercel, add `www.yourdomain.com` as a domain
3. Set redirect to non-www version

---

## Optional: Add www Redirect

If you want `www.yourdomain.com` to redirect to `yourdomain.com`:

### In Vercel:

1. Go to Settings → Domains
2. Add `www.yourdomain.com`
3. Click the three dots (⋮) → **Edit**
4. Select **Redirect to yourdomain.com**

---

## Optional: Email Forwarding (Free)

To receive email at your domain (e.g., `hello@smartdesigndigitalpro.com`):

### Using Namecheap Email Forwarding:

1. In Namecheap, go to your domain → **Manage**
2. Click **Redirect Email** (left sidebar)
3. Add forwarding rules:
   ```
   hello@yourdomain.com → yourname@gmail.com
   info@yourdomain.com → yourname@gmail.com
   ```
4. Click **Save**

---

## Complete DNS Record Example

Here's what your final DNS setup should look like in Namecheap:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | Automatic |
| CNAME | www | cname.vercel-dns.com | Automatic |

**That's it!** Just these two records.

---

## Verification Checklist

- [ ] Deployed to Vercel successfully
- [ ] Added domain in Vercel dashboard
- [ ] Added A record in Namecheap (@ → 76.76.21.21)
- [ ] Added CNAME record in Namecheap (www → cname.vercel-dns.com)
- [ ] Removed any conflicting records
- [ ] Verified domain in Vercel
- [ ] Set as production domain in Vercel
- [ ] Waited for DNS propagation
- [ ] Site loads at your domain
- [ ] SSL certificate is active (lock icon)

---

Need help? Tell me what step you're on and I'll guide you through it!
