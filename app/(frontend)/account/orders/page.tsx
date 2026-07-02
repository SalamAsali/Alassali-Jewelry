import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getOrdersByCustomerEmail } from '@/lib/orders'
import { StatusBadge } from '@/components/account/StatusBadge'

export default async function OrdersPage() {
  const { userId } = await auth()
  if (!userId) redirect('/account/login')

  const user = await currentUser()
  const email = user?.emailAddresses?.[0]?.emailAddress
  const orders = email ? await getOrdersByCustomerEmail(email) : []

  return (
    <div className="section-container py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="heading-section text-deep-charcoal">My Orders</h1>
        <Link href="/account" className="text-sm text-glacier-grey hover:text-glacier-grey-light transition-colors">
          ← Back to Account
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 rounded-lg border-2 border-stone">
          <p className="text-taupe text-lg mb-4">No orders yet</p>
          <Link
            href="/chains"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-glacier-grey to-glacier-grey-light text-white px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Browse Chains
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-soft-black">
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-charcoal">Order #</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-charcoal">Date</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-charcoal">Status</th>
                <th className="text-right py-3 px-4 text-xs uppercase tracking-wider font-semibold text-charcoal">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order._id} className="border-b border-stone hover:bg-warm-white transition-colors">
                  <td className="py-4 px-4 font-medium text-deep-charcoal">
                    {order.orderNo || order._id}
                  </td>
                  <td className="py-4 px-4 text-sm text-taupe">
                    {order._createdAt
                      ? new Date(order._createdAt).toLocaleDateString('en-CA')
                      : '—'}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={order.status || 'initial_inquiry'} />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      href={`/account/orders/${encodeURIComponent(order.orderNo || order._id)}`}
                      className="text-sm font-semibold text-glacier-grey hover:text-glacier-grey-light transition-colors"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
