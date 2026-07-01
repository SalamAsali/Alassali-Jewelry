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

      {/* Totals + Address */}
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

        <div className="rounded-lg bg-warm-white p-6">
          <h3 className="heading-subsection text-deep-charcoal mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            {order.subtotalCad > 0 && (
              <div className="flex justify-between">
                <span className="text-taupe">Subtotal</span>
                <span className="font-medium">${order.subtotalCad?.toFixed(2)}</span>
              </div>
            )}
            {order.shippingCad > 0 && (
              <div className="flex justify-between">
                <span className="text-taupe">Shipping</span>
                <span className="font-medium">${order.shippingCad?.toFixed(2)}</span>
              </div>
            )}
            {order.taxCad > 0 && (
              <div className="flex justify-between">
                <span className="text-taupe">Tax</span>
                <span className="font-medium">${order.taxCad?.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-stone pt-2 mt-2">
              <span className="font-semibold text-deep-charcoal">Total</span>
              <span className="font-bold text-lg">{order.totalCad ? `$${order.totalCad.toFixed(2)}` : 'TBD'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
