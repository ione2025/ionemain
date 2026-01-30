'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Currency = 'USD' | 'SAR' | 'CNY';

export const currencies: Currency[] = ['USD', 'SAR', 'CNY'];

export const currencySymbols: Record<Currency, string> = {
  USD: '$',
  SAR: 'ر.س',
  CNY: '¥',
};

// Exchange rates relative to USD (approximate)
const exchangeRates: Record<Currency, number> = {
  USD: 1,
  SAR: 3.75,
  CNY: 7.24,
};

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
  convertPrice: (priceInUSD: number) => number;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const CURRENCY_KEY = 'ionecenter_currency';

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD');

  useEffect(() => {
    const saved = localStorage.getItem(CURRENCY_KEY) as Currency | null;
    if (saved && currencies.includes(saved)) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem(CURRENCY_KEY, newCurrency);
  };

  const convertPrice = (priceInUSD: number): number => {
    return priceInUSD * exchangeRates[currency];
  };

  const formatPrice = (priceInUSD: number): string => {
    const converted = convertPrice(priceInUSD);
    const symbol = currencySymbols[currency];
    
    // Format based on currency
    if (currency === 'CNY') {
      return `${symbol}${converted.toFixed(2)}`;
    } else if (currency === 'SAR') {
      return `${converted.toFixed(2)} ${symbol}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};
