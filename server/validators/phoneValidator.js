import Joi from 'joi';

const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

const normalizePhone = (value, helpers) => {
  const normalized = value.replace(/[^\d+]/g, ''); // Keep digits and "+"
  if (!phoneRegex.test(value)) {
    return helpers.error('any.invalid');
  }
  return normalized;
};

const phoneValidator = Joi.string()
  .custom(normalizePhone, 'Phone normalization and validation')
  .message('Must be a valid phone number');

export default phoneValidator;
