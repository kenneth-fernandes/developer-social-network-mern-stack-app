import axios from 'axios';
// Import setAlert action to display alerts on failure
import { setAlert, steAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

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
