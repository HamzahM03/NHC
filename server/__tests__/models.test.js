// __tests__/models.test.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Parent from '../models/Parent.js';
import Participant from '../models/Participant.js';
import SessionPackage from '../models/SessionPackage.js';
import Attendance from '../models/Attendance.js';
import Transaction from '../models/Transaction.js';

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/testdb');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase(); // Clean up DB
  await mongoose.disconnect();
});

describe('Model Integration Tests', () => {
  let parent, participant;

  beforeAll(async () => {
    parent = await Parent.create({
      name: 'Test Parent',
      contact: '111-222-3333',
      email: 'parent@test.com',
      address: '100 Test St',
      emergencyContactName: 'Backup Contact',
      emergencyContact: '999-888-7777',
    });

    participant = await Participant.create({
      firstName: 'Testy',
      lastName: 'McTester',
      age: 10,
      gender: 'other',
      parent: parent._id,
    });
  });

  test('should create a Parent', () => {
    expect(parent.name).toBe('Test Parent');
  });

  test('should create a Participant linked to Parent', async () => {
    const found = await Participant.findById(participant._id).populate('parent');
    expect(found.parent.email).toBe('parent@test.com');
  });


  test('should create a SessionPackage', async () => {
    const sp = await SessionPackage.create({
      participant: participant._id,
      packageSize: 4,
      paymentMethod: 'cash',
      registeredBy: 'Admin',
    });

    expect(sp.packageSize).toBe(4);
  });

  test('should create Attendance', async () => {
    const attendance = await Attendance.create({
      participant: participant._id,
      sessionType: 'group',      
      date: new Date(),
      notes: 'Showed up on time',
    });

    expect(attendance.sessionType).toBe('group');
  });


  test('should create Transaction', async () => {
    const transaction = await Transaction.create({
      type: 'income',                
      category: 'session',           
      amount: 200,
      description: 'Monthly dues',
      recordedBy: 'Admin'
    });
    expect(transaction.amount).toBe(200);
  });
});
