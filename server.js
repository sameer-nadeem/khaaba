const express = require('express')
const app = express()
const PORT = 5000 || process.env.PORT
const jsonwebtoken = require('jsonwebtoken')
const connectDB = require('./db/db').connectDB
const auth = require('./middlewares/auth')
const config = require('config')

//Connects to MongoDB Atlas Cloud
connectDB()

//Necessary Middlewares
app.use(express.json({ extended: true }));

//Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/', (req, res) => {
    res.send(req.body)
})


//Starting the application at some PORT
app.listen(PORT, () => {
    console.log(`Server running at PORT ----> ${PORT}`)
})
