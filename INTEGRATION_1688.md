# 1688.com Integration Guide

## Overview
This guide explains how to integrate products from 1688.com (Alibaba's Chinese wholesale marketplace) into the ionecenter platform.

## Table of Contents
1. [Understanding 1688.com](#understanding-1688com)
2. [Integration Options](#integration-options)
3. [API Integration (Recommended)](#api-integration-recommended)
4. [Web Scraping Alternative](#web-scraping-alternative)
5. [Data Mapping](#data-mapping)
6. [Implementation Steps](#implementation-steps)
7. [Legal and Ethical Considerations](#legal-and-ethical-considerations)

---

## Understanding 1688.com

1688.com is Alibaba's B2B platform for Chinese domestic wholesale trade. Key features:
- Product listings with images, descriptions, and specifications
- Bulk pricing tiers
- Supplier information
- Chinese language content (requires translation)

---

## Integration Options

### Option 1: Official API (Recommended)
**Status**: Requires Alibaba Open Platform account

**Pros:**
- Legal and officially supported
- Structured data
- Rate limits are known
- No risk of being blocked

**Cons:**
- Requires business verification
- May have access restrictions
- API documentation primarily in Chinese

**How to Get Access:**
1. Register on Alibaba Open Platform: https://open.1688.com/
2. Apply for API access credentials
3. Complete business verification
4. Review API documentation and SDKs

### Option 2: Third-Party Services
**Examples:**
- DataForSEO
- Apify
- Octoparse Cloud
- ScrapeHero

**Pros:**
- No need to build scraping infrastructure
- Maintained by professionals
- Often includes proxy rotation

**Cons:**
- Monthly subscription costs
- Dependent on third-party service
- May have usage limits

### Option 3: Custom Web Scraping
**Status**: For development/testing only

**Pros:**
- Full control
- No API access needed initially

**Cons:**
- Against 1688.com Terms of Service
- Risk of IP blocking
- Requires maintenance when site structure changes
- Legal risks

---

## API Integration (Recommended)

### Prerequisites
1. Alibaba Open Platform account
2. API credentials (App Key and App Secret)
3. Understanding of Chinese or translation service

### Available APIs
Based on Alibaba Open Platform documentation:

#### 1. Product Search API
```
Endpoint: /product/search
Method: POST
Description: Search products by keywords, category, or filters
```

#### 2. Product Details API
```
Endpoint: /product/detail
Method: GET
Description: Get detailed information about a specific product
```

#### 3. Category API
```
Endpoint: /category/list
Method: GET
Description: Get category tree structure
```

### Sample Integration Code

```typescript
// lib/integrations/1688.ts
import axios from 'axios';
import crypto from 'crypto';

interface Product1688 {
  productId: string;
  subject: string; // Product name
  description: string;
  price: number;
  imageUrls: string[];
  categoryId: string;
  supplierId: string;
}

class Alibaba1688Client {
  private appKey: string;
  private appSecret: string;
  private baseUrl = 'https://gw.open.1688.com/openapi';

  constructor(appKey: string, appSecret: string) {
    this.appKey = appKey;
    this.appSecret = appSecret;
  }

  // Generate signature for API requests
  private generateSignature(params: Record<string, any>): string {
    const sortedKeys = Object.keys(params).sort();
    const signString = sortedKeys
      .map(key => `${key}${params[key]}`)
      .join('');
    
    return crypto
      .createHmac('md5', this.appSecret)
      .update(signString)
      .digest('hex')
      .toUpperCase();
  }

  // Search products
  async searchProducts(keyword: string, pageSize = 20): Promise<Product1688[]> {
    const params = {
      access_token: process.env.ALIBABA_ACCESS_TOKEN,
      beginPage: 1,
      pageSize,
      keyword,
      _aop_timestamp: Date.now(),
    };

    const signature = this.generateSignature(params);

    try {
      const response = await axios.post(
        `${this.baseUrl}/param2/1/com.alibaba.product/alibaba.product.search/${this.appKey}`,
        {
          ...params,
          _aop_signature: signature,
        }
      );

      return response.data.productList || [];
    } catch (error) {
      console.error('Error searching 1688 products:', error);
      throw error;
    }
  }

  // Get product details
  async getProductDetails(productId: string): Promise<Product1688 | null> {
    const params = {
      access_token: process.env.ALIBABA_ACCESS_TOKEN,
      productId,
      _aop_timestamp: Date.now(),
    };

    const signature = this.generateSignature(params);

    try {
      const response = await axios.get(
        `${this.baseUrl}/param2/1/com.alibaba.product/alibaba.product.get/${this.appKey}`,
        {
          params: {
            ...params,
            _aop_signature: signature,
          },
        }
      );

      return response.data.product || null;
    } catch (error) {
      console.error('Error fetching 1688 product details:', error);
      throw error;
    }
  }
}

export default Alibaba1688Client;
```

### Environment Variables
Add to `.env.local`:
```bash
ALIBABA_APP_KEY=your_app_key_here
ALIBABA_APP_SECRET=your_app_secret_here
ALIBABA_ACCESS_TOKEN=your_access_token_here
```

---

## Web Scraping Alternative

### ⚠️ Important Disclaimers
- Web scraping 1688.com may violate their Terms of Service
- Use only for personal testing and development
- Implement rate limiting and respect robots.txt
- Consider using API integration for production

### Sample Scraping Implementation

```typescript
// lib/integrations/1688-scraper.ts
import axios from 'axios';
import * as cheerio from 'cheerio';

interface ScrapedProduct {
  modelNumber: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  supplierName: string;
}

export async function scrape1688Product(productUrl: string): Promise<ScrapedProduct | null> {
  try {
    // Add delays and user-agent to be respectful
    const response = await axios.get(productUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ionecenter/1.0)',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);

    // Extract product information (selectors may change)
    const product: ScrapedProduct = {
      modelNumber: $('.model-number').text().trim() || '',
      name: $('.product-title h1').text().trim(),
      description: $('.product-description').text().trim(),
      price: parseFloat($('.price-value').text().replace(/[^0-9.]/g, '')) || 0,
      images: [],
      category: $('.breadcrumb li:last-child').text().trim(),
      supplierName: $('.supplier-name').text().trim(),
    };

    // Extract images
    $('.product-images img').each((i, elem) => {
      const src = $(elem).attr('src') || $(elem).attr('data-src');
      if (src) {
        product.images.push(src);
      }
    });

    return product;
  } catch (error) {
    console.error('Error scraping 1688 product:', error);
    return null;
  }
}

// Scrape product list from search results
export async function scrape1688Search(keyword: string): Promise<ScrapedProduct[]> {
  try {
    const searchUrl = `https://s.1688.com/selloffer/offer_search.htm?keywords=${encodeURIComponent(keyword)}`;
    
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ionecenter/1.0)',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    const products: ScrapedProduct[] = [];

    // Extract product items (selectors may change)
    $('.offer-item').each((i, elem) => {
      const $item = $(elem);
      products.push({
        modelNumber: $item.find('.model').text().trim(),
        name: $item.find('.title').text().trim(),
        description: $item.find('.desc').text().trim(),
        price: parseFloat($item.find('.price').text().replace(/[^0-9.]/g, '')) || 0,
        images: [$item.find('img').attr('src') || ''],
        category: '',
        supplierName: $item.find('.company').text().trim(),
      });
    });

    return products;
  } catch (error) {
    console.error('Error scraping 1688 search:', error);
    return [];
  }
}
```

### Required Dependencies
```bash
npm install axios cheerio
npm install --save-dev @types/cheerio
```

---

## Data Mapping

### 1688.com → ionecenter Mapping

| 1688.com Field | ionecenter Field | Notes |
|---------------|------------------|-------|
| productId | modelNumber | Use as unique identifier |
| subject | name | May need translation |
| description | description | Translate to English/Arabic |
| price | price | Convert CNY to USD/SAR |
| imageUrls[0] | image | Use first image |
| categoryName | category | Map to local categories |
| supplierId | sellerId | Store original supplier info |

### Currency Conversion
```typescript
async function convertCNYtoUSD(amount: number): Promise<number> {
  // Use a currency conversion API
  const response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/CNY`
  );
  const data = await response.json();
  return amount * data.rates.USD;
}
```

### Translation Service
```typescript
async function translateText(text: string, targetLang: string): Promise<string> {
  // Using Google Translate API or similar
  // This is a simplified example
  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        source: 'zh-CN',
        target: targetLang,
        format: 'text',
      }),
    }
  );
  
  const data = await response.json();
  return data.data.translations[0].translatedText;
}
```

---

## Implementation Steps

### Step 1: Set Up Credentials
1. Obtain API credentials from Alibaba Open Platform
2. Add credentials to `.env.local`:
   ```bash
   ALIBABA_APP_KEY=your_key
   ALIBABA_APP_SECRET=your_secret
   ALIBABA_ACCESS_TOKEN=your_token
   ```

### Step 2: Create Integration Service
1. Create `lib/integrations/1688.ts`
2. Implement authentication
3. Add API methods for search and product details

### Step 3: Add Translation Support
1. Set up Google Translate API or alternative
2. Create translation utility functions
3. Cache translations to reduce API calls

### Step 4: Create Import UI
1. Add "Import from 1688" button in seller products page
2. Create modal or new page for import interface
3. Allow entering 1688 product URL or search

### Step 5: Handle Images
1. Download images from 1688
2. Upload to Firebase Storage
3. Update product with new image URLs

### Example Import Component:
```typescript
// components/Import1688.tsx
'use client';

import { useState } from 'react';
import Alibaba1688Client from '../lib/integrations/1688';

export function Import1688Component() {
  const [productUrl, setProductUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    setLoading(true);
    try {
      // Extract product ID from URL
      const productId = extractProductId(productUrl);
      
      // Fetch product from 1688
      const client = new Alibaba1688Client(
        process.env.NEXT_PUBLIC_ALIBABA_APP_KEY!,
        process.env.NEXT_PUBLIC_ALIBABA_APP_SECRET!
      );
      
      const product = await client.getProductDetails(productId);
      
      if (product) {
        // Translate and convert
        // Save to Firestore
        // Show success message
      }
    } catch (error) {
      console.error('Import error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter 1688 product URL"
        value={productUrl}
        onChange={(e) => setProductUrl(e.target.value)}
      />
      <button onClick={handleImport} disabled={loading}>
        {loading ? 'Importing...' : 'Import Product'}
      </button>
    </div>
  );
}
```

---

## Legal and Ethical Considerations

### ⚠️ Important Legal Points

1. **Terms of Service**
   - Review 1688.com Terms of Service
   - Web scraping may violate ToS
   - Always prefer official API

2. **Copyright and Intellectual Property**
   - Product images may be copyrighted
   - Descriptions may be protected content
   - Get permission from suppliers before republishing

3. **Data Usage Rights**
   - Ensure you have rights to resell products
   - Maintain supplier attribution
   - Respect supplier pricing policies

4. **Rate Limiting**
   - Implement delays between requests (1-2 seconds minimum)
   - Use caching to minimize API calls
   - Respect robots.txt

5. **User-Agent**
   - Always identify your application
   - Provide contact information
   - Be transparent about data usage

### Best Practices

```typescript
// Rate limiting example
class RateLimiter {
  private lastRequest = 0;
  private minInterval = 1000; // 1 second

  async throttle() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;
    
    if (timeSinceLastRequest < this.minInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minInterval - timeSinceLastRequest)
      );
    }
    
    this.lastRequest = Date.now();
  }
}
```

---

## Support and Resources

### Official Resources
- Alibaba Open Platform: https://open.1688.com/
- API Documentation: https://open.1688.com/doc/api/
- Developer Forum: https://club.1688.com/

### Alternative Integration Services
- **Oberlo**: Aliexpress integration (similar to 1688)
- **Spocket**: Wholesale product importer
- **Dropified**: Multi-platform integration

### Translation Services
- Google Cloud Translation API
- Microsoft Translator API
- DeepL API (best quality)

---

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify API credentials
   - Check token expiration
   - Ensure correct signature generation

2. **Rate Limiting**
   - Implement exponential backoff
   - Cache responses
   - Use batch operations when available

3. **Invalid Product Data**
   - Validate data before importing
   - Handle missing fields gracefully
   - Provide default values

4. **Image Download Fails**
   - Check image URL format
   - Handle authentication if needed
   - Implement retry logic

---

## Next Steps

1. **Phase 1**: Set up API credentials
2. **Phase 2**: Implement basic product import
3. **Phase 3**: Add translation support
4. **Phase 4**: Implement image handling
5. **Phase 5**: Add bulk import from 1688 search results
6. **Phase 6**: Create UI for sellers to browse and import

---

## Contact

For questions or issues with this integration, please contact the development team or create an issue in the repository.
