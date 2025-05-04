import Joi from 'joi';
import phoneValidator from './phoneValidator.js';

const parentSchema = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Name is required',
  }),
  contact: phoneValidator.label('Contact Number').required().messages({
    'any.required': 'Contact number is required',
  }),
  email: Joi.string().email().lowercase().optional(),
  address: Joi.string().trim().optional(),
  emergencyContactName: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Emergency contact name is required',
  }),
  emergencyContact: phoneValidator.label('Emergency Contact Number').required().messages({
    'any.required': 'Emergency contact number is required',
  }),
}).strict();

export default parentSchema;
