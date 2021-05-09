import axios from 'axios';
// Import setAlert action to display alerts on failure
import { setAlert, steAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from './types';

import setAuthToken from '../utilties/setAuthToken';

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    // Setting token to x-auth-token as header
    setAuthToken(localStorage.token);
  }
  try {
    // Response variable -  As proxy is http://domain we need not mention the whole path while firing axios request
    const res = await axios.get('/api/auth');

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  // Create the config with headers for the REST call
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create the body componenet
  const body = JSON.stringify({ name, email, password });

  try {
    // Response variable -  As proxy is http://domain we need not mention the whole path while firing axios request
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    // Get the list of errors
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        // Dispatch to setAlert for each error
        console.log(error);
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  // Create the config with headers for the REST call
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create the body componenet
  const body = JSON.stringify({ email, password });

  try {
    // Response variable -  As proxy is http://domain we need not mention the whole path while firing axios request
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    // Get the list of errors
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        // Dispatch to setAlert for each error
        console.log(error);
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
