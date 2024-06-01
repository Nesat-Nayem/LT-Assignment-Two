import Joi from 'joi';

const orderSchema = Joi.object({
  email: Joi.string().email().required(),
  productId: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

export function validateOrder(order: any) {
  return orderSchema.validate(order);
}
