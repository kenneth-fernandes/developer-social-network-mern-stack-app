import axios from 'axios';
import { setAlert } from './alert';

import setAuthToken from '../utilties/setAuthToken';

import { GET_PROILE, PROFILE_ERROR } from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      // Setting token to x-auth-token as header
      setAuthToken(localStorage.token);
    }
    const res = await axios.get('/api/profile/me');
    console.log(res);
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
