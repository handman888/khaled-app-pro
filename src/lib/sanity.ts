import { createClient, SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

type SanityImageSource = any;

let _client: SanityClient | null = null;
let _builder: ReturnType<typeof imageUrlBuilder> | null = null;

function getClient(): SanityClient {
  if (!_client) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) {
      throw new Error('Sanity projectId is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment variables.');
    }
    _client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    });
  }
  return _client;
}

function getBuilder() {
  if (!_builder) {
    _builder = imageUrlBuilder(getClient());
  }
  return _builder;
}

// Wrapper client that defers Sanity initialization
export const client = {
  fetch: <T = any>(query: string, params?: Record<string, string | number>): Promise<T> => {
    return params ? getClient().fetch<T>(query, params) : getClient().fetch<T>(query);
  },
};

export function urlFor(source: SanityImageSource) {
  return getBuilder().image(source);
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
