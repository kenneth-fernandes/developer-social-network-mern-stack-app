import express from 'express';
import auth from '../../middleware/auth.js';
import User from '../../models/Users.js';

export const authRouter = express.Router();

/**
 * @route GET api/auth
 * @description TEST route
 * @access Public
 */
authRouter.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});
