# ionecenter (MVP)

A full‑stack B2B marketplace MVP inspired by modern commerce platforms.

## Tech Stack (MVP)
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, next-intl
- **Database:** Firebase Firestore
- **Storage:** Firebase Storage
- **Auth:** Custom authentication (Auth.js planned)
- **Internationalization:** next-intl (English, Arabic, Chinese)
- **DevOps:** GitHub Actions

## Features
- 🌍 **Multi-language Support**: English, Arabic (RTL), and Chinese
- 📦 **Product Management**: Add products individually or via bulk Excel upload
- 🛒 **Shopping Cart & Orders**: Complete e-commerce functionality
- 👥 **Multi-role System**: Buyers, Sellers, and Admins
- 🔥 **Firebase Integration**: Real-time data with Firestore
- 📊 **Seller Dashboard**: Manage products, orders, and analytics
- 📥 **Bulk Upload**: Import products via Excel files
- 🔗 **1688.com Integration**: Documentation for importing from Chinese wholesale marketplace

## Monorepo Structure
```
apps/
  web/        # Next.js frontend
  api/        # NestJS backend (GraphQL) - planned
packages/
  shared/     # shared types/utils - planned
```

## Getting Started

### Prerequisites
- Node.js 18+ or compatible version
- pnpm (recommended) or npm
- Firebase project (for production use)

### Installation

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up environment variables**:
   ```bash
   cd apps/web
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Firebase credentials:
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **Run development server**:
   ```bash
   pnpm dev
   ```

4. **Open browser**:
   Navigate to `http://localhost:3000`

## Firebase Setup

### Creating a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the wizard
3. Once created, click on the web icon (</>)  to add a web app
4. Copy the configuration values to your `.env.local` file

### Setting up Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create Database"
3. Choose "Start in test mode" (for development) or "Start in production mode" (configure rules later)
4. Select a location for your database

### Firestore Collections Structure

```
orders/
  {orderId}/
    - orderNumber: string
    - buyerId: string
    - buyerName: string
    - buyerEmail: string
    - sellerId: string
    - sellerName: string
    - items: array
    - total: number
    - status: string
    - createdAt: timestamp
    - shippingAddress: object

products/
  {productId}/
    - modelNumber: string
    - name: string
    - description: string
    - price: number
    - category: string
    - image: string
    - sellerId: string
    - createdAt: timestamp
    - status: string
```

### Setting up Firebase Storage

1. In Firebase Console, go to "Storage"
2. Click "Get Started"
3. Follow the wizard to set up storage
4. Storage rules will be automatically configured

### Security Rules (Production)

For production, update Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Orders - sellers can read their orders, buyers can read theirs
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (resource.data.sellerId == request.auth.uid || 
         resource.data.buyerId == request.auth.uid);
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        resource.data.sellerId == request.auth.uid;
    }
    
    // Products - sellers can manage their products, everyone can read
    match /products/{productId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && 
        resource.data.sellerId == request.auth.uid;
    }
  }
}
```

## Language Support

The application supports three languages:
- **English** (en) - Default
- **Arabic** (ar) - Right-to-left (RTL) layout
- **Chinese** (zh) - Simplified Chinese

### How to Switch Languages
1. Click on the language/currency selector in the header (flag icon)
2. Select your preferred language
3. The page will reload with the selected language

### Adding New Translations
1. Edit the translation files in `apps/web/messages/`:
   - `en.json` - English
   - `ar.json` - Arabic
   - `zh.json` - Chinese
2. Add your new translation keys and values
3. Use in components with `useTranslations('namespace')`

## Bulk Product Upload

### Using Excel Bulk Upload

1. Navigate to **Seller Dashboard** > **Products**
2. Click **"Bulk Upload"** button
3. Download the Excel template
4. Fill in your product details:
   - Model Number
   - Product Name
   - Description
   - Price
   - Category
   - Image Path (optional)
5. Upload the completed Excel file
6. Products will be imported to Firestore

### Excel Template Format
| Model Number | Product Name | Description | Price | Category | Image Path |
|--------------|-------------|-------------|-------|----------|------------|
| MOD-001 | Sample Product | Description here | 99.99 | Electronics | /path/to/image.jpg |

## 1688.com Integration

For detailed instructions on importing products from 1688.com (Alibaba's Chinese wholesale marketplace), see [INTEGRATION_1688.md](./INTEGRATION_1688.md).

The guide covers:
- API integration (recommended)
- Web scraping alternatives
- Translation and currency conversion
- Legal and ethical considerations
- Step-by-step implementation

## Environment Variables

### Required Variables
- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase app ID

### Optional Variables
- `ALIBABA_APP_KEY` - For 1688.com integration
- `ALIBABA_APP_SECRET` - For 1688.com integration
- `ALIBABA_ACCESS_TOKEN` - For 1688.com integration
- `GOOGLE_TRANSLATE_API_KEY` - For automatic translation

See `apps/web/.env.example` for complete list.

## Development

### Running Tests
```bash
pnpm test
```

### Building for Production
```bash
pnpm build
```

### Linting
```bash
pnpm lint
```

## Deployment

The application is configured for static export and can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

### Build Configuration
In `next.config.ts`:
- `output: 'export'` - Static export
- `basePath: '/ionemain'` - Base path for GitHub Pages
- `images: { unoptimized: true }` - Unoptimized images for static export

## Project Structure

```
apps/web/
├── app/                    # Next.js app directory
│   ├── account/           # User account pages
│   ├── admin/             # Admin dashboard
│   ├── cart/              # Shopping cart
│   ├── categories/        # Category pages
│   ├── products/          # Product pages
│   ├── seller/            # Seller dashboard
│   │   ├── orders/       # Seller orders
│   │   ├── products/     # Seller products
│   │   └── analytics/    # Seller analytics
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   └── page.tsx          # Home page
├── components/            # React components
├── contexts/             # React contexts
├── data/                 # Mock data
├── i18n/                 # Internationalization config
├── lib/                  # Utility libraries
│   ├── firebase.ts      # Firebase configuration
│   ├── orders.ts        # Orders service
│   └── products.ts      # Products service
├── messages/             # Translation files
│   ├── en.json          # English
│   ├── ar.json          # Arabic
│   └── zh.json          # Chinese
└── types.ts             # TypeScript types
```

## Troubleshooting

### Firebase Connection Issues
- Verify all environment variables are set correctly
- Check Firebase project settings match your `.env.local`
- Ensure Firestore and Storage are enabled in Firebase Console

### Language Not Switching
- Clear browser cookies and reload
- Check that `NEXT_LOCALE` cookie is being set
- Verify translation files are complete

### Bulk Upload Not Working
- Ensure Firebase Storage is enabled
- Check file format matches template
- Verify seller authentication

### Orders Not Appearing
- Confirm Firestore collections are created
- Check seller ID matches authenticated user
- Verify Firestore security rules allow read access

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue in the GitHub repository
- Contact the development team

## Roadmap

- [ ] Authentication with Auth.js/NextAuth
- [ ] Payment integration (Stripe/PayPal)
- [ ] Messaging system between buyers and sellers
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered product recommendations
- [ ] Multi-vendor marketplace features