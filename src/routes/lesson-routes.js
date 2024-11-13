const { Router } = require("express");
const router = Router();
const lessonSchemes = require("../schemes/lessons-scheme");
const validateScheme = require("../middleware/scheme-validation");
const lessonController = require("../controllers/lessons-controller");

// get lesson by id
router.get(
  "/lesson",
  validateScheme.query(lessonSchemes.getLessonScheme),
  lessonController.getLesson
);

// get next default lesson
router.get("/student/lessons/next-lesson", lessonController.getNextLesson);

// get next assigned lesson
router.post(
  "/student/lessons/next-assignment",
  lessonController.getLessonsNextAssignment
);

// get teacher private lessons count for pagination
router.get(
  "/teacher/lessons/private/total",
  lessonController.getLessonsTeacherPrivateCount
);

// get teacher private lessons with pagination
router.post(
  "/teacher/lessons/private",
  validateScheme.body(lessonSchemes.lessonPaginationScheme),
  lessonController.getLessonsPrivateByTeacherPages
);

// get teacher private lessons, query by code
router.post(
  "/teacher/lessons/created-by-code",
  validateScheme.body(lessonSchemes.getLessonsByCodeScheme),
  lessonController.getTeacherCreatedLessonsByCode
);

// get public lessons count for pagination
router.get("/lessons/public/total", lessonController.getLessonsPublicCount);

// get public lessons with pagination
router.post("/lessons/public", lessonController.getLessonsPublicPerPage);

// get public lessons, query by code
router.post(
  "/lessons/public-by-code",
  validateScheme.body(lessonSchemes.getLessonsByCodeScheme),
  lessonController.getPublicLessonsByCode
);

// get default lessons count for pagination
router.get("/lessons/default/total", lessonController.getLessonsDefaultCount);

// get default lessons with pagination
router.post(
  "/lessons/default",
  validateScheme.body(lessonSchemes.lessonPaginationScheme),
  lessonController.getLessonsDefaultPages
);

// get default lessons, query by code
router.post(
  "/lessons/default-by-code",
  validateScheme.body(lessonSchemes.getLessonsByCodeScheme),
  lessonController.getLessonsDefaultbyCode
);

// get student assigned lessons count for pagination
router.get(
  "/student/lessons/assigned/total",
  lessonController.getLessonsStudentAssignedCount
);

// get student assigned lessons with pagination
router.post(
  "/student/lessons/assigned",
  validateScheme.body(lessonSchemes.lessonPaginationScheme),
  lessonController.getLessonsStudentAssignedPages
);

// get student asgined lessons, query by code
router.post(
  "/student/lessons/assigned-by-code",
  validateScheme.body(lessonSchemes.getLessonsByCodeScheme),
  lessonController.getLessonsStudentAssignedByCode
);

// get student pending lessons count
router.post(
  "/student/lessons/count-pending",
  lessonController.getLessonsCountPendingCompletedStudent
);

// get student pending lessons count from the teacher account
router.post(
  "/teacher/lessons/count-pending",
  validateScheme.body(lessonSchemes.pendingLessonsScheme),
  lessonController.getPendingLessonCountFromTeacher
);

// save lesson metrics
router.post(
  "/student/lesson/results",
  validateScheme.body(lessonSchemes.saveMetrics),
  lessonController.saveLessonMetrics
);

// get average metrics for a student
router.get("/student/lessons/stats", lessonController.getAverageMetrics);

//get average metrics for a student from a teacher account
router.get(
  "/teacher/lessons/stats",
  validateScheme.body(lessonSchemes.pendingLessonsScheme),
  lessonController.getAverageMetricsFromTeacher
);
// get accuracy history for a student
router.get(
  "/student/lessons/accuracy-history",
  lessonController.getAccuracyHistory
);

// create lesson
router.post("/teacher/lessons/create", lessonController.createLesson);
// assign lesson
router.post("/teacher/lessons/create/assign", lessonController.assignLesson);
// create and assign lesson
router.post(
  "/teacher/lesson/create/assign/bulk",
  lessonController.createAssignLesson
);
// get lesson levels
router.get("/lessons/levels", lessonController.getLessonLevels);
// get lesson lexemes
router.get("/lessons/lexemes", lessonController.getLexemes);

// get student ppm and accuracy
router.post("/student/ppm-and-accuracy", lessonController.getPPMAndAccuracy);

router.post(
  "/teacher/ppm-and-accuracy",
  validateScheme.body(lessonSchemes.pendingLessonsScheme),
  lessonController.getPPMAndAccuracyFromTeacher
);

router.post(
  "/student/lessons/studentstats",
  lessonController.getLessonMetricsStudent
);

router.post(
  "/teacher/lessons/studentstats",
  lessonController.getLessonMetricsStudent
);

router.get(
  "/student/lessons/history/total",
  lessonController.getStudentLessonsHistoryCount
);

router.get(
  "/teacher/lessons/history/total",
  lessonController.getStudentLessonsHistoryCount
);

router.post(
  "/student/lessons/history",
  lessonController.getStudentLessonsHistoryPerPage
);

router.post(
  "/teacher/lessons/history",
  lessonController.getStudentLessonsHistoryPerPage
);

module.exports = router;
