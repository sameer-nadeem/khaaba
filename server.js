


const express = require('express')
const app = express()
const PORT = 5000 || process.env.PORT
const connectDB = require('./db/db').connectDB
const setRoutes = require('./routes/setRoutes')
const path = require('path')
const cors = require('cors')
//Connects to MongoDB Atlas Cloud
connectDB()

require('./models/user')
require('./models/activeOrder')
require('./models/admin')
require('./models/category')
require('./models/chef')
require('./models/completeOrder')
require('./models/instantKhaaba')
require('./models/khaaba')
require('./models/kitchen')


//Necessary Middlewares
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(express.json({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

//Routes
setRoutes(app)

//Starting the application at some PORT
app.listen(PORT, () => {
    console.log(`Server started at PORT ----> ${PORT}`)
})
