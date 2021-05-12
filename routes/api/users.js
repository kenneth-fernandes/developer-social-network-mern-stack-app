import express from 'express';

import User from '../../models/Users.js';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import auth from '../../middleware/auth.js';

import validatorPkg from 'express-validator';
const { body, validationResult } = validatorPkg;

export const usersRouter = express.Router();

/**
 * @route POST api/users
 * @description Register Users
 * @access Public
 */
usersRouter.post(
  '/',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, avatar } = req.body;
    try {
      // Check if user exist
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exits' }] });
      }

      user = new User({ name, email, avatar, password });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: { id: user.id },
      };

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

/**
 * @route PUT api/users/:user_id
 * @description Update avatar
 * @access Private
 */
usersRouter.post('/:user_id', auth, async (req, res) => {
  try {
    console.log('1 - ', req.params.user_id);
    // Retrieve user by user id

    const user = await User.findById(req.params.user_id);
    const { avatar } = req.body;

    user.avatar = avatar;
    // Save the data to DB
    await user.save();

    // Send response
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});
