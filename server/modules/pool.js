// const pg = require('pg')

// let databaseName = 'react-gallery'

// if (process.env.NODE_ENV === 'test') {
//   databaseName = 'prime_testing'


const pg = require("pg");
let pool;
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
pool = new pg.Pool({
  host: PGHOST,
  port: 5432,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});
console.log("connected to neon");
module.exports = pool;
