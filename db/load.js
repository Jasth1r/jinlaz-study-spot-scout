require('dotenv').config();
const fs = require('fs');
const path = require('path');
const sql = require('mssql');

const spots = [
  ['Juniper & Pine','Capitol Hill',5,'Quiet','Plentiful','7am–8pm'], ['Cedar Room','Capitol Hill',4,'Low buzz','Good','8am–7pm'],
  ['Pike & Pine Study Bar','Capitol Hill',4,'Social','Limited','9am–6pm'], ['Little Owl Coffee','Capitol Hill',3,'Busy','Good','7am–5pm'],
  ['Fremont Foundry Café','Fremont',4,'Low buzz','Good','8am–6pm'], ['Canal Street Coffee','Fremont',5,'Quiet','Plentiful','7am–7pm'],
  ['Rocket Crossings','Fremont',3,'Social','Good','8am–8pm'], ['Bridge & Bloom','Fremont',4,'Quiet','Limited','9am–4pm'],
  ['Maple Leaf Coffee','University District',4,'Quiet','Limited','6:30am–7pm'], ['Scholars Café','University District',5,'Low buzz','Plentiful','7am–9pm'],
  ['The Daily Grind','University District',3,'Busy','Good','6am–6pm'], ['North Campus Roasters','University District',4,'Low buzz','Plentiful','7am–8pm'],
  ['Ballard Bean','Ballard',5,'Quiet','Good','7am–6pm'], ['Nordic Cup','Ballard',4,'Low buzz','Plentiful','8am–7pm'],
  ['Market Street Coffee','Ballard',3,'Social','Limited','7am–5pm'], ['Salmon Bay Café','Ballard',4,'Quiet','Good','8am–4pm'],
  ['Westlake Work Café','Downtown',4,'Busy','Plentiful','7am–6pm'], ['Olive Way Coffee','Downtown',3,'Social','Good','8am–5pm'],
  ['Rainier Roasters','Columbia City',5,'Quiet','Good','7am–7pm'], ['Beacon Brew','Beacon Hill',4,'Low buzz','Limited','8am–6pm']
];

(async () => {
  const config = { server: process.env.DB_SERVER, port: Number(process.env.DB_PORT || 1433), user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, options: { encrypt: true, trustServerCertificate: true } };
  const pool = await sql.connect(config);
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await pool.request().batch(schema);
  for (const [name, neighborhood, wifi, noise, seating, hours] of spots) {
    await pool.request().input('name', sql.NVarChar(120), name).input('neighborhood', sql.NVarChar(100), neighborhood).input('wifi', sql.Int, wifi).input('noise', sql.NVarChar(40), noise).input('seating', sql.NVarChar(40), seating).input('hours', sql.NVarChar(80), hours).query(`INSERT INTO dbo.study_spots (name, neighborhood, wifi_rating, noise_level, seating, open_hours) VALUES (@name, @neighborhood, @wifi, @noise, @seating, @hours);`);
  }
  console.log(`OK: loaded ${spots.length} study spots into ${process.env.DB_NAME}`);
  await pool.close();
})().catch(error => { console.error('FAILED:', error.message); process.exitCode = 1; });
