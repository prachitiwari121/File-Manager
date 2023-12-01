// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'propacitydatabase',
  password: 'prachi', // Provide your actual password
  port: 5432,
  max: 20, // Adjust pool size as needed
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Try to connect for 2 seconds
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, // Export the pool object
};
