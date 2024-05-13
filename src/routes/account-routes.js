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
router.get('/teacher/profile', accountController.getProfileInfo)
router.get('/student/profile', accountController.getProfileInfo)
router.get('/teacher/username', accountController.getUsername)
router.get('/student/username', accountController.getUsername)


// lessons routes
router.get('/lessons', lessonsController.getLessons)
router.get('/lesson', lessonsController.getLesson)

// groups-routes
router.get('/teacher/groups', groupsController.getTeacherGroups)
router.get('/group/students', groupsController.getStudentsGroup)
router.get('/student/groups/', groupsController.getStudentGroups)
router.post('/teacher/groups/create', groupsController.createGroup)
router.post('/student/groups/join', groupsController.joinGroup)
module.exports =  router 