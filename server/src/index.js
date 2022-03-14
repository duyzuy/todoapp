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
var cors = require('cors');

//api settingup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json())


// NEW UPLOAD
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


//setup view engine
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'ejs')


//connect db
db.connect();

const port = 8000;

//get all routes
const routes = new Routes(app)
routes.getRoute();

//




// Routes(app)

//running server
app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`)
})
