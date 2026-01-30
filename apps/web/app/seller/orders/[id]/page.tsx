import SellerOrderDetailClient from './SellerOrderDetailClient';
import { orders } from '../../../../data/orders';

export function generateStaticParams() {
  return orders.map((order) => ({
    id: order.id,
  }));
}

export default function SellerOrderDetailPage() {
  return <SellerOrderDetailClient />;
}
