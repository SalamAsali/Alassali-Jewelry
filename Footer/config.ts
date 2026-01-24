import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      defaultValue: 'Crafting bespoke luxury jewelry in Toronto since 2020. Where tradition meets innovation.',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Footer Links',
      maxRows: 20,
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Label' },
        { name: 'url', type: 'text', required: true, label: 'URL' },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      defaultValue: '+1 (416) 555-1234',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      defaultValue: 'info@alassali.ca',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      defaultValue: 'Toronto & Mississauga, ON',
    },
  ],
}
