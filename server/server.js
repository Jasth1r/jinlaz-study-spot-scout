require('dotenv').config();
const path = require('path');
const express = require('express');
const sql = require('mssql');

const app = express();
const port = Number(process.env.PORT || 3000);
const poolConfig = {
  server: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT || 1433),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: { encrypt: true, trustServerCertificate: true }
};

app.use(express.static(path.join(__dirname, '..', 'web')));

app.get('/api/spots', async (req, res) => {
  const neighborhood = String(req.query.neighborhood || '');
  const minWifi = Math.max(0, Math.min(5, Number(req.query.minWifi || 0)));
  try {
    const pool = await sql.connect(poolConfig);
    const result = await pool.request()
      .input('neighborhood', sql.NVarChar(100), neighborhood)
      .input('minWifi', sql.Int, minWifi)
      .query(`SELECT s.name, s.neighborhood, s.wifi_rating AS wifi, s.noise_level AS noise, s.seating, s.open_hours AS hours
              FROM dbo.study_spots AS s
              WHERE (@neighborhood = N'' OR s.neighborhood = @neighborhood)
                AND s.wifi_rating >= @minWifi
              ORDER BY s.wifi_rating DESC, s.name;`);
    res.json(result.recordset);
    await pool.close();
  } catch (error) {
    console.error(error.message);
    res.status(503).json({ error: 'Database is not available yet. Run the setup steps in the README.' });
  }
});

app.listen(port, () => console.log(`Study Spot Scout running at http://localhost:${port}`));
