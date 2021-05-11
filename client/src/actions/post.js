import axios from 'axios';

import { setAlert } from './alert';

import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from '../actions/types';

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

// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    // Add like to post
    const res = await axios.put(`/api/posts/like/${postId}`);

    // Dispatch the response
    dispatch({ type: UPDATE_LIKES, payload: { id: postId, likes: res.data } });
  } catch (error) {
    // Dispatch error

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    // Add like to post
    const res = await axios.delete(`/api/posts/like/${postId}`);

    // Dispatch the response
    dispatch({ type: UPDATE_LIKES, payload: { id: postId, likes: res.data } });
    console.log(res.data);
  } catch (error) {
    // Dispatch error

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
