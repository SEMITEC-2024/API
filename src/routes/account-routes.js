const { Router }  = require('express')
const router = Router()
const schemes = require('../schemes/register-scheme')
const accountSchemes = require('../schemes/account-scheme')
const validateScheme = require('../middleware/scheme-validation')
const accountController = require('../controllers/account-controller');
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
router.post('/register-teacher', validateScheme.body(schemes.registerTeacherScheme), accountController.registerTeacher)
router.post('/register-student', validateScheme.body(schemes.registerStudentScheme),accountController.registerStudent)

router.post('/login', accountController.login)
router.get('/teacher/profile', accountController.getProfileInfoTeacher)
router.get('/student/profile', accountController.getProfileInfo)
router.get('/teacher/username', accountController.getUsername)
router.get('/student/username', accountController.getUsername)
router.post('/teacher/profile/update', accountController.updateProfileInfoTeacher);//New
router.post('/student/profile/update', accountController.updateProfileInfoStudent);//New

router.post('/teacher/student-info',
    validateScheme.body(accountSchemes.studentId), accountController.getStudentProfileFromTeacher)

router.get('/teacher/groups/info/student-profile', accountController.getProfileInfoTeacher)


// groups-routes
router.get('/teacher/groups', groupsController.getTeacherGroups)
router.get('/teacher/groups/total', groupsController.getGroupTeacherCount)
router.post('/teacher/groups', groupsController.getTeacherGroupsPerPage)
router.get('/student/groups/total', groupsController.getGroupStudentCount)
router.post('/student/groups', groupsController.getStudentGroupsPerPage)
router.get('/student/groups/members/total', groupsController.getGroupStudentsCount)
router.get('/teacher/groups/members/total', groupsController.getGroupStudentsCount)
router.post('/student/groups/members', groupsController.getGroupStudents)
router.post('/teacher/groups/members', groupsController.getGroupStudents)


router.get('/teacher/recent-activity', groupsController.getRecentActivity)
router.post('/student/groups/members/remove', groupsController.deleteStudentFromGroup)
router.post('/teacher/groups/members/remove', groupsController.deleteStudentFromGroup) 

router.post('/teacher/groups/students/filter/total', groupsController.getFilteredGroupStudentsCount)
router.post('/teacher/groups/students/filter', groupsController.getFilteredGroupStudents)
router.post('/teacher/groups/students/add', groupsController.addStudent)

router.post('/teacher/groups/create', groupsController.createGroup)
router.post('/student/groups/join', groupsController.joinGroup)
router.get('/teacher/recent-activity', groupsController.getRecentActivity)
module.exports = router 
