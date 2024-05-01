const { Router }  = require('express')
const router = Router()
const accountController = require('../controllers/account-controller');

router.post('/register', accountController.createUser)

module.exports =  router 
