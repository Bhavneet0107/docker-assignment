import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div className="App">
      <h1>Product Management</h1>
      <ProductForm onAddProduct={handleAddProduct} />
      <ProductList products={products} />
    </div>
  );
}

export default App;