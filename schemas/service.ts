export const service = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'nameAr',
      title: 'Service Name (Arabic)',
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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      validation: (Rule: any) => Rule.max(160),
    },
    {
      name: 'shortDescriptionAr',
      title: 'Short Description (Arabic)',
      type: 'string',
      validation: (Rule: any) => Rule.max(160),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Content Creation', value: 'content' },
          { title: 'Design', value: 'design' },
          { title: 'Development', value: 'development' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Productivity', value: 'productivity' },
        ],
      },
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., PenTool, Image, Video)',
    },
    {
      name: 'color',
      title: 'Theme Color',
      type: 'string',
      options: {
        list: [
          { title: 'Indigo', value: 'accent' },
          { title: 'Cyan', value: 'accent-secondary' },
          { title: 'Violet', value: 'accent-glow' },
        ],
      },
    },
    {
      name: 'tools',
      title: 'Included Tools',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of tool slugs included in this service',
    },
    {
      name: 'pricing',
      title: 'Pricing Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Free', value: 'free' },
          { title: 'Basic', value: 'basic' },
          { title: 'Pro', value: 'pro' },
          { title: 'Enterprise', value: 'enterprise' },
        ],
      },
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
};
