const express = require('express');
const bodyParser = require('body-parser');
const { getProducts, addProduct } = require('./api/product');

const app = express();
app.use(bodyParser.json());

app.get('/api/products', getProducts);
app.post('/api/products', addProduct);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});