// src/components/Header.js
import React from 'react';

const Header = ({ activeModule, onShowProductModal, searchTerm, setSearchTerm }) => {
  return (
    <div className="header">
      <h2>{activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}</h2>
      <div className="d-flex align-items-center gap-3">
        {activeModule === 'products' && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" onClick={onShowProductModal}>
              <i className="fa-solid fa-plus"></i> Add Product
            </button>
          </div>
        )}
        <div className="user-profile">
          <i className="fa-solid fa-user-circle fa-2x"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;