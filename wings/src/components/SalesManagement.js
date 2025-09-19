// src/components/SalesManagement.js
import React from 'react';

const SalesManagement = ({ sales }) => {
  return (
    <div className="card">
      <div className="card-header">Sales History</div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th>Customer</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale.id}>
                <td>{sale.date}</td>
                <td>{sale.productName}</td>
                <td>{sale.quantity}</td>
                <td>${(sale.totalPrice / sale.quantity).toFixed(2)}</td>
                <td>${sale.totalPrice.toFixed(2)}</td>
                <td>{sale.customerName || 'Walk-in'}</td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">No sales recorded</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesManagement;