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

/**
 * @route GET api/posts
 * @description Get all posts
 * @access Private
 */
postsRouter.get('/', auth, async (req, res) => {
  try {
    // Retrieve all posts by user id
    const posts = await Post.find({ user: req.user.id }).sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route GET api/posts/:id
 * @description Get post by post_id
 * @access Private
 */
postsRouter.get('/:id', auth, async (req, res) => {
  try {
    // Retrieve post by post id
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route DELETE api/posts/:id
 * @description Remove post by post_id
 * @access Private
 */
postsRouter.delete('/:id', auth, async (req, res) => {
  try {
    // Retrieve post by post id
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    //Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Remove post
    await post.remove();

    //Send response
    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route GET api/posts/like/:id
 * @description Like a post
 * @access Private
 */
postsRouter.put('/like/:id', auth, async (req, res) => {
  try {
    // Retrieve post by post id
    const post = await Post.findById(req.params.id);

    // Check if post has been liked already
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    // Like the post
    post.likes.unshift({ user: req.user.id });

    // Save the data to DB
    await post.save();

    // Send response
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route DELETE api/posts/like/:id
 * @description Unlike a post
 * @access Private
 */
postsRouter.delete('/like/:id', auth, async (req, res) => {
  try {
    // Retrieve post by post id
    const post = await Post.findById(req.params.id);

    // Check if post has not been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not been liked' });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    // Delete like from likes array
    post.likes.splice(removeIndex, 1);

    // Save the data to DB
    await post.save();

    // Send response
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route POST api/posts/comment/:id
 * @description Comment on a post
 * @access Private
 */

postsRouter.post(
  '/comment/:id',
  [auth, body('text', 'Text is required').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route DELETE api/posts/comment/:id/:comment_id
 * @description Delete a comment on a post
 * @access Private
 */
postsRouter.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Retrieve comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Check if comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment doesn not exist' });
    }

    // Check the user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    // Delete the comment
    post.comments.splice(removeIndex, 1);

    // Save the post on the DB
    await post.save();

    // Send the response
    res.json(post.comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});
