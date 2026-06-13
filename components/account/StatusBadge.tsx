'use client'

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
  confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Confirmed' },
  in_production: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'In Production' },
  shipped: { bg: 'bg-green-100', text: 'text-green-800', label: 'Shipped' },
  delivered: { bg: 'bg-green-200', text: 'text-green-900', label: 'Delivered' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
  refunded: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Refunded' },
}

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.pending
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  )
}
