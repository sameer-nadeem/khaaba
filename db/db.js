//connecting to MongoDB 
const mongoose = require('mongoose')
const config = require('config')
const db_uri = config.get('db_uri')

module.exports.connectDB = () => {
    mongoose.connect(db_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, (err) => {
        if (err) throw err
        console.log('Database connected!')
    })


}
