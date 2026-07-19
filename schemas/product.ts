export const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'nameAr',
      title: 'Product Name (Arabic)',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'descriptionAr',
      title: 'Description (Arabic)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Text Generation', value: 'text' },
          { title: 'Image Generation', value: 'image' },
          { title: 'Video Generation', value: 'video' },
          { title: 'Audio/Music', value: 'audio' },
          { title: 'Code Generation', value: 'code' },
          { title: 'Chatbot', value: 'chat' },
          { title: 'Translation', value: 'translate' },
          { title: 'Document Analysis', value: 'document' },
          { title: 'Presentation', value: 'presentation' },
          { title: 'Resume Builder', value: 'resume' },
          { title: 'Social Media', value: 'social' },
        ],
      },
    },
    {
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: 'pricePeriod',
      title: 'Price Period',
      type: 'string',
      options: {
        list: [
          { title: 'One-time', value: 'once' },
          { title: 'Per month', value: 'month' },
          { title: 'Per year', value: 'year' },
          { title: 'Per credit', value: 'credit' },
        ],
      },
    },
    {
      name: 'credits',
      title: 'Credits Included',
      type: 'number',
      description: 'Number of credits included in this plan',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'featuresAr',
      title: 'Features (Arabic)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'isPopular',
      title: 'Popular Plan',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
};
