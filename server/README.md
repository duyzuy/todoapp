### install express package

### install nodemon
`npm i nodemon --save-dev `
go package.json add on scripts : "start": "nodemon ./server.js localhost 8080"

### install morgan
`npm install morgan --save-dev`
logger http request on server

### install ejs template engine
npm install ejs

### re-structure project

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

package.json
