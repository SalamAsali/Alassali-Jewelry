// Field and model definitions, matching DATOCMS_MODELS.md.
// Shared by 01-models.mjs. Kept separate so the runner stays readable.

const textField = (label, apiKey, required = false) => ({
  label,
  api_key: apiKey,
  field_type: 'string',
  validators: required ? { required: {} } : {},
  appearance: {
    editor: 'single_line',
    parameters: { heading: false },
    addons: [],
  },
})

const multiText = (label, apiKey, required = false) => ({
  label,
  api_key: apiKey,
  field_type: 'text',
  validators: required ? { required: {} } : {},
  appearance: {
    editor: 'textarea',
    parameters: {},
    addons: [],
  },
})

const slugField = (label, apiKey, titleFieldId) => ({
  label,
  api_key: apiKey,
  field_type: 'slug',
  // Slug fields are inherently unique in DatoCMS; do not add `unique` here —
  // it is not an allowed validator for the `slug` field_type.
  validators: {
    required: {},
    slug_title_field: { title_field_id: titleFieldId },
  },
  appearance: {
    editor: 'slug',
    parameters: { url_prefix: null, placeholder: null },
    addons: [],
  },
})

const intField = (label, apiKey) => ({
  label,
  api_key: apiKey,
  field_type: 'integer',
  validators: {},
  appearance: { editor: 'integer', parameters: {}, addons: [] },
})

const dateField = (label, apiKey) => ({
  label,
  api_key: apiKey,
  field_type: 'date',
  validators: {},
  appearance: { editor: 'date_picker', parameters: {}, addons: [] },
})

const singleAsset = (label, apiKey) => ({
  label,
  api_key: apiKey,
  field_type: 'file',
  validators: {},
  appearance: { editor: 'file', parameters: {}, addons: [] },
})

const linkField = (label, apiKey, targetItemTypeApiKey) => ({
  label,
  api_key: apiKey,
  field_type: 'link',
  validators: { item_item_type: { item_types: [targetItemTypeApiKey] } },
  appearance: { editor: 'link_select', parameters: {}, addons: [] },
})

// Model definitions. Each entry:
//   api_key            — DatoCMS model api_key
//   name               — human label
//   singleton          — true for single-instance models
//   titleApiKey        — used for record titles (first string field)
//   fields             — ordered list of field builders
//   seed (optional)    — seed records for collections (handled in 03-records)
export const MODEL_DEFS = [
  {
    api_key: 'header',
    name: 'Header',
    singleton: true,
    titleApiKey: null,
    fields: [singleAsset('Logo', 'logo')],
  },
  {
    api_key: 'footer',
    name: 'Footer',
    singleton: true,
    titleApiKey: null,
    fields: [
      singleAsset('Logo', 'logo'),
      textField('Tagline', 'tagline'),
      textField('Phone', 'phone'),
      textField('Email', 'email'),
      textField('Location', 'location'),
    ],
  },
  {
    api_key: 'portfolio_page',
    name: 'Portfolio page',
    singleton: true,
    titleApiKey: 'heading',
    fields: [textField('Heading', 'heading'), multiText('Intro', 'intro')],
  },
  {
    api_key: 'portfolio_category',
    name: 'Portfolio category',
    singleton: false,
    titleApiKey: 'name',
    fields: [
      textField('Name', 'name', true),
      { __slug: true, label: 'Slug', api_key: 'slug', titleField: 'name' },
      intField('Order', 'order'),
    ],
  },
  {
    api_key: 'portfolio_item',
    name: 'Portfolio item',
    singleton: false,
    titleApiKey: 'name',
    fields: [
      textField('Name', 'name', true),
      { __link: true, label: 'Category', api_key: 'category', target: 'portfolio_category' },
      singleAsset('Image', 'image'),
      intField('Order', 'order'),
    ],
  },
  {
    api_key: 'faq_page',
    name: 'FAQ page',
    singleton: true,
    titleApiKey: 'heading',
    fields: [textField('Heading', 'heading'), multiText('Intro', 'intro')],
  },
  {
    api_key: 'faq_category',
    name: 'FAQ category',
    singleton: false,
    titleApiKey: 'name',
    fields: [textField('Name', 'name', true), intField('Order', 'order')],
  },
  {
    api_key: 'faq_item',
    name: 'FAQ item',
    singleton: false,
    titleApiKey: 'question',
    fields: [
      textField('Question', 'question', true),
      multiText('Answer', 'answer', true),
      { __link: true, label: 'Category', api_key: 'category', target: 'faq_category' },
      intField('Order', 'order'),
    ],
  },
  {
    api_key: 'blog_index',
    name: 'Blog index',
    singleton: true,
    titleApiKey: 'heading',
    fields: [
      textField('Heading', 'heading'),
      multiText('Intro', 'intro'),
      textField('SEO title', 'seo_title'),
      multiText('SEO description', 'seo_description'),
    ],
  },
  {
    api_key: 'blog_post',
    name: 'Blog post',
    singleton: false,
    titleApiKey: 'title',
    fields: [
      textField('Title', 'title', true),
      { __slug: true, label: 'Slug', api_key: 'slug', titleField: 'title' },
      multiText('Excerpt', 'excerpt'),
      dateField('Date', 'date'),
      intField('Reading minutes', 'reading_minutes'),
      textField('Tag', 'tag'),
    ],
  },
  {
    api_key: 'master_jeweller',
    name: 'Master jeweller',
    singleton: false,
    titleApiKey: 'name',
    fields: [
      textField('Name', 'name', true),
      { __slug: true, label: 'Slug', api_key: 'slug', titleField: 'name' },
      textField('Title', 'title'),
      multiText('Tagline', 'tagline'),
      multiText('Bio', 'bio'),
      textField('SEO title', 'seo_title'),
      multiText('SEO description', 'seo_description'),
    ],
  },
]

export { textField, multiText, slugField, intField, dateField, singleAsset, linkField }
