const { Router }  = require('express')
const router = Router()
const accountController = require('../controllers/account-controller');
const lessonsController = require('../controllers/lessons-controller')

// acount routes
router.get('/account-type', accountController.getUserType)
router.get('/countries', accountController.getCountries)
router.get('/provinces', accountController.getProvinces)
router.get('/cantons', accountController.getCantons)
router.get('/institutions', accountController.getInstitutions)
router.post('/register', accountController.createUser)
router.post('/login', accountController.login)

// lessons routes
router.get('/lessons', lessonsController.getLessons)
router.get('/lesson', lessonsController.getLesson)
module.exports =  router 