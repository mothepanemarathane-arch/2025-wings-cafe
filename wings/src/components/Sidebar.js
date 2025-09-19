// src/components/Sidebar.js
import React from 'react';

const Sidebar = ({ activeModule, setActiveModule }) => {
// Update the menuItems array in Sidebar.js
const menuItems = [
  { key: 'dashboard', label: 'Dashboard', icon: 'fa-gauge' },
  { key: 'products', label: 'Products', icon: 'fa-utensils' },
  { key: 'sales', label: 'Sales', icon: 'fa-receipt' },
  { key: 'inventory', label: 'Inventory', icon: 'fa-boxes' },
  { key: 'customers', label: 'Customers', icon: 'fa-users' },
  { key: 'reporting', label: 'Reporting', icon: 'fa-chart-line' },
  { key: 'data', label: 'Data Management', icon: 'fa-database' }
];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3><i className="fa-solid fa-mug-hot"></i> Wings Cafe</h3>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <li 
            key={item.key}
            className={activeModule === item.key ? 'active' : ''}
            onClick={() => setActiveModule(item.key)}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;