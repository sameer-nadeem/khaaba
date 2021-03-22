const authRoutes = require('./auth')
const chefRoutes = require('./chef')


module.exports = (app) => {
    app.use('/auth', authRoutes)
    app.use('/chef', chefRoutes)
}