const Joi = require('joi');

function validateCourse(courseName) {
    const schema = Joi.object({
        courseName: Joi.string().min(3).required(),
    });

    return schema.validate({courseName: courseName});
};

module.exports = {validateCourse}