const { Router }  = require('express')
const router = Router()
const accountController = require('../controllers/account-controller');
const lessonsController = require('../controllers/lessons-controller')
const groupsController = require('../controllers/groups-controller')
// acount routes
router.get('/account-type', accountController.getUserType)
router.get('/countries', accountController.getCountries)
router.get('/provinces', accountController.getProvinces)
router.get('/cantons', accountController.getCantons)
router.get('/institutions', accountController.getInstitutions)
router.post('/register', accountController.createUser)
router.post('/login', accountController.login)
router.get('/profile', accountController.getProfileInfo)

// lessons routes
router.get('/lessons', lessonsController.getLessons)
router.get('/lesson', lessonsController.getLesson)

// groups-routes
router.get('/teacher/groups', groupsController.getTeacherGroups)
router.get('/group/students', groupsController.getStudentsGroup)
module.exports =  router 