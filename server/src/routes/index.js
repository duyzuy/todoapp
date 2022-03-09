const pageRoute = require('./pages')

class Routes {

    constructor(app){
        this.app = app
    }
    
    getRoute() {
        this.app.use('/page', pageRoute)
    }
   
}
module.exports = Routes