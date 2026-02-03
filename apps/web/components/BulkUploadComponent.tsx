'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '../contexts/AuthContext';
import * as XLSX from 'xlsx';
import { bulkUploadProducts, parseExcelToProducts } from '../lib/products';

export function BulkUploadComponent() {
  const t = useTranslations('seller');
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [progress, setProgress] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadTemplate = () => {
    // Create sample Excel template
    const templateData = [
      ['Model Number', 'Product Name', 'Description', 'Price', 'Category', 'Image Path'],
      ['MOD-001', 'Sample Product 1', 'This is a sample product description', 99.99, 'Electronics', '/path/to/image1.jpg'],
      ['MOD-002', 'Sample Product 2', 'Another product description', 149.99, 'Fashion', '/path/to/image2.jpg'],
    ];

    const ws = XLSX.utils.aoa_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');

    // Download the file
    XLSX.writeFile(wb, 'product_upload_template.xlsx');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (
        selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        selectedFile.type === 'application/vnd.ms-excel' ||
        selectedFile.name.endsWith('.xlsx') ||
        selectedFile.name.endsWith('.xls')
      ) {
        setFile(selectedFile);
        setMessage(null);
      } else {
        setMessage({ type: 'error', text: 'Please select a valid Excel file (.xlsx or .xls)' });
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setUploading(true);
    setMessage(null);
    setProgress(t('processingProducts'));

    try {
      // Read the Excel file
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][];

      // Parse the data
      const products = parseExcelToProducts(jsonData);

      if (products.length === 0) {
        setMessage({ type: 'error', text: 'No valid products found in the file' });
        setUploading(false);
        return;
      }

      setProgress(`${t('uploading')} ${products.length} products...`);

      // Upload to Firestore
      const result = await bulkUploadProducts(products, user.id);

      if (result.success) {
        setMessage({
          type: 'success',
          text: `${t('uploadSuccess')}: ${result.productsAdded} ${t('productsAdded')}`,
        });
        setFile(null);
        // Reset file input using ref
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setMessage({
          type: 'error',
          text: `${result.message}. Errors: ${result.errors.join(', ')}`,
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({
        type: 'error',
        text: `${t('uploadError')}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setUploading(false);
      setProgress('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('bulkUpload')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {t('uploadInstructions')}
        </p>
      </div>

      {/* Template Download */}
      <div className="mb-6">
        <button
          onClick={downloadTemplate}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <span>📥</span>
          {t('downloadTemplate')}
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {t('excelFormat')}
        </p>
      </div>

      {/* File Upload */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('selectFile')}
          </label>
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            disabled={uploading}
            className="block w-full text-sm text-gray-900 dark:text-white
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              dark:file:bg-blue-900/30 dark:file:text-blue-400
              dark:hover:file:bg-blue-900/50
              cursor-pointer border border-gray-300 dark:border-gray-700 rounded-lg
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {file && (
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? t('uploading') : t('upload')}
            </button>
          </div>
        )}

        {progress && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            {progress}
          </div>
        )}

        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
