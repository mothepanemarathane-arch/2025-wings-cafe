// src/components/CustomerManagement.js
import React from 'react';

const CustomerManagement = ({ customers }) => {
  return (
    <div className="card">
      <div className="card-header">Customers</div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{new Date().toLocaleDateString()}</td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center">No customers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerManagement;