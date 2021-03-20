const express = require('express')
const app = express()
const PORT = 5000 || process.env.PORT
const jsonwebtoken = require('jsonwebtoken')
const connectDB = require('./db/db').connectDB
const auth = require('./middlewares/auth')
const config = require('config')
const setRoutes = require('./routes/setRoutes')
//Connects to MongoDB Atlas Cloud
connectDB()

//Necessary Middlewares
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json({ extended: true }));


//Routes
setRoutes(app)

//Starting the application at some PORT
app.listen(PORT, () => {
    console.log(`Server started at PORT ----> ${PORT}`)
})
