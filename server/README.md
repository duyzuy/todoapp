### install express package

### install nodemon
`npm i nodemon --save-dev `
go package.json add on scripts : "start": "nodemon ./server.js localhost 8080"

### install morgan
`npm install morgan --save-dev`
logger http request on server

### install ejs template engine (for view engine)
npm install ejs

### re-structure MVC project

node__module
src
    |
    index.js
    resources
            |
            css
            images
            views
    app
        |
        Constroller
        Models
        Validations
        Config
package.json

### install sequelize
using for mysql db
install mysql2 for sequelize

### setting up api
install body-parser

### make build api Authentication
install joi validate
install bycrypt for hash password

### jsonwebtoken