import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getOrderByNumber } from '@/lib/orders'
import { StatusBadge } from '@/components/account/StatusBadge'

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderNo: string }>
}) {
  const { userId } = await auth()
  if (!userId) redirect('/account/login')

  const { orderNo } = await params
  const order = await getOrderByNumber(decodeURIComponent(orderNo))
  if (!order) notFound()

  const items = Array.isArray(order.items) ? order.items : []
  const shippingAddress = order.shippingAddress || {}

  return (
    <div className="section-container py-16">
      <Link href="/account/orders" className="text-sm text-glacier-grey hover:text-glacier-grey-light transition-colors mb-6 inline-block">
        ← Back to Orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="heading-section text-deep-charcoal">
            Order {order.orderNo}
          </h1>
          <p className="text-sm text-taupe mt-1">
            {order._createdAt
              ? new Date(order._createdAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
              : ''}
          </p>
        </div>
        <StatusBadge status={order.status || 'initial_inquiry'} />
      </div>

      {/* Inquiry details (for custom orders at inquiry stage) */}
      {order.inquiryDetails && (
        <div className="rounded-lg border-2 border-soft-black overflow-hidden mb-8">
          <div className="bg-soft-black px-6 py-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-glacier-grey-light">Inquiry Details</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {order.inquiryDetails.jewelryCategory && (
              <div>
                <span className="text-taupe block text-xs uppercase tracking-wide mb-1">Type</span>
                <span className="text-deep-charcoal font-medium">{order.inquiryDetails.jewelryCategory}</span>
              </div>
            )}
            {order.inquiryDetails.style && (
              <div>
                <span className="text-taupe block text-xs uppercase tracking-wide mb-1">Style</span>
                <span className="text-deep-charcoal font-medium">{order.inquiryDetails.style}</span>
              </div>
            )}
            {order.inquiryDetails.metalType && (
              <div>
                <span className="text-taupe block text-xs uppercase tracking-wide mb-1">Metal</span>
                <span className="text-deep-charcoal font-medium">{order.inquiryDetails.metalType}</span>
              </div>
            )}
            {order.inquiryDetails.goldColor && (
              <div>
                <span className="text-taupe block text-xs uppercase tracking-wide mb-1">Gold Color</span>
                <span className="text-deep-charcoal font-medium">{order.inquiryDetails.goldColor}</span>
              </div>
            )}
            {order.inquiryDetails.stonePreferences && (
              <div>
                <span className="text-taupe block text-xs uppercase tracking-wide mb-1">Stones</span>
                <span className="text-deep-charcoal font-medium">{order.inquiryDetails.stonePreferences}</span>
              </div>
            )}
            {order.inquiryDetails.diamondType && (
              <div>
                <span className="text-taupe block text-xs uppercase tracking-wide mb-1">Diamond Type</span>
                <span className="text-deep-charcoal font-medium">{order.inquiryDetails.diamondType}</span>
              </div>
            )}
            {order.inquiryDetails.stoneShape && (
              <div>
                <span className="text-taupe block text-xs uppercase tracking-wide mb-1">Stone Shape</span>
                <span className="text-deep-charcoal font-medium">{order.inquiryDetails.stoneShape}</span>
              </div>
            )}
            {order.inquiryDetails.size && (
              <div>
                <span className="text-taupe block text-xs uppercase tracking-wide mb-1">Size</span>
                <span className="text-deep-charcoal font-medium">{order.inquiryDetails.size}</span>
              </div>
            )}
            {order.inquiryDetails.budget && (
              <div>
                <span className="text-taupe block text-xs uppercase tracking-wide mb-1">Budget</span>
                <span className="text-deep-charcoal font-medium">{order.inquiryDetails.budget}</span>
              </div>
            )}
            {order.inquiryDetails.timeline && (
              <div>
                <span className="text-taupe block text-xs uppercase tracking-wide mb-1">Timeline</span>
                <span className="text-deep-charcoal font-medium">{order.inquiryDetails.timeline}</span>
              </div>
            )}
            {order.inquiryDetails.notes && (
              <div className="sm:col-span-2">
                <span className="text-taupe block text-xs uppercase tracking-wide mb-1">Notes</span>
                <span className="text-deep-charcoal font-medium">{order.inquiryDetails.notes}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Items table */}
      {items.length > 0 && (
        <div className="rounded-lg border-2 border-soft-black overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-soft-black">
              <tr>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-glacier-grey-light">Product</th>
                <th className="text-right py-3 px-4 text-xs uppercase tracking-wider font-semibold text-glacier-grey-light">Price</th>
                <th className="text-right py-3 px-4 text-xs uppercase tracking-wider font-semibold text-glacier-grey-light">Qty</th>
                <th className="text-right py-3 px-4 text-xs uppercase tracking-wider font-semibold text-glacier-grey-light">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, i: number) => (
                <tr key={i} className="border-b border-stone">
                  <td className="py-4 px-4">
                    <div className="font-medium text-deep-charcoal">{item.name}</div>
                    {(item.metal || item.karat || item.length) && (
                      <div className="text-xs text-taupe mt-1">
                        {[item.karat, item.metal, item.length ? `${item.length}"` : ''].filter(Boolean).join(' · ')}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right font-medium">${item.unitPrice?.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right">{item.quantity}</td>
                  <td className="py-4 px-4 text-right font-medium">${((item.unitPrice || 0) * (item.quantity || 1)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Shipping + Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {shippingAddress.line1 && (
          <div>
            <h3 className="heading-subsection text-deep-charcoal mb-4">Shipping Address</h3>
            <div className="text-sm text-charcoal space-y-1">
              {shippingAddress.line1 && <p>{shippingAddress.line1}</p>}
              {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
              {(shippingAddress.city || shippingAddress.province) && (
                <p>{[shippingAddress.city, shippingAddress.province, shippingAddress.postal].filter(Boolean).join(', ')}</p>
              )}
              {shippingAddress.country && <p>{shippingAddress.country}</p>}
            </div>
          </div>
        )}

        {order.trackingNumber && (
          <div>
            <h3 className="heading-subsection text-deep-charcoal mb-2">Tracking</h3>
            <p className="text-sm font-medium text-glacier-grey">{order.trackingNumber}</p>
          </div>
        )}
      </div>
    </div>
  )
}
