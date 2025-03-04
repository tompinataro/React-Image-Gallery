const express = require("express");
const app = express();
const gallery = require("./routes/gallery.router.js");
const { Pool } = require("pg");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

/** ---------- DATABASE CONNECTION ---------- **/
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure Heroku's DATABASE_URL is used
  ssl: process.env.DATABASE_URL.includes("neon.tech") ? { rejectUnauthorized: false } : false, // Fix SSL issues for Neon PostgreSQL
});

pool.connect()
  .then(() => console.log("✅ Connected to Neon PostgreSQL!"))
  .catch(err => console.error("❌ Database connection error:", err));

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json());
app.use(express.static("build"));

/** ---------- EXPRESS ROUTES ---------- **/
app.use("/api/gallery", gallery);

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});

module.exports = pool; // Ensure the database pool is exported



// After setting up the Neon Database:
// I replaced my current server.js with the updated version above. This version:
// // 	1.	Keeps your Express server setup (routes, middleware, static files).
// 	2.	Properly connects to Neon PostgreSQL using pg.Pool.
// 	3.	Ensures that the /api/gallery route has access to the database.