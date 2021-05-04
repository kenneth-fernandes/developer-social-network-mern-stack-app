import express from 'express';

export const usersRouter = express.Router();

/**
 * @route GET api/users
 * @description TEST route
 * @access Public
 */
usersRouter.get('/', (req, res) => {
  res.send('User route');
});
