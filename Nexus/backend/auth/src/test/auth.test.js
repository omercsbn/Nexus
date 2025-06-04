const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../models/userModel');
jest.mock('../models/productModel');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('register returns 400 if user already exists', async () => {
    req.body = { email: 'test@example.com', password: 'secret' };
    User.findOne.mockResolvedValue(true);

    await authController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'User already exists' });
  });

  test('login returns 400 when user not found', async () => {
    req.body = { email: 'test@example.com', password: 'secret' };
    User.findOne.mockResolvedValue(null);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
  });

  test('login returns token with valid credentials', async () => {
    req.body = { email: 'test@example.com', password: 'secret' };
    const user = { id: '1', password: 'hashed' };
    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockImplementation((payload, secret, options, cb) => cb(null, 'tok')); 

    await authController.login(req, res);

    expect(res.json).toHaveBeenCalledWith({ token: 'tok' });
  });
});

describe('Product Controller', () => {
  test('getProducts returns product list', async () => {
    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    Product.find.mockResolvedValue([{ name: 'p1' }]);

    await productController.getProducts(req, res);

    expect(res.json).toHaveBeenCalledWith([{ name: 'p1' }]);
  });
});
