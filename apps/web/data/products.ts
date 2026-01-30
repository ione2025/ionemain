import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Wireless Headphones',
    price: 89.99,
    rating: 4.4,
    image: 'https://picsum.photos/seed/p1/600/400',
    images: [
      'https://picsum.photos/seed/p1/600/400',
      'https://picsum.photos/seed/p1b/600/400',
      'https://picsum.photos/seed/p1c/600/400',
    ],
    description:
      'Comfortable over-ear wireless headphones with noise cancellation.',
    category: 'Electronics',
    specs: [
      { label: 'Connectivity', value: 'Bluetooth 5.2' },
      { label: 'Battery', value: '30 hours' },
    ],
    reviews: [
      {
        author: 'Alice',
        rating: 5,
        comment: 'Great sound and comfy to wear!',
        date: '2026-01-10',
      },
      {
        author: 'Bob',
        rating: 4,
        comment: 'Battery life is solid.',
        date: '2026-01-20',
      },
    ],
  },
  {
    id: 'p2',
    name: 'Smartwatch Pro',
    price: 149.99,
    rating: 4.1,
    image: 'https://picsum.photos/seed/p2/600/400',
    images: [
      'https://picsum.photos/seed/p2/600/400',
      'https://picsum.photos/seed/p2b/600/400',
    ],
    description:
      'Feature-rich smartwatch with fitness tracking and notifications.',
    category: 'Electronics',
    specs: [
      { label: 'Water Resistance', value: '5 ATM' },
      { label: 'Sensors', value: 'HRM, GPS, SpO2' },
    ],
    reviews: [
      {
        author: 'Cara',
        rating: 4,
        comment: 'Excellent for workouts!',
        date: '2026-01-21',
      },
    ],
  },
  {
    id: 'p3',
    name: 'Portable Speaker',
    price: 39.99,
    rating: 4.0,
    image: 'https://picsum.photos/seed/p3/600/400',
    images: [
      'https://picsum.photos/seed/p3/600/400',
      'https://picsum.photos/seed/p3b/600/400',
    ],
    description:
      'Compact Bluetooth speaker with clear sound and long battery life.',
    category: 'Electronics',
    specs: [{ label: 'Battery', value: '12 hours' }],
    reviews: [],
  },
];
