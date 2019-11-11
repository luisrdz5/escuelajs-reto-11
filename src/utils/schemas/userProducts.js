const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-f-A-F]{24}$/);

const createUserSchema = {
    userId: userIdSchema,
};

module.exports = {
    userIdSchema,
    createUserSchema
}