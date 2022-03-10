const {dbModels} = require('../Models')
const db = dbModels();
class PagesController {
    

    listPage (req, res) {
       
        res.render('./page/listPage')
    }

    show (req, res) {

        // const pageSlug = req.params.slug
        // res.render('./page/singlePage')
   
    }

    addPage = async (req, res) => {
        
       
        // const page = await db.Page.create(
        //     {
        //         title: 'this is first post',
        //         slug: 'this-is-first-post',
        //         shortDescriptions: 'short des',
        //         thumbnail: 'url hinh anh',
        //         descriptions: 'descriptions descriptions descriptions',
        //     }
        // );

        // page.save();
        // console.log('add success')
        // res.json(page)
     
    }
    createPage (req, res) {
        res.json('veryfied success')
    }
    
}

module.exports = new PagesController()