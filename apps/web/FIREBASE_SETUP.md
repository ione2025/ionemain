# Firebase Setup Guide

## Current Status

The application has been configured with placeholder Firebase credentials to allow builds to complete without warnings.

## How to Set Up Real Firebase

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add Project" and follow the setup wizard
   - Enable Firestore Database and Storage in your project

2. **Get Your Firebase Configuration**
   - In the Firebase Console, go to Project Settings (gear icon)
   - Scroll down to "Your apps" section
   - Click on the web app icon `</>` to register your app
   - Copy the configuration values

3. **Update the `.env` File**
   - Open `apps/web/.env`
   - Replace the placeholder values with your actual Firebase configuration:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
   ```

4. **Security Considerations**
   - The `.env` file is currently committed to the repository (as requested for development)
   - **For production**, you should:
     - Remove `.env` from the repository
     - Add it back to `.gitignore`
     - Use environment variables in your hosting platform
     - Set up Firebase Security Rules properly

5. **Firestore Collections Setup**
   
   The app expects these Firestore collections:
   - `orders` - For storing order information
   - `products` - For storing product listings (if using Firebase for products)
   
   Example order document structure:
   ```json
   {
     "sellerId": "user-123",
     "buyerId": "user-456",
     "buyerName": "John Doe",
     "buyerEmail": "john@example.com",
     "items": [...],
     "total": 100.00,
     "status": "pending",
     "createdAt": "2024-01-01T00:00:00.000Z",
     "updatedAt": "2024-01-01T00:00:00.000Z"
   }
   ```

## Current Placeholder Configuration

The current `.env` file contains these placeholder values:

- API Key: `AIzaSyDemoKey123456789` (not real)
- Auth Domain: `ionemain-demo.firebaseapp.com` (not real)
- Project ID: `ionemain-demo` (not real)
- Storage Bucket: `ionemain-demo.appspot.com` (not real)
- Messaging Sender ID: `123456789012` (not real)
- App ID: `1:123456789012:web:abcdef1234567890` (not real)
- Measurement ID: `G-ABCDEFGHIJ` (not real)

**These values will not work for actual Firebase operations. They are only meant to suppress build warnings.**

## What Works Without Real Firebase

- The app will build successfully
- Mock data will be used for orders and products
- All UI functionality works with mock data
- Translations and locale switching work normally

## What Requires Real Firebase

- Actual order persistence to Firestore
- Real-time order updates
- Product image storage in Firebase Storage
- Firebase Analytics
- User authentication (if implemented with Firebase Auth)
