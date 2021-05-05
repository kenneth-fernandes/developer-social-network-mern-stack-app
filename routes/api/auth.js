import express from 'express';
import auth from '../../middleware/auth.js';
import User from '../../models/Users.js';
import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcryptjs';

import validatorPkg from 'express-validator';
const { body, validationResult } = validatorPkg;

export const authRouter = express.Router();

/**
 * @route GET api/auth
 * @description Retrieve user details using the jwt token
 * @access Private
 */
authRouter.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').exec();

    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route POST api/auth
 * @description Authenticate users and get token
 * @access Public
 */
authRouter.post(
  '/',
  [
    //Validation
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user is present
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Validating the passwords - Authentication
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      console.log(isMatch);

      // Signing the jwt token
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);
