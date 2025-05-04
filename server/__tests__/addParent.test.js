import { addParent } from '../controllers/addParent.js';
import Parent from '../models/parent.js';

jest.mock('../models/parent.js'); // This mocks the DB model so we don’t hit the real database

describe('addParent controller', () => {
  it('should create a parent successfully', async () => {
    // Fake request body
    const req = {
      body: {
        name: 'Hamzah Sr.',
        contact: '123-456-7890',
        email: 'hamzah@example.com',
        address: '123 Main St',
        emergencyContactName: 'Wife',
        emergencyContact: '987-654-3210',
      },
    };

    // Mocked Express response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulate DB success
    Parent.create.mockResolvedValue({
      _id: 'mockId123',
      ...req.body,
    });

    await addParent(req, res);

    expect(Parent.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Hamzah Sr.' })
    );
  });

  it('should return 400 if validation fails', async () => {
    const req = {
      body: {
        // missing required fields like `contact`
        name: 'No Contact Guy'
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addParent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.any(String) })
    );
  });
});
