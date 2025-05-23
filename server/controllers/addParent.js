import { format } from 'libphonenumber-js';
import Parent from '../models/Parent.js';
import parentSchema from '../validation/parentSchema.js';

export async function addParent(req, res) {
  try {
    const { error, value } = parentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const parent = await Parent.create(value);

     // Format phone numbers for response
     const formattedResponse = {
      ...newParent.toObject(), // if using Mongoose
      contact: formatPhone(newParent.contact),
      emergencyContact: formatPhone(newParent.emergencyContact),
    };

    res.status(201).json(formattedResponse);
  } catch (err) {
    console.error('Add Parent Error:', err);
    res.status(500).json({ error: 'Server error while creating parent' });
  }
}
