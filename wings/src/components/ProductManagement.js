// src/components/ProductManagement.js
import React, { useState } from 'react';

const ProductManagement = ({ products, onEditProduct, onDeleteProduct, onAddStock, onRecordSale }) => {
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [saleQuantity, setSaleQuantity] = useState(1);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');

  const handleSale = (product) => {
    setSelectedProduct(product);
    setShowSaleModal(true);
  };

  const handleAddStock = (product) => {
    setSelectedProduct(product);
    setShowStockModal(true);
  };

  const confirmSale = () => {
    if (selectedProduct && onRecordSale(selectedProduct.id, saleQuantity, customerName)) {
      setShowSaleModal(false);
      setSelectedProduct(null);
      setSaleQuantity(1);
      setCustomerName('');
    }
  };

  const confirmAddStock = () => {
    if (selectedProduct) {
      onAddStock(selectedProduct.id, stockQuantity);
      setShowStockModal(false);
      setSelectedProduct(null);
      setStockQuantity(1);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">Product List</div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.quantity}</td>
                  <td>
                    {product.quantity <= product.minStock ? (
                      <span className="low-stock">Low Stock</span>
                    ) : (
                      <span className="text-success">In Stock</span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => onEditProduct(product)}
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-warning"
                        onClick={() => handleSale(product)}
                      >
                        <i className="fa-solid fa-cash-register"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-info text-white"
                        onClick={() => handleAddStock(product)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => onDeleteProduct(product.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sale Modal */}
      {showSaleModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Record Sale - {selectedProduct?.name}</h5>
                <button type="button" className="btn-close" onClick={() => setShowSaleModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Quantity</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={saleQuantity}
                    onChange={(e) => setSaleQuantity(parseInt(e.target.value))}
                    min="1"
                    max={selectedProduct?.quantity}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Customer Name (Optional)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Total: ${(selectedProduct?.price * saleQuantity).toFixed(2)}</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowSaleModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={confirmSale}>Confirm Sale</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Stock Modal */}
      {showStockModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Stock - {selectedProduct?.name}</h5>
                <button type="button" className="btn-close" onClick={() => setShowStockModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Quantity to Add</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(parseInt(e.target.value))}
                    min="1"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Stock: {selectedProduct?.quantity + stockQuantity}</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowStockModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={confirmAddStock}>Add Stock</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;