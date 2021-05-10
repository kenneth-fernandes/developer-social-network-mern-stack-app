import axios from 'axios';

import { setAlert } from './alert';

import { GET_POSTS, POST_ERROR } from '../actions/types';

// Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    // Get all posts
    const res = await axios.get('/api/posts');

    // Dispatch the response
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    // Dispatch error
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
