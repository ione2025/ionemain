import { products } from '../../../../data/products';
import { SellerEditForm } from '../../../../components/SellerEditForm';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function SellerEditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <SellerEditForm id={id} />;
}