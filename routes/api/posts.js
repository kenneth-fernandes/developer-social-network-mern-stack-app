import express from 'express';

export const postsRouter = express.Router();

/**
 * @route GET api/posts
 * @description TEST route
 * @access Public
 */
postsRouter.get('/', (req, res) => {
  res.send('Posts route');
});
