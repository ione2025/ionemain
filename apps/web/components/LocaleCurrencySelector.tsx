'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocale, locales, localeNames, Locale } from '../contexts/LocaleContext';
import { useCurrency, currencies, currencySymbols } from '../contexts/CurrencyContext';

export function LocaleCurrencySelector() {
  const { locale, setLocale } = useLocale();
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClickOutside, handleKeyDown]);

  const getLocaleFlag = (loc: Locale) => {
    switch (loc) {
      case 'en': return '🇺🇸';
      case 'ar': return '🇸🇦';
      case 'zh': return '🇨🇳';
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Language and currency settings"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded border bg-white dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
      >
        <span aria-hidden="true">{getLocaleFlag(locale)}</span>
        <span className="hidden sm:inline">{currency}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-lg z-30 overflow-hidden">
          {/* Language Section */}
          <div className="px-3 py-2 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
              Language
            </div>
          </div>
          <div className="py-1">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  setLocale(loc);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  locale === loc ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                }`}
              >
                <span aria-hidden="true">{getLocaleFlag(loc)}</span>
                <span>{localeNames[loc]}</span>
                {locale === loc && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Currency Section */}
          <div className="px-3 py-2 border-t border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
              Currency
            </div>
          </div>
          <div className="py-1">
            {currencies.map((curr) => (
              <button
                key={curr}
                onClick={() => {
                  setCurrency(curr);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  currency === curr ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                }`}
              >
                <span className="w-6 text-center font-medium">{currencySymbols[curr]}</span>
                <span>{curr}</span>
                {currency === curr && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
