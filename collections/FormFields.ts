import type { CollectionConfig } from 'payload'

export const FormFields: CollectionConfig = {
  slug: 'form-fields',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'fieldType', 'required', 'order'],
  },
  access: {
    read: () => true, // Public read access for form rendering
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Field Label',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Field Name (slug)',
      admin: {
        description: 'Used as the field name in forms (e.g., "jewelry-category")',
      },
    },
    {
      name: 'fieldType',
      type: 'select',
      required: true,
      label: 'Field Type',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'tel' },
        { label: 'Textarea', value: 'textarea' },
        { label: 'Select', value: 'select' },
        { label: 'Checkbox', value: 'checkbox' },
        { label: 'Number', value: 'number' },
      ],
    },
    {
      name: 'options',
      type: 'array',
      label: 'Options (for select fields)',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        condition: (data) => data.fieldType === 'select',
      },
    },
    {
      name: 'placeholder',
      type: 'text',
      label: 'Placeholder Text',
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Required',
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
