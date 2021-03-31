const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Conexão com a base de dados local

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});