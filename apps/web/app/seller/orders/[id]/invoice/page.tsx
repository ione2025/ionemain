import SellerInvoiceClient from './SellerInvoiceClient';
import { orders } from '../../../../../data/orders';

export function generateStaticParams() {
  return orders.map((order) => ({
    id: order.id,
  }));
}

export default function SellerInvoicePage() {
  return <SellerInvoiceClient />;
}
