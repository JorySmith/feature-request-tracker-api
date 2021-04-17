const express = require("express")
const app = express()
const cors = require("cors")
// const { Client } = require("pg")
const pool = require("./db")


// Middleware
app.use(cors())
app.use(express.json()) // enable req.body use, allows getting data from client side

// Routes:
// Get all feature requests
app.get("/", async (req, res) => {
  try {
    // res.send('The homepage is working!')
    const allFeatures = await pool.query(
      "SELECT * FROM featurerequest")
    res.json(allFeatures.rows)
  } catch (error) {
    console.error(error.message)
  }

})

// Add a feature request
app.post("/", async (req, res) => {
  try {
    const { description } = req.body
    const newFeature = await pool.query(
      "INSERT INTO featurerequest (description) VALUES ($1) RETURNING *",
      [description]
    )
    res.json(newFeature.rows[0])
  } catch (error) {
    console.error(error.message)
  }

})

// Get one feature request
app.get("/feature-request-tracker/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const feature = await pool.query(
      "SELECT * FROM featurerequest WHERE feature_id = $1",
      [id])

    res.json(feature.rows[0])

  } catch (error) {
    console.error(error.message)
  }
})

// Update one feature request
app.put("/feature-request-tracker/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const updateFeature = await pool.query(
      "UPDATE featurerequest SET description = $1 WHERE feature_id = $2",
      [description, id]
    )

    res.json("Feature was updated.")

  } catch (error) {
    console.error(error.message)
  }
})

// Delete one feature request
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deleteFeature = await pool.query(
      "DELETE FROM featurerequest WHERE feature_id = $1",
      [id]
    )
    res.json("Feature was deleted.")

  } catch (error) {
    console.error(error.message)
  }
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on Port ${process.env.PORT} my man!`)
})