import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  variants: Joi.array().items(
    Joi.object({
      type: Joi.string(),
      value: Joi.string(),
    })
  ),
  inventory: Joi.object({
    quantity: Joi.number().required(),
    inStock: Joi.boolean().required(),
  }).required(),
});

export function validateProduct(product: any) {
  return productSchema.validate(product);
}
