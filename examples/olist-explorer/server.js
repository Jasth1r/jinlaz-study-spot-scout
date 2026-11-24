// server.js: the middle tier.
// The browser asks this server for data (GET /api/...).
// This server asks SQL Server, then sends the rows back as JSON.

require('dotenv').config();              // reads DB_SERVER, DB_USER, ... from the .env file
const express = require('express');
const sql = require('mssql');

const app = express();
const PORT = process.env.PORT || 3000;

// Connection settings come from environment variables, never from the code.
// The password lives only in your .env file, which git ignores.
const dbConfig = {
  server: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT || 1433),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'olist',
  options: {
    encrypt: true,
    trustServerCertificate: true          // the class server uses its own certificate
  }
};

// One shared connection pool, opened on the first request.
let poolPromise = null;
function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(dbConfig).catch(err => {
      poolPromise = null;                 // try again on the next request
      throw err;
    });
  }
  return poolPromise;
}

// The web page (public/index.html) is served as a static file.
app.use(express.static(require('path').join(__dirname, 'public')));

// API 1: is the database reachable?
app.get('/api/health', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT DB_NAME() AS db, SUSER_NAME() AS login_name');
    res.json({ ok: true, ...result.recordset[0] });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// API 2: the list of states, for the drop-down menu.
app.get('/api/states', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT seller_state, COUNT(*) AS sellers
      FROM   olist.dbo.sellers
      GROUP  BY seller_state
      ORDER  BY seller_state;`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API 3: the top 10 sellers in one state, by revenue.
// The state comes from the user, so it is passed as a PARAMETER (@state),
// never pasted into the SQL text. That is what stops SQL injection.
app.get('/api/top-sellers', async (req, res) => {
  const state = String(req.query.state || '').toUpperCase();
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('state', sql.NVarChar(50), state)
      .query(`
        SELECT TOP (10)
               s.seller_id,
               s.seller_city,
               COUNT(*)      AS items_sold,
               SUM(oi.price) AS revenue
        FROM   olist.dbo.sellers     AS s
        JOIN   olist.dbo.order_items AS oi ON oi.seller_id = s.seller_id
        WHERE  s.seller_state = @state
        GROUP  BY s.seller_id, s.seller_city
        ORDER  BY revenue DESC;`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
  console.log(`Database: ${dbConfig.server || '(DB_SERVER not set: copy .env.example to .env)'}`);
});
