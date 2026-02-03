import { db, storage, isConfigValid } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface ProductUploadData {
  modelNumber: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imagePath?: string;
  imageUrl?: string;
}

export interface BulkUploadResult {
  success: boolean;
  message: string;
  productsAdded: number;
  errors: string[];
}

/**
 * Upload a single product to Firestore
 * @param product - Product data
 * @param sellerId - The seller's user ID
 * @returns Product ID
 */
export async function uploadProduct(
  product: ProductUploadData,
  sellerId: string
): Promise<string> {
  if (!isConfigValid) {
    throw new Error('Firebase not configured');
  }

  try {
    const productsRef = collection(db, 'products');
    const productData = {
      ...product,
      sellerId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      status: 'active',
    };

    const docRef = await addDoc(productsRef, productData);
    return docRef.id;
  } catch (error) {
    console.error('Error uploading product:', error);
    throw error;
  }
}

/**
 * Upload multiple products in bulk
 * @param products - Array of product data
 * @param sellerId - The seller's user ID
 * @returns Bulk upload result
 */
export async function bulkUploadProducts(
  products: ProductUploadData[],
  sellerId: string
): Promise<BulkUploadResult> {
  const result: BulkUploadResult = {
    success: true,
    message: '',
    productsAdded: 0,
    errors: [],
  };

  if (!isConfigValid) {
    result.success = false;
    result.message = 'Firebase not configured';
    return result;
  }

  for (let i = 0; i < products.length; i++) {
    try {
      await uploadProduct(products[i], sellerId);
      result.productsAdded++;
    } catch (error) {
      result.errors.push(
        `Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  if (result.productsAdded === products.length) {
    result.message = `Successfully uploaded ${result.productsAdded} products`;
  } else if (result.productsAdded > 0) {
    result.success = false;
    result.message = `Uploaded ${result.productsAdded} of ${products.length} products with errors`;
  } else {
    result.success = false;
    result.message = 'Failed to upload products';
  }

  return result;
}

/**
 * Upload an image file to Firebase Storage
 * @param file - The image file
 * @param sellerId - The seller's user ID
 * @param modelNumber - Product model number
 * @returns Download URL
 */
export async function uploadProductImage(
  file: File,
  sellerId: string,
  modelNumber: string
): Promise<string> {
  if (!isConfigValid) {
    throw new Error('Firebase not configured');
  }

  try {
    const timestamp = Date.now();
    const fileName = `${sellerId}/${modelNumber}_${timestamp}.${file.name.split('.').pop()}`;
    const storageRef = ref(storage, `products/${fileName}`);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// Excel column mapping for better maintainability
const EXCEL_COLUMNS = {
  MODEL_NUMBER: 0,
  NAME: 1,
  DESCRIPTION: 2,
  PRICE: 3,
  CATEGORY: 4,
  IMAGE_PATH: 5,
} as const;

/**
 * Parse Excel data to product upload format
 * @param data - Raw Excel data (array of arrays)
 * @returns Array of product upload data
 */
export function parseExcelToProducts(data: unknown[][]): ProductUploadData[] {
  const products: ProductUploadData[] = [];

  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    
    // Skip empty rows
    if (!row || row.length === 0 || !row[EXCEL_COLUMNS.MODEL_NUMBER]) continue;

    const product: ProductUploadData = {
      modelNumber: String(row[EXCEL_COLUMNS.MODEL_NUMBER] ?? '').trim(),
      name: String(row[EXCEL_COLUMNS.NAME] ?? '').trim(),
      description: String(row[EXCEL_COLUMNS.DESCRIPTION] ?? '').trim(),
      price: (() => {
        const priceValue = row[EXCEL_COLUMNS.PRICE];
        return typeof priceValue === 'number' 
          ? priceValue 
          : parseFloat(String(priceValue ?? 0)) || 0;
      })(),
      category: String(row[EXCEL_COLUMNS.CATEGORY] ?? 'Uncategorized').trim(),
      imagePath: row[EXCEL_COLUMNS.IMAGE_PATH] 
        ? String(row[EXCEL_COLUMNS.IMAGE_PATH]).trim() 
        : undefined,
    };

    // Validate required fields
    if (product.modelNumber && product.name && product.price > 0) {
      products.push(product);
    }
  }

  return products;
}
