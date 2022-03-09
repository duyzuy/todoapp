
class PagesController {


    index (req, res) {
        res.send('this is a page list')
    }

    show (req, res) {
        const pageSlug = req.params.slug
        res.send(`page detail with slug ${pageSlug}`)
        console.log(req.params)
    }

    addPage (req, res) {

    }
    
}

module.exports = new PagesController()