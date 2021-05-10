import axios from 'axios';
import { setAlert } from './alert';

import setAuthToken from '../utilties/setAuthToken';

import { GET_PROILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      // Setting token to x-auth-token as header
      setAuthToken(localStorage.token);
    }
    // Get response of current logged in profile
    const res = await axios.get('/api/profile/me');

    dispatch({ type: GET_PROILE, payload: res.data });
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

    dispatch({ type: GET_PROILE, payload: res.data });
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
