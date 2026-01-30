'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Invoice } from '../../../../../components/Invoice';
import { orders } from '../../../../../data/orders';

export default function SellerInvoicePage() {
  const params = useParams();

  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order not found</h1>
          <Link
            href="/seller/orders"
            className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="no-print py-4 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/seller/orders/${order.id}`}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to order details
          </Link>
        </div>
      </div>
      <div className="py-8">
        <Invoice order={order} />
      </div>
    </main>
  );
}
