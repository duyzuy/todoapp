const express = require('express')
const morgan = require('morgan')
const ejs = require('ejs');
const path = require('path')
var bodyParser = require('body-parser')
const app = express()
const db = require('./app/Models')
require('dotenv').config()
const Routes = require('./routes')
app.use(morgan('combined'))

//api settingup
app.use(bodyParser.json())
app.use(express.json())

//setup view engine
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'ejs')


//connect db
db.connect();

const port = 8000;

//get all routes
const routes = new Routes(app)
routes.getRoute();



// Routes(app)

//running server
app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`)
})
