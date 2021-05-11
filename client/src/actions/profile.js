import axios from 'axios';
import { setAlert } from './alert';

import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
  REPOS_ERROR,
} from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    // Get response of current logged in profile
    const res = await axios.get('/api/profile/me');

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    // Added to sort out security flaw
    dispatch({ type: CLEAR_PROFILE });

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');

    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// Get github repos
// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    console.log(res.data);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REPOS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update a profile
// history - Has a method push() that redirects to client side route
export const createOrUpdateProfile = (
  formData,
  history,
  edit = false
) => async (dispatch) => {
  try {
    // Create the config with headers for the REST call
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Get response to create profile
    const res = await axios.post('/api/profile', formData, config);

    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    // Get the list of errors
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        // Dispatch to setAlert for each error
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    // Create the config with headers for the REST call
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Get response to add experience profile
    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    // Dispatch alert after adding experience
    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (error) {
    // Get the list of errors
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        // Dispatch to setAlert for each error
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    // Create the config with headers for the REST call
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Get response to add experience profile
    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    // Dispatch alert after adding education
    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (error) {
    // Get the list of errors
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        // Dispatch to setAlert for each error
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete an expereince
export const deleteExpereicne = (id) => async (dispatch) => {
  try {
    // Get resposnse after deleting an experience
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // Dispatch alert after deleting experience
    dispatch(setAlert('Experience Deleted', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete an education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    // Get resposnse after deleting an experience
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // Dispatch alert after deleting experience
    dispatch(setAlert('Education Deleted', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete account and profile
export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can not be undone')) {
    try {
      // Get resposnse after deleting an experience
      await axios.delete(`/api/profile/`);

      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch({
        type: ACCOUNT_DELETED,
      });

      // Dispatch alert after deleting experience
      dispatch(setAlert('Your account has been permanatly deleted'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
