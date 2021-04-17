const Pool = require("pg").Pool
// Enables postgres queries

const pool = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432,
  database: "duncanfeatures"
})

//https://feature-request-tracker-api.herokuapp.com/

module.exports = pool