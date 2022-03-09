const express = require('express')
const morgan = require('morgan')
const ejs = require('ejs');
const path = require('path')
const app = express()

const Routes = require('./routes')
app.use(morgan('combined'))

//setup view engine
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'ejs')


const port = 8000

//get all routes
const routes = new Routes(app)
routes.getRoute();


// Routes(app)

//running server
app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`)
})
