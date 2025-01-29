const mysql = require('mysql2');
const redis = require('redis');

const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'rootpassword',
  database: 'productdb',
});

const cache = redis.createClient({
  host: 'cache',
  port: 6380,
});

const getProducts = (req, res) => {
  cache.get('products', (err, data) => {
    if (data) {
      console.log('Cache hit');
      return res.json(JSON.parse(data));
    }

    console.log('Cache miss');
    db.query('SELECT * FROM products', (err, results) => {
      if (err) throw err;
      cache.setex('products', 3600, JSON.stringify(results));
      res.json(results);
    });
  });
};

const addProduct = (req, res) => {
  const { name, price } = req.body;
  db.query(
    'INSERT INTO products (name, price) VALUES (?, ?)',
    [name, price],
    (err, result) => {
      if (err) throw err;
      const newProduct = { id: result.insertId, name, price };
      cache.del('products');
      res.json(newProduct);
    }
  );
};

module.exports = { getProducts, addProduct };