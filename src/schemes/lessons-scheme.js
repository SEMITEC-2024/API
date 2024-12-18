const joi = require("joi");

const lessonPaginationScheme = joi.object({
  var_page_number: joi.number().required(),
  var_page_size: joi.number().required(),
  var_name: joi.string().allow('').required(),
});

const pendingLessonsScheme = joi.object({
  student_id: joi.number().required()
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
  is_completed: joi.boolean().truthy(1).falsy(0).required(),
});

const lessonNameSearch = joi.object({
  var_name: joi.string().allow('').required(),
})

module.exports = {
  lessonPaginationScheme,
  pendingLessonsScheme,
  getLessonScheme,
  getLessonsByCodeScheme,
  saveMetrics,
  lessonNameSearch
};
