const mysql = require('mysql2');
const redis = require('redis');
const util = require('util');


// MySQL Connection
const db = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'rootpassword',
  database: 'productdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
db.query = util.promisify(db.query);
const cache = redis.createClient({
   url: 'redis://cache:6379'
 
});
// cache.on('error', err => console.log('Redis Client Error', err));
// (async()=>())await cache.connect();
 
// Connect Redis client
cache.connect().catch((err) => console.error('Error connecting to Redis:', err));

const getProducts = async (req, res) => {
  try {
    // Check Redis cache
    const data = await cache.get('products');
    if (data) {
      console.log('Cache hit');
      return res.json(JSON.parse(data));
    }

    // If not in cache, fetch from database
    console.log('Cache miss');
    db.query('SELECT * FROM products', (err, results) => {
      if (err) throw err;

      // Save results in Redis cache
      cache.setEx('products', 3600, JSON.stringify(results));
      res.json(results);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server Error');
  }
};

const addProduct = (req, res) => {
  const { name, price } = req.body;
  db.query(
    'INSERT INTO products (name, price) VALUES (?, ?)',
    [name, price],
    (err, result) => {
      if (err) throw err;

      const newProduct = { id: result.insertId, name, price };

      // Clear the cache for products
      cache.del('products');
      res.json(newProduct);
    }
  );
};

module.exports = { getProducts, addProduct };