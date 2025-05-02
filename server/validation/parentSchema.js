import Joi from 'joi';

const parentSchema = Joi.object({
  name: Joi.string().required(),
  contact: Joi.string().required(),
  email: Joi.string().email().optional(),
  address: Joi.string().optional(),
  emergencyContactName: Joi.string().required(),
  emergencyContact: Joi.string().required(),
});

export default parentSchema;
