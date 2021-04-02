const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Conexão com a base de dados local

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('error', (err, client) => {
    console.log('Erro inesperado!', err)
    process.exit(-1);
})

pool.on('connect', () => {
    console.log('Base conectada!')
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};