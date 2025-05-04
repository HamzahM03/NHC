import phoneValidator from '../phoneValidator.js';

describe('phoneValidator', () => {
  const validPhones = [
    '1234567890',
    '123-456-7890',
    '(123) 456-7890',
    '+1 123 456 7890',
    '123.456.7890',
  ];

  const invalidPhones = [
    '123', 'abcdef', '+1 (234) ABC-DEFG', '12345', '', '++123456',
  ];

  validPhones.forEach(phone => {
    it(`accepts valid phone number: ${phone}`, () => {
      const { error } = phoneValidator.validate(phone);
      expect(error).toBeUndefined();
    });
  });

  invalidPhones.forEach(phone => {
    it(`rejects invalid phone number: ${phone}`, () => {
      const { error } = phoneValidator.validate(phone);
      expect(error).toBeDefined();
      expect(error.message).toMatch(/Must be a valid phone number/);
    });
  });
});
