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
router.post('/student/lesson/results', lessonsController.saveLessonMetrics)
router.get('/student/lessons/stats', lessonsController.getAverageMetrics)
router.get('/teacher/groups/info/student-info', lessonsController.getAverageMetricsTeacher)
router.get('/teacher/groups/info/student-profile', accountController.getProfileInfoTeacher)
router.get('/student/lessons/accuracy-history', lessonsController.getAccuracyHistory)
router.get('/student/lessons/next-lesson', lessonsController.getNextLesson)
router.post('/teacher/lessons/create', lessonsController.createLesson)//New
router.post('/teacher/lessons/create/assign', lessonsController.assignLesson)//New)
router.post('/teacher/lesson/create/assign/bulk', lessonsController.createAssignLesson)//New
router.get('/lessons/levels', lessonsController.getLessonLevels)//New
router.get('/lessons/lexemes', lessonsController.getLexemes)//New
router.get('/lessons/public/total', lessonsController.getLessonsPublicCount)//New
router.post('/lessons/public', lessonsController.getLessonsPublicPerPage)//New

// groups-routes
router.get('/teacher/groups', groupsController.getTeacherGroups)
router.get('/teacher/groups/total', groupsController.getGroupTeacherCount)//New
router.post('/teacher/groups', groupsController.getTeacherGroupsPerPage)//New
//router.get('/student/groups/members', groupsController.getGroupMembers) PENDING
router.get('/teacher/groups/members/total', groupsController.getGroupStudentsCount)//New
router.post('/teacher/groups/members', groupsController.getGroupStudents)//New
router.post('/teacher/groups/create', groupsController.createGroup)
router.get('/teacher/groups/info', groupsController.getGroupInfo)
router.get('/student/groups/', groupsController.getStudentGroups)
router.post('/student/groups/join', groupsController.joinGroup)
module.exports = router 