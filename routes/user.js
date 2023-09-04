const express = require('express')
const router = express.Router()

const controller = require('../controllers/user')

router.get('/',controller.viewSignIn);
router.get('/signUp',controller.viewSignUp)
router.post('/signIn', controller.signIn)
router.post('/insertUser',controller.insertUser)

module.exports = router