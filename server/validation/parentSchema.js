import Joi from 'joi';


// Simple phone number regex (10 digits, allows optional dashes/spaces)
const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

const parentSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  contact: Joi.string().pattern(phoneRegex).message('Contact must be a valid phone number').required(),
  email: Joi.string().email().optional(),
  address: Joi.string().trim().optional(),
  emergencyContactName: Joi.string().trim().min(1).required(),
  emergencyContact: Joi.string().pattern(phoneRegex).message('Emergency contact must be a valid phone number').required(),
});

export default parentSchema;
