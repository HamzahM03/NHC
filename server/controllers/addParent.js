import Parent from '../models/Parent.js';
import parentSchema from '../validation/parentSchema.js';

export async function addParent(req, res) {
  try {
    const { error, value } = parentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const parent = await Parent.create(value);
    res.status(201).json(parent);
  } catch (err) {
    console.error('Add Parent Error:', err);
    res.status(500).json({ error: 'Server error while creating parent' });
  }
}
