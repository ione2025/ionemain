import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Wireless Headphones',
    price: 89.99,
    rating: 4.4,
    image: 'https://picsum.photos/seed/p1/600/400',
    description: 'Comfortable over-ear wireless headphones with noise cancellation.',
  },
  {
    id: 'p2',
    name: 'Smartwatch Pro',
    price: 149.99,
    rating: 4.1,
    image: 'https://picsum.photos/seed/p2/600/400',
    description: 'Feature-rich smartwatch with fitness tracking and notifications.',
  },
  {
    id: 'p3',
    name: 'Portable Speaker',
    price: 39.99,
    rating: 4.0,
    image: 'https://picsum.photos/seed/p3/600/400',
    description: 'Compact Bluetooth speaker with clear sound and long battery life.',
  },
];