
import React, { useState } from 'react';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product added:', data);
        setName('');
        setPrice('');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Product</h2>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Price: </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
