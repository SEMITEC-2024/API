const joi = require('joi');

const registerTeacherScheme = joi.object({
    user_type_id: joi.number().required(),
    institution_id: joi.number().required(),
    district_id: joi.number().required(),
    name: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email().required(),
    other_signs: joi.string().required() 
});

const registerStudentScheme = joi.object({
    user_type_id: joi.number().required(),
    institution_id: joi.number().required(),
    district_id: joi.number().required(),
    name: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email().required(),
    other_signs:joi.string().required(),
    education_level_id:joi.number().required(),
    date_birth: joi.date().required()
});


module.exports = {registerTeacherScheme, registerStudentScheme};