const joi = require('joi');

const studentId = joi.object({
    student_id: joi.number().required()
});

module.exports = {studentId};