# Sanity Setup Guide

## What's Been Set Up

I've added Sanity to your project with three schemas:

### 1. Products (`schemas/product.ts`)
- Name (English + Arabic)
- Description (English + Arabic)
- Category (Text, Image, Video, Audio, Code, etc.)
- Price & pricing period
- Credits included
- Features list
- Popular plan flag

### 2. Services (`schemas/service.ts`)
- Name (English + Arabic)
- Short/Long descriptions
- Category
- Icon & color
- Included tools
- Pricing tier

### 3. Testimonials (`schemas/testimonial.ts`)
- Quote (English + Arabic)
- Author info
- Rating (1-5)

---

## How to Access Sanity Studio

### Option 1: Direct URL (Recommended)

Go to:
```
https://www.sanity.io/manage/personal/project/YOUR_PROJECT_ID/studio
```

Replace `YOUR_PROJECT_ID` with your Sanity project ID.

### Option 2: Local Studio

Run this command:
```bash
cd C:\Users\khaled\Desktop\000\smart-design-digital-pro
npm run studio
```

Then open: http://localhost:3333

---

## Adding Your First Product

1. Open Sanity Studio
2. Click **Product** in the left sidebar
3. Click **Create new document**
4. Fill in the fields:

### Example: Text Generation Tool

| Field | Value |
|-------|-------|
| Product Name | Text Generation |
| Product Name (Arabic) | توليد النصوص |
| Slug | text-generation |
| Description | Create professional marketing copy and content with AI |
| Description (Arabic) | أنشئ محتوى تسويقي احترافي بالذكاء الاصطناعي |
| Category | text |
| Price | 29 |
| Price Period | month |
| Credits | 500 |
| Features | Blog posts, Social media captions, Email campaigns |
| Features (Arabic) | مقالات مدونة, منشورات تواصل اجتماعي, حملات بريد إلكتروني |
| Popular Plan | true |
| Active | true |
| Display Order | 1 |

5. Click **Publish** (top right)

---

## Adding Testimonials

1. Click **Testimonial** in the left sidebar
2. Click **Create new document**
3. Fill in:

| Field | Value |
|-------|-------|
| Quote | Changed how I work completely. The AI tools save me hours every week. |
| Quote (Arabic) | غيّرت طريقة عملي بالكامل. أدوات الذكاء الاصطناعي توفر لي ساعات كل أسبوع. |
| Author Name | Ahmed Hassan |
| Author Role | Marketing Director |
| Author Company | Tech Solutions |
| Rating | 5 |
| Active | true |

4. Click **Publish**

---

## Querying Data in Your Website

The Sanity client is ready at `src/lib/sanity.ts`. Use it like this:

### In a Server Component:

```tsx
import { getProducts, getTestimonials } from '@/lib/sanity';

export default async function PricingPage() {
  const products = await getProducts();
  const testimonials = await getTestimonials();
  
  return (
    <div>
      {products.map(product => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### In a Client Component:

```tsx
'use client';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/sanity';

export function ProductsList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  
  return (
    <div>
      {products.map(product => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
}
```

---

## Environment Variables (Already Set)

Make sure these are in Vercel:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_TOKEN` | Your API token |

---

## After Adding Products

Once you've added products in Sanity:

1. Push your code changes to GitHub:
   ```bash
   cd C:\Users\khaled\Desktop\000\smart-design-digital-pro
   git add .
   git commit -m "Add Sanity integration"
   git push
   ```

2. Vercel will auto-deploy with Sanity connected

3. Your pricing page will now pull products from Sanity!

---

## Next Steps

1. Add your products in Sanity Studio
2. Add testimonials
3. Update your pricing page to use Sanity data
4. Deploy to Vercel

Need help with any of these steps?
