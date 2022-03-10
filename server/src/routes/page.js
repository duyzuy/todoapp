
const express = require('express')
const router = express.Router()
const pageController = require('../app/Controllers/PagesController')

router.post('/createPage', pageController.createPage)
router.get('/add', pageController.addPage)
router.get('/:slug', pageController.show)
router.get('/', pageController.listPage);

module.exports = router