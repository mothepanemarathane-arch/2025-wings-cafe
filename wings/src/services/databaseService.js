// src/services/databaseService.js
class DatabaseService {
  constructor() {
    this.storageKey = 'wingsCafeDatabase';
    this.data = null;
  }

  // Load data from localStorage
  loadData() {
    if (this.data) return this.data;
    
    try {
      const storedData = localStorage.getItem(this.storageKey);
      if (storedData) {
        this.data = JSON.parse(storedData);
      } else {
        // Initialize with default data if nothing exists
        this.data = {
          products: [
            {
              id: 1,
              name: "Cappuccino",
              description: "Hot coffee drink",
              category: "Beverages",
              price: 3.5,
              quantity: 15,
              minStock: 10
            },
            {
              id: 2,
              name: "Chocolate Cake",
              description: "Rich chocolate dessert",
              category: "Pastries",
              price: 4,
              quantity: 8,
              minStock: 5
            },
            {
              id: 3,
              name: "Turkey Sandwich",
              description: "Fresh turkey on whole wheat",
              category: "Sandwiches",
              price: 6.5,
              quantity: 12,
              minStock: 8
            },
            {
              id: 4,
              name: "Green Tea",
              description: "Hot herbal tea",
              category: "Beverages",
              price: 2.5,
              quantity: 20,
              minStock: 15
            },
            {
              id: 5,
              name: "Blueberry Muffin",
              description: "Fresh baked muffin",
              category: "Pastries",
              price: 2.75,
              quantity: 4,
              minStock: 6
            }
          ],
          sales: [],
          customers: []
        };
        this.saveData();
      }
      return this.data;
    } catch (error) {
      console.error('Error loading database:', error);
      return { products: [], sales: [], customers: [] };
    }
  }

  // Save data to localStorage
  saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }

  async getProducts() {
    const data = this.loadData();
    return data.products || [];
  }

  async getSales() {
    const data = this.loadData();
    return data.sales || [];
  }

  async getCustomers() {
    const data = this.loadData();
    return data.customers || [];
  }

  async saveProducts(products) {
    const data = this.loadData();
    data.products = products;
    this.data = data;
    return this.saveData();
  }

  async saveSales(sales) {
    const data = this.loadData();
    data.sales = sales;
    this.data = data;
    return this.saveData();
  }

  async saveCustomers(customers) {
    const data = this.loadData();
    data.customers = customers;
    this.data = data;
    return this.saveData();
  }

  // Export data as JSON file
  exportData() {
    const dataStr = JSON.stringify(this.data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'wings-cafe-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  // Import data from JSON file
  importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          this.data = jsonData;
          this.saveData();
          resolve(true);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }
}

// Create an instance and assign it to a variable
const databaseServiceInstance = new DatabaseService();

// Export the named instance
export default databaseServiceInstance;