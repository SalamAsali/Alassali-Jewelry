'use client'

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  initial_inquiry: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Initial Inquiry' },
  payment_made: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Payment Made' },
  in_progress: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'In Progress' },
  shipped: { bg: 'bg-green-100', text: 'text-green-800', label: 'Shipped' },
  completed: { bg: 'bg-green-200', text: 'text-green-900', label: 'Completed' },
  // legacy statuses (backwards compatible)
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Initial Inquiry' },
  confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Payment Made' },
  in_production: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'In Progress' },
  delivered: { bg: 'bg-green-200', text: 'text-green-900', label: 'Completed' },
}

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.initial_inquiry
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  )
}
