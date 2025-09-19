// src/components/ProductModal.js
import React, { useState, useEffect } from 'react';

const ProductModal = ({ show, onHide, onSubmit, product }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [minStock, setMinStock] = useState('');

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price);
      setQuantity(product.quantity);
      setMinStock(product.minStock);
    } else {
      setName('');
      setDescription('');
      setCategory('');
      setPrice('');
      setQuantity('');
      setMinStock('');
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      minStock: parseInt(minStock)
    });
    onHide();
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product ? 'Edit Product' : 'Add New Product'}</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-control" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select 
                  className="form-select" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Pastries">Pastries</option>
                  <option value="Sandwiches">Sandwiches</option>
                  <option value="Snacks">Snacks</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className="form-control" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Minimum Stock Level</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={minStock}
                  onChange={(e) => setMinStock(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
              <button type="submit" className="btn btn-primary">
                {product ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;