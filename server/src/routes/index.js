const pageRoute = require('./page')
const authRoute = require('./auth')
const verified = require('./verifyToken')
const todoRoute = require('./todo')

class Routes {

    constructor(app){
        this.app = app
    }
    
    getRoute() {
        this.app.use('/page', pageRoute)
        this.app.use('/api/auth', authRoute)
        this.app.use('/api/todo', verified, todoRoute)
    }
   
}
module.exports = Routes