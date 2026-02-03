# Translation System Guide

## Overview

The application uses [next-intl](https://next-intl-docs.vercel.app/) for internationalization (i18n). The translation system works for all user types (buyers, sellers, admins, and unauthenticated users) including the hero section on the home page.

## Supported Languages

- **English** (en) - Default 🇺🇸
- **Arabic** (ar) - RTL support 🇸🇦
- **Chinese** (zh) - Simplified 🇨🇳

## How It Works

### For All Users

1. **Language Selection**
   - Click the language/currency selector in the header (shows flag emoji)
   - Select your preferred language
   - The page automatically reloads with the new language
   - Your choice is saved in a cookie (`NEXT_LOCALE`)

2. **Hero Section Translations**
   - The hero section on the home page (`/`) uses server-side translations
   - Translations are determined by the `NEXT_LOCALE` cookie
   - Works for all user types: logged out, buyers, sellers, and admins
   - No user authentication required for translations to work

3. **Automatic RTL Support**
   - Arabic language automatically enables RTL (right-to-left) layout
   - Layout direction is handled automatically by the system

## Translation Files

Translation files are located in `apps/web/messages/`:

```
messages/
├── en.json   # English translations
├── ar.json   # Arabic translations (العربية)
└── zh.json   # Chinese translations (中文)
```

## How to Add New Translations

### 1. Add Translation Keys

Add your translation key to all three JSON files. For example, to add a new hero section element:

**en.json:**
```json
{
  "landing": {
    "newHeroElement": "Your new text in English"
  }
}
```

**ar.json:**
```json
{
  "landing": {
    "newHeroElement": "النص الجديد بالعربية"
  }
}
```

**zh.json:**
```json
{
  "landing": {
    "newHeroElement": "您的中文新文本"
  }
}
```

### 2. Use in Components

**Server Components** (e.g., home page):
```typescript
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('landing');
  
  return <h1>{t('newHeroElement')}</h1>;
}
```

**Client Components** (e.g., interactive components):
```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('landing');
  
  return <h1>{t('newHeroElement')}</h1>;
}
```

## Translation Namespaces

The translations are organized into namespaces:

- `common` - Shared common translations (loading, save, delete, etc.)
- `nav` - Navigation items
- `landing` - Home page including hero section
- `auth` - Login and signup pages
- `admin` - Admin dashboard
- `account` - User account pages
- `currency` - Currency names
- `sidebar` - Sidebar navigation
- `orders` - Order management
- `invoice` - Invoice pages
- `seller` - Seller dashboard
- `products` - Product listing and details
- `categories` - Category pages

## User Profile Types and Translations

### All User Types See Translated Content

✅ **Logged Out Users**
- See translated hero section
- See translated navigation
- See translated product pages
- Can change language via selector

✅ **Buyers** (logged in)
- All translations work
- Personal dashboard shows translated content
- Orders page shows translated content

✅ **Sellers** (logged in)
- All translations work
- Seller dashboard shows translated content
- Product management shows translated content

✅ **Admins** (logged in)
- All translations work
- Admin dashboard shows translated content
- User management shows translated content

### How Language Preference is Stored

1. User selects language from the dropdown
2. Choice is saved in a cookie: `NEXT_LOCALE=en|ar|zh`
3. Cookie has 1-year expiration
4. Page reloads to apply new language
5. Server reads cookie and serves appropriate translations
6. Works across all pages and components

## Testing Translations

1. Open the application in your browser
2. Click the language/currency selector (flag icon in header)
3. Select different languages:
   - English (🇺🇸)
   - العربية (🇸🇦) - Notice RTL layout
   - 中文 (🇨🇳)
4. Observe that:
   - Hero section text changes
   - Navigation changes
   - All page content changes
   - Layout flips for Arabic (RTL)

## Troubleshooting

### Translations Not Updating

1. Check browser cookies - ensure `NEXT_LOCALE` cookie is set
2. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
3. Clear browser cache and cookies
4. Check browser console for errors

### Missing Translation Keys

If you see a translation key instead of text (e.g., "landing.heroTitle"):

1. Verify the key exists in all three translation files
2. Check for typos in the key name
3. Restart the development server
4. Clear Next.js cache: `rm -rf .next`

### RTL Layout Issues

If Arabic text isn't displaying right-to-left:

1. Check that 'ar' is in the `rtlLocales` array in `contexts/LocaleContext.tsx`
2. Verify the `dir` attribute is set on the `<html>` tag
3. Check that Tailwind's RTL plugin is configured (if using custom RTL styles)

## Configuration Files

- `apps/web/i18n/request.ts` - i18n configuration and locale handling
- `apps/web/contexts/LocaleContext.tsx` - Client-side locale context
- `apps/web/next.config.ts` - Next.js i18n configuration
- `apps/web/messages/` - Translation files directory

## Adding New Languages

To add a new language (e.g., French):

1. Add locale to `i18n/request.ts`:
   ```typescript
   export const locales = ['en', 'ar', 'zh', 'fr'] as const;
   export const localeNames: Record<Locale, string> = {
     ...
     fr: 'Français',
   };
   ```

2. Add locale to `contexts/LocaleContext.tsx`:
   ```typescript
   export const locales: Locale[] = ['en', 'ar', 'zh', 'fr'];
   export const localeNames: Record<Locale, string> = {
     ...
     fr: 'Français',
   };
   ```

3. Create `messages/fr.json` with all translations

4. Add flag emoji to `LocaleCurrencySelector.tsx`:
   ```typescript
   case 'fr': return '🇫🇷';
   ```

5. Test thoroughly across all pages
