const joi = require("joi");

const lessonPaginationScheme = joi.object({
  var_page_number: joi.number().required(),
  var_page_size: joi.number().required(),
});

const pendingLessonsScheme = joi.object({
  teacher_id: joi.number().optional(),
});

const getLessonScheme = joi.object({
  lesson_id: joi.number().required(),
});

const getLessonsByCodeScheme = joi.object({
  lesson_code: joi.string().required(),
});

const saveMetrics = joi.object({
    lesson_id: joi.number().required(),
    time_taken: joi.number().required(),
    mistakes: joi.number().required(),
    accuracy_rate: joi.number().required(),
    ppm: joi.number().required(),
    is_completed: joi.boolean().required(),
})

module.exports = {
  lessonPaginationScheme,
  pendingLessonsScheme,
  getLessonScheme,
  getLessonsByCodeScheme,
  saveMetrics
};
