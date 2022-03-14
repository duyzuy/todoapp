const express = require('express')
const router = express.Router()

const Authenticate = require('../app/Controllers/AuthenticateController')

router.post('/login', Authenticate.login)

router.post('/signup', Authenticate.signup)
router.get('/access-token', Authenticate.accessToken)
module.exports = router