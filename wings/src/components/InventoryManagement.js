// src/components/InventoryManagement.js
import React, { useState } from 'react';

const InventoryManagement = ({ products, onAddStock }) => {
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockQuantity, setStockQuantity] = useState(1);

  const handleAddStock = (product) => {
    setSelectedProduct(product);
    setShowStockModal(true);
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
        <div className="card-header">Inventory Status</div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Min Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>{product.minStock}</td>
                  <td>
                    {product.quantity <= product.minStock ? (
                      <span className="low-stock">Low Stock</span>
                    ) : (
                      <span className="text-success">OK</span>
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-info text-white"
                      onClick={() => handleAddStock(product)}
                    >
                      <i className="fa-solid fa-plus"></i> Add Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

export default InventoryManagement;