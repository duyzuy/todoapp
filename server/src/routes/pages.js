
const express = require('express')
const router = express.Router()
const pageController = require('../app/Controllers/PagesController')


router.get('/:slug', pageController.show)
router.get('/', pageController.index);

module.exports = router