const { Router }  = require('express')
const router = Router()
const schemes = require('../schemes/register-scheme')
const lessonSchemes = require('../schemes/lessons-scheme')
const validateScheme = require('../middleware/scheme-validation')
const accountController = require('../controllers/account-controller');
const lessonsController = require('../controllers/lessons-controller')
const groupsController = require('../controllers/groups-controller')

// acount routes
router.get('/account-type', accountController.getUserType)
router.get('/countries', accountController.getCountries)
router.get('/provinces', accountController.getProvinces)
router.get('/cantons', accountController.getCantons)
router.get('/districts', accountController.getDistricts)
router.get('/institutions', accountController.getInstitutions)
router.get('/education-levels', accountController.getEducationLevels)

// register routes
router.post('/register-teacher', validateScheme(schemes.registerTeacherScheme), accountController.registerTeacher)
router.post('/register-student', validateScheme(schemes.registerStudentScheme),accountController.registerStudent)

router.post('/login', accountController.login)
router.get('/teacher/profile', accountController.getProfileInfoTeacher)
router.get('/student/profile', accountController.getProfileInfo)
router.get('/teacher/username', accountController.getUsername)
router.get('/student/username', accountController.getUsername)
router.post('/teacher/profile/update', accountController.updateProfileInfoTeacher);//New
router.post('/student/profile/update', accountController.updateProfileInfoStudent);//New


// lessons routes
router.get('/lessons', lessonsController.getLessons)
router.get('/lesson', lessonsController.getLesson)
router.post('/student/lesson/results', lessonsController.saveLessonMetrics)
router.get('/student/lessons/stats', lessonsController.getAverageMetrics)
router.get('/teacher/groups/info/student-info', lessonsController.getAverageMetricsTeacher)
router.get('/teacher/groups/info/student-profile', accountController.getProfileInfoTeacher)
router.get('/student/lessons/accuracy-history', lessonsController.getAccuracyHistory)
router.get('/student/lessons/next-lesson', lessonsController.getNextLesson)

router.post('/teacher/lessons/create', lessonsController.createLesson)
router.post('/teacher/lessons/create/assign', lessonsController.assignLesson)
router.post('/teacher/lesson/create/assign/bulk', lessonsController.createAssignLesson)
router.get('/lessons/levels', lessonsController.getLessonLevels)
router.get('/lessons/lexemes', lessonsController.getLexemes)
router.get('/lessons/public/total', lessonsController.getLessonsPublicCount)
router.get('/teacher/lessons/private/total', lessonsController.getLessonsTeacherPrivateCount)
router.get('/student/lessons/assigned/total', lessonsController.getLessonsStudentAssignedCount)
router.post('/lessons/public', lessonsController.getLessonsPublicPerPage)
router.post('/student/lessons/assigned', lessonsController.getLessonsStudentAssignedPages)
router.post('/lessons/default-by-code', lessonsController.getLessonsDefaultbyCode)
router.get('/lessons/default/total', lessonsController.getLessonsDefaultCount)
router.post('/student/lessons/assigned-by-code', lessonsController.getLessonsStudentAssignedByCode)
router.post('/lessons/default',validateScheme(lessonSchemes.lessonPaginationScheme), lessonsController.getLessonsDefaultPages)
router.post('/teacher/lessons/created-by-code', lessonsController.getTeacherCreatedLessonsByCode)
router.post('/lessons/public-by-code', lessonsController.getPublicLessonsByCode)
router.post('/teacher/lessons/private',validateScheme(lessonSchemes.lessonPaginationScheme), lessonsController.getLessonsPrivateByTeacherPages)

router.post('/student/lessons/next-assignment', lessonsController.getLessonsNextAssignment)
router.post('/student/lessons/count-pending',validateScheme(lessonSchemes.pendingLessonsScheme), lessonsController.getLessonsCountPendingCompletedStudent)

router.post('/student/ppm-and-accuracy', lessonsController.getPPMAndAccuracy)


// groups-routes
router.get('/teacher/groups', groupsController.getTeacherGroups)
router.get('/teacher/groups/total', groupsController.getGroupTeacherCount)
router.post('/teacher/groups', groupsController.getTeacherGroupsPerPage)
//router.get('/student/groups/members', groupsController.getGroupMembers) PENDING
router.get('/teacher/groups/members/total', groupsController.getGroupStudentsCount)
router.post('/teacher/groups/members', groupsController.getGroupStudents)
router.post('/teacher/groups/create', groupsController.createGroup)
router.get('/teacher/groups/info', groupsController.getGroupInfo)
router.get('/student/groups/', groupsController.getStudentGroups)
router.post('/student/groups/join', groupsController.joinGroup)
router.get('/teacher/recent-activity', groupsController.getRecentActivity)
module.exports = router 