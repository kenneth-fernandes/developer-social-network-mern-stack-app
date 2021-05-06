import express from 'express';
import auth from '../../middleware/auth.js';

import Profile from '../../models/Profile.js';
import Post from '../../models/Posts.js';
import User from '../../models/Users.js';

import validatorPkg from 'express-validator';
const { body, validationResult } = validatorPkg;

export const postsRouter = express.Router();

/**
 * @route POST api/posts
 * @description Create a post
 * @access Private
 */
postsRouter.post(
  '/',
  [auth, body('text', 'Text is required').notEmpty()],
  async (req, res) => {
    // Check errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Get user by id from JWtoken
      const user = await User.findById(req.user.id).select('-password');

      // Create the new post model
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      // Save the post to DB
      const post = await newPost.save();

      // Send the response
      res.json(post);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);
