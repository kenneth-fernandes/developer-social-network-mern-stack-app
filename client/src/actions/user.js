import { UPDATE_USER_AVATAR, ERROR_USER_AVATAR } from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get current users avatar
export const updateAvatar =
  ({ avatar }, userId) =>
  async (dispatch) => {
    // Create the config with headers for the REST call
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // Get response to create profile
      const res = await axios.post(`/api/users/${userId}`, { avatar }, config);

      dispatch({ type: UPDATE_USER_AVATAR, payload: res.data });
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
        type: ERROR_USER_AVATAR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
