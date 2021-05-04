import express from 'express';

export const profileRouter = express.Router();

/**
 * @route GET api/profile
 * @description TEST route
 * @access Public
 */
profileRouter.get('/', (req, res) => {
  res.send('Profile route');
});
