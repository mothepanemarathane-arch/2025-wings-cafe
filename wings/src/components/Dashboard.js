// src/components/Dashboard.js
import React from 'react';

const Dashboard = ({ totalProducts, totalValue, lowStockCount, totalSales, lowStockProducts }) => {
  return (
    <div>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <i className="fa-solid fa-box"></i>
          <div className="stats-number">{totalProducts}</div>
          <div className="stats-label">Total Products</div>
        </div>
        <div className="dashboard-card">
          <i className="fa-solid fa-sack-dollar"></i>
          <div className="stats-number">${totalValue.toFixed(2)}</div>
          <div className="stats-label">Inventory Value</div>
        </div>
        <div className="dashboard-card">
          <i className="fa-solid fa-exclamation-triangle"></i>
          <div className="stats-number">{lowStockCount}</div>
          <div className="stats-label">Low Stock Items</div>
        </div>
        <div className="dashboard-card">
          <i className="fa-solid fa-chart-simple"></i>
          <div className="stats-number">${totalSales.toFixed(2)}</div>
          <div className="stats-label">Total Sales</div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Low Stock Alert</div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Current Stock</th>
                    <th>Min Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map(product => (
                    <tr key={product.id} className="low-stock">
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.quantity}</td>
                      <td>{product.minStock}</td>
                    </tr>
                  ))}
                  {lowStockProducts.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center">No low stock items</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Recent Activities</div>
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-primary rounded-circle p-2">
                  <i className="fa-solid fa-cart-plus text-white"></i>
                </div>
                <div>
                  <div>New product added</div>
                  <small className="text-muted">2 minutes ago</small>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-success rounded-circle p-2">
                  <i className="fa-solid fa-money-bill-wave text-white"></i>
                </div>
                <div>
                  <div>Sale recorded</div>
                  <small className="text-muted">15 minutes ago</small>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="bg-warning rounded-circle p-2">
                  <i className="fa-solid fa-exclamation-triangle text-white"></i>
                </div>
                <div>
                  <div>Low stock alert</div>
                  <small className="text-muted">1 hour ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;