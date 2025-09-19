// src/App.js
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import SalesManagement from './components/SalesManagement';
import InventoryManagement from './components/InventoryManagement';
import CustomerManagement from './components/CustomerManagement';
import Reporting from './components/Reporting';
import ProductModal from './components/ProductModal';
import DataManagement from './components/DataManagement';
import databaseService from './services/databaseService';
import './styles/App.css';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Load data from database service on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [productsData, salesData, customersData] = await Promise.all([
          databaseService.getProducts(),
          databaseService.getSales(),
          databaseService.getCustomers()
        ]);
        
        setProducts(productsData);
        setSales(salesData);
        setCustomers(customersData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save to database service whenever data changes
  useEffect(() => {
    if (!loading) {
      const saveData = async () => {
        await Promise.all([
          databaseService.saveProducts(products),
          databaseService.saveSales(sales),
          databaseService.saveCustomers(customers)
        ]);
      };
      
      saveData();
    }
  }, [products, sales, customers, loading]);

  // Product management functions
  const addProduct = async (product) => {
    const newProduct = {
      ...product,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleSubmitProduct = (productData) => {
    if (editingProduct) {
      updateProduct({ ...productData, id: editingProduct.id });
    } else {
      addProduct(productData);
    }
    setEditingProduct(null);
    setShowProductModal(false);
  };

  const recordSale = (productId, quantity, customerName) => {
    const product = products.find(p => p.id === productId);
    if (product && product.quantity >= quantity) {
      // Update product quantity
      setProducts(products.map(p => 
        p.id === productId ? { ...p, quantity: p.quantity - quantity } : p
      ));
      
      // Record the sale
      const newSale = {
        id: sales.length + 1,
        productId,
        productName: product.name,
        quantity,
        totalPrice: product.price * quantity,
        date: new Date().toLocaleDateString(),
        customerName
      };
      
      setSales([...sales, newSale]);
      
      // Add customer if not exists
      if (customerName && !customers.some(c => c.name === customerName)) {
        setCustomers([...customers, { id: customers.length + 1, name: customerName }]);
      }
      
      return true;
    }
    return false;
  };

  const addStock = (productId, quantity) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, quantity: product.quantity + quantity } : product
    ));
  };

  // Handle data import
  const handleDataImport = async (file) => {
    setLoading(true);
    try {
      await databaseService.importData(file);
      
      // Reload all data
      const [productsData, salesData, customersData] = await Promise.all([
        databaseService.getProducts(),
        databaseService.getSales(),
        databaseService.getCustomers()
      ]);
      
      setProducts(productsData);
      setSales(salesData);
      setCustomers(customersData);
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Error importing data. Please make sure you selected a valid JSON file.');
    } finally {
      setLoading(false);
    }
  };

  // Handle data export
  const handleDataExport = () => {
    databaseService.exportData();
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get low stock products
  const lowStockProducts = products.filter(product => product.quantity <= product.minStock);

  // Calculate stats for dashboard
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const lowStockCount = lowStockProducts.length;
  const totalSales = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);

  if (loading) {
    return (
      <div className="app-container">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-3">Loading data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      
      <div className="main-content">
        <Header 
          activeModule={activeModule} 
          onShowProductModal={() => setShowProductModal(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
        {activeModule === 'dashboard' && (
          <Dashboard 
            totalProducts={totalProducts}
            totalValue={totalValue}
            lowStockCount={lowStockCount}
            totalSales={totalSales}
            lowStockProducts={lowStockProducts}
          />
        )}
        
        {activeModule === 'products' && (
          <ProductManagement 
            products={filteredProducts}
            onEditProduct={handleEditProduct}
            onDeleteProduct={deleteProduct}
            onAddStock={addStock}
            onRecordSale={recordSale}
          />
        )}
        
        {activeModule === 'sales' && (
          <SalesManagement sales={sales} />
        )}
        
        {activeModule === 'customers' && (
          <CustomerManagement customers={customers} />
        )}
        
        {activeModule === 'inventory' && (
          <InventoryManagement 
            products={filteredProducts}
            onAddStock={addStock}
          />
        )}
        
        {activeModule === 'reporting' && (
          <Reporting 
            products={products}
            sales={sales}
          />
        )}
        
        {activeModule === 'data' && (
          <DataManagement 
            onImport={handleDataImport}
            onExport={handleDataExport}
          />
        )}
        
        <ProductModal 
          show={showProductModal}
          onHide={() => {
            setShowProductModal(false);
            setEditingProduct(null);
          }}
          onSubmit={handleSubmitProduct}
          product={editingProduct}
        />
      </div>
    </div>
  );
}

export default App;