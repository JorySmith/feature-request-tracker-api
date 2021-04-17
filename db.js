const Pool = require("pg").Pool
// Enables postgres queries

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

//https://feature-request-tracker-api.herokuapp.com/

module.exports = pool