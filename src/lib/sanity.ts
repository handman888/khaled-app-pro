import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

type SanityImageSource = any;

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper functions for fetching data
export async function getProducts() {
  return client.fetch(`*[_type == "product" && isActive == true] | order(order asc) {
    _id,
    name,
    nameAr,
    slug,
    description,
    descriptionAr,
    category,
    price,
    pricePeriod,
    credits,
    features,
    featuresAr,
    image,
    isPopular,
    order
  }`);
}

export async function getProductBySlug(slug: string) {
  return client.fetch(`*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    nameAr,
    slug,
    description,
    descriptionAr,
    category,
    price,
    pricePeriod,
    credits,
    features,
    featuresAr,
    image,
    isPopular
  }`, { slug });
}

export async function getServices() {
  return client.fetch(`*[_type == "service"] | order(order asc) {
    _id,
    name,
    nameAr,
    slug,
    description,
    descriptionAr,
    shortDescription,
    shortDescriptionAr,
    category,
    icon,
    color,
    tools,
    pricing,
    image,
    order
  }`);
}

export async function getTestimonials() {
  return client.fetch(`*[_type == "testimonial" && isActive == true] {
    _id,
    quote,
    quoteAr,
    authorName,
    authorRole,
    authorCompany,
    authorImage,
    rating
  }`);
}
