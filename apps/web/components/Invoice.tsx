'use client';

import { useTranslations } from 'next-intl';
import { useCurrency } from '../contexts/CurrencyContext';
import { Order } from '../types';

type InvoiceProps = {
  order: Order;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
};

export function Invoice({ order, invoiceNumber, invoiceDate, dueDate }: InvoiceProps) {
  const t = useTranslations('invoice');
  const tCommon = useTranslations('common');
  const { formatPrice } = useCurrency();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .invoice-container,
          .invoice-container * {
            visibility: visible;
          }
          .invoice-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="invoice-container max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{tCommon('appName')}</h1>
              <p className="text-gray-600 dark:text-gray-400">B2B Marketplace Platform</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-semibold mb-2">{t('title')}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('invoiceNumber')}{invoiceNumber || order.orderNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Invoice Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-2">{t('billTo')}</h3>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="font-medium">{order.buyerName}</p>
              <p>{order.buyerEmail}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <div>
                <span className="font-medium">{t('invoiceDate')}:</span>{' '}
                {invoiceDate || new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">{t('dueDate')}:</span>{' '}
                {dueDate || new Date(new Date(order.createdAt).setDate(new Date(order.createdAt).getDate() + 30)).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Order #:</span> {order.orderNumber}
              </div>
            </div>
          </div>
        </div>

        {order.shippingAddress && (
          <div className="mb-8">
            <h3 className="font-semibold mb-2">{t('shipTo')}</h3>
            <div className="text-gray-700 dark:text-gray-300">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        )}

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-700">
                <th className="text-left py-3 font-semibold">{t('itemDescription')}</th>
                <th className="text-center py-3 font-semibold">{t('quantity')}</th>
                <th className="text-right py-3 font-semibold">{t('unitPrice')}</th>
                <th className="text-right py-3 font-semibold">{t('amount')}</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-4">{item.productName}</td>
                  <td className="py-4 text-center">{item.quantity}</td>
                  <td className="py-4 text-right">{formatPrice(item.price)}</td>
                  <td className="py-4 text-right font-medium">{formatPrice(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>{t('subtotal')}:</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>{t('tax')}:</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>{t('shipping')}:</span>
              <span>{formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t-2 border-gray-300 dark:border-gray-700 pt-2">
              <span>{t('total')}:</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Thank you for your business!</p>
          <p className="mt-2">© {new Date().getFullYear()} {tCommon('appName')}. All rights reserved.</p>
        </div>

        {/* Action Buttons */}
        <div className="no-print mt-8 flex gap-4 justify-center">
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm"
          >
            {t('print')}
          </button>
        </div>
      </div>
    </div>
  );
}
