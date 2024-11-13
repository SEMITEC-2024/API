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

module.exports = {
  lessonPaginationScheme,
  pendingLessonsScheme,
  getLessonScheme,
  getLessonsByCodeScheme,
};
