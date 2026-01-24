import type { CollectionConfig } from 'payload'
import { Resend } from 'resend'

const senderEmail =
  process.env.SENDER_EMAIL || "Alassali Jewelry <inquiries@thedreamsagency.com>";
const adminEmail = process.env.ADMIN_EMAIL || "inquiries@thedreamsagency.com";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const formatValue = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.length ? value.map(formatValue).join(", ") : "—";
  }
  if (value && typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }
  if (value === null || value === undefined || value === "") {
    return "—";
  }
  return String(value);
};

const buildSummary = (details: Record<string, unknown>) =>
  Object.entries(details)
    .map(([key, value]) => `${key}: ${formatValue(value)}`)
    .join("\n");

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'jewelryCategory', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // Allow public submissions
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Only send email on create operation
        if (operation === 'create' && resend) {
          try {
            const summaryPayload: Record<string, unknown> = {
              name: doc.name,
              email: doc.email,
              phone: doc.phone || "—",
              source: doc.source || "website",
              jewelryCategory: doc.jewelryCategory || "—",
              budget: doc.budget || "—",
              style: doc.style || "—",
              metalType: doc.metalType || "—",
              stonePreferences: Array.isArray(doc.stonePreferences)
                ? doc.stonePreferences.map((s: any) => s.stone || s).join(", ")
                : "—",
              size: doc.size || "—",
              timeline: doc.timeline || "—",
              notes: doc.notes || "—",
              inspirationNames: doc.inspirationNames || "—",
            };
            const summaryText = buildSummary(summaryPayload);
            const summaryHtml = `<pre style="white-space:pre-wrap;font-family:ui-monospace,monospace;">${summaryText}</pre>`;

            await resend.emails.send({
              from: senderEmail,
              to: [adminEmail],
              subject: `New Jewelry Inquiry${doc.name ? ` — ${doc.name}` : ""}`,
              text: summaryText,
              html: summaryHtml,
              replyTo: doc.email || undefined,
            });
          } catch (error) {
            console.error("Failed to send Resend notification via hook", error);
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'jewelryCategory',
      type: 'select',
      label: 'Jewelry Category',
      options: [
        { label: 'Engagement Rings', value: 'engagement-rings' },
        { label: 'Grillz', value: 'grillz' },
        { label: 'Chains', value: 'chains' },
        { label: 'Pendants', value: 'pendants' },
        { label: 'Rings', value: 'rings' },
        { label: 'Earrings', value: 'earrings' },
        { label: 'Bracelets', value: 'bracelets' },
      ],
    },
    {
      name: 'budget',
      type: 'text',
      label: 'Budget Range',
    },
    {
      name: 'style',
      type: 'text',
      label: 'Preferred Style',
    },
    {
      name: 'metalType',
      type: 'text',
      label: 'Metal Type',
    },
    {
      name: 'stonePreferences',
      type: 'array',
      label: 'Stone Preferences',
      fields: [
        {
          name: 'stone',
          type: 'text',
        },
      ],
    },
    {
      name: 'size',
      type: 'text',
      label: 'Size/Dimensions',
    },
    {
      name: 'timeline',
      type: 'text',
      label: 'Timeline',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Additional Notes',
    },
    {
      name: 'inspirationNames',
      type: 'text',
      label: 'Inspiration File Names',
    },
    {
      name: 'source',
      type: 'text',
      label: 'Source',
      admin: {
        description: 'Where this inquiry came from (e.g., "custom-grillz", "website")',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    {
      name: 'stripeSessionId',
      type: 'text',
      label: 'Stripe Session ID',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'depositAmountCents',
      type: 'number',
      label: 'Deposit Amount (cents)',
      defaultValue: 5000,
    },
  ],
  timestamps: true,
}
