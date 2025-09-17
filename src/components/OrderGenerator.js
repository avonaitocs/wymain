import React, { useState, useCallback } from 'react';
import { Upload, DollarSign, Filter, ShoppingCart, Download, FileText, AlertCircle, CheckCircle, Trash2, FileSpreadsheet, FileDown } from 'lucide-react';
import * as XLSX from 'xlsx';

const OrderGenerator = () => {
  const [catalog, setCatalog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState([]);
  const [orderParams, setOrderParams] = useState({
    totalValue: '',
    minPrice: '',
    maxPrice: '',
    maxItems: 50
  });
  const [uploadStatus, setUploadStatus] = useState('');

  // Handle file upload and parsing
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Demo mode - prevent actual uploads
    setUploadStatus('This is a demo version. File uploads are disabled for security purposes.');
    
    // Clear the file input
    event.target.value = '';
    
    // Load sample data for demonstration
    setTimeout(() => {
      const sampleCatalog = [
        { id: 1, name: "Wireless Headphones", price: 79.99, description: "High-quality bluetooth headphones", category: "Electronics", stock: 50 },
        { id: 2, name: "Coffee Mug", price: 12.50, description: "Ceramic coffee mug", category: "Kitchen", stock: 100 },
        { id: 3, name: "Notebook", price: 8.99, description: "Spiral-bound notebook", category: "Office", stock: 75 },
        { id: 4, name: "Phone Case", price: 24.99, description: "Protective phone case", category: "Electronics", stock: 80 },
        { id: 5, name: "Desk Lamp", price: 45.00, description: "Adjustable LED desk lamp", category: "Office", stock: 30 },
        { id: 6, name: "Water Bottle", price: 18.99, description: "Stainless steel water bottle", category: "Sports", stock: 60 },
        { id: 7, name: "Bluetooth Speaker", price: 89.99, description: "Portable wireless speaker", category: "Electronics", stock: 40 },
        { id: 8, name: "Planner", price: 15.99, description: "Daily planner organizer", category: "Office", stock: 90 },
        { id: 9, name: "Yoga Mat", price: 32.99, description: "Non-slip exercise mat", category: "Sports", stock: 45 },
        { id: 10, name: "Backpack", price: 49.99, description: "Durable travel backpack", category: "Travel", stock: 35 }
      ];
      
      setCatalog(sampleCatalog);
      setUploadStatus(`Demo: Loaded ${sampleCatalog.length} sample products. Try generating an order!`);
    }, 1000);
  }, []);

  // Generate order based on parameters
  const generateOrder = () => {
    if (catalog.length === 0) {
      setUploadStatus('Please upload a catalog first');
      return;
    }

    const { totalValue, minPrice, maxPrice, maxItems } = orderParams;
    const targetValue = parseFloat(totalValue);
    const minPriceNum = parseFloat(minPrice) || 0;
    const maxPriceNum = parseFloat(maxPrice) || Infinity;

    // Filter products by price range
    const filteredProducts = catalog.filter(product => 
      product.price >= minPriceNum && product.price <= maxPriceNum
    );

    if (filteredProducts.length === 0) {
      setUploadStatus('No products found in the specified price range');
      return;
    }

    // Generate order using a greedy algorithm
    const order = [];
    let currentValue = 0;
    const usedProducts = new Set();

    // Sort products by price efficiency (value per dollar)
    const sortedProducts = [...filteredProducts].sort((a, b) => b.price - a.price);

    while (currentValue < targetValue && order.length < maxItems && usedProducts.size < filteredProducts.length) {
      const remainingValue = targetValue - currentValue;
      
      // Find the best product that fits
      let bestProduct = null;
      let bestScore = 0;

      for (const product of sortedProducts) {
        if (usedProducts.has(product.id) || product.price > remainingValue) continue;
        
        // Score based on how well it fits the remaining budget
        const score = remainingValue - product.price < targetValue * 0.1 ? 1000 : 1;
        
        if (score > bestScore) {
          bestScore = score;
          bestProduct = product;
        }
      }

      if (!bestProduct) {
        // If no perfect fit, try to find products that can fill the remaining budget
        for (const product of sortedProducts) {
          if (usedProducts.has(product.id)) continue;
          if (product.price <= remainingValue) {
            bestProduct = product;
            break;
          }
        }
      }

      if (!bestProduct) break;

      const quantity = Math.max(1, Math.floor(remainingValue / bestProduct.price));
      const finalQuantity = Math.min(quantity, bestProduct.stock, Math.floor((targetValue - currentValue) / bestProduct.price));

      if (finalQuantity > 0) {
        order.push({
          ...bestProduct,
          quantity: finalQuantity,
          totalPrice: bestProduct.price * finalQuantity
        });
        currentValue += bestProduct.price * finalQuantity;
        usedProducts.add(bestProduct.id);
      } else {
        break;
      }
    }

    setGeneratedOrder(order);
    setUploadStatus(`Order generated with ${order.length} items totaling $${currentValue.toFixed(2)}`);
  };

  const downloadOrder = () => {
    const orderData = {
      generatedAt: new Date().toISOString(),
      parameters: orderParams,
      totalValue: generatedOrder.reduce((sum, item) => sum + item.totalPrice, 0),
      itemCount: generatedOrder.length,
      items: generatedOrder
    };

    const blob = new Blob([JSON.stringify(orderData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `order-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadExcel = () => {
    // Create worksheet data
    const worksheetData = [
      // Header information
      ['Order Summary'],
      ['Generated:', new Date().toLocaleString()],
      ['Target Value:', `${orderParams.totalValue}`],
      ['Price Range:', `${orderParams.minPrice || '0'} - ${orderParams.maxPrice || 'No limit'}`],
      ['Total Items:', generatedOrder.length],
      ['Total Value:', `${totalOrderValue.toFixed(2)}`],
      ['Total Quantity:', generatedOrder.reduce((sum, item) => sum + item.quantity, 0)],
      [], // Empty row
      // Order details header
      ['Product Name', 'Description', 'Category', 'Unit Price', 'Quantity', 'Total Price'],
      // Order items
      ...generatedOrder.map(item => [
        item.name,
        item.description || '',
        item.category || '',
        item.price,
        item.quantity,
        item.totalPrice
      ]),
      [], // Empty row
      ['', '', '', 'Grand Total:', '', `${totalOrderValue.toFixed(2)}`]
    ];

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Set column widths
    ws['!cols'] = [
      { width: 30 }, // Product Name
      { width: 40 }, // Description
      { width: 15 }, // Category
      { width: 12 }, // Unit Price
      { width: 10 }, // Quantity
      { width: 12 }  // Total Price
    ];

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Order');

    // Save file
    XLSX.writeFile(wb, `order-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const downloadPDF = () => {
    // Create a printable version of the order
    const printWindow = window.open('', '_blank');
    const orderDate = new Date().toLocaleDateString();
    const orderTime = new Date().toLocaleTimeString();
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order Report - ${orderDate}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #4F46E5;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #4F46E5;
            margin: 0;
          }
          .summary {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
          }
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
          }
          .summary-item {
            text-align: center;
          }
          .summary-value {
            font-size: 1.5em;
            font-weight: bold;
            color: #4F46E5;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th {
            background: #4F46E5;
            color: white;
            padding: 12px;
            text-align: left;
          }
          td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }
          tr:nth-child(even) {
            background: #f8f9fa;
          }
          .total-row {
            background: #e5e7eb !important;
            font-weight: bold;
          }
          .right-align {
            text-align: right;
          }
          .parameters {
            margin-bottom: 20px;
            padding: 15px;
            background: #f1f5f9;
            border-radius: 6px;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Order Report</h1>
          <p>Generated on ${orderDate} at ${orderTime}</p>
        </div>
        
        <div class="parameters">
          <h3>Order Parameters</h3>
          <p><strong>Target Order Value:</strong> ${orderParams.totalValue}</p>
          <p><strong>Price Range:</strong> ${orderParams.minPrice || '0'} - ${orderParams.maxPrice || 'No limit'}</p>
          <p><strong>Max Items:</strong> ${orderParams.maxItems}</p>
        </div>
        
        <div class="summary">
          <h3>Order Summary</h3>
          <div class="summary-grid">
            <div class="summary-item">
              <div class="summary-value">${totalOrderValue.toFixed(2)}</div>
              <div>Total Value</div>
            </div>
            <div class="summary-item">
              <div class="summary-value">${generatedOrder.length}</div>
              <div>Unique Items</div>
            </div>
            <div class="summary-item">
              <div class="summary-value">${generatedOrder.reduce((sum, item) => sum + item.quantity, 0)}</div>
              <div>Total Quantity</div>
            </div>
          </div>
        </div>
        
        <h3>Order Details</h3>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Category</th>
              <th class="right-align">Unit Price</th>
              <th class="right-align">Quantity</th>
              <th class="right-align">Total Price</th>
            </tr>
          </thead>
          <tbody>
            ${generatedOrder.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.description || '-'}</td>
                <td>${item.category || '-'}</td>
                <td class="right-align">${item.price.toFixed(2)}</td>
                <td class="right-align">${item.quantity}</td>
                <td class="right-align">${item.totalPrice.toFixed(2)}</td>
              </tr>
            `).join('')}
            <tr class="total-row">
              <td colspan="5" class="right-align"><strong>Grand Total:</strong></td>
              <td class="right-align"><strong>${totalOrderValue.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
        
        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #4F46E5; color: white; border: none; border-radius: 4px; cursor: pointer;">Print / Save as PDF</button>
          <button onclick="window.close()" style="padding: 10px 20px; background: #6B7280; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">Close</button>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Auto-trigger print dialog after a short delay
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const clearOrder = () => {
    setGeneratedOrder([]);
    setUploadStatus('');
  };

  const totalOrderValue = generatedOrder.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Order Generator
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              AI-Powered Retail Order Generation
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">Smart Algorithm</span>
              <span className="px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">Budget Optimization</span>
              <span className="px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">Instant Results</span>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Upload Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Upload className="text-blue-400" size={24} />
              Upload Catalog
            </h2>
            
            <div className="mb-6">
              <label className="block w-full">
                <input
                  type="file"
                  accept=".csv,.json,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isLoading}
                />
                <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  <FileText className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-lg mb-2">
                    {isLoading ? 'Processing...' : 'Drop your catalog file here or click to browse'}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">Supports CSV, JSON, and PDF formats</p>
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mt-4">
                    <p className="text-yellow-400 text-sm font-medium">
                      🎯 Demo Mode: File uploads disabled for security. Sample data will be loaded for testing.
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {uploadStatus && (
              <div className={`flex items-center gap-2 p-4 rounded-lg mb-6 ${
                uploadStatus.includes('Error') ? 'bg-red-500/20 border border-red-500/30' : 'bg-green-500/20 border border-green-500/30'
              }`}>
                {uploadStatus.includes('Error') ? 
                  <AlertCircle className="text-red-400" size={20} /> : 
                  <CheckCircle className="text-green-400" size={20} />
                }
                <span className="text-sm">{uploadStatus}</span>
              </div>
            )}

            {catalog.length > 0 && (
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Catalog Preview</h3>
                <p className="text-sm text-gray-400 mb-3">{catalog.length} products loaded</p>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {catalog.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="truncate mr-2">{item.name}</span>
                      <span className="text-green-400">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                  {catalog.length > 5 && (
                    <p className="text-xs text-gray-400">...and {catalog.length - 5} more items</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Parameters Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Filter className="text-purple-400" size={24} />
              Order Parameters
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <DollarSign className="inline mr-1" size={16} />
                  Target Order Value
                </label>
                <input
                  type="number"
                  placeholder="1000.00"
                  value={orderParams.totalValue}
                  onChange={(e) => setOrderParams({...orderParams, totalValue: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Min Price</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={orderParams.minPrice}
                    onChange={(e) => setOrderParams({...orderParams, minPrice: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Price</label>
                  <input
                    type="number"
                    placeholder="999.99"
                    value={orderParams.maxPrice}
                    onChange={(e) => setOrderParams({...orderParams, maxPrice: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Max Items in Order</label>
                <input
                  type="number"
                  value={orderParams.maxItems}
                  onChange={(e) => setOrderParams({...orderParams, maxItems: parseInt(e.target.value) || 50})}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <button
                onClick={generateOrder}
                disabled={!catalog.length || !orderParams.totalValue}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <ShoppingCart size={20} />
                Generate Order
              </button>
            </div>
          </div>
        </div>

        {/* Generated Order */}
        {generatedOrder.length > 0 && (
          <div className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <ShoppingCart className="text-green-400" size={24} />
                Generated Order
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={downloadOrder}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                  title="Download as JSON"
                >
                  <Download size={16} />
                  JSON
                </button>
                <button
                  onClick={downloadExcel}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors text-sm"
                  title="Download as Excel"
                >
                  <FileSpreadsheet size={16} />
                  Excel
                </button>
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
                  title="Download as PDF"
                >
                  <FileDown size={16} />
                  PDF
                </button>
                <button
                  onClick={clearOrder}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                >
                  <Trash2 size={16} />
                  Clear
                </button>
              </div>
            </div>

            <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">${totalOrderValue.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">Total Value</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{generatedOrder.length}</div>
                  <div className="text-sm text-gray-400">Items</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">
                    {generatedOrder.reduce((sum, item) => sum + item.quantity, 0)}
                  </div>
                  <div className="text-sm text-gray-400">Total Quantity</div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Quantity</th>
                    <th className="text-left py-3 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedOrder.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          {item.description && (
                            <div className="text-sm text-gray-400">{item.description}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-green-400">${item.price.toFixed(2)}</td>
                      <td className="py-3 px-4">{item.quantity}</td>
                      <td className="py-3 px-4 font-semibold">${item.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderGenerator;