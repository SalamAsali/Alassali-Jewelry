import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'createdAt'],
  },
  access: {
    read: () => true, // Public read access
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'Engagement Rings', value: 'engagement-rings' },
        { label: 'Grillz', value: 'grillz' },
        { label: 'Chains', value: 'chains' },
        { label: 'Pendants', value: 'pendants' },
        { label: 'Rings', value: 'rings' },
        { label: 'Earrings', value: 'earrings' },
        { label: 'Bracelets', value: 'bracelets' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
  timestamps: true,
}
