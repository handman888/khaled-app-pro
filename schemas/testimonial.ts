export const testimonial = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'quoteAr',
      title: 'Quote (Arabic)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'authorRole',
      title: 'Author Role',
      type: 'string',
    },
    {
      name: 'authorCompany',
      title: 'Author Company',
      type: 'string',
    },
    {
      name: 'authorImage',
      title: 'Author Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'authorCompany',
      media: 'authorImage',
    },
  },
};
