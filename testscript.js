const db = require('./db');

async function testConnection() {
  try {
    const result = await db.query('SELECT $1::text as message', ['Hello, PostgreSQL!']);
    console.log(result.rows[0].message);
  } catch (error) {
    console.error('Error connecting to the database', error);
  } finally {
    db.pool.end(); // Close the pool when done
  }
}

testConnection();
