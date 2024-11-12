const joi = require('joi');

const lessonPaginationScheme = joi.object({
    var_page_number: joi.number().required(),
    var_page_size: joi.number().required()
});

module.exports = {lessonPaginationScheme};