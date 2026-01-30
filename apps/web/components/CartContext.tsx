'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';
import type { CartItem, Product } from '../types';

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = 'ionecenter_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product: Product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.productId === product.id);
      if (found) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { productId: product.id, qty }];
    });
  };

  const removeItem = (productId: string) =>
    setItems((prev) => prev.filter((i) => i.productId !== productId));

  const updateQty = (productId: string, qty: number) =>
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, qty } : i))
    );

  const clear = () => setItems([]);

  const total = useMemo(() => {
    return items.reduce((sum, i) => {
      const p = products.find((p) => p.id === i.productId);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  }, [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQty,
    clear,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};