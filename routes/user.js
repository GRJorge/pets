const express = require('express')
const router = express.Router()

const controller = require('../controllers/user')

router.get('/',controller.viewSignIn);
router.get('/signUp',controller.viewSignUp)

module.exports = router