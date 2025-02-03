const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const { getProducts, addProduct } = require('./api/product');

const app = express();

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow frontend's origin
    methods: ['GET', 'POST'], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

app.use(bodyParser.json());

app.get('/api/products', getProducts);
app.post('/api/products', addProduct);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
