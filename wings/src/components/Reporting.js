// src/components/Reporting.js
import React from 'react';

const Reporting = ({ products, sales }) => {
  // Calculate some basic stats for reporting
  const totalProducts = products.length;
  const totalInventoryValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const totalSalesValue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
  const totalItemsSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  
  // Get top selling products
  const productSales = {};
  sales.forEach(sale => {
    if (!productSales[sale.productName]) {
      productSales[sale.productName] = 0;
    }
    productSales[sale.productName] += sale.quantity;
  });
  
  const topSellingProducts = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
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
          <div className="stats-number">${totalInventoryValue.toFixed(2)}</div>
          <div className="stats-label">Inventory Value</div>
        </div>
        <div className="dashboard-card">
          <i className="fa-solid fa-chart-simple"></i>
          <div className="stats-number">${totalSalesValue.toFixed(2)}</div>
          <div className="stats-label">Total Sales</div>
        </div>
        <div className="dashboard-card">
          <i className="fa-solid fa-cart-shopping"></i>
          <div className="stats-number">{totalItemsSold}</div>
          <div className="stats-label">Items Sold</div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Top Selling Products</div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Units Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {topSellingProducts.map(([product, quantity]) => (
                    <tr key={product}>
                      <td>{product}</td>
                      <td>{quantity}</td>
                    </tr>
                  ))}
                  {topSellingProducts.length === 0 && (
                    <tr>
                      <td colSpan="2" className="text-center">No sales data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Inventory Summary</div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Products</th>
                    <th>Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(products.reduce((acc, product) => {
                    if (!acc[product.category]) {
                      acc[product.category] = { count: 0, value: 0 };
                    }
                    acc[product.category].count += 1;
                    acc[product.category].value += product.price * product.quantity;
                    return acc;
                  }, {})).map(([category, data]) => (
                    <tr key={category}>
                      <td>{category}</td>
                      <td>{data.count}</td>
                      <td>${data.value.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reporting;