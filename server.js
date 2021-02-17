const express = require('express')
const app = express()
const PORT = 5000 || process.env.PORT

const connectDB = require('./db/db').connectDB

connectDB()

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {

})

app.post("/echo", (req, res) => {
    console.log(req.body)
    res.json(req.body)
})


app.listen(PORT, () => {
    console.log(`Server running at PORT ----> ${PORT}`)
})
