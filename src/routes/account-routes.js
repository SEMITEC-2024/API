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

// register routes
router.post('/register-teacher', accountController.registerTeacher)
router.post('/register-student', accountController.registerStudent)

router.post('/login', accountController.login)
router.get('/teacher/profile', accountController.getProfileInfo)
router.get('/student/profile', accountController.getProfileInfo)
router.get('/teacher/username', accountController.getUsername)
router.get('/student/username', accountController.getUsername)


// lessons routes
router.get('/lessons', lessonsController.getLessons)
router.get('/lesson', lessonsController.getLesson)
router.post('/student/lesson/results', lessonsController.saveLessonMetrics)
router.get('/student/lessons/stats', lessonsController.getAverageMetrics)
router.get('/teacher/groups/info/student-info', lessonsController.getAverageMetricsTeacher)
router.get('/teacher/groups/info/student-profile', accountController.getProfileInfoTeacher)
router.get('/student/lessons/accuracy-history', lessonsController.getAccuracyHistory)
router.get('/student/lessons/next-lesson', lessonsController.getNextLesson)
router.post('/lessons/create', lessonsController.createLesson)//Missing /teacher for testing
router.get('/lessons/levels', lessonsController.getLessonLevels)
router.get('/lessons/lexemes', lessonsController.getLexemes)

// groups-routes
router.get('/teacher/groups', groupsController.getTeacherGroups)
router.get('/student/groups/members', groupsController.getGroupMembers)
router.get('/teacher/groups/members', groupsController.getGroupMembers)
router.post('/teacher/groups/create', groupsController.createGroup)
router.get('/teacher/groups/info', groupsController.getGroupInfo)
router.get('/student/groups/', groupsController.getStudentGroups)
router.post('/student/groups/join', groupsController.joinGroup)
module.exports =  router 