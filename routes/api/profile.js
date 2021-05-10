import express from 'express';
import auth from '../../middleware/auth.js';
export const profileRouter = express.Router();

import Profile from '../../models/Profile.js';
import User from '../../models/Users.js';
import Post from '../../models/Posts.js';
import config from 'config';
import axios from 'axios';

import validatorPkg from 'express-validator';
const { body, validationResult } = validatorPkg;

/**
 * @route GET api/profile/me
 * @description Get current users profile
 * @access Private
 */
profileRouter.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar', 'email']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for the user' });
    }

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route POST api/profile
 * @description Create or update user profile
 * @access Private
 */

profileRouter.post(
  '/',
  [
    auth,
    [
      body('status', 'Status is required').notEmpty(),
      body('skills', 'Skills is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      // Check errors
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
      } = req.body;

      // Build profile objects
      const profileFields = {};
      profileFields.user = req.user.id;
      if (company) {
        profileFields.company = company;
      }
      if (website) {
        profileFields.website = website;
      }
      if (location) {
        profileFields.location = location;
      }
      if (bio) {
        profileFields.bio = bio;
      }
      if (status) {
        profileFields.status = status;
      }
      if (githubusername) {
        profileFields.githubusername = githubusername;
      }
      if (skills) {
        console.log('server ', skills);
        profileFields.skills = skills.split(',').map((skill) => skill.trim());
      }

      // Build social object
      profileFields.social = {};
      if (youtube) {
        profileFields.social.youtube = youtube;
      }
      if (facebook) {
        profileFields.social.facebook = facebook;
      }
      if (twitter) {
        profileFields.social.twitter = twitter;
      }
      if (instagram) {
        profileFields.social.instagram = instagram;
      }
      if (linkedin) {
        profileFields.social.linkedin = linkedin;
      }

      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }
      // Create new profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route GET api/profile
 * @description Get all profiles
 * @access Public
 */
profileRouter.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'name',
      'avatar',
      'email',
    ]);
    if (!profiles) {
      return res.status(400).json({ msg: 'There are no profiles' });
    }

    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route GET api/profile/user/:user_id
 * @description Get profile by user ID
 * @access Public
 */
profileRouter.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar', 'email']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route DELETE api/profile
 * @description Delete profile, user & posts
 * @access Private
 */

profileRouter.delete('/', auth, async (req, res) => {
  try {
    //remove users posts
    await Post.deleteMany({ user: req.user.id });

    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.log(error.message);

    res.status(500).send('Server Error');
  }
});

/**
 * @route PUT api/profile/experience
 * @description Add profile experience
 * @access Private
 */

profileRouter.put(
  '/experience',
  [
    auth,
    [
      body('title', 'Title is required').notEmpty(),
      body('company', 'Company is required').notEmpty(),
      body('from', 'From date is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      from,
      to,
      current,
      description,
    };
    try {
      // Retieve profile by user token user id
      const profile = await Profile.findOne({ user: req.user.id });

      //Updating the profile
      profile.experience.unshift(newExp);

      // Save to DB
      await profile.save();

      // Send the response
      res.status(200).json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route DELETE api/profile/experience/:exp_id
 * @description Delete profile experience using experience id
 * @access Private
 */

profileRouter.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    // Get profile
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    // Remove experience
    profile.experience.splice(removeIndex, 1);
    // profile.experience = profile.experience.filter(
    //   (item) => item.id != req.params.exp_id
    // );

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route PUT api/profile/education
 * @description Add profile education
 * @access Private
 */

profileRouter.put(
  '/education',
  [
    auth,
    [
      body('school', 'School is required').notEmpty(),
      body('degree', 'Degree is required').notEmpty(),
      body('fieldofstudy', 'fieldofstudy date is required').notEmpty(),
      body('from', 'From date is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      // Retieve profile by user token user id
      const profile = await Profile.findOne({ user: req.user.id });

      //Updating the profile
      profile.education.unshift(newEdu);

      // Save to DB
      await profile.save();

      // Send the response
      res.status(200).json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route DELETE api/profile/education/:edu_id
 * @description Delete profile education using education id
 * @access Private
 */

profileRouter.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    // Get profile
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    // Remove education
    profile.education.splice(removeIndex, 1);
    // profile.education = profile.education.filter(
    //   (item) => item.id != req.params.edu_id
    // );

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route GET api/profile/github/:username
 * @description Get user repos from github
 * @access Public
 */
profileRouter.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );

    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });

    res.json(gitHubResponse.data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});
