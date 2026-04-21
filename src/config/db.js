import "dotenv/config";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

const pool = mysql.createPool(dbConfig);

try {
  await pool.getConnection();
  console.log("✅ chill Database has connected through Pool!");
} catch (err) {
  console.error("❌ Failed connect to the database in db.js:", err.message);
}

export default pool;
