const express = require("express")
const app = express()
const cors = require("cors")
const { Client } = require("pg")
const pool = require("./db")


// Middleware
app.use(cors())
app.use(express.json()) // enable req.body use, allows getting data from client side

// Routes:
// Get all feature requests
app.get("/", async (req, res) => {
  try {
    client.connect()
    const allFeatures = await client.query(
      "SELECT * FROM featurerequest")
    res.json(allFeatures.rows)
  } catch (error) {
    console.error(error.message)
  }
  client.end()
})

// Create feature request
app.post("/features", async (req, res) => {
  try {
    client.connect()
    const { description } = req.body
    const newFeature = await client.query(
      "INSERT INTO featurerequest (description) VALUES ($1) RETURNING *",
      [description]
    )
    res.json(newFeature.rows[0])
  } catch (error) {
    console.error(error.message)
  }
  client.end()
})

// Get one feature request

app.get("/features/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const feature = await client.query(
      "SELECT * FROM featurerequest WHERE feature_id = $1",
      [id])

    res.json(feature.rows[0])

  } catch (error) {
    console.error(error.message)
  }
})

// Update one feature request

app.put("/features/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const updateFeature = await client.query(
      "UPDATE featurerequest SET description = $1 WHERE feature_id = $2",
      [description, id]
    )

    res.json("Feature was updated.")

  } catch (error) {
    console.error(error.message)
  }
})

// Delete one feature request

app.delete("/features/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deleteFeature = await client.query(
      "DELETE FROM featurerequest WHERE feature_id = $1",
      [id]
    )
    res.json("Feature was deleted.")

  } catch (error) {
    console.error(error.message)
  }
})

app.listen(5000, () => {
  console.log("server started")
})