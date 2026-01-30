import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Removed 'output: export' to enable API routes for user persistence
  basePath: '/ionemain',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
