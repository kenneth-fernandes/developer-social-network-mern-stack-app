import express from 'express';
import auth from '../../middleware/auth.js';
export const profileRouter = express.Router();

import Profile from '../../models/Profile.js';
import User from '../../models/Users.js';

/**
 * @route GET api/profile/me
 * @description Get current users profile
 * @access Private
 */
profileRouter.get('/me', auth, async (req, res) => {
  try {
    console.log(req.user.id);
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for the user' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});
