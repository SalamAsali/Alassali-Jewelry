import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Logo displayed in header and navigation. Will be inverted on dark background.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Links',
      maxRows: 12,
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Label' },
        { name: 'url', type: 'text', required: true, label: 'URL', admin: { description: 'e.g. /catalog or /faq' } },
      ],
      admin: {
        description: 'Main nav links. Products/Bespoke dropdowns remain static; use for direct links.',
      },
    },
  ],
}
