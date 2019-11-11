const joi = require('@hapi/joi');


const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productTitleSchema = joi.string().max(80);
const productDescriptionSchema = joi.string().max(300);
const productSourceSchema = joi.string().uri();
const productPriceSchema = joi.number().min(1);


const createProductSchema = {
    title: productTitleSchema.required(),
    price: productPriceSchema.required(),
    image: productSourceSchema.required(),
    description: productDescriptionSchema.required()

}

const updateProductSchema = {
    title: productTitleSchema,
    price: productPriceSchema,
    image: productSourceSchema,
    description: productDescriptionSchema
}
module.exports = {
    productIdSchema,
    createProductSchema,
    updateProductSchema
}